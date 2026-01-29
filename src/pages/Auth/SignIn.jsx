import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSeedling, FaTractor, FaLeaf, FaWater, FaEye, FaEyeSlash, FaUsers } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import SuccessMessage from '../../components/auth/SuccessMessage';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === formData.email);

    if (!user) {
      setError('Account not found. Please sign up first.');
      return;
    }

    if (user.password !== formData.password) {
      setError('Invalid password.');
      return;
    }

    signIn(formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/');
    }, 2000);
  };

  // Enhanced SVG Animation Components
  const BlinkingLeaf = () => (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.6, 1],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <FaLeaf className="text-6xl text-green-500" />
    </motion.div>
  );

  const BlinkingTractor = () => (
    <motion.div
      animate={{
        x: [0, 10, 0],
        scale: [1, 1.1, 1],
        opacity: [1, 0.7, 1]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <FaTractor className="text-6xl text-green-600" />
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-green-100 to-green-50">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Form */}
        <div className="p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaSeedling className="text-4xl text-green-600" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">FARM-SMart</h1>
                <p className="text-sm text-yellow-400 font-medium">GROW WISE-HARVEST BIG</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back, Farmer!</h2>
            <p className="text-gray-600 mb-8">Sign in to make your farming more productive</p>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"
              >
                <p className="text-sm text-red-700">{error}</p>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign In
              </button>

              <p className="text-center text-gray-600">
                New to farming with us?{' '}
                <Link to="/signup" className="text-red-500 hover:text-red-700">
                  Create Account
                </Link>
              </p>
            </form>
          </motion.div>
        </div>

        {/* Right Side - Info */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-green-600 to-green-700 text-white p-12">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <BlinkingTractor />
              <BlinkingLeaf />
            </div>
            <h2 className="text-3xl font-bold mb-4">FARM-SMart</h2>
            <p className="mb-8">GROW WISE-HARVEST BIG</p>
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <FaSeedling />
                <p>Access expert farming advice</p>
              </div>
              <div className="flex items-center gap-3">
                <FaWater />
                <p>Track weather and crop data</p>
              </div>
              <div className="flex items-center gap-3">
                <FaUsers className="text-xl" />
                <p>Connect for better farming</p>
              </div>
            </div>
          </div>
          <Link
            to="/signup"
            className="px-8 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-green-700 transition-colors"
          >
          Join us to farm smarter
          </Link>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <SuccessMessage message="Welcome to FARM-SMart!" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SignIn;