import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, RefreshCw } from 'lucide-react';

interface NewAliasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAlias: (alias: string, destination: string) => void;
}

export default function NewAliasModal({ isOpen, onClose, onCreateAlias }: NewAliasModalProps) {
  const [alias, setAlias] = useState(generateRandomAlias());
  const [destination, setDestination] = useState('');

  function generateRandomAlias() {
    const prefix = Math.random().toString(36).substring(2, 8);
    return `${prefix}@privacy.mail`;
  }

  const handleRefreshAlias = () => {
    setAlias(generateRandomAlias());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateAlias(alias, destination);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Create New Alias</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Alias Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                           focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute right-2 top-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(alias)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleRefreshAlias}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Forward To
              </label>
              <input
                type="email"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="your@email.com"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                         focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                         hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                         hover:bg-blue-700 rounded-lg"
              >
                Create Alias
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
