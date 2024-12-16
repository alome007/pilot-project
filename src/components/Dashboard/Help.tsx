import React from 'react';
import { Book, MessageCircle, Mail, ExternalLink } from 'lucide-react';

const resources = [
  {
    icon: Book,
    title: 'Documentation',
    description: 'Learn how to use all features',
    link: '#'
  },
  {
    icon: MessageCircle,
    title: 'Support Chat',
    description: 'Chat with our support team',
    link: '#'
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get help via email',
    link: '#'
  }
];

export default function Help() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Help & Support</h2>
      </div>
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.link}
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 
                       dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 
                       transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <resource.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {resource.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {resource.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
