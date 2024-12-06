import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import BackButton from '../components/ui/BackButton';
import { useScrollToTop } from '../hooks/useScrollToTop';

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        
        <div className="prose dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            At MailGuard, we take your privacy seriously. This policy outlines how we collect,
            use, and protect your personal information.
          </p>

          <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
            Information We Collect
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We only collect information that's necessary to provide our email forwarding service:
            - Email addresses
            - Basic account information
            - Usage statistics
          </p>

          <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your information is used solely for:
            - Providing our email forwarding service
            - Improving our service
            - Communicating important updates
          </p>

          <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
            Data Protection
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We employ industry-standard security measures to protect your data:
            - End-to-end encryption
            - Regular security audits
            - Strict access controls
          </p>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}