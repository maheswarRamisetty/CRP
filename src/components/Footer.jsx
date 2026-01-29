import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaSeedling, FaTractor, FaLeaf, FaWater, FaSun, FaTree } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-green-700 to-green-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section with Enhanced Farming Animation */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              {/* Animated Farming Logo */}
              <motion.div
                className="relative w-12 h-12"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full"
                >
                  {/* Tractor Shape */}
                  <motion.path
                    d="M20,60 L80,60 C85,60 90,65 90,70 L90,80 C90,85 85,90 80,90 L20,90 C15,90 10,85 10,80 L10,70 C10,65 15,60 20,60"
                    fill="#22c55e"
                    stroke="#22c55e"
                    strokeWidth="2"
                    animate={{
                      scale: [1, 1.1, 1],
                      fill: ["#22c55e", "#16a34a", "#22c55e"]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />

                  {/* Growing Plant */}
                  <motion.path
                    d="M45,60 Q50,40 55,60 M50,60 L50,40 Q45,35 50,30 Q55,35 50,40"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1,
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* Sun Rays */}
                  <motion.circle
                    cx="50"
                    cy="20"
                    r="10"
                    fill="#fbbf24"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </svg>
              </motion.div>

              <div className="flex flex-col">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                  FARM-SMart
                </h3>
                <span className="text-xs text-green-400 font-medium">GROW WISE-HARVEST BIG</span>
              </div>
            </div>
            <p className="text-green-300 font-small">Empowering farmers with smart solutions</p>
          </div>

          {/* Quick Links Section */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaLeaf className="text-green-400" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-green-300 hover:text-white transition-colors flex items-center gap-2">
                  <FaSeedling className="text-sm" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/learning" className="text-green-300 hover:text-white transition-colors flex items-center gap-2">
                  <FaWater className="text-sm" />
                  Water Management
                </Link>
              </li>
              <li>
                <Link to="/analysis" className="text-green-300 hover:text-white transition-colors flex items-center gap-2">
                  <FaTractor className="text-sm" />
                  Agriculture Schemes
                </Link>
              </li>
              <li>
                <Link to="/food-recommendations" className="text-green-300 hover:text-white transition-colors flex items-center gap-2">
                  <FaTree className="text-sm" />
                  Farming Techniques
                </Link>
              </li>
              <li>
                <Link to="/stories" className="text-green-300 hover:text-white transition-colors flex items-center gap-2">
                  <FaSun className="text-sm" />
                  Village Survey
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope className="text-green-400" />
              <a href="mailto:farmsmart@gmail.com" className="text-green-300 hover:text-white transition-colors">
                farmsmart@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section with Growing Plant Animation */}
        <div className="mt-8 pt-8 border-t border-green-700 text-center relative">
          <motion.div
            className="absolute left-0 right-0 top-0 h-0.5 bg-green-500"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <p className="text-green-300">&copy; {new Date().getFullYear()} FARM-SMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

