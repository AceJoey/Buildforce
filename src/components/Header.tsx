import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, ChevronDown, ChevronRight, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { categories } from '../data/mockData';
import HoverCategoryMenu from './HoverCategoryMenu';
import SearchSuggestions from './SearchSuggestions';
import buildforceLogo from '../assets/BUILDFORCE.png';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { getItemCount } = useCart();
  const { isLoggedIn, login, logout } = useAdmin();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.trim().length > 0);
  };

  // Debounce search suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectProduct = (product: any) => {
    setSearchQuery('');
    setShowSuggestions(false);
    navigate(`/product/${product.id}`);
  };

  const handleCloseSuggestions = () => {
    setShowSuggestions(false);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setExpandedCategories([]); // Reset expanded categories when menu closes
  };

  // Handle login form changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (loginError) {
      setLoginError('');
    }
  };

  // Handle login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const success = await login(loginForm.username, loginForm.password);
      if (success) {
        setShowLoginModal(false);
        setLoginForm({ username: '', password: '' });
        alert('Login successful! Welcome Admin.');
      } else {
        setLoginError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      setLoginError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    alert('Logged out successfully.');
  };

  // Handle clicks outside mobile menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (isMenuOpen && !target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-toggle')) {
        handleMenuClose();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-gradient-to-r from-green-700 via-green-600 to-yellow-400 shadow-lg fixed md:sticky top-0 z-50 w-full">
      <div className="flex items-center h-20">
        {/* Logo - Always at top left edge */}
        <div className="flex items-center flex-shrink-0 pl-4 md:pl-6">
          <Link to="/" className="flex items-center">
            <img 
              src={buildforceLogo} 
              alt="BuildForce Tools and Machinery" 
              className="h-12 md:h-16 w-auto"
            />
          </Link>
        </div>
        
        {/* Center Content */}
        <div className="flex-1 flex items-center justify-center px-4">
          {/* Category Menu - Desktop Only */}
          <div className="hidden md:block">
            <HoverCategoryMenu />
          </div>
          
          {/* Search Bar - Desktop Only */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => setShowSuggestions(searchQuery.trim().length > 0)}
                placeholder="Search for tools, machinery..."
                className="w-full px-4 py-2.5 pr-12 border-2 border-green-400 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-green-600 hover:text-green-700 bg-yellow-400 rounded-md hover:bg-yellow-300 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Actions - Desktop */}
        <div className="hidden md:flex items-center space-x-3 pr-6">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-1.5 bg-white bg-opacity-20 rounded-full text-white hover:text-yellow-300 hover:bg-opacity-30 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {getItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-white">
                {getItemCount()}
              </span>
            )}
          </Link>

          {/* Profile/Logout Icon */}
          <button
            onClick={isLoggedIn ? handleLogout : () => setShowLoginModal(true)}
            className={`p-1.5 rounded-full transition-colors ${
              isLoggedIn 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-white bg-opacity-20 text-white hover:text-yellow-300 hover:bg-opacity-30'
            }`}
            title={isLoggedIn ? 'Admin Logout' : 'Admin Login'}
          >
            {isLoggedIn ? <LogOut className="w-5 h-5" /> : <User className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center space-x-2 pr-4">
          {/* Mobile Search - Compact */}
          <form onSubmit={handleSearch} className="flex-1 max-w-sm">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => setShowSuggestions(searchQuery.trim().length > 0)}
                placeholder="Search..."
                className="w-full px-3 py-2 pr-8 text-sm border border-white rounded-md bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 text-white hover:text-yellow-300"
              >
                <Search className="w-3 h-3" />
              </button>
            </div>
          </form>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 bg-white bg-opacity-20 rounded-full text-white hover:text-yellow-300 hover:bg-opacity-30 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {getItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-white">
                {getItemCount()}
              </span>
            )}
          </Link>

          {/* Profile/Logout Icon - Mobile */}
          <button
            onClick={isLoggedIn ? handleLogout : () => setShowLoginModal(true)}
            className={`p-2 rounded-full transition-colors ${
              isLoggedIn 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-white bg-opacity-20 text-white hover:text-yellow-300 hover:bg-opacity-30'
            }`}
            title={isLoggedIn ? 'Admin Logout' : 'Admin Login'}
          >
            {isLoggedIn ? <LogOut className="w-6 h-6" /> : <User className="w-6 h-6" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white hover:text-yellow-300 mobile-menu-toggle"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-green-500 py-3 bg-green-700 mobile-menu-container">
          <nav className="space-y-1">
            <Link
              to="/about"
              className="block px-4 py-2 text-white hover:text-yellow-300 hover:bg-green-800 rounded"
              onClick={handleMenuClose}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-2 text-white hover:text-yellow-300 hover:bg-green-800 rounded"
              onClick={handleMenuClose}
            >
              Contact
            </Link>
            <div className="border-t border-green-500 my-2"></div>
            <div className="px-4 py-2 text-green-100 text-sm font-medium">Product Categories</div>
            <Link
              to="/"
              className="block px-4 py-2 text-white hover:text-yellow-300 hover:bg-green-800 rounded"
              onClick={handleMenuClose}
            >
              Home
            </Link>
            {categories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center justify-between px-4 py-2 text-white hover:text-yellow-300 hover:bg-green-800 rounded">
              <Link
                to={`/category/${category.id}`}
                    className="flex-1"
                    onClick={handleMenuClose}
              >
                {category.name}
              </Link>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="p-1 text-white hover:text-yellow-300 transition-colors"
                  >
                    {expandedCategories.includes(category.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </div>
                
                {expandedCategories.includes(category.id) && (
                  <div className="ml-4 space-y-1 bg-green-800 rounded-lg mx-4 mb-2">
                    <Link
                      to={`/category/${category.id}`}
                      className="block px-4 py-2 text-sm text-yellow-300 hover:text-yellow-200 font-medium transition-colors"
                      onClick={handleMenuClose}
                    >
                      View All {category.name}
                    </Link>
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory}
                        to={`/category/${category.id}?subcategory=${encodeURIComponent(subcategory)}`}
                        className="block px-4 py-2 text-sm text-green-100 hover:text-yellow-300 transition-colors"
                        onClick={handleMenuClose}
                      >
                        {subcategory}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}

      {/* Search Suggestions Modal */}
      <SearchSuggestions
        query={searchQuery}
        isVisible={showSuggestions}
        onClose={handleCloseSuggestions}
        onSelectProduct={handleSelectProduct}
      />

      {/* Admin Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Admin Login</h2>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginForm({ username: '', password: '' });
                  setLoginError('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={loginForm.username}
                    onChange={handleLoginChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter username"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter password"
                    required
                  />
                </div>

                {loginError && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                    {loginError}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowLoginModal(false);
                      setLoginForm({ username: '', password: '' });
                      setLoginError('');
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Logging in...</span>
                      </>
                    ) : (
                      'Login'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}