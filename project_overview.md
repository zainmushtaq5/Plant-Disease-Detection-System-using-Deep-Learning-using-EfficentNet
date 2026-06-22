# Plant Disease Detection System - Project Overview

This document provides a comprehensive explanation of how your project works, from the user interface to the AI model.

## 1. High-Level Concept
This is a **Full-Stack Web Application** designed to help farmers and gardeners identify plant diseases. 
- **Input**: A photo of a sick plant leaf.
- **Process**: The app uses Artificial Intelligence (Deep Learning) to analyze the image.
- **Output**: The name of the disease, confidence score, and a recommended solution/treatment.

## 2. System Architecture

The project is split into two main parts: the **Frontend** (what you see) and the **Backend** (where the thinking happens).

```mermaid
graph LR
    User[User] -- Uploads Image --> Frontend[React Frontend\n(Localhost:3000)]
    Frontend -- Sends Image via API --> Backend[Flask Backend\n(Localhost:5000)]
    Backend -- Preprocesses Image --> AI[AI Model\n(EfficientNetB0)]
    AI -- Returns Prediction --> Backend
    Backend -- Returns Result JSON --> Frontend
    Frontend -- Displays Diagnosis --> User
```

---

## 3. The "Brain": Backend (`/backend`)
This folder contains the logic for running the AI model.

### Key Files
- **`app.py`**: The main server file.
  - **Starts a web server** using `Flask`.
  - **Loads the Model**: deeply learning model (`.keras` file) is loaded into memory when the app starts.
  - **`/predict` Endpoint**: This is a specific URL that the frontend sends images to.
  - **`class_names` & `solutions`**: Big lists that map the model's numeric output (e.g., `Class 7`) to human text (e.g., "Corn Common Rust" and "Spray fungicides").
- **`plant_disease_efficientnet (1).keras`**: The pre-trained AI model.
  - Architecture: **EfficientNetB0** (a powerful, modern image classification model).
  - Trained on: ~87k images of healthy and diseased leaves.
  - Can recognize: **38 different classes** of plants/diseases.

### How it "Sees"
1. **Resize**: Every image is squished or stretched to exactly `224x224` pixels.
2. **Preprocess**: The pixel colors are adjusted to match the format the model was trained on.
3. **Inference**: The model calculates a probability for every possible disease.
4. **Result**: The disease with the highest probability is chosen.

---

## 4. The "Face": Frontend (`/src`)
This is the modern user interface built with **React**.

### Key Pages (`src/pages`)
- **`Home.jsx`**: The welcome screen.
- **`Detection.jsx`**: The most important page.
  - Contains the **Upload Area** where users drop files.
  - Handles the loading state (spinners/progress bars).
  - Displays the final **Analysis Result** card.
- **`Info.jsx` & `About.jsx`**: Educational pages about the project and team.

### Styling
- **CSS**: Uses a mix of standard `index.css` and modern layout techniques (Flexbox/Grid).
- **Responsive**: The layout adjusts for mobile, tablet, and desktop screens.

---

## 5. The Workflow: A User's Journey

1. **Upload**: You select a photo of a tomato leaf with spots.
2. **Send**: The React app wraps this image into a standard web request (`POST`) and shoots it over to `http://localhost:5000/predict`.
3. **Fix Rotation**: (Our recent fix!) The backend checks if the photo was taken sideways (common on phones) and rotates it upright.
4. **Analyze**: The AI looks at the image and says, "I'm 98% sure this is Tomato Bacterial Spot."
5. **Enrich**: The backend looks up the treatment: "Spray copper fungicides."
6. **Response**: The backend sends back a JSON package:
   ```json
   {
     "disease": "Bacterial Spot",
     "plant": "Tomato",
     "solution": "Spray copper fungicides...",
     "confidence": 98.5
   }
   ```
7. **Display**: The React app receives this and draws a nice "Result Card" showing the disease name in red/green and the advice.

## 6. Tech Stack Summary
- **Language**: Python (Backend), JavaScript (Frontend).
- **Frameworks**: Flask (Python), React (JavaScript).
- **AI Library**: TensorFlow / Keras.
- **Image Processing**: Pillow (Python Imaging Library).
