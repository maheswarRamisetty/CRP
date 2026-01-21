import torch.nn as nn
from torchvision.models import resnet50
from vit import ImageClassificationBase

class VisionTransformer(ImageClassificationBase):
    def __init__(self,input_dim,output_dim):
        super(VisionTransformer, self).__init__()
        self.resnet = resnet50(pretrained=True)
        self.resnet.fc = nn.Identity()
        self.fc = nn.Linear(input_dim, output_dim)
        self.relu = nn.ReLU()

    def forward(self, x):
        out = x
        out = self.resnet(out)
        out = self.fc(out)
        out = self.relu(out)
        return out