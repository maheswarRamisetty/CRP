import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCloud, FaWater, FaCalculator, FaSeedling } from 'react-icons/fa';
import RainwaterCalculator from '../components/learning/RainwaterCalculator';
import WaterManagement from '../components/learning/WaterManagement';
import CropAdvisor from '../components/learning/CropAdvisor';
import WeatherReport from '../components/learning/WeatherReport';

function Learning() {
  const [selectedFeature, setSelectedFeature] = useState('weather');

  const navigationItems = [
    { id: 'water', icon: FaWater, label: 'Quick Water Quality Test' },
    { id: 'calculator', icon: FaCalculator, label: 'Water Calculator' },
    { id: 'crops', icon: FaSeedling, label: 'Crop Advisor' },
    { id: 'weather', icon: FaCloud, label: 'Weather Report' }
  ];

  // Water Drop Animation Component
  const WaterDrop = ({ delay, duration, size }) => (
    <motion.div
      className="absolute"
      initial={{ 
        y: -100,
        x: Math.random() * window.innerWidth,
        opacity: 0,
        scale: 0
      }}
      animate={{ 
        y: window.innerHeight + 100,
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg width={size} height={size * 1.2} viewBox="0 0 24 24" className="text-blue-400/40">
        <path
          fill="currentColor"
          d="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z"
        />
      </svg>
    </motion.div>
  );

  // Ripple Animation Component
  const WaterRipple = ({ delay, duration, size }) => (
    <motion.div
      className="absolute rounded-full border-4 border-blue-400/30"
      style={{
        width: size,
        height: size,
        left: Math.random() * window.innerWidth,
        top: Math.random() * window.innerHeight
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 2, 3],
        opacity: [0, 0.5, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
    />
  );

  // Wave Animation Component
  const WaterWave = ({ top, delay, color }) => (
    <motion.div
      className="absolute left-0 right-0"
      style={{ top: `${top}%` }}
      initial={{ x: -1000 }}
      animate={{ 
        x: [0, 100, 0],
        y: [0, 10, 0]
      }}
      transition={{
        duration: 10,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg
        className="w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          fill={color}
          opacity="0.1"
        />
      </svg>
    </motion.div>
  );

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      {/* Water Drops */}
      {[...Array(15)].map((_, i) => (
        <WaterDrop
          key={`drop-${i}`}
          delay={i * 2}
          duration={3 + Math.random() * 2}
          size={24 + Math.random() * 24}
        />
      ))}

      {/* Water Ripples */}
      {[...Array(8)].map((_, i) => (
        <WaterRipple
          key={`ripple-${i}`}
          delay={i * 3}
          duration={4}
          size={100 + Math.random() * 100}
        />
      ))}

      {/* Animated Waves */}
      <WaterWave top={20} delay={0} color="#60A5FA" />
      <WaterWave top={40} delay={0.5} color="#3B82F6" />
      <WaterWave top={60} delay={1} color="#2563EB" />

      {/* Content Container with Glassmorphism */}
      <div className="relative z-10 p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-sky-900 mb-2">
            Water Management for Agriculture
          </h1>
          <p className="text-sky-700">
            Managing water efficiently in agriculture ensures optimal crop growth, reduces waste, and promotes sustainability for future generations.
          </p>
        </motion.div>

        {/* Navigation Buttons with Enhanced Design */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(135, 206, 280, 0.8)',
                  boxShadow: '0 4px 15px rgba(56, 189, 248, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFeature(item.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 backdrop-blur-sm ${
                  selectedFeature === item.id
                    ? 'bg-blue-400 text-black/50 shadow-lg shadow-white-200'
                    : 'bg-white/70 text-sky-800 hover:text-sky-600'
                }`}
              >
                <Icon className="text-xl" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          {selectedFeature === 'water' && <WaterManagement />}
          {selectedFeature === 'calculator' && <RainwaterCalculator />}
          {selectedFeature === 'crops' && <CropAdvisor />}
          {selectedFeature === 'weather' && <WeatherReport />}
        </div>
      </div>
    </div>
  );
}

export default Learning;