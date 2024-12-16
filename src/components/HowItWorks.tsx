import React from 'react';
import { Plus, Mail, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Plus,
    title: 'Create an alias',
    description: 'Generate a new email address in one click',
    color: 'blue'
  },
  {
    icon: Mail,
    title: 'Use anywhere',
    description: 'Use your alias for sign-ups and subscriptions',
    color: 'purple'
  },
  {
    icon: Check,
    title: 'Receive emails',
    description: 'Get messages forwarded to your inbox',
    color: 'green'
  }
];

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  purple: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  green: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400'
};

export default function HowItWorks() {
  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-normal text-center mb-12 text-gray-900 dark:text-white"
        >
          How It Works
        </motion.h2>
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="p-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-12 h-12 ${colorClasses[step.color]} rounded-xl mx-auto mb-4
                             flex items-center justify-center transition-colors`}
                  >
                    <step.icon className="w-6 h-6" />
                  </motion.div>
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
