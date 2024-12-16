import React, { useMemo } from 'react';
import { Mail, Shield, Settings, LogOut, Plus, Inbox, Bell, CreditCard, HelpCircle, Ban } from 'lucide-react';

interface SidebarProps {
  onNewAlias: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
  aliases: Array<{ alias: string; destination: string }>;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'settings', name: 'Account Settings', icon: Settings },
  { id: 'billing', name: 'Billing', icon: CreditCard },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'help', name: 'Help & Support', icon: HelpCircle },
  { id: 'logout', name: 'Logout', icon: LogOut }
];

export default function Sidebar({ onNewAlias, currentView, onViewChange, aliases, isOpen, onClose }: SidebarProps) {
  const navigation = useMemo(() => [
    { id: 'inbox', name: 'Inbox', icon: Inbox, count: 12 },
    { id: 'aliases', name: 'Aliases', icon: Mail, count: aliases.length },
    { id: 'spam', name: 'Spam', icon: Shield, count: 2 },
    { id: 'blocked', name: 'Blocked', icon: Ban, count: 0 }
  ], [aliases]);

  const handleViewChange = (view: string) => {
    onViewChange(view);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity z-40
                 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 flex-shrink-0 
                 flex flex-col border-r border-gray-200 dark:border-gray-700 transform transition-transform 
                 lg:translate-x-0 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 
                       text-white rounded-lg transition-colors"
                onClick={onNewAlias}>
          <Plus className="w-4 h-4" />
          <span className="font-medium">New Alias</span>
        </button>
      </div>
      
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => handleViewChange(item.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg group transition-colors
                     ${currentView === item.id
                       ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                       : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                     }`}
          >
            <item.icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="flex-1 text-left">{item.name}</span>
            {item.count && (
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 
                           px-2 py-0.5 rounded-full text-xs">
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleViewChange(item.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors
                     ${currentView === item.id
                       ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                       : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                     }`}
          >
            <item.icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      </div>
    </>
  );
}
