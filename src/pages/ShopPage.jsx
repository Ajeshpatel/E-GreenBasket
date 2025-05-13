import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  StarIcon, 
  ArrowPathIcon, 
  FunnelIcon, 
  ShoppingBagIcon, 
  BoltIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/solid';

const ShopPage = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false); // New state for filtering
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('./src/data/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setAllProducts(data.products);
        setCategories(data.categories);
        setFilteredProducts(data.products);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort products
  useEffect(() => {
    if (allProducts.length === 0) return;

    setIsFiltering(true); // Start filtering
    
    let result = [...allProducts];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Sort products
    switch(sortOption) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    
    // Simulate a small delay to show the loading state (optional)
    const timer = setTimeout(() => {
      setFilteredProducts(result);
      setIsFiltering(false); // Done filtering
    }, 200);
    
    return () => clearTimeout(timer);
  }, [selectedCategory, sortOption, allProducts]);

  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'ShoppingBagIcon': return ShoppingBagIcon;
      case 'BoltIcon': return BoltIcon;
      default: return ShoppingBagIcon;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative m-4 rounded-2xl overflow-hidden text-white py-16 px-4 sm:px-6 lg:px-8">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/14666034/pexels-photo-14666034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-600 opacity-10" />
        {/* Content */}
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Discover Exceptional Products
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Curated collection of premium items designed for those who appreciate quality
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Error loading products: {error}. Please try refreshing the page.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="md:hidden flex items-center space-x-2 bg-white px-4 py-3 rounded-lg shadow-sm mb-6 w-full justify-center"
        >
          <FunnelIcon className="h-5 w-5 text-indigo-600" />
          <span className="font-medium text-gray-700">Filter & Sort</span>
        </button>

        {/* Filter/Sort Controls */}
        <div className={`${isMobileFiltersOpen ? 'block' : 'hidden'} md:block bg-white p-6 rounded-xl shadow-sm mb-8`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <FunnelIcon className="h-5 w-5 text-indigo-600 mr-2" />
              Refine Products
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-auto">
              <div className="w-full">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    className="appearance-none block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => {
                      const Icon = getIconComponent(category.icon);
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="w-full">
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    id="sort"
                    className="appearance-none block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <ArrowPathIcon className="h-12 w-12 text-indigo-600 animate-spin" />
          </div>
        ) : (
          <>
            {/* Product Count and Active Filters */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
              </div>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Filtering Loading State */}
            {isFiltering && (
              <div className="flex justify-center items-center mb-6">
                <ArrowPathIcon className="h-6 w-6 text-indigo-600 animate-spin mr-2" />
                <span className="text-gray-600">Applying filters...</span>
              </div>
            )}

            {/* Product grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {!isFiltering && filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <Link to={`/product/${product.id}`} className="block group">
                    <div className="relative h-60 w-full overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Product Badges */}
                      <div className="absolute top-3 left-3 flex flex-col space-y-2">
                        {product.isNew && (
                          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                        {product.isFeatured && (
                          <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                            <StarIcon className="h-3 w-3 mr-1" /> FEATURED
                          </span>
                        )}
                      </div>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                          <span className="text-white font-bold bg-red-600 px-3 py-1 rounded-lg">
                            SOLD OUT
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-lg">
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-400" />
                          <span className="text-xs font-bold ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="p-5">
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-indigo-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    </Link>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-extrabold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      
                      {product.inStock ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          </svg>
                          Add
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500 font-medium">Out of stock</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {!isFiltering && filteredProducts.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  We couldn't find any products matching your criteria. Try adjusting your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSortOption('featured');
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShopPage;