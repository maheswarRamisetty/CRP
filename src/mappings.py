import pandas as pd
from io import BytesIO
import os
import joblib
df = pd.read_csv("../data/raw/for-tcn/yield_df.csv")
scalers_y = joblib.load("scaler_X.pkl")
print(scalers_y)