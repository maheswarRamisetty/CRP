import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalculator, FaLeaf, FaCalendarAlt, FaSun, FaCloudRain, FaFlask, FaMountain } from 'react-icons/fa';

function RainwaterCalculator() {
  const [formData, setFormData] = useState({
    crop: '',
    growthStage: '',
    season: '',
    month: '',
    fertilizers: [],
    soilType: '',
    recentRainfall: ''
  });

  const [recommendations, setRecommendations] = useState(null);

  const crops = ['Paddy', 'Mirchi (Chili)', 'Tomato', 'Cotton', 'Sugarcane', 'Maize'];
  const growthStages = [
    { value: 'seedling', label: 'Seedling (0-1 month)', factor: 0.5 },
    { value: 'vegetative', label: 'Vegetative (1-2 months)', factor: 1.0 },
    { value: 'flowering', label: 'Flowering (2-3 months)', factor: 1.2 },
    { value: 'maturity', label: 'Maturity (3+ months)', factor: 0.8 }
  ];
  const seasons = ['Summer', 'Winter', 'Rainy/Monsoon'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const fertilizers = ['Urea', 'DAP', 'NPK', 'Organic Manure'];
  const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Black Soil'];
  const rainfallOptions = [
    { value: 'none', label: 'None (No rain in past week)', factor: 1.0 },
    { value: 'light', label: 'Light Rain (1-10mm in last 1-3 days)', factor: 0.8 },
    { value: 'moderate', label: 'Moderate Rain (10-25mm in last 1-2 days)', factor: 0.5 },
    { value: 'heavy', label: 'Heavy Rain (>25mm today/yesterday)', factor: 0.3 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFertilizerChange = (fertilizer) => {
    setFormData(prev => ({
      ...prev,
      fertilizers: prev.fertilizers.includes(fertilizer)
        ? prev.fertilizers.filter(f => f !== fertilizer)
        : [...prev.fertilizers, fertilizer]
    }));
  };

  const calculateWaterRequirements = () => {
    // Base water requirements per crop (liters/plant/week)
    const baseWater = {
      'Paddy': 500,
      'Mirchi (Chili)': 30,
      'Tomato': 50,
      'Cotton': 40,
      'Sugarcane': 80,
      'Maize': 45
    };

    // Soil factors
    const soilFactors = {
      'Clay': 0.8,
      'Sandy': 1.2,
      'Loamy': 1.0,
      'Black Soil': 0.9
    };

    // Season factors
    const seasonFactors = {
      'Summer': 1.3,
      'Winter': 0.8,
      'Rainy/Monsoon': 0.6
    };

    const growthStageFactor = growthStages.find(stage => stage.value === formData.growthStage)?.factor || 1.0;
    const rainfallFactor = rainfallOptions.find(option => option.value === formData.recentRainfall)?.factor || 1.0;
    const soilFactor = soilFactors[formData.soilType] || 1.0;
    const seasonFactor = seasonFactors[formData.season] || 1.0;

    const baseWaterRequirement = baseWater[formData.crop] || 50;
    const adjustedWater = baseWaterRequirement * growthStageFactor * soilFactor * seasonFactor * rainfallFactor;

    return {
      waterQuantity: Math.round(adjustedWater),
      schedule: generateSchedule(formData.soilType, formData.season, formData.recentRainfall),
      rainTips: generateRainTips(formData.recentRainfall),
      fertilizerAdvice: generateFertilizerAdvice(formData.fertilizers, formData.recentRainfall),
      seasonalTips: generateSeasonalTips(formData.season, formData.soilType)
    };
  };

  const generateSchedule = (soilType, season, rainfall) => {
    let schedule = '';
    
    if (season === 'Summer') {
      schedule = 'Water early morning (5-7 AM) to reduce evaporation. ';
    }
    
    if (rainfall === 'heavy') {
      schedule += 'Skip watering for 2 days after heavy rain. ';
    }

    switch (soilType) {
      case 'Sandy':
        schedule += 'Water every 2 days due to quick drainage.';
        break;
      case 'Clay':
        schedule += 'Water every 5-7 days as soil retains moisture well.';
        break;
      default:
        schedule += 'Water every 3-4 days based on soil moisture.';
    }

    return schedule;
  };

  const generateRainTips = (rainfall) => {
    switch (rainfall) {
      case 'light':
        return 'Reduce watering by 20% today. Monitor soil moisture.';
      case 'moderate':
        return 'Reduce watering by 40% and check soil moisture before next watering.';
      case 'heavy':
        return 'Delay watering for 1-2 days. Check soil moisture with your finger!';
      default:
        return 'Maintain regular watering schedule.';
    }
  };

  const generateFertilizerAdvice = (selectedFertilizers, rainfall) => {
    let advice = [];
    
    if (selectedFertilizers.includes('Urea')) {
      advice.push('Apply urea after watering to avoid root burn.');
    }
    
    if (selectedFertilizers.includes('Organic Manure')) {
      advice.push('Mix organic manure with soil before rain for better absorption.');
    }
    
    if (rainfall === 'heavy') {
      advice.push('Wait 2-3 days after heavy rain before applying any fertilizers.');
    }

    return advice;
  };

  const generateSeasonalTips = (season, soilType) => {
    if (season === 'Summer' && soilType === 'Sandy') {
      return 'Add mulch to retain moisture and protect roots from heat.';
    }
    if (season === 'Winter' && soilType === 'Clay') {
      return 'Avoid evening watering to prevent frost damage.';
    }
    return 'Maintain regular monitoring of soil moisture.';
  };

  const handleCalculate = () => {
    const results = calculateWaterRequirements();
    setRecommendations(results);
  };

  return (
    <div className="bg-[#232b3e] backdrop-blur-md rounded-xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <FaCalculator className="text-blue-400" />
        Water Calculator
      </h2>
       <p className="text-gray-300 pb-6">
         Let’s create your irrigation plan! Enter details to calculate crop water needs 👇
        </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FaLeaf className="inline mr-2" />
              Crop Type
            </label>
            <select
              name="crop"
              value={formData.crop}
              onChange={handleInputChange}
              className="w-full bg-black/30 border border-white/30 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Select Crop</option>
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FaCalendarAlt className="inline mr-2" />
              Growth Stage
            </label>
            <select
              name="growthStage"
              value={formData.growthStage}
              onChange={handleInputChange}
              className="w-full bg-black/30 border border-white/30 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Select Growth Stage</option>
              {growthStages.map(stage => (
                <option key={stage.value} value={stage.value}>{stage.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FaSun className="inline mr-2" />
              Season
            </label>
            <select
              name="season"
              value={formData.season}
              onChange={handleInputChange}
              className="w-full bg-black/30 border border-white/30 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Select Season</option>
              {seasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FaCalendarAlt className="inline mr-2" />
              Month
            </label>
            <select
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              className="w-full bg-black/30 border border-white/30 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Select Month</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FaFlask className="inline mr-2" />
              Fertilizers Used
            </label>
            <div className="grid grid-cols-2 gap-2">
              {fertilizers.map(fertilizer => (
                <label key={fertilizer} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.fertilizers.includes(fertilizer)}
                    onChange={() => handleFertilizerChange(fertilizer)}
                    className="form-checkbox text-blue-500"
                  />
                  <span className="text-white">{fertilizer}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FaMountain className="inline mr-2" />
              Soil Type
            </label>
            <select
              name="soilType"
              value={formData.soilType}
              onChange={handleInputChange}
              className="w-full bg-black/30 border border-white/30 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Select Soil Type</option>
              {soilTypes.map(soil => (
                <option key={soil} value={soil}>{soil}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FaCloudRain className="inline mr-2" />
              Recent Rainfall
            </label>
            <select
              name="recentRainfall"
              value={formData.recentRainfall}
              onChange={handleInputChange}
              className="w-full bg-black/30 border border-white/30 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Select Recent Rainfall</option>
              {rainfallOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <FaCalculator />
            Calculate Recommendations
          </button>
        </div>

        {/* Results Section */}
        {recommendations && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 p-6 rounded-lg border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Recommendations</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-blue-400 font-medium mb-2">Water Quantity</h4>
                <p className="text-white">
                  {recommendations.waterQuantity} liters per plant per week
                </p>
              </div>

              <div>
                <h4 className="text-blue-400 font-medium mb-2">Watering Schedule</h4>
                <p className="text-white">{recommendations.schedule}</p>
              </div>

              <div>
                <h4 className="text-blue-400 font-medium mb-2">Rain-Specific Tips</h4>
                <p className="text-white">{recommendations.rainTips}</p>
              </div>

              <div>
                <h4 className="text-blue-400 font-medium mb-2">Fertilizer Advice</h4>
                <ul className="list-disc list-inside text-white">
                  {recommendations.fertilizerAdvice.map((advice, index) => (
                    <li key={index}>{advice}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-blue-400 font-medium mb-2">Seasonal Tips</h4>
                <p className="text-white">{recommendations.seasonalTips}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default RainwaterCalculator;