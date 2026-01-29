import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

function SignInPrompt({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleSignIn = () => {
    onClose();
    navigate('/signin');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full text-center"
            onClick={e => e.stopPropagation()}
          >
            <FaLock className="text-6xl text-blue-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Sign In to Access</h2>
            <p className="text-gray-600 mb-8">
              You need to be signed in to access this feature.
            </p>
            <button
              onClick={handleSignIn}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Sign In
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SignInPrompt;