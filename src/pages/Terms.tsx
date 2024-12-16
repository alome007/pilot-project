import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';
import { useScrollToTop } from '../hooks/useScrollToTop';

export default function Terms() {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative max-w-4xl mx-auto px-4 py-16"
      >
        <BackButton />
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">
          Terms of Service
        </h1>
        
        <div className="prose dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            By using MailGuard, you agree to these terms of service.
          </p>

          <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
            1. Acceptable Use
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You agree to use our service only for lawful purposes and in accordance with these terms.
          </p>

          <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
            2. Service Availability
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            While we strive for 100% uptime, we cannot guarantee uninterrupted service.
          </p>

          <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
            3. Account Responsibilities
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You are responsible for maintaining the security of your account and any activity that occurs under it.
          </p>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
