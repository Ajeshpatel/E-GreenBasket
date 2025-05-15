import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import SearchBar from '../components/SearchBar'; // Import the SearchBar component

const Header = ({ onCartClick }) => {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]); // Added state for products
  const [loading, setLoading] = useState(true); // Added loading state
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch products for search functionality
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
      // Navigate to search results page with the query
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
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
              <div className="w-full max-w-screen-md">
                {loading ? (
                  <div className="w-full px-4 py-2 border border-gray-300 rounded-md">
                    Loading search...
                  </div>
                ) : (
                  <SearchBar products={products} />
                )}
              </div>
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
          </div>
        )}

        {/* Mobile Search Bar - Appears below */}
        {searchOpen && (
          <div className="md:hidden py-3">
            {loading ? (
              <div className="w-full px-4 py-2 border border-gray-300 rounded-md">
                Loading search...
              </div>
            ) : (
              <SearchBar products={products} />
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;