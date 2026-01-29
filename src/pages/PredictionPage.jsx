import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaChartLine, FaCheckCircle, FaExclamationTriangle, FaLeaf, FaSeedling } from 'react-icons/fa';

function PredictionPage() {
  const [selectedModel, setSelectedModel] = useState('crop');
  const [predictionResult, setPredictionResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const models = [
    { id: 'crop', name: 'Crop Disease Detection', icon: FaLeaf },
    { id: 'soil', name: 'Soil Quality Analysis', icon: FaSeedling },
    { id: 'yield', name: 'Yield Prediction', icon: FaChartLine }
  ];

  const simulatePrediction = () => {
    setIsAnalyzing(true);
    setPredictionResult(null);

    setTimeout(() => {
      const results = {
        crop: {
          disease: 'Leaf Blight',
          confidence: 92,
          severity: 'Moderate',
          recommendations: [
            'Apply fungicide spray immediately',
            'Remove affected leaves',
            'Improve air circulation',
            'Monitor closely for 2 weeks'
          ],
          status: 'warning'
        },
        soil: {
          quality: 'Good',
          confidence: 87,
          pH: 6.8,
          nutrients: {
            nitrogen: 'Adequate',
            phosphorus: 'High',
            potassium: 'Moderate'
          },
          recommendations: [
            'Maintain current fertilization',
            'Consider adding organic matter',
            'Monitor moisture levels'
          ],
          status: 'success'
        },
        yield: {
          prediction: '2.5 tons per acre',
          confidence: 85,
          factors: {
            weather: 'Favorable',
            soil: 'Good',
            irrigation: 'Adequate'
          },
          recommendations: [
            'Expected harvest in 45-50 days',
            'Continue regular maintenance',
            'Prepare storage facilities'
          ],
          status: 'success'
        }
      };

      setPredictionResult(results[selectedModel]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0.5,
              opacity: 0.2
            }}
            animate={{
              y: [-20, 0, -20],
              scale: [0.5, 0.8, 0.5],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaBrain className="text-blue-500 text-6xl" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-blue-800 mb-4 flex items-center justify-center gap-3">
            <FaBrain className="text-blue-600" />
            AI Prediction Analysis
          </h1>
          <p className="text-lg text-blue-600 max-w-3xl mx-auto">
            Advanced machine learning models to analyze your agricultural data and provide intelligent predictions
          </p>
        </motion.div>

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {models.map((model) => {
            const Icon = model.icon;
            return (
              <motion.button
                key={model.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedModel(model.id);
                  setPredictionResult(null);
                }}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all ${
                  selectedModel === model.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-blue-700 hover:bg-blue-50'
                }`}
              >
                <Icon className="text-xl" />
                <span className="font-medium">{model.name}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Analysis Input</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected Model
                </label>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-semibold">
                    {models.find(m => m.id === selectedModel)?.name}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Source
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Uploaded Image</option>
                  <option>Sensor Data</option>
                  <option>Historical Records</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Analysis Parameters
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Confidence Threshold</span>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      defaultValue="80"
                      className="w-32"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Detail Level</span>
                    <select className="px-3 py-1 border rounded">
                      <option>Basic</option>
                      <option>Detailed</option>
                      <option>Expert</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={simulatePrediction}
                disabled={isAnalyzing}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FaBrain />
                    Run Analysis
                  </>
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Prediction Results</h2>

            {!predictionResult && !isAnalyzing && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <FaChartLine className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Run analysis to see results</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
                />
                <p className="text-gray-600">Processing your data...</p>
              </div>
            )}

            {predictionResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  {predictionResult.status === 'success' ? (
                    <FaCheckCircle className="text-3xl text-green-500" />
                  ) : (
                    <FaExclamationTriangle className="text-3xl text-yellow-500" />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {predictionResult.disease || predictionResult.quality || predictionResult.prediction}
                    </h3>
                    <p className="text-gray-600">
                      Confidence: {predictionResult.confidence}%
                    </p>
                  </div>
                </div>

                {predictionResult.severity && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-800">
                      <strong>Severity:</strong> {predictionResult.severity}
                    </p>
                  </div>
                )}

                {predictionResult.pH && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800">
                      <strong>pH Level:</strong> {predictionResult.pH}
                    </p>
                  </div>
                )}

                {predictionResult.nutrients && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Nutrient Levels:</h4>
                    <div className="space-y-1">
                      {Object.entries(predictionResult.nutrients).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-blue-700 capitalize">{key}:</span>
                          <span className="text-blue-900 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {predictionResult.factors && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Contributing Factors:</h4>
                    <div className="space-y-1">
                      {Object.entries(predictionResult.factors).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-blue-700 capitalize">{key}:</span>
                          <span className="text-blue-900 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Recommendations:</h4>
                  <ul className="space-y-2">
                    {predictionResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Analysis completed on {new Date().toLocaleString()}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Upload Data</h3>
              <p className="text-gray-600 text-sm">
                Provide images or sensor data for analysis
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">AI Processing</h3>
              <p className="text-gray-600 text-sm">
                Machine learning models analyze your data
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Get Results</h3>
              <p className="text-gray-600 text-sm">
                Receive detailed predictions and insights
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Take Action</h3>
              <p className="text-gray-600 text-sm">
                Follow recommendations to optimize outcomes
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PredictionPage;
