# Plant Disease Detection System

## Setup Instructions

### 1. Prerequisites
- Node.js installed.
- Python installed.

### 2. Backend Setup
The backend is a Flask API that processes images using a TensorFlow model.

1.  **IMPORTANT**: Place your model file `plant_disease_efficientnet (1).keras` inside the `backend/` folder.
2.  Open a terminal in the `backend/` folder.
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the server:
    ```bash
    python app.py
    ```
    The server will start at `http://localhost:5000`.

### 3. Frontend Setup
The frontend is a React application.

1.  Open a terminal in the root folder.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm start
    ```
4.  Open `http://localhost:3000` in your browser.

## Rapid Start (Windows)
Double-click `start_app.bat` to launch both servers at once.
