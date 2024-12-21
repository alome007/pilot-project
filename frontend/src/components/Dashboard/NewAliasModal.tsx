import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, RefreshCw, ArrowDownUp, Loader2 } from 'lucide-react';
import { generateRandomAlias } from '../../hooks/useAliases';

interface NewAliasModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onCreateAlias: (alias: string, destination: string) => void;
}

export default function NewAliasModal({ isOpen, onClose, onCreateAlias, isLoading }: NewAliasModalProps) {
  const [alias, setAlias] = useState(generateAlias());
  const [destination, setDestination] = useState('');
    const [noForward, setNoForward] = useState(false);

  const DOMAIN = '@snocks.us';

  function generateAlias() {
    return `${generateRandomAlias()}`;
  }

  const handleRefreshAlias = () => {
    setAlias(generateAlias());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateAlias(alias, destination);
    // onClose();
  };

  if (!isOpen) return null;

  return (
   <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60]"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative z-[60]"
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
                  className="block w-full pl-3 pr-[11.5rem] py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                           focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute right-2 top-2 flex items-center">
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(`${alias}${DOMAIN}`)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <div className="mx-1 w-px h-4 bg-gray-200 dark:bg-gray-600" />
                  <button
                    type="button"
                    onClick={handleRefreshAlias}
                    className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <div className="mx-1 w-px h-4 bg-gray-200 dark:bg-gray-600" />
                  <span className="px-1.5 text-sm text-gray-500 dark:text-gray-400">
                    {DOMAIN}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="noForward"
                checked={noForward}
                onChange={(e) => setNoForward(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="noForward" className="text-sm text-gray-700 dark:text-gray-300">
                Do not forward to my email
              </label>
            </div>

            {noForward && (
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm">
                <p className="font-medium text-gray-900 dark:text-white mb-1">Silent Mode Activated</p>
                <p className="text-gray-600 dark:text-gray-400">
                  This alias will silently receive emails without forwarding them to your inbox. Perfect for testing or temporary sign-ups.
                </p>
              </div>
            )}

            {!noForward && <div className="flex justify-center mt-4">
              <div className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <ArrowDownUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>}

            {!noForward && <div>
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
            </div>}

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
                         hover:bg-blue-700 rounded-lg flex items-center justify-center
                         disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Create Alias'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}