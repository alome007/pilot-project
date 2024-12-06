import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import Footer from '../components/Footer';
import BackButton from '../components/ui/BackButton';
import { useScrollToTop } from '../hooks/useScrollToTop';

export default function Contact() {
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
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-8">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Mail, title: 'Email', content: 'support@mailguard.com' },
            { icon: MessageCircle, title: 'Chat', content: 'Available 24/7' },
            { icon: Phone, title: 'Phone', content: '+1 (555) 123-4567' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center"
            >
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                     transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}