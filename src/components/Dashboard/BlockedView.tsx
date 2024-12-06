import React from 'react';
import { Ban, Mail, ArrowRightLeft, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NewBlockModal from './NewBlockModal';

interface BlockedViewProps {
  blockedSenders: Array<{ email: string; alias: string; blockedAt: string }>;
  onUnblock: (email: string) => void;
  onBlock: (email: string) => void;
}

export default function BlockedView({ blockedSenders, onUnblock, onBlock }: BlockedViewProps) {
  const [isNewBlockModalOpen, setIsNewBlockModalOpen] = React.useState(false);

  return (
    <div className="flex-1 overflow-auto">
      <NewBlockModal
        isOpen={isNewBlockModalOpen}
        onClose={() => setIsNewBlockModalOpen(false)}
        onBlock={onBlock}
      />
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Blocked Senders</h2>
            <button
              onClick={() => setIsNewBlockModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 
                       text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Block Sender
            </button>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {blockedSenders.length} blocked
          </span>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <AnimatePresence>
          {blockedSenders.map((item) => (
            <motion.div
              key={item.email}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-500 dark:text-red-400" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {item.email}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    via {item.alias}
                  </p>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Blocked on {item.blockedAt}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUnblock(item.email)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 
                           hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 
                           dark:hover:bg-gray-700/50 transition-colors"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  Unblock
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {blockedSenders.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <Ban className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No blocked senders</p>
            <p className="text-sm mt-1">Blocked senders will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}