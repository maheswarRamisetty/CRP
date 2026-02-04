import pandas as pd
from io import BytesIO
import os
import joblib
df = pd.read_csv("../data/raw/for-tcn/yield_df.csv")
scalers_y = joblib.load("scalers_y.pkl")
print(scalers_y.keys())