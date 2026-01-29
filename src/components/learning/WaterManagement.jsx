import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalculator, FaLeaf, FaCalendarAlt, FaSun, FaCloudRain, FaFlask, FaMountain, 
  FaSpider, FaTint, FaExclamationTriangle, FaExclamationCircle, FaInfoCircle
} from 'react-icons/fa';
import ContaminationReportModal from './ContaminationReportModal';

function WaterManagement() {
  const [waterQualityInputs, setWaterQualityInputs] = useState({
    clarity: '',
    ph: '',
    temperature: '',
    salinity: ''
  });
  const [qualityResults, setQualityResults] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const analyzeWaterQuality = () => {
    const clarity = parseFloat(waterQualityInputs.clarity);
    const ph = parseFloat(waterQualityInputs.ph);
    const temperature = parseFloat(waterQualityInputs.temperature);
    const salinity = parseFloat(waterQualityInputs.salinity);

    let score = 0;
    let recommendations = [];
    let parameterResults = [];

    // Analyze Clarity (NTU)
    if (clarity >= 0 && clarity <= 5) {
      score += 25;
      parameterResults.push({ parameter: 'Clarity', status: 'Good', value: `${clarity} NTU` });
    } else if (clarity > 5 && clarity <= 20) {
      score += 15;
      parameterResults.push({ parameter: 'Clarity', status: 'Moderate', value: `${clarity} NTU` });
    } else if (clarity > 20) {
      score += 5;
      parameterResults.push({ parameter: 'Clarity', status: 'Bad', value: `${clarity} NTU` });
    }

    // Analyze pH
    if (ph >= 6.5 && ph <= 7.5) {
      score += 25;
      parameterResults.push({ parameter: 'pH Level', status: 'Good', value: ph });
    } else if ((ph >= 5.5 && ph < 6.5) || (ph > 7.5 && ph <= 8.5)) {
      score += 15;
      parameterResults.push({ parameter: 'pH Level', status: 'Moderate', value: ph });
    } else {
      score += 5;
      parameterResults.push({ parameter: 'pH Level', status: 'Bad', value: ph });
    }

    // Analyze Temperature
    if (temperature >= 18 && temperature <= 22) {
      score += 25;
      parameterResults.push({ parameter: 'Temperature', status: 'Good', value: `${temperature}°C` });
    } else if (temperature > 22 && temperature <= 28) {
      score += 15;
      parameterResults.push({ parameter: 'Temperature', status: 'Moderate', value: `${temperature}°C` });
    } else {
      score += 5;
      parameterResults.push({ parameter: 'Temperature', status: 'Bad', value: `${temperature}°C` });
    }

    // Analyze Salinity (PSU)
    if (salinity >= 0 && salinity <= 3) {
      score += 25;
      parameterResults.push({ parameter: 'Salinity', status: 'Good', value: `${salinity} PSU` });
    } else if (salinity > 3 && salinity <= 10) {
      score += 15;
      parameterResults.push({ parameter: 'Salinity', status: 'Moderate', value: `${salinity} PSU` });
    } else {
      score += 5;
      parameterResults.push({ parameter: 'Salinity', status: 'Bad', value: `${salinity} PSU` });
    }

    // Determine overall quality level and recommendations
    let qualityLevel;
    if (score >= 80) {
      qualityLevel = 'Good';
      recommendations = [
        'Continue current water management practices',
        'Monitor water quality weekly',
        'Use water directly for irrigation',
        'Ideal for most crops',
        'Regular testing to maintain quality'
      ];
    } else if (score >= 50) {
      qualityLevel = 'Moderate';
      recommendations = [
        'Install basic filtration system',
        'Monitor water quality every 2-3 days',
        'Consider crop-specific treatments',
        'Use mulching to retain moisture',
        'Regular pH adjustment may be needed',
        'Consider drip irrigation system'
      ];
    } else {
      qualityLevel = 'Severe';
      recommendations = [
        'Immediate water treatment required',
        'Install advanced filtration system',
        'Daily water quality monitoring',
        'Consider alternative water source',
        'Consult agricultural expert',
        'Use drought-resistant crops',
        'Implement water treatment protocols'
      ];
    }

    setQualityResults({
      score,
      level: qualityLevel,
      recommendations,
      parameterResults
    });
  };

  return (
    <div className="bg-white rounded-xl p-2">
      {/* Quick Water Quality Test Section */}
      <div className="bg-[#232b3e] rounded-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FaFlask className="text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Quick Water Quality Test</h2>
        </div>

        {/* Important Notice */}
        <div className="bg-[#2a3446] p-4 rounded-lg mb-6">
          <div className="flex items-start gap-2">
            <FaExclamationCircle className="text-yellow-400 mt-1" />
            <div>
              <h3 className="text-white font-semibold mb-1">Important Notice</h3>
              <p className="text-gray-300 text-sm">
                Please check the quality of your water before planting. Regular water quality testing helps ensure optimal plant growth and prevents potential issues.
              </p>
            </div>
          </div>
        </div>

        {/* Test Parameters Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Water Clarity Test */}
          <div className="bg-[#2a3446] p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <FaTint className="text-blue-400" />
              <h3 className="text-white font-semibold">1. Water Clarity Test</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">Why it matters: Muddy water clogs irrigation pipes and harms crops.</p>
            <div className="space-y-2 text-sm text-gray-300 mb-4">
              <p>How to Test:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fill a clear glass jar with water</li>
                <li>Place a coin at the bottom</li>
                <li>Good: You can see the coin clearly</li>
                <li>Bad: Water is cloudy/muddy (coin is blurry or invisible)</li>
              </ul>
            </div>
            <input
              type="number"
              placeholder="Enter turbidity value (NTU)"
              className="w-full bg-[#1a2234] border border-gray-600 rounded px-3 py-2 text-white"
              value={waterQualityInputs.clarity}
              onChange={(e) => setWaterQualityInputs(prev => ({...prev, clarity: e.target.value}))}
            />
            <p className="text-gray-400 text-sm mt-2">Good: 0 - 5 NTU | Moderate: 5 - 20 NTU | Bad: Above 20 NTU</p>
          </div>

          {/* pH Level Test */}
          <div className="bg-[#2a3446] p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <FaFlask className="text-blue-400" />
              <h3 className="text-white font-semibold">2. pH Level Test</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">Why it matters: Extreme pH harms soil and plants.</p>
            <div className="space-y-2 text-sm text-gray-300 mb-4">
              <p>How to Test:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use pH test strips (cheap and easy)</li>
                <li>Dip strip in water for 2 seconds</li>
                <li>Good: Color turns green (pH 6.5–8.5)</li>
                <li>Bad: Red (too sour) or dark blue (too bitter)</li>
              </ul>
            </div>
            <input
              type="number"
              step="0.1"
              placeholder="Enter pH level (0-14)"
              className="w-full bg-[#1a2234] border border-gray-600 rounded px-3 py-2 text-white"
              value={waterQualityInputs.ph}
              onChange={(e) => setWaterQualityInputs(prev => ({...prev, ph: e.target.value}))}
            />
            <p className="text-gray-400 text-sm mt-2">Good: 6.5 - 7.5 | Moderate: 5.5 - 6.5 | Bad: Below 5.5 or Above 7.5</p>
          </div>
            
          {/* Temperature Test */}
          <div className="bg-[#2a3446] p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <FaSun className="text-blue-400" />
              <h3 className="text-white font-semibold">3. Temperature Test</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">Why it matters: Hot water stresses plants and livestock.</p>
            <div className="space-y-2 text-sm text-gray-300 mb-4">
              <p>How to Test:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use a cooking thermometer</li>
                <li>Dip in water for 30 seconds</li>
                <li>Good: 18-22°C (cool to warm)</li>
                <li>Bad: Above 28°C (too hot for crops)</li>
              </ul>
            </div>
            <input
              type="number"
              step="0.1"
              placeholder="Enter temperature (°C)"
              className="w-full bg-[#1a2234] border border-gray-600 rounded px-3 py-2 text-white"
              value={waterQualityInputs.temperature}
              onChange={(e) => setWaterQualityInputs(prev => ({...prev, temperature: e.target.value}))}
            />
            <p className="text-gray-400 text-sm mt-2">Good: 18°C - 22°C | Moderate: 22°C - 28°C | Bad: Above 28°C or Below 18°C</p>
          </div>

          {/* Salinity Test */}
          <div className="bg-[#2a3446] p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <FaCloudRain className="text-blue-400" />
              <h3 className="text-white font-semibold">4. Salinity Test</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">Why it matters: Salty water ruins soil and kills crops.</p>
            <div className="space-y-2 text-sm text-gray-300 mb-4">
              <p>How to Test:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use a TDS meter</li>
                <li>Dip it in water</li>
                <li>Good: Less than 3 PSU (low salt)</li>
                <li>Bad: Greater than 10 PSU (too salty)</li>
              </ul>
            </div>
            <input
              type="number"
              step="0.1"
              placeholder="Enter salinity (PSU)"
              className="w-full bg-[#1a2234] border border-gray-600 rounded px-3 py-2 text-white"
              value={waterQualityInputs.salinity}
              onChange={(e) => setWaterQualityInputs(prev => ({...prev, salinity: e.target.value}))}
            />
            <p className="text-gray-400 text-sm mt-2">Good: 0 - 3 PSU | Moderate: 3 - 10 PSU | Bad: Above 10 PSU</p>
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={analyzeWaterQuality}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <FaCalculator />
          Analyze Water Quality
        </button>
      </div>

      {/* Results Section */}
      {qualityResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#232b3e] p-6 rounded-lg"
        >
          <div className="flex items-center gap-4 mb-6">
            {qualityResults.level === 'Good' && <FaCheckCircle className="text-green-400 text-2xl" />}
            {qualityResults.level === 'Moderate' && <FaExclamationTriangle className="text-yellow-400 text-2xl" />}
            {qualityResults.level === 'Severe' && <FaExclamationTriangle className="text-red-400 text-2xl" />}
            <div>
              <h3 className="text-xl font-semibold text-white">Water Quality Analysis</h3>
              <p className={`text-lg ${
                qualityResults.level === 'Good' ? 'text-green-400' :
                qualityResults.level === 'Moderate' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                Quality Level: {qualityResults.level}
              </p>
            </div>
          </div>

          {/* Parameter Results */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-4">Parameter Analysis:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {qualityResults.parameterResults.map((result, index) => (
                <div 
                  key={index}
                  className="bg-[#2a3446] p-4 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <p className="text-gray-300">{result.parameter}</p>
                    <p className="text-sm text-gray-400">Value: {result.value}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    result.status === 'Good' ? 'bg-green-500/20 text-green-400' :
                    result.status === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {result.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Recommendations:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {qualityResults.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-[#2a3446] p-4 rounded-lg"
                  >
                    <span className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </span>
                    <p className="text-gray-300">{rec}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Emergency Reporting Section */}
      <div className="mt-6 bg-[#232b3e] p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <FaExclamationTriangle className="text-red-500" />
          <h2 className="text-lg font-semibold text-white">Emergency Water Quality Reporting</h2>
        </div>
        <p className="text-gray-300 mb-4">
          Notice contaminated water? Report immediately to alert authorities and nearby farmers.
        </p>
        <button
          onClick={() => setShowReportModal(true)}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <FaExclamationTriangle />
          Report Contamination
        </button>
      </div>

      <ContaminationReportModal 
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </div>
  );
}

export default WaterManagement;