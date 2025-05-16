import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { TrashIcon } from "@heroicons/react/24/outline";

const Checkout = () => {
  const { cart, cartTotal, removeFromCart } = useCart();
  const [showPriceDetails, setShowPriceDetails] = useState(true);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  
  // Calculate discount percentages
  const couponDiscount = isApplied ? cartTotal * 0.15 : 0; // 15% discount for PAYDAY15
  const onlinePaymentDiscount = cartTotal * 0.05 > 100 ? 100 : cartTotal * 0.05; // 5% up to ₹100
  const shippingCost = cartTotal > 699 ? 0 : 50; // Free shipping for orders > ₹699
  const gstAmount = ((cartTotal - couponDiscount) * 0.18) / 1.18; // 18% GST (included in price)
  
  // Calculate grand total
  const grandTotal = cartTotal - couponDiscount - onlinePaymentDiscount + shippingCost;
  
  // Calculate savings
  const totalSavings = couponDiscount + onlinePaymentDiscount;

  const handleApply = () => {
    if (isApplied) {
      setAppliedCoupon("");
      setIsApplied(false);
    } else {
      if (appliedCoupon.trim().toUpperCase() === "PAYDAY15") {
        setIsApplied(true);
      }
    }
  };

  const handleTapToApply = () => {
    setAppliedCoupon("PAYDAY15");
    setIsApplied(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Local Top Navigation */}
      <nav className="h-20 bg-black p-6 flex justify-between items-center text-white">
        <div className="flex items-center">
          <button
            className="mr-1 mb-1 text-5xl font-black"
            onClick={() => window.history.back()}
          >
            ←
          </button>
        </div>
        <div>
          <img
            src="/api/placeholder/200/50"
            alt="Company Logo"
            className="h-13"
          />
        </div>
      </nav>

      {/* Checkout Content */}
      <div className="">
        {/* Split Layout Section */}
        <div className="">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 p-4">
            {/* Left 50% Section */}
            <div className="w-full md:w-1/2 bg-white p-0 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex-1 bg-gray-50 p-6 rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">
                  Already have an account?{" "}
                  <span className="text-yellow-600">LOGIN</span>
                </h1>
                <p className="mb-6">
                  Earn 5% Kapiva Coins on every order. Login Now!
                </p>

                <form className="space-y-4">
                  <h2 className="text-3xl font-semibold mt-6">
                    Contact Details
                  </h2>
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="Enter Phone Number"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter Email Address"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-sm font-medium"
                    >
                      Full Name
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      placeholder="Enter Full Name"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <h2 className="text-3xl font-semibold mt-6">
                    Delivery Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium"
                      >
                        Address
                      </label>
                      <input
                        id="address"
                        type="text"
                        placeholder="Enter Address"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                      <div className="flex-1">
                        <label
                          htmlFor="pin"
                          className="block text-sm font-medium"
                        >
                          Pin Code
                        </label>
                        <input
                          id="pin"
                          type="text"
                          placeholder="Enter Pin Code"
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium"
                        >
                          City
                        </label>
                        <input
                          id="city"
                          type="text"
                          placeholder="Enter City"
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium"
                        >
                          State
                        </label>
                        <input
                          id="state"
                          type="text"
                          placeholder="Enter State"
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <div>
                      <input
                        type="checkbox"
                        id="billing-same"
                        className="mr-2"
                      />
                      <label htmlFor="billing-same" className="text-sm">
                        My billing address is the same as delivery address
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="shipping-updates"
                        className="mr-2"
                      />
                      <label htmlFor="shipping-updates" className="text-sm">
                        Get shipping updates on WhatsApp/RCS/SMS & assistance
                        through on-call free consultations.
                      </label>
                    </div>
                  </div>

                  <h3 className="text-3xl font-semibold mt-6">
                    Choose Payment Method
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    {["UPI", "Card", "Wallet", "Net Banking", "Cash"].map(
                      (method) => (
                        <button
                          key={method}
                          type="button"
                          className="border rounded-lg py-3 px-4 bg-white text-black text-center font-medium hover:border-blue-400"
                        >
                          {method}
                        </button>
                      )
                    )}
                  </div>
                </form>

                <div className="mt-10 text-center sm:static sm:mt-10">
                  {/* Wrapper div fixed only on mobile */}
                  <div className="fixed bottom-0 z-20 left-0 right-0 bg-white p-2 sm:static sm:p-0">
                    <p className="text-sm text-orange-700 mb-1">
                      Pay online to get extra 5% upto Rs. 100
                    </p>
                    <button
                      type="button"
                      className="w-full bg-gray-800 text-white py-6 px-4 rounded-md text-base font-medium hover:bg-gray-700 sm:py-3 sm:text-lg sm:font-semibold"
                    >
                      Please fill your delivery details to proceed
                    </button>
                  </div>
                </div>

                <div className="mt-16">
                  <p className="text-center text-xl font-semibold text-gray-800">
                    100% SECURE PAYMENTS
                  </p>
                  <div className="flex justify-center gap-6 mt-4 flex-wrap">
                    <img
                      src="/api/placeholder/80/30"
                      alt="Paytm"
                      className="h-8"
                    />
                    <img 
                      src="/api/placeholder/80/30" 
                      alt="UPI" 
                      className="h-8" 
                    />
                    <img
                      src="/api/placeholder/80/30"
                      alt="GPay"
                      className="h-8"
                    />
                    <img
                      src="/api/placeholder/80/30"
                      alt="Visa"
                      className="h-8"
                    />
                    <img
                      src="/api/placeholder/80/30"
                      alt="Rupay"
                      className="h-8"
                    />
                  </div>
                </div>

                <div className="mt-10 pb-10">
                  <div className="flex justify-between flex-wrap gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <img
                        src="/api/placeholder/40/40"
                        alt="Delivery"
                        className="h-10 w-10"
                      />
                      <p className="text-sm mt-2">
                        Free Shipping <br /> above 699
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="/api/placeholder/40/40"
                        alt="Refunds"
                        className="h-10 w-10"
                      />
                      <p className="text-sm mt-2">
                        Hassle-free <br /> refunds
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="/api/placeholder/40/40"
                        alt="Natural"
                        className="h-10 w-10"
                      />
                      <p className="text-sm mt-2">
                        All natural <br /> products
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="/api/placeholder/40/40"
                        alt="Users"
                        className="h-10 w-10"
                      />
                      <p className="text-sm mt-2">
                        Trusted by <br /> 50L+ users
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 50% Section */}
            <div className="w-full md:w-1/2 bg-white p-0 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-full bg-white p-6 rounded-lg">
                <h1 className="text-3xl font-semibold mb-4">Order Summary</h1>
                <div className="mt-6">
                  <h3 className="font-semibold text-xl mb-2 flex items-center">
                    <span>Your Order</span>
                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {cart.length} {cart.length === 1 ? 'item' : 'items'}
                    </span>
                  </h3>
                  
                  {/* Cart Items - Scrollable with enhanced styling */}
                  <div className="border border-gray-200 rounded-lg mt-2 bg-gray-50 shadow-sm">
                    {cart.length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="text-gray-400 text-5xl mb-4">🛒</div>
                        <p className="text-gray-500">Your cart is empty</p>
                        <button className="mt-4 text-blue-600 border border-blue-600 rounded-full px-4 py-2 text-sm hover:bg-blue-50 transition-colors">
                          Continue Shopping
                        </button>
                      </div>
                    ) : (
                      <div className="max-h-72 overflow-y-auto pr-1 pl-2">
                        {cart.map((item) => (
                          <div 
                            key={item.id} 
                            className="py-4 px-3 border border-gray-200 rounded-md my-2 hover:bg-white transition-colors relative"
                          >
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  src={item.image || "/api/placeholder/80/80"}
                                  alt={item.name}
                                  className="h-16 w-16 object-cover rounded-md border border-gray-200 shadow-sm"
                                />
                              </div>
                              <div className="flex-grow pr-8">
                                <div className="flex justify-between">
                                  <h4 className="font-medium text-gray-800 line-clamp-2">
                                    {item.name}
                                  </h4>
                                  <div className="flex-shrink-0 text-right">
                                    <p className="font-bold text-black">
                                      ₹{Number(item.price).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex justify-between items-end mt-2">
                                  <div className="flex items-center bg-gray-100 rounded-md px-2">
                                    <span className="text-xs text-gray-600 mr-1">Qty:</span>
                                    <span className="font-medium">{item.quantity}</span>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-gray-700">
                                      ₹{(item.price * item.quantity).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* Remove button */}
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-full transition-colors"
                                aria-label="Remove item"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Order Summary Totals */}
                  {cart.length > 0 && (
                    <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex justify-between text-gray-600 text-sm mb-2">
                        <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                      </div>
                      {isApplied && (
                        <div className="flex justify-between text-green-600 text-sm">
                          <span>15% Discount:</span>
                          <span>-₹{(cartTotal * 0.15).toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="border-t border-b py-2 mt-1 text-center">
                  <p className="text-xl text-black-700">
                    Earn coin <span className="font-bold">{Math.floor(cartTotal * 0.01)}</span> Kapiva Coins
                  </p>
                  <p className="text-2xl font-bold text-green-600">coin</p>
                  <p className="text-sm text-gray-600">
                    Redeem it on the app (1 Coin = ₹1 Discount)
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold flex items-center justify-between">
                    <span>Coupons</span>
                    {isApplied && (
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Saved ₹{(cartTotal * 0.15).toFixed(2)}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">
                    (Not applicable on Free Gift)
                  </p>
                  <p className="text-sm text-green-700 font-semibold">
                    Earn 5% Kapiva Coins on every order.{" "}
                    <span className="text-blue-600 cursor-pointer">
                      LOGIN NOW!
                    </span>
                  </p>

                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter COUPON CODE"
                      value={isApplied ? "PAYDAY15 - Applied" : appliedCoupon}
                      onChange={(e) => {
                        setAppliedCoupon(e.target.value);
                        setIsApplied(false);
                      }}
                      className={`flex-1 p-2 border rounded-md ${isApplied ? 'bg-green-50 border-green-200' : ''}`}
                      readOnly={isApplied}
                    />
                    <button
                      className={`px-4 rounded-md ${
                        isApplied ? "bg-red-500 hover:bg-red-600" : "bg-yellow-500 hover:bg-yellow-600"
                      } text-white transition-colors`}
                      onClick={handleApply}
                    >
                      {isApplied ? "Remove Offer" : "Apply"}
                    </button>
                  </div>

                  <div className="flex mt-4 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <div className="w-1/4 bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center p-4">
                      <div className="text-center">
                        <p className="text-xl font-bold text-white">15%</p>
                        <p className="text-xs text-white font-semibold">OFF</p>
                      </div>
                    </div>
                    <div className="w-3/4 bg-white p-4">
                      <p className="text-sm mt-1">
                        <span className="text-lg font-bold">PAYDAY15:</span> Up
                        to 15% off - Add more, Save more
                      </p>
                      <div className="flex justify-center mt-3">
                        <button
                          className="text-yellow-600 font-medium hover:text-yellow-700 bg-yellow-50 hover:bg-yellow-100 px-4 py-1 rounded-full text-sm transition-colors"
                          onClick={handleTapToApply}
                        >
                          TAP TO APPLY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Summary Section (With Smooth Opening/Closing) */}
                <div className="mt-8">
                  <div
                    className="flex items-center justify-between cursor-pointer bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowPriceDetails(!showPriceDetails)}
                  >
                    <h3 className="text-xl font-semibold">Price Summary</h3>
                    <div className="flex items-center">
                      <span className="mr-3 font-medium">₹{grandTotal.toFixed(2)}</span>
                      <svg 
                        className={`w-5 h-5 transition-transform duration-300 ${showPriceDetails ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: showPriceDetails ? 1 : 0,
                      height: showPriceDetails ? "auto" : 0,
                      paddingTop: showPriceDetails ? "1rem" : 0,
                      paddingBottom: showPriceDetails ? "1rem" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    {showPriceDetails && (
                      <div className="bg-white rounded-lg border border-gray-200 mt-3 p-4 shadow-sm">
                        <ul className="space-y-3">
                          <li className="flex justify-between">
                            <span className="text-gray-600">Total MRP:</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Discount on MRP:</span>
                            <span className="text-green-600">- ₹0.00</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Coupon Discount:</span>
                            <span className="text-green-600">- ₹{couponDiscount.toFixed(2)}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Online Payment Discount:</span>
                            <span className="text-green-600">- ₹{onlinePaymentDiscount.toFixed(2)}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Shipping (Free Above Rs.699):</span>
                            <span>{shippingCost > 0 ? `₹${shippingCost.toFixed(2)}` : 'FREE'}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">GST (Inclusive):</span>
                            <span>₹{gstAmount.toFixed(2)}</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </motion.div>

                  <div className="mt-6">
                    <div className="flex justify-between font-bold py-4 border-t border-b border-gray-200 text-lg">
                      <span>Grand Total:</span>
                      <span>₹{grandTotal.toFixed(2)}</span>
                    </div>

                    <div className="mt-4 flex justify-center items-center relative space-x-0">
                      <div className="absolute -left-2 flex items-center justify-center w-14 h-14 bg-yellow-100 rounded-full border-4 border-white shadow-lg">
                        <span className="text-yellow-600 text-xl font-bold">₹</span>
                      </div>
                      <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg pl-14 pr-4 py-3 w-full shadow-sm border border-amber-200">
                        <span className="text-base text-gray-800 font-medium">
                          You'll <span className="font-bold text-green-700">save ₹{totalSavings.toFixed(2)}</span>{" "}
                          on this order!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;