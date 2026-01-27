import torch.nn as nn
import torch
import os                       
import numpy as np              
import pandas as pd            
import torch   
import joblib                 
import matplotlib.pyplot as plt 
import torch.nn as nn           
from torch.utils.data import DataLoader 
from PIL import Image  
from collections import defaultdict
from abc import abstractclassmethod        
import torch.nn.functional as F 
import torchvision.transforms as transforms   
from torchvision.utils import make_grid       
from torchvision.datasets import ImageFolder  
from torchsummary import summary              
from torchvision.models import resnet50
from gpu import to_d
from utils import pair
from utils import class_l
import torch
from PIL import Image
import torchvision.transforms as transforms
import matplotlib.pyplot as plt
from einops import rearrange, repeat
from einops.layers.torch import Rearrange
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model
from utils import lebel_to_idx
from torch import nn, einsum
from prenorm import PreNorm
from tensorflow.keras.preprocessing import image
from feed_forward import FeedForward
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D
from tensorflow.keras.layers import  MaxPooling2D
from tensorflow.keras.layers import Flatten
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import Dropout
from tensorflow.keras.layers import BatchNormalization



def accuracy(outputs, labels):
    _, preds = torch.max(outputs, dim=1)
    return torch.tensor(torch.sum(preds == labels).item() / len(preds))


class ImageClassificationBase(nn.Module):
    
    def training_step(self, batch):
        images, labels = batch
        out = self(images)                  
        loss = F.cross_entropy(out, labels) 
        return loss
    
    def validation_step(self, batch):
        images, labels = batch
        out = self(images)                   
        loss = F.cross_entropy(out, labels) 
        acc = accuracy(out, labels)          
        return {"val_loss": loss.detach(), "val_accuracy": acc}
    
    def validation_epoch_end(self, outputs):
        batch_losses = [x["val_loss"] for x in outputs]
        batch_accuracy = [x["val_accuracy"] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()         
        epoch_accuracy = torch.stack(batch_accuracy).mean()
        return {"val_loss": epoch_loss, "val_accuracy": epoch_accuracy} 
    
    def epoch_end(self, epoch, result):
        print("Epoch [{}], last_lr: {:.5f}, train_loss: {:.4f}, val_loss: {:.4f}, val_acc: {:.4f}".format(
            epoch, result['lrs'][-1], result['train_loss'], result['val_loss'], result['val_accuracy']))


class Attention(nn.Module):
    def __init__(self, dim, heads=8, dim_head=64, dropout=0.):
        super().__init__()
        inner_dim = dim_head * heads
        project_out = not (heads == 1 and dim_head == dim)

        self.heads = heads
        self.scale = dim_head ** -0.5

        self.attend = nn.Softmax(dim=-1)
        self.to_qkv = nn.Linear(dim, inner_dim * 3, bias=False)

        self.to_out = nn.Sequential(
            nn.Linear(inner_dim, dim),
            nn.Dropout(dropout),
        ) if project_out else nn.Identity()

    def forward(self, x):
        b, n, _, h = *x.shape, self.heads
        qkv = self.to_qkv(x).chunk(3, dim=-1)  
        q, k, v = map(lambda t: rearrange(t, 'b n (h d) -> b h n d', h=h), qkv)  

        dots = einsum('b h i d, b h j d -> b h i j', q, k) * self.scale

        attn = self.attend(dots)

        out = einsum('b h i j, b h j d -> b h i d', attn, v)
        out = rearrange(out, 'b h n d -> b n (h d)')
        return self.to_out(out)


class Transformer(nn.Module):
    def __init__(self, dim, depth, heads, dim_head, mlp_dim, dropout=0.):
        super().__init__()
        self.layers = nn.ModuleList([])
        for _ in range(depth):
            self.layers.append(nn.ModuleList([
                PreNorm(dim, Attention(dim, heads=heads, dim_head=dim_head, dropout=dropout)),
                PreNorm(dim, FeedForward(dim, mlp_dim, dropout=dropout))
            ]))

    def forward(self, x):
        for attn, ff in self.layers:
            x = attn(x) + x
            x = ff(x) + x
        return x


class ViT(ImageClassificationBase):
    def __init__(self, *, image_size, patch_size, num_classes, dim, depth, heads, mlp_dim, pool='cls', channels=3,
                 dim_head=64, dropout=0., emb_dropout=0.):
        super().__init__()
        image_height, image_width = pair(image_size)
        patch_height, patch_width = pair(patch_size)

        assert image_height % patch_height == 0 and image_width % patch_width == 0

        num_patches = (image_height // patch_height) * (image_width // patch_width)
        patch_dim = channels * patch_height * patch_width
        assert pool in {'cls', 'mean'}

        self.to_patch_embedding = nn.Sequential(
            Rearrange('b c (h p1) (w p2) -> b (h w) (p1 p2 c)', p1=patch_height, p2=patch_width),
            nn.Linear(patch_dim, dim)
        )

        self.pos_embedding = nn.Parameter(torch.randn(1, num_patches + 1, dim))
        self.cls_token = nn.Parameter(torch.randn(1, 1, dim))  
        self.dropout = nn.Dropout(emb_dropout)

        self.transformer = Transformer(dim, depth, heads, dim_head, mlp_dim, dropout)

        self.pool = pool
        self.to_latent = nn.Identity()

        self.mlp_head = nn.Sequential(
            nn.LayerNorm(dim),
            nn.Linear(dim, num_classes)
        )

    def forward(self, img):
        x = self.to_patch_embedding(img)  
        b, n, _ = x.shape  
        cls_tokens = repeat(self.cls_token, '() n d -> b n d',
                            b=b)  
        x = torch.cat((cls_tokens, x), dim=1)  
        x += self.pos_embedding[:, :(n + 1)]  
        x = self.dropout(x)

        x = self.transformer(x)  

        x = x.mean(dim=1) if self.pool == 'mean' else x[:, 0] 

        x = self.to_latent(x)  

        return self.mlp_head(x)  
    

class Block:
    def __init__(self):
        self.patches = []
    
    def ConvBlock(self, in_channels, out_channels, pool=False):
        layers = [
            nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True)
        ]
        if pool:
            layers.append(nn.MaxPool2d(4))
        return nn.Sequential(*layers)

    
class Net(ImageClassificationBase):
    def __init__(self, in_channels, num_diseases):
        super().__init__()
        self.obj = Block()
        
        self.conv1 = self.obj.ConvBlock(in_channels, 64)
        self.conv2 = self.obj.ConvBlock(64, 128, pool=True) 
        self.res1 = nn.Sequential(self.obj.ConvBlock(128, 128), self.obj.ConvBlock(128, 128))
        
        self.conv3 = self.obj.ConvBlock(128, 256, pool=True) 
        self.conv4 = self.obj.ConvBlock(256, 512, pool=True) 
        self.res2 = nn.Sequential(self.obj.ConvBlock(512, 512), self.obj.ConvBlock(512, 512))
        
        self.model = nn.Sequential(nn.MaxPool2d(4),
                                       nn.Flatten(),
                                       nn.Linear(512, num_diseases))
        
    def forward(self, xb): 
        out = self.conv1(xb)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        out = self.model(out)
        return out 

from gpu import get_d
# device = get_d()
# device
# model = to_d(ViT(
#         image_size = 256,
#         patch_size = 32,
#         num_classes = 38,
#         dim = 1024,
#         depth = 6,
#         heads = 16,
#         mlp_dim = 2048,
#         dropout = 0.1,
#         emb_dropout = 0.1
#     ),device) 

model = None

def build():
    # vit = ViT(ImageClassificationBase)
    model = Sequential()
    model.add(Conv2D(96, 11, strides = (4, 4), padding = 'valid', input_shape=(224, 224, 3), activation = 'relu'))
    model.add(MaxPooling2D(pool_size = (2, 2), strides = (2, 2), padding = 'valid'))
    model.add(BatchNormalization())

    model.add(Conv2D(256, 11, strides = (1, 1), padding='valid', activation = 'relu'))

    model.add(MaxPooling2D(pool_size = (2, 2), strides = (2, 2), padding='valid'))
    model.add(BatchNormalization())

    model.add(Conv2D(384, 3, strides = (1, 1), padding='valid', activation = 'relu'))
    model.add(BatchNormalization())

    model.add(Conv2D(384, 3, strides = (1, 1), padding='valid', activation = 'relu'))
    model.add(BatchNormalization())

    model.add(Conv2D(256, 3, strides=(1,1), padding='valid', activation = 'relu'))

    model.add(MaxPooling2D(pool_size = (2, 2), strides = (2, 2), padding = 'valid'))
    model.add(BatchNormalization())

    model.add(Flatten())

    model.add(Dense(units = 4096, activation = 'relu'))
    model.add(Dropout(0.4))
    model.add(BatchNormalization())
    model.add(Dense(units = 4096, activation = 'relu'))
    model.add(Dropout(0.4))
    model.add(BatchNormalization())
    model.add(Dense(units = 1000, activation = 'relu'))
    model.add(Dropout(0.2))
    model.add(BatchNormalization())
    model.add(Dense(units = 38, activation = 'softmax'))
    return model
# print(model.summary())

def get_m():
    return model

# print(model)

model = build()
model.load_weights("../models/model.hdf5")
print("INPUT SHAPE : ",model.input_shape)


def predict(image_path):
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    preds = model.predict(img_array)[0]
    idx = np.argmax(preds)

    label = lebel_to_idx(class_l)[idx]
    print(label)
    predicted_class = label
    confidence = preds[idx]

    plt.imshow(img)
    plt.axis("off")
    plt.title(f"{predicted_class} ({confidence*100:.2f}%)")
    plt.show()

    return predicted_class, confidence

if __name__=="__main__":

    predict("../data/New Plant Diseases Dataset(Augmented)/New Plant Diseases Dataset(Augmented)/train/Corn_(maize)___healthy/026bd735-b9f4-4eab-86f3-23df15dbec95___R.S_HL 7938 copy.jpg")