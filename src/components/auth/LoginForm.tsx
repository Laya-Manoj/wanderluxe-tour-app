import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to login');
      }
    } finally {
      setLoading(false);
    }
  };

  // For demo purposes - helper to prefill form with demo credentials
  const fillDemoCredentials = (type: 'admin' | 'user') => {
    if (type === 'admin') {
      setEmail('admin@wanderluxe.com');
      setPassword('password');
    } else {
      setEmail('user@example.com');
      setPassword('password');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-3xl font-serif font-bold text-center mb-6">Welcome Back</h2>
      
      {error && (
        <div className="bg-error-50 text-error-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block mb-2 text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            disabled={loading}
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block mb-2 text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            disabled={loading}
          />
        </div>
        
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-800">
            Forgot Password?
          </Link>
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-70"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 hover:text-primary-800">
            Sign Up
          </Link>
        </p>
      </div>
      
      {/* Demo section - only for development purposes */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center text-sm text-gray-500 mb-3">
          For demo purposes
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => fillDemoCredentials('admin')}
            className="flex-1 py-2 text-xs bg-gray-200 rounded hover:bg-gray-300"
            type="button"
          >
            Admin Demo
          </button>
          <button
            onClick={() => fillDemoCredentials('user')}
            className="flex-1 py-2 text-xs bg-gray-200 rounded hover:bg-gray-300"
            type="button"
          >
            User Demo
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;