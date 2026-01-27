import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
from tensorflow.keras.layers import Input, Conv1D, Dense, Dropout, Add, LayerNormalization, GlobalAveragePooling1D
from tensorflow.keras.models import Model

df = pd.read_csv("../data/raw/for-tcn/yield_df.csv")
df = df.sort_values(["Area", "Item", "Year"]).dropna()
df["Area"] = df["Area"].astype("category").cat.codes
df["Item"] = df["Item"].astype("category").cat.codes

features = ["average_rain_fall_mm_per_year", "pesticides_tonnes", "avg_temp"]
target = "hg/ha_yield"

scaler_X = StandardScaler()
df[features] = scaler_X.fit_transform(df[features])

def create_sequences(df, group_cols, feature_cols, target_col, window=5):
    X, y = [], []
    scalers_y = {}
    for name, group in df.groupby(group_cols):
        group = group.sort_values("Year")
        data = group[feature_cols].values
        labels = group[target_col].values
        scaler_y = StandardScaler()
        labels_scaled = scaler_y.fit_transform(labels.reshape(-1,1)).flatten()
        scalers_y[name] = scaler_y
        for i in range(len(data) - window):
            X.append(data[i:i+window])
            y.append(labels_scaled[i+window])
    return np.array(X), np.array(y), scalers_y

X, y, scalers_y = create_sequences(df, ["Area","Item"], features, target, window=5)

split_idx = int(len(X) * 0.8)
X_train, X_test = X[:split_idx], X[split_idx:]
y_train, y_test = y[:split_idx], y[split_idx:]

def TCN_block(x, filters, dilation):
    c1 = Conv1D(filters, 3, padding="causal", dilation_rate=dilation, activation="relu")(x)
    c2 = Conv1D(filters, 3, padding="causal", dilation_rate=dilation, activation="relu")(c1)
    if x.shape[-1] != filters:
        x = Conv1D(filters, 1, padding="same")(x)
    out = Add()([x, c2])
    out = LayerNormalization()(out)
    return out

def build_tcn(input_shape):
    inputs = Input(shape=input_shape)
    x = TCN_block(inputs, 64, 1)
    x = TCN_block(x, 64, 2)
    x = TCN_block(x, 64, 4)
    x = TCN_block(x, 64, 8)
    x = GlobalAveragePooling1D()(x)
    x = Dense(64, activation="relu")(x)
    x = Dropout(0.3)(x)
    outputs = Dense(1)(x)
    model = Model(inputs, outputs)
    model.compile(optimizer="adam", loss="mse", metrics=["mae","mse","RootMeanSquaredError"])
    return model

tcn_model = build_tcn(X_train.shape[1:])
history = tcn_model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=50, batch_size=32)

preds_scaled = tcn_model.predict(X_test)
y_test_orig = []
preds_orig = []

for i in range(len(preds_scaled)):
    area = df.iloc[i]["Area"]
    item = df.iloc[i]["Item"]
    scaler_y = scalers_y[(area,item)]
    y_test_orig.append(scaler_y.inverse_transform([[y_test[i]]])[0][0])
    preds_orig.append(scaler_y.inverse_transform([[preds_scaled[i][0]]])[0][0])

y_test_orig = np.array(y_test_orig)
preds_orig = np.array(preds_orig)

rmse = np.sqrt(mean_squared_error(y_test_orig, preds_orig))
r2 = r2_score(y_test_orig, preds_orig)

print("RMSE:", rmse)
print("R2:", r2)

tcn_model.save("tcn_yield_model.h5")
