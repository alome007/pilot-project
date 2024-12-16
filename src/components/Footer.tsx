import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Twitter, Github } from 'lucide-react';

const footerLinks = [
  { name: 'Features', path: '/features' },
  { name: 'Security', path: '/security' },
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms of Service', path: '/terms' },
  { name: 'Contact', path: '/contact' }
];

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-50/90 dark:bg-gray-800/90 mx-4 mb-4 rounded-2xl border border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative bg-blue-50 dark:bg-blue-500/10 p-1.5 rounded-lg transition-colors">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-lg font-medium text-gray-900 dark:text-white">MailGuard</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Secure email forwarding for everyone.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3 transition-colors">Product</h3>
            <ul className="grid grid-cols-2 gap-2">
              {footerLinks.map(link => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:underline transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200/75 dark:border-gray-700/50">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2024 MailGuard. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
