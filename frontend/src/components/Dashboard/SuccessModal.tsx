import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Copy } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  alias: string;
  destination: string;
}

export default function SuccessModal({ isOpen, onClose, alias, destination }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          onClick={e => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Alias Created Successfully!</h3>
            <div className="mt-4 space-y-3">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">New Alias</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(alias)}
                    className="p-1 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">{alias}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">Forwarding to</p>
                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">{destination}</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 
                       hover:bg-blue-700 rounded-lg transition-colors"
            >
              Got it, thanks!
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}