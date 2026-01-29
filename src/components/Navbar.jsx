import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaSeedling, FaLeaf, FaSun } from 'react-icons/fa';

function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/image-page', label: 'Image Analysis', protected: true },
    { path: '/prediction-page', label: 'Predictions', protected: true },
    { path: '/learning', label: 'Water Tools', protected: true },
    { path: '/analysis', label: 'Schemes', protected: true },
    { path: '/food-recommendations', label: 'Techniques', protected: true },
    { path: '/stories', label: 'Survey', protected: true }
  ];

  const handleNavClick = (path, isProtected) => {
    if (isProtected && !user) {
      navigate('/signin');
      return;
    }
    navigate(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-50 to-green-400 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-10 h-10"
            >
              <motion.div
                className="relative w-full h-full"
                animate={{
                  scale: [1, 1.05, 1],
                  filter: [
                    'drop-shadow(0 0 0px rgba(34, 197, 94, 0.5))',
                    'drop-shadow(0 0 4px rgba(34, 197, 94, 0.5))',
                    'drop-shadow(0 0 0px rgba(34, 197, 94, 0.5))'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="relative">
                  <FaSeedling className="w-10 h-10 text-green-600" />
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <FaSun className="w-3 h-3 text-yellow-500" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-0 left-0"
                    animate={{
                      y: [-2, 2, -2]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaLeaf className="w-3 h-3 text-green-400" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent leading-tight">
                FARM-SMart
              </span>
              <span className="text-xs text-yellow-400 font-medium -mt-0.5">GROW WISE-HARVEST BIG</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => handleNavClick(item.path, item.protected)}
                className="text-gray-700 hover:text-blue-800 px-2.5 py-2 rounded-md text-xs font-semibold transition-colors relative group whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                  initial={false}
                />
              </motion.button>
            ))}
            {user ? (
              <motion.button
                onClick={signOut}
                className="bg-gradient-to-r from-red-400 to-red-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:from-red-600 hover:to-red-800 transition-all shadow-md hover:shadow-lg ml-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Log OUT
              </motion.button>
            ) : (
              <motion.button
                onClick={() => navigate('/signin')}
                className="bg-gradient-to-r from-red-400 to-red-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:from-red-600 hover:to-red-800 transition-all shadow-md hover:shadow-lg ml-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Log IN
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


