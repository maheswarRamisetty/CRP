from fastapi import FastAPI, UploadFile, File, Form
import numpy as np
import tensorflow as tf
import cv2
import uvicorn
from utils import class_l
MODEL_PATH = "../models/model.hdf5"
TCN_PATH = "../models/tcn_yield_model.h5"

app = FastAPI()

image_model = tf.keras.models.load_model(MODEL_PATH)
tcn_model = tf.keras.models.load_model(TCN_PATH)

IMG_SIZE = 224

CLASS_NAMES = class_l
from utils import lebel_to_idx

def preprocess_image(contents):
    npimg = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    area: float = Form(...),
    item: float = Form(...),
    year: float = Form(...),
    rainfall: float = Form(...),
    pesticides: float = Form(...),
    avg_temp: float = Form(...)
):
    contents = await file.read()
    img_array = preprocess_image(contents)

    img_pred = image_model.predict(img_array)
    img_class = int(np.argmax(img_pred))
    img_conf = float(np.max(img_pred))

    image_result = {
        "class": CLASS_NAMES[img_class],
        "confidence": round(img_conf, 4)
    }

    tcn_input = np.array([[area, item, year, rainfall, pesticides, avg_temp]], dtype=np.float32)
    tcn_pred = tcn_model.predict(tcn_input)
    yield_value = float(tcn_pred[0][0])

    tcn_result = {
        "predicted_yield": round(yield_value, 2)
    }

    return {
        "image_model": image_result,
        "tcn_model": tcn_result
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
