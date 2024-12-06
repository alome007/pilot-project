import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Lock, Sun, Moon, Mail, Inbox, Sparkles, ShieldCheck, ArrowRightCircle, Send, Forward, ArrowRightLeft } from 'lucide-react';
import Button from './ui/Button';
import LoginModal from './LoginModal';

interface HeroProps {
  onLogin?: () => void;
}

export default function Hero({ onLogin }: HeroProps) {
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(
    document.documentElement.classList.contains('dark')
  );

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.theme = newIsDark ? 'dark' : 'light';
  };

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!('theme' in localStorage)) {
        setIsDark(e.matches);
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center bg-gradient-to-b from-white to-transparent dark:from-gray-900 dark:to-gray-900/95 overflow-hidden">
      <button
        onClick={toggleDarkMode}
        className="fixed top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-colors z-10"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600" />
        )}
      </button>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-[100px]" />
      </div>
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLogin={onLogin}
      />
      <div className="relative w-full max-w-7xl mx-auto px-4 py-6 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="w-full max-w-xl mx-auto lg:mx-0 text-center lg:text-left space-y-6 sm:space-y-8 lg:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 bg-blue-600/5 dark:bg-blue-500/10 rounded-full text-[13px] sm:text-sm font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>No credit card required</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                Your emails,{' '}
                <span className="inline-flex flex-col relative">
                  <span className="relative text-blue-600 dark:text-blue-400">
                    truly private
                    <div className="absolute bottom-0.5 sm:bottom-1 left-0 h-2 sm:h-3 w-full bg-blue-100/50 dark:bg-blue-500/20 -z-10 -rotate-1" />
                  </span>
                </span>
              </h1>
              <p className="text-[15px] sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-[85%] sm:max-w-2xl mx-auto lg:mx-0">
                Create unlimited email aliases that forward to your inbox. Stay anonymous, 
                avoid spam, and take back control of your communications.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center lg:justify-start"
            >
              <Button
                onClick={() => setIsLoginOpen(true)}
                className="group w-full sm:w-auto hover:-translate-y-0.5"
              >
                Get started
                <ArrowRight className="w-4 h-4 ml-1.5 sm:ml-2 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-6 pt-2 sm:pt-4"
            >
              {[
                { icon: Lock, text: "End-to-end encrypted" },
                { icon: Shield, text: "Privacy guaranteed" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-1.5 sm:gap-2 text-[13px] sm:text-sm text-gray-600 dark:text-gray-400">
                  <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                  {item.text}
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-sm sm:max-w-md mx-auto lg:ml-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl" />
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 lg:p-8 shadow-xl">
              <div className="absolute -top-3 -right-3 p-2 bg-green-500/10 dark:bg-green-500/20 rounded-full">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                </motion.div>
              </div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2.5 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-lg"
                  >
                    <Forward className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <motion.div
                      className="absolute inset-0 rounded-lg border-2 border-blue-400/30 dark:border-blue-500/30"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Email Forwarding</div>
                </div>
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-600 dark:to-blue-700 border-2 border-white dark:border-gray-800"
                    />
                  ))}
                </div>
              </div>
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.15 + 0.7 }}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                    className="relative flex items-center gap-4 p-3 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 cursor-pointer group"
                  >
                    <motion.div
                      className="absolute inset-0 border border-blue-500/10 dark:border-blue-400/10 rounded-lg"
                      whileHover={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                    />
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {i === 0 ? (
                        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="relative"
                        >
                          <ArrowRightCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                        </motion.div>
                      )}
                    </motion.div>
                    <div className="space-y-1">
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`h-2 ${i === 0 ? 'w-40 bg-blue-100 dark:bg-blue-900/30' : 'w-32 bg-green-100 dark:bg-green-900/30'} rounded`}
                      />
                      <motion.div
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className={`h-2 ${i === 0 ? 'w-48 bg-blue-50 dark:bg-blue-900/20' : 'w-40 bg-green-50 dark:bg-green-900/20'} rounded`}
                      />
                    </div>
                    {i === 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute -right-2 -top-2 p-1 bg-blue-100 dark:bg-blue-900/30 rounded-full"
                      >
                        <Send className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="ml-auto text-xs text-gray-400 dark:text-gray-500"
                    >
                      {['Forwarded • Just now', '2m ago', '5m ago', '10m ago'][i]}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-4 flex items-center justify-between px-2 text-xs"
              >
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <ShieldCheck className="w-4 h-4" />
                  <motion.div
                    className="flex items-center gap-1"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span>Forwarded by MailGuard</span>
                    <ArrowRightLeft className="w-3 h-3" />
                  </motion.div>
                </div>
                <div className="text-gray-400 dark:text-gray-500">
                  Last forward: Just now
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}