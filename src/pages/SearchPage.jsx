import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  StarIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import SearchBar from "../components/SearchBar";
import { useCart } from "../context/CartContext";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryFilter = searchParams.get("category") || "";
  const sortBy = searchParams.get("sort") || "default";

  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch product data from JSON
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data/products.json");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products || []);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(
            data.products.map((product) => product.category).filter(Boolean)
          ),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter and sort logic
  useEffect(() => {
    if (products.length > 0) {
      setIsFiltering(true); // Start filtering animation

      // Create a small delay to show filtering animation
      const filterTimer = setTimeout(() => {
        let filtered = [...products];

        // Apply search term filter
        if (query) {
          const searchTerm = query.toLowerCase();
          filtered = filtered.filter(
            (product) =>
              product.name.toLowerCase().includes(searchTerm) ||
              (product.description &&
                product.description.toLowerCase().includes(searchTerm)) ||
              (product.category &&
                product.category.toLowerCase().includes(searchTerm))
          );
        }

        // Apply category filter
        if (categoryFilter) {
          filtered = filtered.filter(
            (product) =>
              product.category &&
              product.category.toLowerCase() === categoryFilter.toLowerCase()
          );
        }

        // Apply sorting
        switch (sortBy) {
          case "price-low-high":
            filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
          case "price-high-low":
            filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break;
          case "name-a-z":
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "name-z-a":
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case "rating":
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          default:
            // Default sorting (newest or featured)
            break;
        }

        setFilteredProducts(filtered);
        setIsFiltering(false); // Stop filtering animation
      }, 200);

      return () => clearTimeout(filterTimer);
    } else {
      setFilteredProducts([]);
    }
  }, [products, query, categoryFilter, sortBy]);

  const handleSortChange = (e) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sort", e.target.value);
      return newParams;
    });
  };

  const handleCategoryChange = (category) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (category) {
        newParams.set("category", category);
      } else {
        newParams.delete("category");
      }
      return newParams;
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <ArrowPathIcon className="h-12 w-12 text-indigo-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
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
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-center md:text-left">
              Search Results for "{query}"
            </h1>
            <SearchBar products={products} />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-gray-600 text-center md:text-left">
              {filteredProducts.length} products found
            </p>

            <div className="flex items-center gap-4 justify-center md:justify-end">
              <button
                className="md:hidden flex items-center text-gray-700 hover:text-indigo-600"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FunnelIcon className="h-5 w-5 mr-1" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>

              <div className="flex items-center">
                <label
                  htmlFor="sort"
                  className="mr-2 text-sm font-medium text-gray-700"
                >
                  Sort by:
                </label>
                <div className="relative">
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="appearance-none block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white md:w-40 lg:w-52 xl:w-64"
                  >
                    <option value="default">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name-a-z">Name: A to Z</option>
                    <option value="name-z-a">Name: Z to A</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

       <div className="flex flex-col md:flex-row gap-6">
  {/* Category filters - desktop */}
  <div className={`md:block ${showFilters ? "block" : "hidden"} md:w-64 w-full`}>
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="font-medium text-lg mb-4">Categories</h3>
      <div className="space-y-2">
        <div
          className={`cursor-pointer px-2 py-1 rounded ${
            !categoryFilter ? "bg-indigo-100 text-indigo-800" : "hover:bg-gray-100"
          }`}
          onClick={() => handleCategoryChange("")}
        >
          All Categories
        </div>
        {categories.map((category) => (
          <div
            key={category}
            className={`cursor-pointer px-2 py-1 rounded capitalize ${
              categoryFilter === category
                ? "bg-indigo-100 text-indigo-800"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  </div>

  <div className="flex-1">
    {/* Filtering Loading State */}
    {isFiltering && (
      <div className="flex justify-center items-center mb-6">
        <ArrowPathIcon className="h-5 w-5 text-indigo-600 animate-spin mr-2" />
        <span className="text-gray-600 text-sm">Applying filters...</span>
      </div>
    )}

    {/* Products grid */}
    {!isFiltering && filteredProducts.length === 0 ? (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <div className="mx-auto h-20 w-20 text-gray-400 mb-4">
          <MagnifyingGlassIcon className="h-full w-full" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">No products found</h2>
        <p className="text-gray-500 mb-4 text-sm max-w-md mx-auto">
          We couldn't find any products matching your criteria. Try adjusting your search or browse our shop.
        </p>
        <Link
          to="/shop"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
        >
          Browse Shop
        </Link>
      </div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <Link to={`/product/${product.id}`} className="block group">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Product Badges */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center">
                      <StarIconSolid className="h-3 w-3 mr-1" /> FEATURED
                    </span>
                  )}
                </div>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <span className="text-white font-bold bg-red-600 px-3 py-1 rounded-lg text-xs">
                      SOLD OUT
                    </span>
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow">
                  <div className="flex items-center">
                    <StarIconSolid className="h-4 w-4 text-yellow-400" />
                    <span className="text-xs font-semibold ml-1">{product.rating}</span>
                  </div>
                </div>
              </div>
            </Link>

            <div className="p-3">
              <Link to={`/product/${product.id}`} className="block">
                <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-indigo-600">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
              </Link>

              <div className="flex justify-between items-center mt-3">
                <span className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</span>

                {product.inStock ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded text-sm flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Add
                  </button>
                ) : (
                  <span className="text-xs text-gray-500 font-medium">Out of stock</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default SearchPage;
