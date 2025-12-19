import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg text-gray-900">Zerodha</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">
              Dashboard
            </Link>
            <Link to="/market" className="text-gray-600 hover:text-gray-900 font-medium">
              Markets
            </Link>
            <Link to="/portfolio" className="text-gray-600 hover:text-gray-900 font-medium">
              Portfolio
            </Link>
            <Link to="/watchlist" className="text-gray-600 hover:text-gray-900 font-medium">
              Watchlist
            </Link>
            <Link to="/screener" className="text-gray-600 hover:text-gray-900 font-medium">
              Screener
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.accountNumber}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            )}

            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link to="/dashboard" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              Dashboard
            </Link>
            <Link to="/market" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              Markets
            </Link>
            <Link to="/portfolio" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              Portfolio
            </Link>
            <Link to="/watchlist" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              Watchlist
            </Link>
            <Link to="/screener" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              Screener
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
