import pandas as pd
import numpy as np
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

def verify_model():
    print("--- Starting Model Verification ---")
    
    # 1. Load Data
    data_path = "../Project - l/cardio_train.csv"
    if not os.path.exists(data_path):
        print(f"Error: Data file not found at {data_path}")
        return

    print(f"Loading data from {data_path}...")
    data = pd.read_csv(data_path, sep=";")
    print(f"Initial Shape: {data.shape}")

    # 2. Preprocessing (Matching main.ipynb)
    print("Preprocessing data...")
    
    # Remove ID
    if 'id' in data.columns:
        data.drop(columns=['id'], inplace=True)

    # Age conversion (days -> years)
    data['age'] = data['age'] // 365

    # Outlier Removal
    # Blood Pressure
    data = data[(data['ap_hi'] > 0) & (data['ap_lo'] > 0)]
    data = data[data['ap_hi'] < 250]
    data = data[data['ap_lo'] < 200]
    data = data[data['ap_hi'] > data['ap_lo']]

    # BMI Calculation
    # Note: original notebook calculated BMI before full filtering, let's verify order.
    # Notebook: Age conv -> BMI Calc -> Filter Height/Weight/Age/BMI.
    
    data['height_m'] = data['height'] / 100
    data['bmi'] = data['weight'] / (data['height_m'] ** 2)
    data.drop(columns=['height_m'], inplace=True)

    # Range Filtering
    data = data[
        (data['height'].between(125, 200)) &
        (data['weight'].between(35, 190)) &
        (data['age'].between(10, 90)) &
        (data['bmi'].between(10, 45))
    ]
    
    print(f"Shape after preprocessing: {data.shape}")
    print(f"Rows removed: {70000 - data.shape[0]}")

    # 3. Train/Test Split
    target = 'cardio'
    feature_cols = ['age','height','weight', 'bmi','ap_hi','ap_lo','gender','smoke','alco','active']
    
    X = data[feature_cols].copy()
    y = data[target].copy()

    print("Splitting data (test_size=0.2, random_state=42)...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"Train size: {X_train.shape[0]}, Test size: {X_test.shape[0]}")

    # 4. Verify Existing Model
    model_path = "rf_model.pkl"
    if os.path.exists(model_path):
        print(f"\n--- Verifying Existing Model ({model_path}) ---")
        try:
            loaded_model = joblib.load(model_path)
            y_pred_loaded = loaded_model.predict(X_test)
            acc_loaded = accuracy_score(y_test, y_pred_loaded)
            print(f"Existing Model Accuracy: {acc_loaded:.4f}")
            print("Classification Report (Existing):")
            print(classification_report(y_test, y_pred_loaded))
        except Exception as e:
            print(f"Failed to load or test existing model: {e}")
    else:
        print(f"Warning: {model_path} not found.")

    # 5. Train New Model (Verification of reproducibility)
    print("\n--- Training New Model (Reproducibility Check) ---")
    new_model = RandomForestClassifier(
        n_estimators=250,
        max_depth=14,
        min_samples_split=5,
        min_samples_leaf=2,
        class_weight='balanced',
        random_state=42,
        n_jobs=-1
    )
    
    new_model.fit(X_train, y_train)
    y_pred_new = new_model.predict(X_test)
    acc_new = accuracy_score(y_test, y_pred_new)
    
    print(f"New Model Accuracy: {acc_new:.4f}")
    
    if os.path.exists(model_path):
        diff = abs(acc_loaded - acc_new)
        print(f"\nDifference between Loaded and New model: {diff:.6f}")
        if diff < 0.001:
            print("SUCCESS: Loaded model matches training logic!")
        else:
            print("WARNING: Loaded model differs from training logic.")

if __name__ == "__main__":
    verify_model()
