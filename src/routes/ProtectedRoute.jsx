import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignInPrompt from '../components/auth/SignInPrompt';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const [showSignInPrompt, setShowSignInPrompt] = useState(!user);

  if (!user) {
    return (
      <>
        <SignInPrompt 
          isOpen={showSignInPrompt} 
          onClose={() => setShowSignInPrompt(false)} 
        />
        <Navigate to="/" />
      </>
    );
  }

  return children;
}

export default ProtectedRoute;