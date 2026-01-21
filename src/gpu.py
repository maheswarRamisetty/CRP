import torch

def to_d(data, device):
    if isinstance(data, (list, tuple)):
        return [to_d(x, device) for x in data]
    return data.to(device)

def get_d():
    return torch.device("cuda" if torch.cuda.is_available() else "cpu")
