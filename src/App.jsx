import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import SearchPage from "./pages/SearchPage"; // Updated import path

function App() {
  // Global cart drawer state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Handler to open cart drawer
  const handleCartOpen = () => setIsCartOpen(true);

  // Handler to close cart drawer
  const handleCartClose = () => setIsCartOpen(false);

  return (
    <CartProvider>
      {/* Shared CartDrawer component that works across all pages */}
      <CartDrawer isOpen={isCartOpen} onClose={handleCartClose} />

      <Routes>
        {/* Main Routes */}
        <Route
          index
          element={
            <>
              <Header onCartClick={handleCartOpen} />
              <HomePage />
            </>
          }
        />

        <Route
          path="shop"
          element={
            <>
              <Header onCartClick={handleCartOpen} />
              <ShopPage />
            </>
          }
        />

        <Route
          path="product/:id"
          element={
            <>
              <Header onCartClick={handleCartOpen} />
              <ProductPage />
            </>
          }
        />

        <Route
          path="checkout"
          element={
            <>
              {/* <Header onCartClick={handleCartOpen} /> */}
              <CheckoutPage />
            </>
          }
        />

        {/* Additional Pages */}
        <Route
          path="about"
          element={
            <>
              <Header onCartClick={handleCartOpen} />
              <AboutPage />
            </>
          }
        />

        {/* Search Page with Header */}
        <Route
          path="search"
          element={
            <>
              <Header onCartClick={handleCartOpen} />
              <SearchPage />
            </>
          }
        />

        <Route
          path="contact"
          element={
            <>
              <Header onCartClick={handleCartOpen} />
              <ContactPage />
            </>
          }
        />

        {/* 404 Handling */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;