import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  StarIcon,
  ArrowPathIcon,
  ShoppingBagIcon,
  ExclamationCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

const ProductsCard = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [productsByCategory, setProductsByCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", icon: "🖥️", slug: "electronics" },
    { id: 2, name: "Clothing", icon: "👕", slug: "clothing" },
    { id: 3, name: "Home & Garden", icon: "🏠", slug: "home-garden" },
    { id: 4, name: "Beauty", icon: "💄", slug: "beauty" },
    { id: 5, name: "Sports", icon: "⚽", slug: "sports" },
    { id: 6, name: "Books", icon: "📚", slug: "books" },
    { id: 7, name: "Food & Drinks", icon: "🍔", slug: "food-drinks" },
  ]);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate loading delay to ensure loading state is visible
        setTimeout(async () => {
          try {
            const response = await fetch("/data/products.json");
            if (!response.ok) {
              throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            setAllProducts(data.products);

            // Group products by category
            const groupedProducts = {};

            // Create an entry for "All Products"
            groupedProducts["all"] = data.products;

            // Create entries for each category
            categories.forEach((category) => {
              groupedProducts[category.slug] = data.products.filter(
                (product) => product.category === category.slug
              );
            });

            setProductsByCategory(groupedProducts);
            setError(null);
          } catch (err) {
            setError(err.message);
            console.error("Error fetching products:", err);
          } finally {
            setIsLoading(false);
          }
        }, 1000);
      } catch (err) {
        setError(err.message);
        console.error("Error in fetch operation:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categories]);

  // Toggle category expansion
  const toggleCategoryExpansion = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Check if a category is expanded
  const isCategoryExpanded = (category) => {
    return expandedCategories.includes(category);
  };

  // Single product card component - used in both carousel and grid views
  const ProductCard = ({ product, isGridView = false }) => (
    <div
      key={product.id}
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 ${
        isGridView ? "w-full" : "min-w-[260px] max-w-[300px] flex-shrink-0 mx-2"
      }`}
    >
      <Link to={`/product/${product.id}`} className="block group">
        <div
          className={`relative ${
            isGridView ? "h-40 md:h-60" : "h-48"
          } w-full overflow-hidden`}
        >
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

      <div className={`${isGridView ? "p-3 md:p-5" : "p-4"}`}>
        <Link to={`/product/${product.id}`} className="block">
          <h3
            className={`${
              isGridView ? "text-sm md:text-lg" : "text-md"
            } font-bold text-gray-900 mb-1 hover:text-indigo-600 transition-colors line-clamp-1`}
          >
            {product.name}
          </h3>
          <p
            className={`${
              isGridView ? "text-xs md:text-sm" : "text-xs"
            } text-gray-500 mt-1 line-clamp-2`}
          >
            {product.description}
          </p>
        </Link>

        <div
          className={`flex justify-between items-center ${
            isGridView ? "mt-2 md:mt-4" : "mt-3"
          }`}
        >
          <span
            className={`${
              isGridView ? "text-lg md:text-xl" : "text-lg"
            } font-extrabold text-gray-900`}
          >
            ${product.price.toFixed(2)}
          </span>

          {product.inStock ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className={`bg-indigo-600 hover:bg-indigo-700 text-white ${
                isGridView ? "px-2 py-1 md:px-4 md:py-2" : "px-3 py-1"
              } rounded-lg ${
                isGridView ? "text-xs md:text-base" : "text-sm"
              } font-medium transition-colors flex items-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  isGridView ? "h-4 w-4 md:h-5 md:w-5" : "h-4 w-4"
                } mr-1`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Add
            </button>
          ) : (
            <span
              className={`${
                isGridView ? "text-xs md:text-sm" : "text-xs"
              } text-gray-500 font-medium`}
            >
              Out of stock
            </span>
          )}
        </div>
      </div>
    </div>
  );

  // Category carousel section component
  const CategorySection = ({ category, title, icon }) => {
    const products = productsByCategory[category] || [];
    const isExpanded = isCategoryExpanded(category);

    if (products.length === 0) return null;

    return (
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{icon}</span>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <span className="ml-3 text-sm text-gray-500">
              ({products.length} products)
            </span>
          </div>
          <div className="flex items-center">
            {isExpanded ? (
              <button
                onClick={() => toggleCategoryExpansion(category)}
                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center"
              >
                View Less
                <ChevronUpIcon className="h-4 w-4 ml-1" />
              </button>
            ) : (
              <button
                onClick={() => toggleCategoryExpansion(category)}
                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center"
              >
                View More
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
            )}
          </div>
        </div>

        {isExpanded ? (
          // Grid View - Always 2 products per row even on mobile
          <div className="grid grid-cols-2 gap-4 md:gap-8 md:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isGridView={true}
              />
            ))}
          </div>
        ) : (
          // Carousel View - Horizontal scrollable
          <div className="relative">
            <div
              id={`scroll-container-${category}`}
              className="flex overflow-x-auto pb-4 hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.slice(0, 10).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isGridView={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Grid view of all products for a category
  const ProductGrid = () => {
    const products =
      selectedCategory === "all"
        ? allProducts
        : productsByCategory[selectedCategory] || [];

    return (
      <div>
        {/* Product Count and Back Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{products.length}</span>{" "}
            {products.length === 1 ? "product" : "products"}
            {selectedCategory !== "all" && (
              <span className="ml-2">
                in{" "}
                <span className="font-medium text-indigo-600">
                  {categories.find((c) => c.slug === selectedCategory)?.name ||
                    selectedCategory}
                </span>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} isGridView={true} />
          ))}
        </div>

        {/* Empty state */}
        {products.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              We couldn't find any products in this category. Try selecting a
              different category.
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="py-12">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Error loading products: {error}. Please try refreshing the
                  page.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Category Selection */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* All Categories */}
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                selectedCategory === "all"
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              <div className="bg-indigo-100 p-3 rounded-full mb-2 text-2xl">
                <ShoppingBagIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                All Products
              </span>
            </button>

            {/* Other Categories */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  selectedCategory === category.slug
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
              >
                <div className="bg-indigo-100 p-3 rounded-full mb-2 text-2xl">
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <ArrowPathIcon className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
            <p className="text-indigo-600 font-medium">Loading products...</p>
          </div>
        ) : (
          <>
            {selectedCategory !== "all" ? (
              // Show only selected category in grid format
              <ProductGrid />
            ) : (
              // Show all categories
              <div>
                {/* "All Products" section first */}
                <CategorySection
                  category="all"
                  title="All Products"
                  icon="🛒"
                />

                {/* Individual category sections */}
                {categories.map((category) => (
                  <CategorySection
                    key={category.id}
                    category={category.slug}
                    title={category.name}
                    icon={category.icon}
                  />
                ))}
              </div>
            )}

            {/* Empty state - only shown when a category has no products */}
            {selectedCategory !== "all" &&
              productsByCategory[selectedCategory] &&
              productsByCategory[selectedCategory].length === 0 && (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    We couldn't find any products in the{" "}
                    {categories.find((c) => c.slug === selectedCategory)?.name}{" "}
                    category. Try selecting a different category.
                  </p>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    View all products
                  </button>
                </div>
              )}
          </>
        )}
      </div>

      {/* Hide scrollbars but allow scrolling */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProductsCard;
