import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const navigate = useNavigate();

  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart(); // Using the cart context to access cart items

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-20 py-4 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-black shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a
                onClick={() => navigate("/")}
                className="flex items-center cursor-pointer"
              >
                <img
                  src="/himalixirlogomain.png"
                  alt="Himalixir"
                  className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
                />
                <span className="sr-only">
                  <span className="text-yellow-500">Himalayan</span> Shilajit
                </span>
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-8 ml-16">
              <a
                href="#products"
                onClick={(e) => scrollToSection(e, "products")}
                className="text-white hover:text-[#efb000] transition-colors duration-300"
              >
                Products
              </a>
              <a
                href="#benefits"
                onClick={(e) => scrollToSection(e, "benefits")}
                className="text-white hover:text-[#efb000] transition-colors duration-300"
              >
                Benefits
              </a>
              <a
                href="#testimonials"
                onClick={(e) => scrollToSection(e, "testimonials")}
                className="text-white hover:text-[#efb000] transition-colors duration-300"
              >
                Testimonials
              </a>
              <a
                href="#faqs"
                onClick={(e) => scrollToSection(e, "faqs")}
                className="text-white hover:text-[#efb000] transition-colors duration-300"
              >
                FAQ
              </a>
              <Link
                to="/Challenges"
                className="text-white hover:text-[#efb000] transition-colors duration-300"
              >
                Challenges
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="text-white hover:text-[#efb000] transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="text-white hover:text-[#efb000] transition-colors duration-300 relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {/* Show the item count in a badge */}
                {cart.length > 0 && (
                  <span className="absolute top-[-6px] right-[-6px] sm:top-[-8px] sm:right-[-8px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => navigate("/signin")}
                className="bg-[#efb000] text-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition-colors duration-300 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Sign In
              </button>
            </div>

            <button
              ref={menuButtonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-[#efb000] transition-colors duration-300"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            className={`md:hidden fixed inset-y-0 right-0 w-64 bg-black/95 transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } pt-20`}
          >
            <div className="flex justify-end px-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#efb000] flex items-center gap-2 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col space-y-4 p-4">
              <a
                href="#"
                onClick={handleMenuItemClick}
                className="text-white hover:text-[#efb000] transition-colors duration-300"
              >
                Home
              </a>
              <a
                href="#products"
                onClick={(e) => scrollToSection(e, "products")}
                className="text-white hover:text-[#efb000] transition-colors duration-300"
              >
                Products
              </a>
              <a
                href="#benefits"
                onClick={(e) => {
                  scrollToSection(e, "benefits");
                  handleMenuItemClick();
                }}
                className="text-white hover:text-[#efb000] transition-colors duration-300"
              >
                Benefits
              </a>
              <a
                href="#"
                onClick={handleMenuItemClick}
                className="text-white hover:text-[#efb000] transition-colors duration-300"
              >
                Testimonials
              </a>
              <a
                href="#"
                onClick={handleMenuItemClick}
                className="text-white hover:text-[#efb000] transition-colors duration-300"
              >
                FAQ
              </a>

              <div className="flex items-center pt-4 border-t border-white/20">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleMenuItemClick}
                    className="text-white hover:text-[#efb000] transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      handleMenuItemClick();
                      setIsCartOpen(true);
                    }}
                    className="text-white hover:text-[#efb000] transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => {
                    handleMenuItemClick();
                    navigate("/signin");
                  }}
                  className="bg-[#efb000] text-black px-3 py-1.5 rounded-md hover:bg-[#d69e00] transition-colors duration-300 flex items-center gap-2 text-sm ml-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Side Panel */}

      <div
  className={`fixed top-0 right-0 h-full w-130 bg-white shadow-2xl z-30 transform transition-transform duration-1000 ease-in-out ${
    isCartOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  {/* Fixed Header */}
  <div className="p-6 border-b flex justify-between items-center bg-white sticky top-0 z-40">
    <h2 className="text-2xl font-semibold text-gray-800">Your Cart</h2>
    <button
      onClick={() => setIsCartOpen(false)}
      className="text-gray-600 hover:text-red-500 transition-colors text-2xl"
    >
      ✕
    </button>
  </div>

  {/* Scrollable content (items + checkout) */}
  <div className="overflow-y-auto h-[calc(100vh-80px)] px-6 py-4">
    {cart.length > 0 ? (
      <div>
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex p-4 rounded-lg border shadow-md justify-between items-center mb-6 bg-gray-50 hover:bg-yellow-100 transition-colors duration-300"
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-18 w-18 object-cover rounded-md shadow-md"
              />
              <div className="flex flex-col gap-4">
                <span className="text-sm font-medium text-gray-800">
                  {item.type}
                  {item.title && ` - ${item.title}`}
                </span>
                <div className="flex items-center space-x-3 text-sm text-gray-600 mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-6">
              <span className="text-lg font-medium text-gray-700">
                ${item.price * item.quantity}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Checkout Section (scrolls with content) */}
        <div className="mt-6 border-t pt-5">
          <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-4">
            <span>Total</span>
            <span>
              $
              {cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-yellow-500 text-black py-2 rounded-md hover:bg-yellow-400 transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    ) : (
      <p className="text-center text-gray-500 mt-10">
        Your cart is currently empty.
      </p>
    )}
  </div>
</div>


    </>
  );
}
