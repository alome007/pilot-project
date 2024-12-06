import React from 'react';
import { motion } from 'framer-motion';
import Features from '../components/Features';
import Footer from '../components/Footer';
import BackButton from '../components/ui/BackButton';
import { useScrollToTop } from '../hooks/useScrollToTop';

export default function FeaturesPage() {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative"
      >
        <BackButton />
        <Features />
        <Footer />
      </motion.div>
    </div>
  );
}