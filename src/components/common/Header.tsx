import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-blue-800" />
            <span className="ml-2 text-2xl font-bold text-blue-800">ClickDeal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/coupons" className="text-gray-700 hover:text-blue-800 transition-colors">
              Tous les coupons
            </Link>
            <Link to="/fortune-wheel" className="text-gray-700 hover:text-blue-800 transition-colors">
              Roue de la Fortune
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-800 transition-colors">
                  <User className="h-5 w-5 mr-1" />
                  <span>{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  {user?.userType === 'business' && (
                    <Link 
                      to="/business" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-md text-blue-800 hover:bg-blue-50 transition-colors"
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Inscription
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-blue-800" />
            ) : (
              <Menu className="h-6 w-6 text-blue-800" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/coupons" 
                className="text-gray-700 hover:text-blue-800 transition-colors"
                onClick={toggleMenu}
              >
                Tous les coupons
              </Link>
              <Link 
                to="/fortune-wheel" 
                className="text-gray-700 hover:text-blue-800 transition-colors"
                onClick={toggleMenu}
              >
                Roue de la Fortune
              </Link>
              
              {isAuthenticated ? (
                <>
                  {user?.userType === 'business' && (
                    <Link 
                      to="/business" 
                      className="text-gray-700 hover:text-blue-800 transition-colors"
                      onClick={toggleMenu}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="flex items-center text-left text-gray-700 hover:text-blue-800 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/login" 
                    className="px-4 py-2 rounded-md text-center text-blue-800 border border-blue-800 hover:bg-blue-50 transition-colors"
                    onClick={toggleMenu}
                  >
                    Connexion
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-blue-800 text-white rounded-md text-center hover:bg-blue-700 transition-colors"
                    onClick={toggleMenu}
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;