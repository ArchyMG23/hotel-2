import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === 'yombivictor@gmail.com') {
        sessionStorage.setItem('admin_auth', 'true');
        navigate('/admin/dashboard');
      } else {
        setError("Accès refusé. Vous n'êtes pas l'administrateur.");
        auth.signOut();
      }
    } catch (err: any) {
      console.error(err);
      setError("Erreur lors de la connexion avec Google.");
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

        <div className="space-y-6">
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
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-white text-gray-700 px-8 py-4 font-bold hover:bg-gray-50 transition-colors shadow-lg border border-gray-200"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6 mr-3" />
            CONNEXION AVEC GOOGLE
          </button>
        </div>

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
