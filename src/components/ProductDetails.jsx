import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  StarIcon,
  ArrowPathIcon,
  ShoppingBagIcon,
  ExclamationCircleIcon,
  ArrowLeftIcon,
  PlusIcon,
  MinusIcon,
  HeartIcon,
  ShareIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/solid";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        // Simulate loading delay
        setTimeout(async () => {
          try {
            const response = await fetch("/data/products.json");
            if (!response.ok) {
              throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            
            // Find the product by ID
            const productData = data.products.find(
              (p) => p.id === parseInt(id)
            );
            
            if (!productData) {
              throw new Error("Product not found");
            }
            
            setProduct(productData);
            
            // Find similar products (same category, excluding current product)
            const similar = data.products
              .filter(
                (p) => 
                  p.category === productData.category && 
                  p.id !== productData.id
              )
              .slice(0, 4); // Limit to 4 similar products
            
            setSimilarProducts(similar);
            setError(null);
          } catch (err) {
            setError(err.message);
            console.error("Error fetching product:", err);
          } finally {
            setIsLoading(false);
          }
        }, 800);
      } catch (err) {
        setError(err.message);
        console.error("Error in fetch operation:", err);
        setIsLoading(false);
      }
    };

    fetchProductData();
    // Reset quantity and selected image when product ID changes
    setQuantity(1);
    setSelectedImage(0);
  }, [id]);

  // Handle quantity changes
  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Handle add to cart with selected quantity
  const handleAddToCart = () => {
    if (product && product.inStock) {
      addToCart({ ...product, quantity });
      // Show confirmation toast or feedback
    }
  };

  // Handle wishlist toggle
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // In a real app, you would save this to user's wishlist
  };

  // Single product card component for similar products
  const ProductCard = ({ product }) => (
    <div
      key={product.id}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex-shrink-0 mx-2 min-w-[240px] max-w-[280px]"
    >
      <Link to={`/product/${product.id}`} className="block group">
        <div className="relative h-48 w-full overflow-hidden">
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

      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-md font-bold text-gray-900 mb-1 hover:text-indigo-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        </Link>

        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-extrabold text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          {product.inStock ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center"
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
            <span className="text-xs text-gray-500 font-medium">
              Out of stock
            </span>
          )}
        </div>
      </div>
    </div>
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <ArrowPathIcon className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-indigo-600 font-medium">Loading product details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
        <ExclamationCircleIcon className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {error === "Product not found" ? "Product Not Found" : "Error Loading Product"}
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          {error === "Product not found"
            ? "The product you're looking for doesn't exist or has been removed."
            : `There was a problem loading this product: ${error}`}
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Return to Products
        </button>
      </div>
    );
  }

  // If product data is available, show product details
  if (product) {
    // Mock additional images (in a real app, these would come from the API)
    const productImages = [
      product.image,
      product.image, // Replace with actual additional images in a real app
      product.image,
      product.image,
    ];

    return (
      <div className="bg-gray-50  min-h-screen rounded-xl py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 overflow-hidden">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <span className="text-gray-400">/</span>
              <li>
                <Link to="/shop" className="text-gray-500 hover:text-gray-700">
                  Products
                </Link>
              </li>
              <span className="text-gray-400">/</span>
              <li>
                {/* Fix: Update to use /products and pass category as state */}
                <Link
                  to="/shop"
                  state={{ category: product.category }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace("-", " & ")}
                </Link>
              </li>
              <span className="text-gray-400">/</span>
              <li className="text-gray-900 font-medium truncate max-w-xs">
                {product.name}
              </li>
            </ol>
          </nav>

          {/* Back button */}
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Products
            </button>
          </div>

          {/* Product Detail Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
            <div className="md:flex">
              {/* Product Images Section */}
              <div className="md:w-1/2 p-6">
                {/* Main Product Image */}
                <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-80 md:h-96 object-contain"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.isNew && (
                      <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                    {product.isFeatured && (
                      <span className="bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center">
                        <StarIcon className="h-4 w-4 mr-1" /> FEATURED
                      </span>
                    )}
                  </div>
                </div>

                {/* Image Thumbnails */}
                <div className="flex space-x-2 overflow-x-auto hide-scrollbar pb-2">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      className={`block w-20 h-20 rounded-md overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedImage === index
                          ? "border-indigo-500 shadow-md"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={img}
                        alt={`${product.name} - view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info Section */}
              <div className="md:w-1/2 p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-200">
                {/* Product Title and Rating */}
                <div className="mb-5">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {product.rating}/5 ({product.reviews || 0} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline mb-2">
                    <span className="text-3xl font-extrabold text-gray-900 mr-3">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="mb-5">
                    {product.inStock ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Description */}
                <div className="mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Quantity Selector */}
                {product.inStock && (
                  <div className="mb-8">
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Quantity
                    </label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        className="p-2 bg-gray-100 rounded-l-lg hover:bg-gray-200 transition-colors border border-gray-300"
                      >
                        <MinusIcon className="h-4 w-4 text-gray-600" />
                      </button>
                      <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        readOnly
                        className="w-12 text-center py-2 border-t border-b border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={increaseQuantity}
                        className="p-2 bg-gray-100 rounded-r-lg hover:bg-gray-200 transition-colors border border-gray-300"
                      >
                        <PlusIcon className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col space-y-4 mb-8">
                  {product.inStock ? (
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors"
                    >
                      <ShoppingBagIcon className="h-5 w-5 mr-2" />
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-medium flex items-center justify-center cursor-not-allowed"
                    >
                      <ShoppingBagIcon className="h-5 w-5 mr-2" />
                      Out of Stock
                    </button>
                  )}

                  <div className="flex space-x-4">
                    <button
                      onClick={toggleWishlist}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium border ${
                        isWishlisted
                          ? "bg-red-50 text-red-600 border-red-200"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      } flex items-center justify-center transition-colors`}
                    >
                      <HeartIcon
                        className={`h-5 w-5 mr-2 ${
                          isWishlisted ? "text-red-500" : "text-gray-400"
                        }`}
                      />
                      {isWishlisted ? "Saved" : "Save"}
                    </button>
                    <button
                      className="flex-1 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-lg font-medium flex items-center justify-center transition-colors"
                    >
                      <ShareIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Share
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Product Details
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">SKU:</span>
                      <span className="text-gray-900 font-medium">
                        {product.sku || `SKU-${product.id}`}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">Category:</span>
                      <span className="text-gray-900 font-medium">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace("-", " & ")}
                      </span>
                    </li>
                    {product.brand && (
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">Brand:</span>
                        <span className="text-gray-900 font-medium">
                          {product.brand}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Shipping & Returns */}
                <div className="border-t border-gray-200 mt-6 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
                      <TruckIcon className="h-6 w-6 text-indigo-500 mb-2" />
                      <span className="text-xs text-center text-gray-700">
                        Free shipping on orders over $50
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
                      <ShieldCheckIcon className="h-6 w-6 text-indigo-500 mb-2" />
                      <span className="text-xs text-center text-gray-700">
                        2-year warranty included
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
                      <ArrowPathRoundedSquareIcon className="h-6 w-6 text-indigo-500 mb-2" />
                      <span className="text-xs text-center text-gray-700">
                        30-day hassle-free returns
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products Section */}
          {similarProducts.length > 0 && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Similar Products
                </h2>
                {/* Fix: Update to use Link to products with state */}
                <Link
                  onClick={() => toggleCategoryExpansion(category)}
                  state={{ category: product.category }}
                  className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center"
                >
                  View All
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>

              <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
                {similarProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* Customer Reviews Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Customer Reviews
              </h2>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                Write a Review
              </button>
            </div>

            {/* Reviews would go here - sample for placeholder */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold mr-3">
                      JD
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">John Doe</h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < 4 ? "text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">3 days ago</span>
                </div>
                <p className="text-gray-700">
                  Great product! Exactly what I was looking for. The quality is excellent and it arrived quickly.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 font-bold mr-3">
                      SM
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Sarah Miller</h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < 5 ? "text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">1 week ago</span>
                </div>
                <p className="text-gray-700">
                  Absolutely love this! The design is beautiful and it works perfectly. Would definitely recommend to anyone considering it.
                </p>
              </div>
              
              <div className="text-center">
                <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Load More Reviews
                </button>
              </div>
            </div>
          </div>
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
  }

  return null;
};

export default ProductDetail;