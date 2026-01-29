import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSeedling, FaMapMarkerAlt, FaTint, FaCalendarAlt, FaUsers, FaRupeeSign, FaChartLine, FaRulerCombined } from 'react-icons/fa';

function CropAdvisor() {
  const [formData, setFormData] = useState({
    soilType: '',
    location: '',
    waterAvailability: '',
    startDate: '',
    neighborsCrops: '',
    investment: '',
    landSize: ''
  });

  const [advice, setAdvice] = useState(null);
  const [error, setError] = useState('');

  const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Black Soil'];
  const waterLevels = ['Dry', 'Moderate', 'Plenty'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const getCropRecommendations = () => {
    const { soilType, waterAvailability, startDate } = formData;
    const month = startDate ? new Date(startDate).getMonth() : -1;

    // Define crop options based on conditions
    const cropOptions = {
      Clay: {
        Dry: {
          summer: ['Pearl Millet (Bajra)', 'Sorghum (Jowar)', 'Cotton'],
          winter: ['Wheat', 'Chickpea', 'Mustard'],
          monsoon: ['Rice', 'Maize', 'Soybean']
        },
        Moderate: {
          summer: ['Cotton', 'Groundnut', 'Sesame'],
          winter: ['Wheat', 'Barley', 'Peas'],
          monsoon: ['Rice', 'Maize', 'Black Gram']
        },
        Plenty: {
          summer: ['Rice', 'Sugarcane', 'Jute'],
          winter: ['Wheat', 'Potato', 'Mustard'],
          monsoon: ['Rice', 'Jute', 'Maize']
        }
      },
      Sandy: {
        Dry: {
          summer: ['Pearl Millet', 'Cluster Beans', 'Sesame'],
          winter: ['Chickpea', 'Cumin', 'Mustard'],
          monsoon: ['Green Gram', 'Sesame', 'Groundnut']
        },
        Moderate: {
          summer: ['Groundnut', 'Watermelon', 'Muskmelon'],
          winter: ['Carrot', 'Potato', 'Onion'],
          monsoon: ['Groundnut', 'Castor', 'Cotton']
        },
        Plenty: {
          summer: ['Watermelon', 'Cucumber', 'Vegetables'],
          winter: ['Potato', 'Onion', 'Garlic'],
          monsoon: ['Groundnut', 'Maize', 'Vegetables']
        }
      },
      Loamy: {
        Dry: {
          summer: ['Pearl Millet', 'Sorghum', 'Cotton'],
          winter: ['Wheat', 'Gram', 'Mustard'],
          monsoon: ['Soybean', 'Maize', 'Pulses']
        },
        Moderate: {
          summer: ['Cotton', 'Sunflower', 'Vegetables'],
          winter: ['Wheat', 'Vegetables', 'Pulses'],
          monsoon: ['Soybean', 'Cotton', 'Vegetables']
        },
        Plenty: {
          summer: ['Rice', 'Vegetables', 'Fruits'],
          winter: ['Wheat', 'Vegetables', 'Oilseeds'],
          monsoon: ['Rice', 'Cotton', 'Vegetables']
        }
      },
      'Black Soil': {
        Dry: {
          summer: ['Cotton', 'Sorghum', 'Pulses'],
          winter: ['Chickpea', 'Safflower', 'Linseed'],
          monsoon: ['Cotton', 'Soybean', 'Pigeon Pea']
        },
        Moderate: {
          summer: ['Cotton', 'Groundnut', 'Vegetables'],
          winter: ['Wheat', 'Chickpea', 'Vegetables'],
          monsoon: ['Cotton', 'Soybean', 'Pigeon Pea']
        },
        Plenty: {
          summer: ['Sugarcane', 'Cotton', 'Vegetables'],
          winter: ['Wheat', 'Chickpea', 'Vegetables'],
          monsoon: ['Cotton', 'Soybean', 'Rice']
        }
      }
    };

    // Determine season based on month
    let season;
    if (month >= 2 && month <= 5) season = 'summer';
    else if (month >= 6 && month <= 9) season = 'monsoon';
    else season = 'winter';

    return cropOptions[soilType]?.[waterAvailability]?.[season] || [];
  };

  const generateAdvice = () => {
    // Validate all required fields
    if (!formData.soilType || !formData.waterAvailability || !formData.startDate || !formData.landSize || !formData.investment) {
      setError('Please fill in all required fields');
      return;
    }

    const recommendations = getCropRecommendations();
    if (recommendations.length === 0) {
      setError('No suitable crops found for the given conditions');
      return;
    }

    // Calculate per acre metrics
    const landSize = parseFloat(formData.landSize);
    const investment = parseFloat(formData.investment);
    const perAcreInvestment = investment / landSize;

    // Generate advice for primary recommended crop
    const primaryCrop = recommendations[0];
    const advice = {
      primaryCrop,
      alternativeCrops: recommendations.slice(1),
      landSize: formData.landSize,
      reasons: [
        { emoji: "🌱", text: `Perfect for ${formData.soilType.toLowerCase()} soil type` },
        { emoji: "💧", text: `Suitable for ${formData.waterAvailability.toLowerCase()} water conditions` },
        { emoji: "📏", text: `Optimal for ${formData.landSize} acres of land` },
        { emoji: "💰", text: `Fits your budget of ₹${investment.toLocaleString()} (₹${perAcreInvestment.toFixed(2)}/acre)` }
      ],
      budget: {
        seeds: Math.round(investment * 0.2),
        fertilizers: Math.round(investment * 0.25),
        irrigation: Math.round(investment * 0.3),
        labor: Math.round(investment * 0.15),
        contingency: Math.round(investment * 0.1)
      },
      timeline: [
        {
          emoji: "🚜",
          phase: "Land Preparation",
          tasks: [
            `Plow ${landSize} acres thoroughly`,
            "Level the field properly",
            "Add organic matter",
            "Test soil pH and nutrients"
          ]
        },
        {
          emoji: "🌱",
          phase: "Planting",
          tasks: [
            `Calculate seeds for ${landSize} acres`,
            "Treat seeds before sowing",
            "Maintain proper spacing",
            "Ensure adequate moisture"
          ]
        },
        {
          emoji: "🌿",
          phase: "Crop Management",
          tasks: [
            "Regular weeding schedule",
            "Monitor for pests/diseases",
            "Apply fertilizers timely",
            "Maintain proper irrigation"
          ]
        },
        {
          emoji: "🌾",
          phase: "Harvest & Post-Harvest",
          tasks: [
            "Monitor crop maturity",
            "Plan harvest logistics",
            "Proper storage arrangements",
            "Market coordination"
          ]
        }
      ],
      tips: [
        { emoji: "📊", text: `Expected yield: ${(landSize * 15).toFixed(1)} quintals (approx.)` },
        { emoji: "💰", text: `Estimated revenue: ₹${(landSize * 15 * 2000).toLocaleString()} (at current rates)` },
        { emoji: "🌧️", text: "Monitor weather forecasts regularly" },
        { emoji: "📱", text: "Use Kisan app for updates and support" },
        { emoji: "🤝", text: "Connect with local farmer groups" }
      ],
      marketingTips: [
        { emoji: "📈", text: "Track market prices daily" },
        { emoji: "🚛", text: "Plan transportation in advance" },
        { emoji: "💹", text: "Consider future contracts" },
        { emoji: "🏪", text: "Explore direct-to-consumer options" }
      ]
    };

    setAdvice(advice);
  };

  return (
    <div className="bg-[#232b3e] backdrop-blur-md rounded-xl p-8 shadow-xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-4">
          <FaSeedling className="text-green-400" />
          Crop Compass
        </h2>
        <p className="text-gray-300 mb-4">
          Let's create your personalized farming blueprint! Fill in the details below 👇
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/20 text-white p-4 rounded-lg mb-6"
        >
          {error}
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FaSeedling className="inline mr-2" />
              Soil Type
            </label>
            <select
              name="soilType"
              value={formData.soilType}
              onChange={handleInputChange}
              className="w-full bg-black/30 border border-white/30 rounded-lg px-4 py-2 text-sm font-medium text-white"
              required
            >
              <option value="">Select Soil Type</option>
              {soilTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FaRulerCombined className="inline mr-2" />
              Land Size (in acres)
            </label>
            <input
              type="number"
              name="landSize"
              value={formData.landSize}
              onChange={handleInputChange}
              placeholder="Enter land size in acres"
              className="w-full bg-black/30 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50"
              required
              min="0.1"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FaMapMarkerAlt className="inline mr-2" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Village, District, State"
              className="w-full bg-black/30 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FaTint className="inline mr-2" />
              Water Availability
            </label>
            <select
              name="waterAvailability"
              value={formData.waterAvailability}
              onChange={handleInputChange}
              className="w-full bg-black/30 border border-white/30 rounded-lg px-4 py-2 text-white"
              required
            >
              <option value="">Select Water Level</option>
              {waterLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FaCalendarAlt className="inline mr-2" />
              Start Date
            </label>
            <input
              type="month"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full bg-black/30 border border-white/30 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FaUsers className="inline mr-2" />
              Neighbors' Crops
            </label>
            <input
              type="text"
              name="neighborsCrops"
              value={formData.neighborsCrops}
              onChange={handleInputChange}
              placeholder="e.g., Wheat, Mustard, Lentils"
              className="w-full bg-black/30 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              <FaRupeeSign className="inline mr-2" />
              Investment Amount (₹)
            </label>
            <input
              type="number"
              name="investment"
              value={formData.investment}
              onChange={handleInputChange}
              placeholder="Enter amount in rupees"
              className="w-full bg-black/30 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50"
              required
            />
          </div>

          <button
            onClick={generateAdvice}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          >
            <FaChartLine />
            Generate Farming Advice
          </button>
        </div>

        {/* Results Section */}
        {advice && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 p-6 rounded-lg border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              🎯 Primary Recommendation: {advice.primaryCrop}
            </h3>

            {advice.alternativeCrops.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">🔄 Alternative Options:</h4>
                <div className="flex flex-wrap gap-2">
                  {advice.alternativeCrops.map((crop, index) => (
                    <span key={index} className="bg-black/30 px-3 py-1 rounded-full text-gray-300">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Why This Crop? 🤔</h4>
                <div className="space-y-2">
                  {advice.reasons.map((reason, index) => (
                    <div key={index} className="flex items-start gap-2 text-gray-300">
                      <span>{reason.emoji}</span>
                      <span>{reason.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">💰 Budget Breakdown</h4>
                <div className="space-y-2">
                  {Object.entries(advice.budget).map(([item, amount], index) => (
                    <div key={index} className="flex justify-between text-gray-300">
                      <span className="capitalize">{item}</span>
                      <span>₹{amount.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-white">
                    <span>Total</span>
                    <span>₹{Object.values(advice.budget).reduce((a, b) => a + b, 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">📅 Timeline</h4>
                <div className="space-y-4">
                  {advice.timeline.map((phase, index) => (
                    <div key={index} className="bg-white/5 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2 text-white">
                        <span>{phase.emoji}</span>
                        <span className="font-medium">{phase.phase}</span>
                      </div>
                      <ul className="list-disc list-inside text-gray-300 text-sm">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">💡 Pro Tips</h4>
                <div className="space-y-2">
                  {advice.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 text-gray-300">
                      <span>{tip.emoji}</span>
                      <span>{tip.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">🏪 Marketing Strategy</h4>
                <div className="space-y-2">
                  {advice.marketingTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 text-gray-300">
                      <span>{tip.emoji}</span>
                      <span>{tip.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default CropAdvisor;