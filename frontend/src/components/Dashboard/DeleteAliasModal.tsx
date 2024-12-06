import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteAliasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  alias: string;
}

export default function DeleteAliasModal({ isOpen, onClose, onConfirm, alias }: DeleteAliasModalProps) {
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

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">Delete Alias</h2>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Are you sure you want to delete the alias <span className="font-medium text-gray-900 dark:text-white">{alias}</span>? 
              This action cannot be undone.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Any emails sent to this alias will no longer be forwarded to your inbox.
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                       hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 
                       hover:bg-red-700 rounded-lg"
            >
              Delete Alias
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}