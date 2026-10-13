import os
import json
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image, ImageOps

app = Flask(__name__)
# Keep CORS so local development (localhost:3000 -> localhost:5000) still works.
# In production the browser calls /api/predict on the same origin, so CORS is a no-op there.
CORS(app)

# ---------------------------------------------------------------------------
# Inference config – loaded from inference_config.json next to this file.
# ---------------------------------------------------------------------------
CONFIG_PATH = os.path.join(os.path.dirname(__file__), "inference_config.json")
with open(CONFIG_PATH, "r") as f:
    inference_config = json.load(f)

class_names   = inference_config["class_names"]
TEMPERATURE   = float(inference_config.get("temperature", 1.0))
THRESHOLD     = float(inference_config.get("threshold", 0.0))
IMG_SIZE      = tuple(inference_config.get("img_size", [224, 224]))

# ---------------------------------------------------------------------------
# Model – loaded once at module level so cold-start cost is paid only once.
# Path is relative to this file so it works regardless of the working directory.
# ---------------------------------------------------------------------------
MODEL_PATH = os.path.join(os.path.dirname(__file__), "plant_disease_efficientnet_v2.keras")

print(f"Loading Keras model from {MODEL_PATH}...")
model = tf.keras.models.load_model(MODEL_PATH, compile=False)
print("Model loaded successfully!")

# ---------------------------------------------------------------------------
# Per-class treatment advice (indexed to match class_names)
# ---------------------------------------------------------------------------
solutions = [
    "Remove infected leaves. Spray fungicide once a week.",
    "Pick rotten apples. Spray medicine to stop spread.",
    "Trim infected parts and apply copper spray.",
    "Plant healthy. Just water and check leaves.",
    "Water well. Keep soil healthy and clean pests.",
    "Spray fungicide. Remove affected cherry leaves.",
    "Keep plant healthy. Give space and sunlight.",
    "Plant resistant corn. Rotate crops and spray.",
    "Remove bad leaves. Spray medicine to control.",
    "Use strong corn types. Spray early if needed.",
    "Keep plant healthy. Monitor regularly.",
    "Trim infected grapes. Spray fungicide carefully.",
    "Remove bad grapes. Keep vineyard clean.",
    "Apply copper spray and trim leaves.",
    "Maintain vineyard hygiene. Water properly.",
    "Remove sick oranges. Use healthy trees.",
    "Spray bactericide. Remove affected spots.",
    "Trim peach trees. Water and feed properly.",
    "Spray bactericide. Remove bad peppers.",
    "Water and feed peppers. Check for pests.",
    "Spray fungicide. Remove affected potato leaves.",
    "Spray fungicide. Remove affected potatoes.",
    "Water potatoes properly. Remove sick plants.",
    "Water and feed raspberry. Remove sick plants.",
    "Keep soybean healthy. Water and check pests.",
    "Remove affected squash leaves. Spray fungicide.",
    "Water strawberry. Check plant regularly.",
    "Spray bactericide. Remove sick strawberry leaves.",
    "Spray fungicide. Improve airflow around leaves.",
    "Spray fungicide. Remove bad tomato leaves.",
    "Remove sick leaves. Spray fungicide on tomatoes.",
    "Remove infected plants. Improve airflow.",
    "Spray fungicide. Remove bad tomato leaves.",
    "Use soap spray and maintain humidity.",
    "Spray fungicide and remove infected leaves.",
    "Use healthy seedlings only. Remove sick plants.",
    "Remove infected plants. Use clean seeds.",
    "Water and feed properly. Monitor tomato leaves."
]

# ---------------------------------------------------------------------------
# Image preprocessing
# Per inference_config: inputs are RGB floats in 0..255;
# apply softmax(logits / temperature) after model outputs logits.
# ---------------------------------------------------------------------------
def preprocess_image(pil_image):
    """Resize to model input size and convert to float32 batch."""
    pil_image = pil_image.resize(IMG_SIZE, Image.LANCZOS)
    img = np.array(pil_image, dtype=np.float32)          # [H, W, 3] in 0–255
    img = np.expand_dims(img, axis=0)                    # [1, H, W, 3]
    return img

def softmax_with_temperature(logits, temperature=1.0):
    """Apply temperature scaling then softmax."""
    scaled = logits / temperature
    e = np.exp(scaled - np.max(scaled))                  # numerically stable
    return e / e.sum()

# ---------------------------------------------------------------------------
# Route – must match the path Vercel passes through.
# The top-level rewrite "/api/(.*)" does NOT strip the prefix; the service
# receives the original path, so the route is /api/predict (not /predict).
# ---------------------------------------------------------------------------
@app.route('/api/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image = Image.open(file.stream)
        image = ImageOps.exif_transpose(image)   # fix rotation
        image = image.convert('RGB')

        processed_image = preprocess_image(image)

        # Run inference – model may output logits or probabilities
        raw_output = model.predict(processed_image, verbose=0)[0]

        # Apply temperature-scaled softmax as specified by inference_config
        probs = softmax_with_temperature(raw_output, TEMPERATURE)

        idx        = int(np.argmax(probs))
        confidence = float(probs[idx]) * 100

        disease_name = class_names[idx]
        solution     = solutions[idx] if idx < len(solutions) else "Consult an agronomist."

        plant_name   = disease_name.split("___")[0].replace("_", " ").strip()
        disease_only = disease_name.split("___")[1].replace("_", " ").strip()

        return jsonify({
            'disease':        disease_only,
            'plant':          plant_name,
            'confidence':     confidence,
            'solution':       solution,
            'full_class_name': disease_name
        })

    except Exception as e:
        print(f"Prediction Error: {e}")
        return jsonify({'error': str(e)}), 500

# ---------------------------------------------------------------------------
# Local development entry-point only.
# Vercel imports 'app' directly; app.run() must NOT be called at import time.
# ---------------------------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True, port=5000)
