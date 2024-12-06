import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Key } from 'lucide-react';
import Footer from '../components/Footer';
import BackButton from '../components/ui/BackButton';
import { useScrollToTop } from '../hooks/useScrollToTop';

const securityFeatures = [
  {
    icon: Shield,
    title: 'Advanced Threat Protection',
    description: 'Real-time scanning of all incoming emails for malware, phishing attempts, and suspicious content.'
  },
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'Your emails are encrypted in transit and at rest using industry-standard encryption protocols.'
  },
  {
    icon: Key,
    title: 'Access Control',
    description: 'Fine-grained control over who can send emails to your aliases with instant revocation.'
  }
];

export default function SecurityPage() {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative max-w-7xl mx-auto px-4 py-16"
      >
        <BackButton />
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Security First, Always
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your privacy and security are our top priorities
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}