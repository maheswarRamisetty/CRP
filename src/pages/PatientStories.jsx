import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaTractor, FaLeaf, FaSeedling, FaWater, FaCloud } from 'react-icons/fa';


function PatientStories() {
 
  // India Map SVG Component
  const IndiaMapSVG = () => (
    <motion.svg
      className="absolute inset-0 w-full h-full opacity-10"
      viewBox="0 0 500 500"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: [0.9, 1, 0.9],
        opacity: [0.1, 0.2, 0.1]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path
        d="M250,100 Q350,150 300,250 T250,400 T200,250 T250,100"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="0.5"
        className="glow-effect"
      >
        <animate
          attributeName="d"
          dur="20s"
          repeatCount="indefinite"
          values="
            M250,100 Q350,150 300,250 T250,400 T200,250 T250,100;
            M250,110 Q360,160 310,260 T250,410 T190,260 T250,110;
            M250,100 Q350,150 300,250 T250,400 T200,250 T250,100
          "
        />
      </path>
    </motion.svg>
  );

  // Farming Icons Animation
  const FloatingIcons = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0.5,
            opacity: 0
          }}
          animate={{
            y: [0, -50, 0],
            scale: [0.5, 0.7, 0.5],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        >
          {[FaTractor, FaLeaf, FaSeedling, FaWater][Math.floor(Math.random() * 4)]({
            className: "text-green-400 text-6xl glow-icon"
          })}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Background Elements */}
      <IndiaMapSVG />
      <FloatingIcons />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4 glow-text">
            Village Survey Analysis
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A comprehensive study of agricultural practices and water management in Venigandla Village, Pedakakani Mandal, Guntur District, Andhra Pradesh, INDIA.
          </p>
        </motion.div>

        {/* Glass-morphism Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-20"
        >
          <div className="backdrop-blur-md bg-white/10 rounded-xl shadow-2xl overflow-hidden border border-white/20">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-green-600/30 to-green-700/30 backdrop-blur-sm">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      Day / Week No
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      Activity Done
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      Learning Outcome
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table rows with hover effect and glass-morphism */}
                  <tr className="transition-all duration-300 hover:bg-white/5">
                    <td className="px-6 py-4 border-b border-white/10 text-green-400 font-medium">1</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-300">Visited Venigandla village, observed daily routines, and interacted with locals.</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-400">Understood their occupations and community lifestyle.</td>
                  </tr>
                  {/* Add similar styling for other rows */}
                  <tr className="transition-all duration-300 hover:bg-white/5">
                    <td className="px-6 py-4 border-b border-white/10 text-green-400 font-medium">2</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-300">Visited households to discuss health issues and medical access.</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-400">Learned that poor awareness affects health conditions.</td>
                  </tr>
                  <tr className="transition-all duration-300 hover:bg-white/5">
                    <td className="px-6 py-4 border-b border-white/10 text-green-400 font-medium">3</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-300">Spoke with farmers about crops, farming methods, and challenges.</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-400">Observed reliance on traditional techniques and resources.</td>
                  </tr>
                  <tr className="transition-all duration-300 hover:bg-white/5">
                    <td className="px-6 py-4 border-b border-white/10 text-green-400 font-medium">4</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-300">Attended a farmers' meeting on irrigation and water use.</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-400">Realized the importance of community discussions for solutions.</td>
                  </tr>
                  <tr className="transition-all duration-300 hover:bg-white/5">
                    <td className="px-6 py-4 border-b border-white/10 text-green-400 font-medium">5</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-300">Assessed access to clean water and sanitation in homes.</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-400">Identified a lack of proper sanitation and drinking water.</td>
                  </tr>
                  <tr className="transition-all duration-300 hover:bg-white/5">
                    <td className="px-6 py-4 border-b border-white/10 text-green-400 font-medium">6</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-300">Discussed water scarcity effects on farming and income.</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-400">Understood how unreliable water impacts productivity.</td>
                  </tr>
                  <tr className="transition-all duration-300 hover:bg-white/5">
                    <td className="px-6 py-4 border-b border-white/10 text-green-400 font-medium">7</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-300">Examined borewells and ponds for water storage efficiency.</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-400">Found poor storage leads to wastage and shortages.</td>
                  </tr>
                  <tr className="transition-all duration-300 hover:bg-white/5">
                    <td className="px-6 py-4 border-b border-white/10 text-green-400 font-medium">8</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-300">Conducted a discussion on modern irrigation and conservation.</td>
                    <td className="px-6 py-4 border-b border-white/10 text-gray-400">Recognized the need for awareness on water efficiency.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
</div>

      {/* CSS for glow effects */}
      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        .glow-icon {
          filter: drop-shadow(0 0 5px rgba(74, 222, 128, 0.4));
        }
        .glow-effect {
          filter: drop-shadow(0 0 8px rgba(74, 222, 128, 0.4));
        }
      `}</style>
    </div>
  );
}

export default PatientStories;