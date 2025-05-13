import React from 'react';

const AboutPage = () => {
  
  return (
    
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            About <span className="text-blue-600">Our Store</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We’re dedicated to delivering top-notch products and exceptional service that bring comfort, joy, and value to your everyday life.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Our Story */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Story</h2>
            <p className="text-gray-600">
              Founded with a passion for innovation and quality, we started this journey to provide meaningful and affordable solutions.
              Every product in our store is carefully chosen and tested to ensure customer satisfaction and real value.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Premium, handpicked products</li>
              <li>Reliable customer service</li>
              <li>Fast and secure shipping</li>
              <li>100% satisfaction guaranteed</li>
            </ul>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Got questions?</h3>
          <p className="text-gray-600 mb-4">We're here to help you anytime. Feel free to reach out.</p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
