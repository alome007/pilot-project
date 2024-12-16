import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: [
      '3 email aliases',
      'Basic filtering',
      'Email support'
    ],
    buttonText: 'Get started'
  },
  {
    name: 'Pro',
    price: '$3/mo',
    period: 'billed monthly',
    popular: true,
    features: [
      'Unlimited aliases',
      'Advanced filtering',
      'Priority support',
      'Custom domains'
    ],
    buttonText: 'Upgrade to Pro'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'custom billing',
    features: [
      'Everything in Pro',
      'Dedicated support',
      'Custom features',
      'SLA guarantee'
    ],
    buttonText: 'Contact sales'
  }
];

export default function Pricing() {
  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-normal text-center mb-12 text-gray-900 dark:text-white"
        >
          Choose your plan
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 bg-white dark:bg-gray-800 rounded-xl flex flex-col
                       ${plan.popular
                         ? 'border-2 border-blue-600 dark:border-blue-500'
                         : 'border border-gray-200 dark:border-gray-700'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 dark:bg-blue-500
                             text-white text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{plan.period}</span>
                </div>
              </div>
              <ul className="flex-grow space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all
                         group flex items-center justify-center gap-2
                         ${plan.popular
                           ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                           : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                         }`}
              >
                {plan.buttonText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
