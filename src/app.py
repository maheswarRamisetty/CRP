import numpy as np
import tensorflow as tf
import joblib
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

tcn_model = tf.keras.models.load_model("tcn_yield_model.h5")
scaler_X = joblib.load("scaler_X.pkl")
scalers_y = joblib.load("scalers_y.pkl")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TCNRequest(BaseModel):
    rainfall: list[float]
    pesticides: list[float]
    avg_temp: list[float]
    area_code: int
    item_code: int

def build_tcn_input(rainfall, pesticides, avg_temp):
    X = np.array(list(zip(rainfall, pesticides, avg_temp)), dtype=np.float32)
    X = scaler_X.transform(X)
    X = np.expand_dims(X, axis=0)
    return X

@app.post("/predict-yield")
def predict_yield(req: TCNRequest):
    if not (len(req.rainfall) == len(req.pesticides) == len(req.avg_temp) == 5):
        return {"error": "Exactly 5 years of data required"}

    X = build_tcn_input(
        req.rainfall,
        req.pesticides,
        req.avg_temp
    )

    pred_scaled = tcn_model.predict(X, verbose=0)[0][0]

    key = (req.area_code, req.item_code)
    if key not in scalers_y:
        return {"error": "Unknown area_code / item_code"}

    scaler_y = scalers_y[key]
    pred = scaler_y.inverse_transform([[pred_scaled]])[0][0]

    return {
        "predicted_yield_hg_per_ha": round(float(pred), 2)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
