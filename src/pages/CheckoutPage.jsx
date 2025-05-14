import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [showPriceDetails, setShowPriceDetails] = useState(true);

  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [isApplied, setIsApplied] = useState(false);

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
            src="./public/himalixirlogomain.png"
            alt="Company Logo"
            className="h-13"
          />
        </div>
      </nav>

      {/* Checkout Content */}
      <div className="">
        {/* Split Layout Section */}
        <div className=" ">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-0">
            {/* Left 50% Section */}

            <div className="w-full md:w-1/2 bg-white p-0 rounded-lg ">
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
                      src="./src/assets/paytm.png"
                      alt="Paytm"
                      className="h-8"
                    />
                    <img src="./src/assets/upi.png" alt="UPI" className="h-8" />
                    <img
                      src="./src/assets/google pay.png"
                      alt="GPay"
                      className="h-8"
                    />
                    <img
                      src="./src/assets/visa.png"
                      alt="Visa"
                      className="h-8"
                    />
                    <img
                      src="./src/assets/rupay.png"
                      alt="Rupay"
                      className="h-8"
                    />
                  </div>
                </div>

                <div className="mt-10 pb-10">
                  <div className="flex justify-between flex-wrap gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <img
                        src="./src/assets/delivery.png"
                        alt="Delivery"
                        className="h-10 w-10"
                      />
                      <p className="text-sm mt-2">
                        Free Shipping <br /> above 699
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="./src/assets/hand.png"
                        alt="Refunds"
                        className="h-10 w-10"
                      />
                      <p className="text-sm mt-2">
                        Hassle-free <br /> refunds
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="./src/assets/tree.png"
                        alt="Natural"
                        className="h-10 w-10"
                      />
                      <p className="text-sm mt-2">
                        All natural <br /> products
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="./src/assets/user.png"
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

            <div className="w-full md:w-1/2 bg-white p-0 rounded-lg ">
              <div className="w-full  bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold mb-4">Order Summary</h1>
                <div className="mt-6">
                  <h3 className="font-semibold text-lg">Your Order</h3>
                  <div className="border-t mt-2 pt-2">
                    <p>Product Name: Sample Product</p>
                    <p>Quantity: 1</p>
                    <p>Price: ₹1,499</p>
                    <p>Total: ₹1,499</p>
                  </div>
                </div>

                <div className="border-t border-b py-2 mt-1 text-center">
                  <p className="text-xl text-black-700">
                    Earn coin <span className="font-bold">14</span> Kapiva Coins
                  </p>
                  <p className="text-2xl font-bold text-green-600">coin</p>
                  <p className="text-sm text-gray-600">
                    Redeem it on the app (1 Coin = ₹1 Discount)
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold">Coupons</h3>
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
                      className="flex-1 p-2 border rounded-md"
                      readOnly={isApplied}
                    />
                    <button
                      className={`px-4 rounded-md ${
                        isApplied ? "bg-red-500" : "bg-yellow-500"
                      } text-white`}
                      onClick={handleApply}
                    >
                      {isApplied ? "Remove Offer" : "Apply"}
                    </button>
                  </div>

                  <div className="flex mt-4 rounded-md overflow-hidden shadow">
                    <div className="w-2/7 bg-gray-400 flex items-center justify-center p-4">
                      <p className="text-xl font-bold text-white">15% Off</p>
                    </div>
                    <div className="w-3/5 h-26 bg-white p-4">
                      <p className="text-sm mt-3 whitespace-nowrap">
                        <span className="text-lg font-bold">PAYDAY15:</span> Up
                        to 15% off - Add more, Save more
                      </p>
                      <div className="flex justify-center mt-2">
                        <p
                          className="text-yellow-600 font-medium cursor-pointer"
                          onClick={handleTapToApply}
                        >
                          TAP TO APPLY
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Summary Section (With Smooth Opening/Closing) */}
                <div className="mt-8">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setShowPriceDetails(!showPriceDetails)}
                  >
                    <h3 className="text-3xl font-semibold">Price Summary</h3>
                    <i
                      className={`text-3xl transition-transform duration-300 ${
                        showPriceDetails
                          ? "ri-arrow-down-s-line"
                          : "ri-arrow-up-s-line"
                      }`}
                    ></i>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: showPriceDetails ? 1 : 0,
                      height: showPriceDetails ? "auto" : 0,
                      paddingTop: showPriceDetails ? "1rem" : 0,
                      paddingBottom: showPriceDetails ? "1rem" : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ overflow: "hidden" }}
                  >
                    {showPriceDetails && (
                      <ul className="space-y-2 mt-4">
                        <li className="flex justify-between">
                          <span>Total MRP:</span>
                          <span>₹1,499.00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Discount on MRP:</span>
                          <span>- ₹500.00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Coupon Discount:</span>
                          <span>- ₹0.00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Online Payment Discount:</span>
                          <span>- ₹49.95</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Shipping (Free Above Rs.699):</span>
                          <span>₹0.00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>GST (Inclusive):</span>
                          <span>₹48.00</span>
                        </li>
                      </ul>
                    )}
                  </motion.div>

                  <div className="mt-8">
                    <div className="flex justify-between font-bold mt-4 border-t pt-4">
                      <span>Grand Total:</span>
                      <span>₹949.05</span>
                    </div>

                    <div className="mt-4 flex justify-center items-center relative space-x-0 pb-30 sm:pb-0">
                      <img
                        src="./src/assets/ferr.jpg"
                        alt="Savings Logo"
                        className="h-[48px] w-[48px] rounded-full z-10 -mr-4"
                      />
                      <div className="bg-amber-100 rounded-tr-lg rounded-br-lg px-4 py-2 w-[310px] sm:w-[340px] pl-5 relative z-0 whitespace-nowrap overflow-hidden text-ellipsis">
                        <span className="text-sm sm:text-base text-gray-800">
                          You’ll <span className="font-bold">save ₹14.95</span>{" "}
                          on this order
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
