import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCartIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const Header = ({ onCartClick }) => {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 ${scrolled ? 'bg-white shadow-lg' : 'bg-white shadow-md'}`}>
      <div className="container mx-auto px-4">
        {/* Top Bar - Always Visible */}
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShopEase
            </span>
          </Link>

          {/* Desktop Center Area - Switches between Nav and Search */}
          <div className="hidden md:flex flex-1 justify-center mx-4">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="w-full max-w-screen-md">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  </button>
                </div>
              </form>
            ) : (
              <nav className="flex items-center space-x-1">
                <Link 
                  to="/" 
                  className={`px-4 py-2 rounded-md font-medium ${location.pathname === '/' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Home
                </Link>
                <Link 
                  to="/shop" 
                  className={`px-4 py-2 rounded-md font-medium ${location.pathname.startsWith('/shop') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Shop
                </Link>
                <Link 
                  to="/about" 
                  className={`px-4 py-2 rounded-md font-medium ${location.pathname === '/about' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  About
                </Link>
              </nav>
            )}
          </div>

          {/* Right Icons - Always Visible */}
          <div className="flex items-center space-x-4">
            {/* On desktop, show search toggle */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden md:block p-2 text-gray-600 hover:text-gray-900"
              aria-label="Search"
            >
              {searchOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <MagnifyingGlassIcon className="h-5 w-5" />
              )}
            </button>


             {/* Mobile Search Button (only visible on mobile) */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              aria-label="Search"
            >
              {searchOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <MagnifyingGlassIcon className="h-5 w-5" />
              )}
            </button>
            
            {/* Cart Icon */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-gray-900"
              aria-label="Cart"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

           

           
             {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-3">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-md font-medium ${location.pathname === '/' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className={`px-4 py-2 rounded-md font-medium ${location.pathname.startsWith('/products') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Shop
              </Link>
              <Link 
                to="/about" 
                className={`px-4 py-2 rounded-md font-medium ${location.pathname === '/about' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900'}`}
              >
                About
              </Link>
            </nav>
          </div>
        )}

        {/* Mobile Search Bar - Appears below */}
        {searchOpen && (
          <div className="md:hidden py-3">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;