import React from 'react';
import { Trash2, Ban, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteAliasModal from './DeleteAliasModal';

interface AliasViewProps {
  aliases: Array<{ alias: string; destination: string }>;
  onDelete: (alias: string) => void;
  onBlock: (alias: string) => void;
}

export default function AliasView({ aliases, onDelete, onBlock }: AliasViewProps) {
  const [copyFeedback, setCopyFeedback] = React.useState<string | null>(null);
  const [deleteModal, setDeleteModal] = React.useState<{ isOpen: boolean; alias: string }>({
    isOpen: false,
    alias: ''
  });

  const handleCopy = async (alias: string) => {
    await navigator.clipboard.writeText(alias);
    setCopyFeedback(alias);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  return (
    <div className="flex-1 overflow-auto">
      <DeleteAliasModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, alias: '' })}
        onConfirm={() => onDelete(deleteModal.alias)}
        alias={deleteModal.alias}
      />
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Active Aliases</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {aliases.length} total
          </span>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <AnimatePresence>
          {aliases.map((item) => (
            <motion.div
              key={item.alias}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {item.alias}
                  </p>
                  <button
                    onClick={() => handleCopy(item.alias)}
                    className="relative p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Copy className="w-4 h-4" />
                    {copyFeedback === item.alias && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white 
                                   bg-gray-900 dark:bg-gray-700 rounded shadow-lg whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Forwards to: {item.destination}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:ml-4">
                <button
                  onClick={() => onBlock(item.alias)}
                  className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400
                           rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  title="Block senders to this alias"
                >
                  <Ban className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setDeleteModal({ isOpen: true, alias: item.alias })}
                  className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400
                           rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  title="Delete alias"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {aliases.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <p>No aliases created yet</p>
            <p className="text-sm mt-1">Create your first alias to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}