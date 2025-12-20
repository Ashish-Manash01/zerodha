import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PriceAlerts } from './PriceAlerts';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg text-gray-900 dark:text-white">Zerodha</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition">
              Dashboard
            </Link>
            <Link to="/market" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition">
              Markets
            </Link>
            <Link to="/portfolio" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition">
              Portfolio
            </Link>
            <Link to="/watchlist" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition">
              Watchlist
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <PriceAlerts />
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-gray-900 dark:text-white">{user.name}</span>
                </button>

                {/* Logout Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.accountNumber}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 font-medium transition"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              className="md:hidden p-2 text-gray-600 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <Link to="/dashboard" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition">
              Dashboard
            </Link>
            <Link to="/market" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition">
              Markets
            </Link>
            <Link to="/portfolio" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition">
              Portfolio
            </Link>
            <Link to="/watchlist" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition">
              Watchlist
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
