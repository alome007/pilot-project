import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProvider } from './contexts/UserContext';
import { useUser } from './contexts/UserContext';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import FeaturesPage from './pages/Features';
import SecurityPage from './pages/Security';
import PrivacyPolicy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';

function App() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  //  if (true) {
  //   return <Dashboard />;
  // }
  return (
    <BrowserRouter>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-white dark:bg-gray-900"
            >
              <Hero />
            <Features />
            <HowItWorks />
            <Pricing />
            <FAQ />
            <Footer />
          </motion.div>
        } />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
    </BrowserRouter>
  );
}

function AppWrapper() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

export default AppWrapper;
