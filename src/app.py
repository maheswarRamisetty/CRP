import numpy as np
import tensorflow as tf
import joblib
import cv2
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from utils import class_l, lebel_to_idx
from test import build
import torch.nn as nn

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

def preprocess_image(contents):
    npimg = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img

def build_tcn_input(rainfall, pesticides, avg_temp):
    X = np.array(list(zip(rainfall, pesticides, avg_temp)), dtype=np.float32)
    X = scaler_X.transform(X)
    X = np.expand_dims(X, axis=0)
    return X

from tensorflow.keras.preprocessing import image
from io import BytesIO

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

print(scaler_X)
print(scalers_y)


@app.post("/predict")
async def predict(
    file: UploadFile = File(...),

    rainfall: str = Form(...),
    pesticides: str = Form(...),
    avg_temp: str = Form(...),

    area_code: int = Form(...),
    item_code: int = Form(...)
):
    contents = await file.read()
    # img_array = preprocess_image(contents)

    # img_pred = model.predict(img_array)
    # img_class = int(np.argmax(img_pred))
    # img_conf = float(np.max(img_pred))
    # idx = lebel_to_idx(CLASS_NAMES)

    # image_result = {
    #     "class": idx[img_class],
    #     "confidence": round(img_conf, 4)
    # }

    rainfall = list(map(float, rainfall.split(",")))
    pesticides = list(map(float, pesticides.split(",")))
    avg_temp = list(map(float, avg_temp.split(",")))

    if not (len(rainfall) == len(pesticides) == len(avg_temp) == 5):
        return {"error": "Exactly 5 years of data required for TCN"}

    X = build_tcn_input(rainfall, pesticides, avg_temp)

    pred_scaled = tcn_model.predict(X, verbose=0)[0][0]

    key = (area_code, item_code)
    if key not in scalers_y:
        return {"error": "Invalid area_code or item_code"}

    scaler_y = scalers_y[key]
    yield_pred = scaler_y.inverse_transform([[pred_scaled]])[0][0]

    tcn_result = {
        "predicted_yield_hg_per_ha": round(float(yield_pred), 2)
    }

    return {
        "image_model": predict_image_from_upload(contents),
        "tcn_model": tcn_result
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
