import pandas as pd
import numpy as np
import torch
from typing import Dict, List, Tuple
import os

class CYBenchPreprocessor:
    def __init__(self, data_dir: str):
        self.data_dir = data_dir
        self.files = {
            'weather': 'weather_data.csv',
            'rainfall': 'rainfall_data.csv', 
            'soil': 'soil_data.csv',
            'yield': 'yield_data.csv',
            'metadata': 'metadata.csv'
        }
        
    def load_and_merge_data(self) -> pd.DataFrame:
        print("Ok") #debug
        weather_df = pd.read_csv(os.path.join(self.data_dir, self.files['weather']))
        rainfall_df = pd.read_csv(os.path.join(self.data_dir, self.files['rainfall']))
        soil_df = pd.read_csv(os.path.join(self.data_dir, self.files['soil']))
        yield_df = pd.read_csv(os.path.join(self.data_dir, self.files['yield']))
        metadata_df = pd.read_csv(os.path.join(self.data_dir, self.files['metadata']))
        
        weather_df = self._standardize_weather_data(weather_df)
        rainfall_df = self._standardize_rainfall_data(rainfall_df)
        soil_df = self._standardize_soil_data(soil_df)
        
        print("Merging datasets...")
        
        temporal_data = pd.merge(
            weather_df, 
            rainfall_df, 
            on=['location_id', 'date', 'year', 'doy'],
            how='outer'
        )
        
        temporal_data = pd.merge(
            temporal_data,
            soil_df,
            on=['location_id', 'year'],
            how='left'
        )
        
        temporal_data = pd.merge(
            temporal_data,
            metadata_df,
            on=['location_id', 'year'],
            how='left'
        )
        
        merged_data = pd.merge(
            temporal_data,
            yield_df,
            on=['location_id', 'year', 'crop_type'],
            how='inner'
        )
        
        print(f"Final dataset shape: {merged_data.shape}")
        print(f"Columns: {merged_data.columns.tolist()}")
        
        return merged_data
    
    def _standardize_weather_data(self, df: pd.DataFrame) -> pd.DataFrame:
    
        column_mapping = {
            'LocationID': 'location_id',
            'Date': 'date',
            'Year': 'year',
            'DOY': 'doy',
            'T2M': 'temperature',
            'T2M_MAX': 'temp_max',
            'T2M_MIN': 'temp_min',
            'RH2M': 'humidity',
            'WS2M': 'wind_speed',
            'SRAD': 'solar_radiation',
            'ET0': 'evapotranspiration'
        }
        
        df = df.rename(columns=column_mapping)
        return df
    
    def _standardize_rainfall_data(self, df: pd.DataFrame) -> pd.DataFrame:
        column_mapping = {
            'LocationID': 'location_id',
            'Date': 'date',
            'Year': 'year',
            'DOY': 'doy',
            'PRECTOT': 'rainfall'
        }
        
        df = df.rename(columns=column_mapping)
        return df
    
    def _standardize_soil_data(self, df: pd.DataFrame) -> pd.DataFrame:
        column_mapping = {
            'LocationID': 'location_id',
            'Year': 'year',
            'SoilMoisture': 'soil_moisture',
            'SoilpH': 'soil_ph',
            'SoilN': 'soil_nitrogen',
            'SoilP': 'soil_phosphorus',
            'SoilK': 'soil_potassium',
            'SoilType': 'soil_type'
        }
        
        df = df.rename(columns=column_mapping)
        return df
    
    def create_sequences(self, 
                        df: pd.DataFrame, 
                        sequence_length: int = 365,
                        feature_columns: List[str] = None) -> Dict[str, np.ndarray]:
        
        if feature_columns is None:
            feature_columns = [
                'temperature', 'temp_max', 'temp_min', 'humidity',
                'wind_speed', 'solar_radiation', 'evapotranspiration',
                'rainfall', 'soil_moisture', 'soil_ph',
                'soil_nitrogen', 'soil_phosphorus', 'soil_potassium'
            ]
        
        sequences = []
        labels = []
        locations = []
        years = []
        crop_types = []
        
        grouped = df.groupby(['location_id', 'year', 'crop_type'])
        
        for (loc, year, crop), group in grouped:
            group = group.sort_values('doy')
            
            if len(group) >= sequence_length:
                seq_data = group[feature_columns].values[-sequence_length:]
                
                
                label = group['Yield'].iloc[-1]
                
                sequences.append(seq_data)
                labels.append(label)
                locations.append(loc)
                years.append(year)
                crop_types.append(crop)
        
        return {
            'sequences': np.array(sequences, dtype=np.float32),
            'labels': np.array(labels, dtype=np.float32),
            'locations': np.array(locations),
            'years': np.array(years),
            'crop_types': np.array(crop_types)
        }
    
    def prepare_train_val_test_split(self, 
                                    sequences: np.ndarray,
                                    labels: np.ndarray,
                                    locations: np.ndarray,
                                    test_size: float = 0.2,
                                    val_size: float = 0.1) -> Dict[str, np.ndarray]:
       
        
        unique_locations = np.unique(locations)
        np.random.shuffle(unique_locations)
        
        n_test = int(len(unique_locations) * test_size)
        n_val = int(len(unique_locations) * val_size)
        
        test_locations = unique_locations[:n_test]
        val_locations = unique_locations[n_test:n_test + n_val]
        train_locations = unique_locations[n_test + n_val:]
        train_mask = np.isin(locations, train_locations)
        val_mask = np.isin(locations, val_locations)
        test_mask = np.isin(locations, test_locations)
        
        return {
            'train': {
                'sequences': sequences[train_mask],
                'labels': labels[train_mask],
                'locations': locations[train_mask]
            },
            'val': {
                'sequences': sequences[val_mask],
                'labels': labels[val_mask],
                'locations': locations[val_mask]
            },
            'test': {
                'sequences': sequences[test_mask],
                'labels': labels[test_mask],
                'locations': locations[test_mask]
            }
        }
    

if __name__=="__main__":
    CYP = CYBenchPreprocessor("../data/raw/for-tcn")
    CYP.load_and_merge_data()
    # CYP.prepare_train_val_test_split(locations,sequences)
