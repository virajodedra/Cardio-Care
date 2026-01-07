from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI(title="Cardiovascular Disease Prediction API")

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://cardiocare-wine.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model
MODEL_PATH = "rf_model.pkl"
model = None

@app.on_event("startup")
def load_model():
    global model
    try:
        if os.path.exists(MODEL_PATH):
            model = joblib.load(MODEL_PATH)
            print(f"Model loaded successfully from {MODEL_PATH}")
        else:
            print(f"Warning: Model file not found at {MODEL_PATH}")
    except Exception as e:
        print(f"Error loading model: {e}")

class HeartDiseaseInput(BaseModel):
    age: int
    height: float
    weight: float
    sys_bp: int
    dia_bp: int
    gender: str
    smoke: str
    alco: str
    active: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the Cardiovascular Disease Prediction API"}

@app.post("/predict")
def predict_risk(data: HeartDiseaseInput):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    try:
        # Preprocessing matching the original app.py logic
        
        # 1. Gender: Female=1, Male=2
        gender_val = 1 if data.gender == "Female" else 2
        
        # 2. Smoke: Yes=1, No=0
        smoke_val = 1 if data.smoke == "Yes" else 0
        
        # 3. Alcohol: Yes=1, No=0
        alco_val = 1 if data.alco == "Yes" else 0
        
        # 4. Active: Yes=1, No=0
        active_val = 1 if data.active == "Yes" else 0
        
        # 5. Calculate BMI
        # Original logic: bmi = weight / ((height / 100) ** 2)
        bmi = data.weight / ((data.height / 100) ** 2)
        
        # Input order from training: 
        # [age, height, weight, bmi, sys_bp, dia_bp, gender_val, smoke_val, alco_val, active_val]
        # Important: Ensure this order matches exactly what the model expects.
        # Based on app.py:
        # input_data = np.array([[
        #     age, height, weight, bmi,
        #     sys_bp, dia_bp,
        #     gender_val, smoke_val, alco_val, active_val
        # ]])
        
        input_features = np.array([[
            data.age,
            data.height,
            data.weight,
            bmi,
            data.sys_bp,
            data.dia_bp,
            gender_val,
            smoke_val,
            alco_val,
            active_val
        ]])
        
        prediction = model.predict(input_features)[0]
        # predict_proba returns [prob_class_0, prob_class_1]
        probability = model.predict_proba(input_features)[0][1]
        
        risk_label = "High Risk" if prediction == 1 else "Low Risk"
        
        return {
            "prediction": int(prediction),
            "probability": float(probability),
            "risk_label": risk_label,
            "bmi": float(bmi)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
