import React from 'react';
import { Bell, Mail, Shield } from 'lucide-react';

const notificationTypes = [
  {
    id: 'email',
    icon: Mail,
    title: 'Email Notifications',
    description: 'Get notified when you receive new emails',
    enabled: true
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Security Alerts',
    description: 'Receive alerts about suspicious activity',
    enabled: true
  },
  {
    id: 'updates',
    icon: Bell,
    title: 'Product Updates',
    description: 'Stay informed about new features and improvements',
    enabled: false
  }
];

export default function Notifications() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Notifications</h2>
      </div>
      
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
          {notificationTypes.map((type) => (
            <div key={type.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <type.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{type.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked={type.enabled}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                            peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
                            dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:border-gray-300 after:border after:rounded-full 
                            after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                            peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}