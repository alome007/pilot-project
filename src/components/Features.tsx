import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Filter, Key, Lock, Globe, Bell, Zap } from 'lucide-react';

const features = [
  {
    icon: Mail,
    title: 'Email Aliases',
    description: 'Generate unlimited unique email addresses instantly for different services and subscriptions',
    color: 'blue'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your real email address stays completely private, protected from data breaches and spam',
    color: 'indigo'
  },
  {
    icon: Filter,
    title: 'Smart Filtering',
    description: 'AI-powered filters automatically detect and block spam, phishing attempts, and unwanted emails',
    color: 'purple'
  },
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'Military-grade encryption ensures your emails remain private and secure in transit',
    color: 'green'
  },
  {
    icon: Globe,
    title: 'Custom Domains',
    description: 'Use your own domain to create professional email aliases for your business',
    color: 'orange'
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Get instant alerts for important emails while filtering out the noise',
    color: 'red'
  },
  {
    icon: Key,
    title: 'Access Control',
    description: 'Grant and revoke access to your aliases with a single click',
    color: 'yellow'
  },
  {
    icon: Zap,
    title: 'Instant Setup',
    description: 'Get started in seconds with our intuitive dashboard and simple controls',
    color: 'pink'
  }
];

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
  purple: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  green: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400',
  orange: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
  red: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
  yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400',
  pink: 'bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400'
};

export default function Features() {
  return (
    <div className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-900 dark:text-white">
          Everything you need for complete email privacy
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Powerful features designed to keep your inbox secure and your identity protected
        </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 
                       dark:border-gray-700/50 hover:border-gray-200 dark:hover:border-gray-700 
                       transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800/50"
            >
              <div className={`mb-6 w-12 h-12 rounded-xl ${colorClasses[feature.color]} p-3
                           flex items-center justify-center`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
