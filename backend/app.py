import os
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image, ImageOps
from tensorflow.keras import backend as K

app = Flask(__name__)
# Keep CORS so local development (localhost:3000 -> localhost:5000) still works.
# In production the browser calls /api/predict on the same origin, so CORS is a no-op there.
CORS(app)

# ---------------------------------------------------------------------------
# Custom metric used during training – required to load the saved model.
# ---------------------------------------------------------------------------
def f1_score(y_true, y_pred):
    y_pred = K.round(y_pred)
    tp = K.sum(K.cast(y_true * y_pred, "float32"))
    fp = K.sum(K.cast((1 - y_true) * y_pred, "float32"))
    fn = K.sum(K.cast(y_true * (1 - y_pred), "float32"))
    return tp / (tp + 0.5 * (fp + fn) + K.epsilon())

# ---------------------------------------------------------------------------
# Model – loaded once at module level so cold-start cost is paid only once.
# Path is relative to this file so it works regardless of the working directory.
# ---------------------------------------------------------------------------
MODEL_PATH = os.path.join(os.path.dirname(__file__), "plant_disease_efficientnet.keras")

print(f"Loading model from {MODEL_PATH}...")
model = tf.keras.models.load_model(
    MODEL_PATH,
    custom_objects={"f1_score": f1_score}
)
print("Model loaded successfully!")

# ---------------------------------------------------------------------------
# Class labels and per-class treatment advice
# ---------------------------------------------------------------------------
class_names = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight',
    'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy',
    'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites_Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]

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
# ---------------------------------------------------------------------------
def preprocess_image(pil_image):
    pil_image = pil_image.resize((224, 224), Image.LANCZOS)
    img = np.array(pil_image)
    img = np.expand_dims(img, axis=0)  # model expects a batch, not a single photo
    img = tf.keras.applications.efficientnet.preprocess_input(img)
    return img

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
        image = ImageOps.exif_transpose(image)  # fix rotation issue
        image = image.convert('RGB')

        processed_image = preprocess_image(image)

        preds = model.predict(processed_image, verbose=0)
        idx = np.argmax(preds)
        confidence = float(np.max(preds)) * 100

        disease_name = class_names[idx]
        solution = solutions[idx]

        plant_name = disease_name.split("___")[0].replace("_", " ").strip()
        disease_only = disease_name.split("___")[1].replace("_", " ").strip()

        return jsonify({
            'disease': disease_only,
            'plant': plant_name,
            'confidence': confidence,
            'solution': solution,
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
