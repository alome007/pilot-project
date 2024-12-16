import React from 'react';
import { Mail, Shield, Inbox, Ban, TrendingUp } from 'lucide-react';

interface StatsProps {
  totalAliases: number;
}

const stats = [
  { name: 'Active Aliases', icon: Mail, color: 'blue' },
  { name: 'Received', icon: Inbox, value: '2,431', color: 'green', trend: '+12%' },
  { name: 'Blocked', icon: Shield, value: '145', color: 'yellow', trend: '-5%' },
  { name: 'Blocked Senders', icon: Ban, value: '23', color: 'red' }
];

const colorClasses = {
  blue: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-400/10',
  green: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-400/10',
  yellow: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-400/10',
  red: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-400/10'
};

export default function Stats({ totalAliases }: StatsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
      {stats.map((stat, index) => (
        <div
          key={stat.name}
          className="flex items-center gap-3 px-4 py-2"
        >
          <div className={`p-1.5 rounded-md ${colorClasses[stat.color]}`}>
            <stat.icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{stat.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {index === 0 ? totalAliases : stat.value}
              </p>
              {stat.trend && (
                <span className={`text-xs flex items-center gap-0.5
                  ${stat.trend.startsWith('+') 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'}`}
                >
                  <TrendingUp className={`w-3 h-3 ${
                    stat.trend.startsWith('-') ? 'rotate-180' : ''
                  }`} />
                  {stat.trend}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
