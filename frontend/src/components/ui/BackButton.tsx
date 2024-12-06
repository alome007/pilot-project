import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={() => navigate('/')}
      className="fixed top-4 left-4 p-2 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 
                dark:hover:bg-gray-700/80 rounded-lg transition-colors z-10 group"
    >
      <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:-translate-x-0.5 transition-transform" />
    </motion.button>
  );
}