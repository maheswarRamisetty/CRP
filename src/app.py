import numpy as np
import pandas as pd
import tensorflow as tf
import joblib
import cv2
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from utils import class_l, lebel_to_idx
from test import build
import torch.nn as nn
from tensorflow.keras.preprocessing import image
from io import BytesIO
from sklearn.preprocessing import StandardScaler

df = pd.read_csv("../data/raw/for-tcn/yield_df.csv")

area_mapping = {}
area_codes = df["Area"].astype("category").cat.codes
unique_areas = df["Area"].unique()
for area_name in unique_areas:
    area_code = area_codes[df["Area"] == area_name].iloc[0]
    area_mapping[area_name] = int(area_code)

item_mapping = {}
item_codes = df["Item"].astype("category").cat.codes
unique_items = df["Item"].unique()
for item_name in unique_items:
    item_code = item_codes[df["Item"] == item_name].iloc[0]
    item_mapping[item_name] = int(item_code)

print(f"Loaded {len(area_mapping)} areas and {len(item_mapping)} items")

IMAGE_MODEL_PATH = "../models/model.hdf5"
TCN_MODEL_PATH = "../models/tcn_yield_model.h5"

model = build()
model.load_weights("../models/model.hdf5")
tcn_model = tf.keras.models.load_model(TCN_MODEL_PATH)
scaler_X = joblib.load("scaler_X.pkl")
scalers_y = joblib.load("scalers_y.pkl")

IMG_SIZE = 224
CLASS_NAMES = class_l

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def predict_image_from_upload(contents):
    img = image.load_img(BytesIO(contents), target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    preds = model.predict(img_array)[0]
    idx = int(np.argmax(preds))

    label = lebel_to_idx(class_l)[idx]

    return {
        "class": label,
        "confidence": float(preds[idx])
    }

def build_tcn_input(rainfall, pesticides, avg_temp):
    X = np.array(list(zip(rainfall, pesticides, avg_temp)), dtype=np.float32)
    X = scaler_X.transform(X)
    X = np.expand_dims(X, axis=0)
    return X

@app.get("/available-mappings")
async def get_mappings():
    return {
        "areas": [{"name": name, "code": code} for name, code in area_mapping.items()],
        "items": [{"name": name, "code": code} for name, code in item_mapping.items()],
        "area_mapping": area_mapping,
        "item_mapping": item_mapping
    }

@app.get("/check-combination/{area_name}/{item_name}")
async def check_combination(area_name: str, item_name: str):
    area_code = area_mapping.get(area_name)
    item_code = item_mapping.get(item_name)
    
    if area_code is None:
        return {"exists": False, "error": f"Area '{area_name}' not found"}
    
    if item_code is None:
        return {"exists": False, "error": f"Item '{item_name}' not found"}
    
    key = (area_code, item_code)
    exists = key in scalers_y
    
    return {
        "exists": exists,
        "area_code": area_code,
        "item_code": item_code,
        "key": key,
        "message": f"Combination {'exists' if exists else 'does not exist'}"
    }

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    rainfall: str = Form(...),
    pesticides: str = Form(...),
    avg_temp: str = Form(...),
    area_name: str = Form(...),  
    item_name: str = Form(...)   
):
    try:
        contents = await file.read()
        
        image_result = predict_image_from_upload(contents)
        
        rainfall = list(map(float, rainfall.split(",")))
        pesticides = list(map(float, pesticides.split(",")))
        avg_temp = list(map(float, avg_temp.split(",")))
        
        if not (len(rainfall) == len(pesticides) == len(avg_temp) == 5):
            raise HTTPException(status_code=400, detail="Exactly 5 years of data required for TCN")
        
        area_code = area_mapping.get(area_name)
        item_code = item_mapping.get(item_name)
        
        if area_code is None:
            raise HTTPException(status_code=400, detail=f"Area '{area_name}' not found")
        
        if item_code is None:
            raise HTTPException(status_code=400, detail=f"Item '{item_name}' not found")
        
        X = build_tcn_input(rainfall, pesticides, avg_temp)
        pred_scaled = tcn_model.predict(X, verbose=0)[0][0]
        
        key = (area_code, item_code)
        if key not in scalers_y:
            available_combinations = list(scalers_y.keys())
            similar_areas = [f"{k[0]}:{k[1]}" for k in available_combinations if k[0] == area_code][:5]
            similar_items = [f"{k[0]}:{k[1]}" for k in available_combinations if k[1] == item_code][:5]
            
            raise HTTPException(
                status_code=400, 
                detail={
                    "error": f"Combination (area_code={area_code}, item_code={item_code}) not found in training data",
                    "available_combinations_for_area": similar_areas,
                    "available_combinations_for_item": similar_items,
                    "total_combinations": len(available_combinations)
                }
            )
        
        scaler_y = scalers_y[key]
        yield_pred = scaler_y.inverse_transform([[pred_scaled]])[0][0]
        
        tcn_result = {
            "predicted_yield_hg_per_ha": round(float(yield_pred), 2),
            "area_name": area_name,
            "item_name": item_name,
            "area_code": area_code,
            "item_code": item_code
        }
        
        return {
            "image_model": image_result,
            "tcn_model": tcn_result
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)