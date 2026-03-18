import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useSiteData } from '../../hooks/useSiteData';

export default function AdminLogin() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { data } = useSiteData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === data.settings.secretCode) {
      // Store auth state in sessionStorage
      sessionStorage.setItem('admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Code secret incorrect.');
      setCode('');
    }
  };

  return (
    <div className="min-h-screen bg-royal-green flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-royal-silk p-12 rounded-sm shadow-2xl max-w-md w-full relative z-10 border-t-4 border-royal-gold"
      >
        <div className="text-center mb-10">
          <Crown className="h-16 w-16 text-royal-gold mx-auto mb-4" />
          <h1 className="text-3xl font-cinzel text-royal-green font-bold tracking-widest">LE TRÔNE</h1>
          <p className="text-royal-green/60 text-sm tracking-[0.2em] uppercase mt-2">Module d'Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-royal-green/80 mb-2 flex items-center">
              <Lock className="h-4 w-4 mr-2 text-royal-gold" />
              Code Secret
            </label>
            <input
              type="password"
              id="code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 border-2 border-royal-green/20 rounded-sm focus:outline-none focus:ring-0 focus:border-royal-gold transition-colors text-center tracking-[0.5em] font-mono text-xl"
              placeholder="••••••••"
              autoFocus
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center font-medium"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-royal-gold text-royal-green px-8 py-4 font-cinzel font-bold tracking-widest hover:bg-royal-green hover:text-royal-gold transition-colors shadow-lg"
          >
            ACCÉDER AU TRÔNE
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-royal-green/50 hover:text-royal-green transition-colors underline decoration-royal-gold/30 underline-offset-4"
          >
            Retourner au site public
          </button>
        </div>
      </motion.div>
    </div>
  );
}
