import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiLockClosed, HiUser } from 'react-icons/hi';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Use environment variables for credentials
    const VALID_USERNAME = import.meta.env.VITE_ADMIN_USER;
    const VALID_PASSWORD = import.meta.env.VITE_ADMIN_PASS;

    setTimeout(() => {
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('user', VALID_USERNAME);
        navigate('/dashboard');
      } else {
        setError('Invalid username or password. Please try again.');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 w-full max-w-md relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent-purple" />
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiLockClosed className="text-3xl text-secondary" />
          </div>
          <h2 className="text-3xl font-bold font-serif-premium">Admin Login</h2>
          <p className="text-gray-500 text-sm mt-2">Enter your credentials to access the dashboard</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-xl mb-6 text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-500 ml-2 flex items-center gap-2">
              <HiUser /> Username
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-secondary transition-colors" 
              placeholder="admin" 
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500 ml-2 flex items-center gap-2">
              <HiLockClosed /> Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-secondary transition-colors" 
              placeholder="••••••••" 
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full py-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : "Access Dashboard"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button className="text-gray-500 text-xs hover:text-secondary transition-colors">
            Forgot Password?
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
