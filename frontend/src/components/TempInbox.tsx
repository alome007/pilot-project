import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, RefreshCw, Mail, Clock, AlertCircle, Shield, Inbox, ArrowDown } from 'lucide-react';
import { generateRandomAlias } from '../hooks/useAliases';
import { testEmails, TestEmail } from '../utils/testEmails';
import InlineEmailViewer from './InlineEmailViewer';
import Shimmer from './ui/Shimmer';

export default function TempInbox() {
  const [tempEmail, setTempEmail] = useState(generateRandomAlias());
  const [countdown, setCountdown] = useState(20);
  const [showCopied, setShowCopied] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<TestEmail | null>(null);
  const [emails, setEmails] = useState<TestEmail[]>(testEmails);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Reset email address every 20 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setTempEmail(generateRandomAlias());
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate email refresh every 20 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIsRefreshing(true);
      setTimeout(() => setIsRefreshing(false), 1500);
    }, 20000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(tempEmail);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="mt-12 w-full max-w-7xl mx-auto bg-white/90 dark:bg-gray-800/90 rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm shadow-xl overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Temporary Email Address
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono truncate">
                {tempEmail}
              </p>
              <div className="relative flex-shrink-0">
                <button
                  onClick={handleCopy}
                  className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showCopied && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded shadow-lg whitespace-nowrap"
                    >
                      Copied!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>New address in {countdown}s</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col lg:flex-row h-[calc(100vh-20rem)] relative overflow-hidden gap-6">
          <div className={`w-full lg:w-[400px] flex-shrink-0 overflow-hidden
                        ${selectedEmail ? 'hidden lg:block' : ''}`}>
            <div className="flex items-center gap-2 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mb-6">
              <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                Emails sent to this address are temporary and will be deleted after 24 hours
              </p>
            </div>

            <div className="h-full overflow-y-auto">
              {emails.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-12 px-4 text-center">
                  <div className="relative">
                    <Inbox className="w-16 h-16 text-gray-400 dark:text-gray-600" />
                    <ArrowDown className="absolute -bottom-2 right-0 w-6 h-6 text-blue-500 dark:text-blue-400 animate-bounce" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                    Your Inbox is Empty
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-[240px]">
                    Send an email to your temporary address and it will appear here instantly
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {isRefreshing ? (
                    [...Array(3)].map((_, i) => (
                      <div key={i} className="p-3">
                        <Shimmer className="h-4 w-24 mb-2 rounded" />
                        <Shimmer className="h-4 w-48 mb-2 rounded" />
                        <Shimmer className="h-4 w-32 rounded" />
                      </div>
                    ))
                  ) : emails.map((email) => (
                    <motion.button
                      key={email.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700/50 
                               rounded-lg focus:outline-none transition-colors duration-200 ${
                                 selectedEmail?.id === email.id ? 
                                 'bg-gray-100 dark:bg-gray-700/50' : ''
                               }`}
                      onClick={() => setSelectedEmail(email)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {!email.isRead && (
                            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                          )}
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {email.sender}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {email.spamScore > 50 && (
                            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-red-100 dark:bg-red-900/20 rounded">
                              <Shield className="w-3 h-3 text-red-600 dark:text-red-400" />
                              <span className="text-xs text-red-600 dark:text-red-400">Spam</span>
                            </div>
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {email.timestamp}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-white font-medium truncate">
                        {email.subject}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {email.preview}
                      </p>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {selectedEmail ? (
            <InlineEmailViewer
              key={selectedEmail.id}
              email={selectedEmail}
              onBack={() => setSelectedEmail(null)} 
              className={`${selectedEmail ? 'flex' : 'hidden lg:flex'} flex-1 lg:static fixed inset-0 z-10 bg-white dark:bg-gray-800 shadow-lg lg:shadow-none lg:min-w-0 rounded-lg w-full lg:w-[80%]`}
            />
          ) : (
            <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-50/50 dark:bg-gray-900/30 rounded-lg p-8 w-full lg:w-[80%]">
              <div className="text-center">
                <div className="relative mx-auto w-16 h-16 mb-6">
                  <Mail className="w-16 h-16 text-gray-400/50 dark:text-gray-600/50" />
                  <ArrowDown className="absolute -bottom-2 right-0 w-6 h-6 text-blue-500 dark:text-blue-400 animate-bounce" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Email Selected
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[240px] mx-auto">
                  Choose an email from the list to view its contents
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}