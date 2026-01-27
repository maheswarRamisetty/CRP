from test import build
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

 
model = build()
model.load_weights("../models/model.hdf5")

features = tf.keras.Model(inputs=model.inputs,outputs = model.layers[-2].output)

# print(features.summary())


def process(path):
    img = image.load_img(path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

if __name__=="__main__":
    image = process("../data/New Plant Diseases Dataset(Augmented)/New Plant Diseases Dataset(Augmented)/train/Apple___healthy/00907d8b-6ae6-4306-bfd7-d54471981a86___RS_HL 5709.JPG")
    f = features.predict(image)
    print(f.shape)
    print("F : ",f)