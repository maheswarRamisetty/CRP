import os
import requests
import zipfile
import tarfile
import yaml
from tqdm import tqdm
import kaggle

class DataDownloader:
    def __init__(self, config_path="config/data_sources.yaml"):
        with open(config_path, 'r') as f:
            self.config = yaml.safe_load(f)
        
        self.raw_path = self.config['paths']['raw_data']
        os.makedirs(self.raw_path, exist_ok=True)
    
    def download_file(self, url, destination):
        response = requests.get(url, stream=True)
        total_size = int(response.headers.get('content-length', 0))
        
        with open(destination, 'wb') as f, tqdm(
            desc=f"Downloading {os.path.basename(destination)}",
            total=total_size,
            unit='B',
            unit_scale=True,
            unit_divisor=1024,
        ) as bar:
            for data in response.iter_content(chunk_size=1024):
                size = f.write(data)
                bar.update(size)
    
    def extract_archive(self, archive_path, extract_to):
        if archive_path.endswith('.zip'):
            with zipfile.ZipFile(archive_path, 'r') as zip_ref:
                zip_ref.extractall(extract_to)
        elif archive_path.endswith(('.tar', '.tar.gz', '.tgz')):
            mode = 'r:gz' if archive_path.endswith('.gz') else 'r'
            with tarfile.open(archive_path, mode) as tar_ref:
                tar_ref.extractall(extract_to)
    
    def download_plant_village(self):
        print("Downloading PlantVillage dataset...")
        dataset_path = os.path.join(self.raw_path, "plant_village")
        
        url = self.config['datasets']['plant_village']['urls'][0]
        archive_path = os.path.join(dataset_path, "plant_village.tar.gz")
        
        os.makedirs(dataset_path, exist_ok=True)
        
        if not os.path.exists(archive_path):
            self.download_file(url, archive_path)
        
        if not os.path.exists(os.path.join(dataset_path, "color")):
            print("Extracting PlantVillage...")
            self.extract_archive(archive_path, dataset_path)
        
        print(f"PlantVillage dataset ready at: {dataset_path}")
        
        count_files = 0
        for root, dirs, files in os.walk(dataset_path):
            count_files += len(files)
        
        print(f"Total files: {count_files}")
    
    def download_cy_bench(self):
        print("\nDownloading CY-Bench dataset...")
        dataset_path = os.path.join(self.raw_path, "cy_bench")
        
        url = self.config['datasets']['cy_bench']['urls'][0]
        archive_path = os.path.join(dataset_path, "cy_bench.zip")
        
        os.makedirs(dataset_path, exist_ok=True)
        
        if not os.path.exists(archive_path):
            self.download_file(url, archive_path)
        
        if not os.path.exists(os.path.join(dataset_path, "CY-Bench-main")):
            print("Extracting CY-Bench...")
            self.extract_archive(archive_path, dataset_path)
        
        print(f"CY-Bench dataset ready at: {dataset_path}")
    
    def download_indian_data(self):
        print("\nDownloading Indian agriculture data...")
        dataset_path = os.path.join(self.raw_path, "india_agri")
        os.makedirs(dataset_path, exist_ok=True)
        
        urls = [
            "https://raw.githubusercontent.com/someshkar/india-agriculture-crop-data/master/crop_production.csv",
            "https://raw.githubusercontent.com/someshkar/india-agriculture-crop-data/master/weather_data.csv"
        ]
        
        for url in urls:
            filename = os.path.basename(url)
            filepath = os.path.join(dataset_path, filename)
            
            if not os.path.exists(filepath):
                print(f"Downloading {filename}...")
                self.download_file(url, filepath)
        
        print(f"Indian agriculture data ready at: {dataset_path}")
    
    def generate_sample_data(self):
        print("\nGenerating sample data for testing...")
        import pandas as pd
        import numpy as np
        
        sample_path = os.path.join(self.raw_path, "generated_samples")
        os.makedirs(sample_path, exist_ok=True)
        
        np.random.seed(42)
        
        weather_data = pd.DataFrame({
            'date': pd.date_range('2020-01-01', periods=365, freq='D'),
            'temperature': np.random.normal(25, 5, 365),
            'rainfall': np.random.exponential(5, 365),
            'humidity': np.random.uniform(40, 90, 365),
            'soil_moisture': np.random.uniform(0.2, 0.8, 365)
        })
        
        yield_data = pd.DataFrame({
            'date': pd.date_range('2020-01-01', periods=12, freq='M'),
            'crop_yield': np.random.uniform(2, 10, 12),
            'crop_type': np.random.choice(['wheat', 'maize', 'rice'], 12)
        })
        
        weather_data.to_csv(os.path.join(sample_path, "sample_weather.csv"), index=False)
        yield_data.to_csv(os.path.join(sample_path, "sample_yield.csv"), index=False)
        
        print(f"Sample data generated at: {sample_path}")
    
    def download_all(self):
        print("=" * 60)
        print("SMART FARMING DATA DOWNLOADER")
        print("=" * 60)
        
        self.download_plant_village()
        self.download_cy_bench()
        self.download_indian_data()
        self.generate_sample_data()
        
        print("\n" + "=" * 60)
        print("DOWNLOAD COMPLETE!")
        print("=" * 60)
        
        print("\nData structure created:")
        print("data/raw/plant_village/     - Disease images (38 classes)")
        print("data/raw/cy_bench/          - Crop yield benchmark data")
        print("data/raw/india_agri/        - Indian agriculture data")
        print("data/raw/generated_samples/ - Sample data for testing")

if __name__ == "__main__":
    downloader = DataDownloader()
    downloader.download_all()