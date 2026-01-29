import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export function useSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      signIn({ email, password });
      setEmail('');
      setPassword('');
      return true;
    }
    return false;
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit
  };
}