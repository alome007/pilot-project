import React from 'react';
import { User, CreditCard, FileText } from 'lucide-react';

const invoices = [
  { id: 'INV-001', date: '2024-03-01', amount: '$3.00' },
  { id: 'INV-002', date: '2024-02-01', amount: '$3.00' },
  { id: 'INV-003', date: '2024-01-01', amount: '$3.00' },
];

export default function Settings() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Account Settings</h2>
      </div>
      
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-xl font-medium text-white">JD</span>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">John Doe</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">john.doe@example.com</p>
            </div>
          </div>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
            Edit Profile
          </button>
        </div>

        {/* Current Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Current Plan</h3>
            </div>
            <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-400/10 rounded-full">
              Pro Plan
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Price</span>
              <span className="text-gray-900 dark:text-white font-medium">$3/month</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Billing Period</span>
              <span className="text-gray-900 dark:text-white font-medium">Monthly</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Next Payment</span>
              <span className="text-gray-900 dark:text-white font-medium">April 1, 2024</span>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Billing History</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <p className="text-gray-900 dark:text-white font-medium">{invoice.id}</p>
                    <p className="text-gray-600 dark:text-gray-400">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-900 dark:text-white font-medium">
                    {invoice.amount}
                  </span>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}