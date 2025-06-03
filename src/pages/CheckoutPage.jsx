import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { TrashIcon, CreditCardIcon, BanknotesIcon, DevicePhoneMobileIcon, XMarkIcon, CheckIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const Checkout = () => {
  const { cart, cartTotal, removeFromCart } = useCart();
  const [showPriceDetails, setShowPriceDetails] = useState(true);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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

  const handleProceedToPayment = () => {
    setShowPaymentGateway(true);
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) return;
    
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setPaymentSuccess(false);
        setShowPaymentGateway(false);
        setSelectedPaymentMethod("");
      }, 3000);
    }, 2000);
  };

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCardIcon,
      description: "Visa, Mastercard, RuPay",
      popular: true
    },
    {
      id: "upi",
      name: "UPI",
      icon: DevicePhoneMobileIcon,
      description: "Google Pay, PhonePe, Paytm",
      popular: true
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: BanknotesIcon,
      description: "All major banks"
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: DevicePhoneMobileIcon,
      description: "Paytm, Mobikwik, Amazon Pay"
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: BanknotesIcon,
      description: "Pay when you receive"
    }
  ];

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

      {/* Payment Gateway Modal */}
      <AnimatePresence>
        {showPaymentGateway && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Payment Gateway Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Secure Payment</h2>
                    <p className="text-blue-100 mt-1">Choose your preferred payment method</p>
                  </div>
                  <button
                    onClick={() => setShowPaymentGateway(false)}
                    className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row">
                {/* Payment Methods Section */}
                <div className="flex-1 p-6">
                  <div className="flex items-center mb-6">
                    <LockClosedIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">SSL Secured Payment</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
                  
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          selectedPaymentMethod === method.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg mr-3 ${
                              selectedPaymentMethod === method.id
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}>
                              <method.icon className="h-6 w-6" />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium">{method.name}</span>
                                {method.popular && (
                                  <span className="ml-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">{method.description}</p>
                            </div>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedPaymentMethod === method.id
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300"
                          }`}>
                            {selectedPaymentMethod === method.id && (
                              <CheckIcon className="h-4 w-4 text-white" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Payment Details Form */}
                  {selectedPaymentMethod === "card" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-6 p-4 bg-gray-50 rounded-xl"
                    >
                      <h4 className="font-medium mb-4">Card Details</h4>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="flex space-x-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Cardholder Name"
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </motion.div>
                  )}

                  {selectedPaymentMethod === "upi" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-6 p-4 bg-gray-50 rounded-xl"
                    >
                      <h4 className="font-medium mb-4">UPI Details</h4>
                      <input
                        type="text"
                        placeholder="Enter UPI ID (e.g., yourname@paytm)"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:w-80 bg-gray-50 p-6 border-l">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  
                  {/* Cart Items Preview */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">
                      {cart.length} {cart.length === 1 ? "item" : "items"}
                    </div>
                    <div className="max-h-32 overflow-y-auto space-y-2">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center space-x-2 text-sm">
                          <img
                            src={item.image || "/api/placeholder/40/40"}
                            alt={item.name}
                            className="h-8 w-8 object-cover rounded"
                          />
                          <span className="flex-1 truncate">{item.name}</span>
                          <span className="font-medium">×{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm border-t pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    {isApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Coupon Discount:</span>
                        <span>-₹{couponDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-green-600">
                      <span>Online Payment Discount:</span>
                      <span>-₹{onlinePaymentDiscount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>{shippingCost > 0 ? `₹${shippingCost.toFixed(2)}` : "FREE"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (Inclusive):</span>
                      <span>₹{gstAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span>₹{grandTotal.toFixed(2)}</span>
                    </div>
                    {totalSavings > 0 && (
                      <div className="text-sm text-green-600 mt-2">
                        You save ₹{totalSavings.toFixed(2)}!
                      </div>
                    )}
                  </div>

                  {/* Pay Button */}
                  <button
                    onClick={handlePayment}
                    disabled={!selectedPaymentMethod || isProcessingPayment}
                    className={`w-full mt-6 py-4 rounded-xl font-semibold text-white transition-all ${
                      !selectedPaymentMethod || isProcessingPayment
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105"
                    }`}
                  >
                    {isProcessingPayment ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      `Pay ₹${grandTotal.toFixed(2)}`
                    )}
                  </button>
                </div>
              </div>

              {/* Payment Success Animation */}
              <AnimatePresence>
                {paymentSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center rounded-2xl"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckIcon className="h-12 w-12 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
                      <p className="text-gray-600">Your order has been confirmed</p>
                      <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                </form>

                <div className="mt-10 text-center sm:static sm:mt-10">
                  {/* Wrapper div fixed only on mobile */}
                  <div className="fixed bottom-0 z-20 left-0 right-0 bg-white p-2 sm:static sm:p-0">
                    <p className="text-sm text-orange-700 mb-1">
                      Pay online to get extra 5% upto Rs. 100
                    </p>
                    <button
                      type="button"
                      onClick={handleProceedToPayment}
                      className="w-full bg-gray-800 text-white py-6 px-4 rounded-md text-base font-medium hover:bg-gray-700 sm:py-3 sm:text-lg sm:font-semibold transition-colors hover:shadow-lg"
                    >
                      Proceed to Payment - ₹{grandTotal.toFixed(2)}
                    </button>
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
                      {cart.length} {cart.length === 1 ? "item" : "items"}
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
                                    <span className="text-xs text-gray-600 mr-1">
                                      Qty:
                                    </span>
                                    <span className="font-medium">
                                      {item.quantity}
                                    </span>
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
                        <span>
                          Items (
                          {cart.reduce((sum, item) => sum + item.quantity, 0)}):
                        </span>
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
                      className={`flex-1 p-2 border rounded-md ${
                        isApplied ? "bg-green-50 border-green-200" : ""
                      }`}
                      readOnly={isApplied}
                    />
                    <button
                      className={`px-4 rounded-md ${
                        isApplied
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
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
                      <span className="mr-3 font-medium">
                        ₹{grandTotal.toFixed(2)}
                      </span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${
                          showPriceDetails ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
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
                            <span className="text-gray-600">
                              Discount on MRP:
                            </span>
                            <span className="text-green-600">- ₹0.00</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">
                              Coupon Discount:
                            </span>
                            <span className="text-green-600">
                              - ₹{couponDiscount.toFixed(2)}
                            </span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">
                              Online Payment Discount:
                            </span>
                            <span className="text-green-600">
                              - ₹{onlinePaymentDiscount.toFixed(2)}
                            </span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">
                              Shipping (Free Above Rs.699):
                            </span>
                            <span>
                              {shippingCost > 0
                                ? `₹${shippingCost.toFixed(2)}`
                                : "FREE"}
                            </span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">
                              GST (Inclusive):
                            </span>
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
                        <span className="text-yellow-600 text-xl font-bold">
                          ₹
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg pl-14 pr-4 py-3 w-full shadow-sm border border-amber-200">
                        <span className="text-base text-gray-800 font-medium">
                          You'll{" "}
                          <span className="font-bold text-green-700">
                            save ₹{totalSavings.toFixed(2)}
                          </span>{" "}
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

// Mock Cart Context (for demonstration)
// const useCart = () => {
//   const [cart] = useState([
//     {
//       id: 1,
//       name: "Organic Green Tea",
//       price: 299,
//       quantity: 2,
//       image: "/api/placeholder/80/80"
//     },
//     {
//       id: 2,
//       name: "Herbal Wellness Capsules",
//       price: 599,
//       quantity: 1,
//       image: "/api/placeholder/80/80"
//     }
//   ]);

//   const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

//   const removeFromCart = (id) => {
//     console.log(`Removing item ${id} from cart`);
//   };

//   return { cart, cartTotal, removeFromCart };
// };

export default Checkout;