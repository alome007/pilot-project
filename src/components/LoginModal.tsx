import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: () => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [error, setError] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user && onLogin) {
        onLogin();
      }
    } catch (error) {
      if (error.code === 'auth/popup-blocked') {
        setError('Please allow popups for this site to sign in with Google');
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
      console.error('Sign-in error:', error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 backdrop-blur-sm bg-black/40 dark:bg-black/60 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative"
        >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-normal text-gray-900 dark:text-white mb-2">Welcome back</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Sign in to manage your email aliases</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md flex items-center 
                   justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors
                   bg-white dark:bg-gray-800"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Continue with Google</span>
        </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}