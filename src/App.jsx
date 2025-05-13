import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
// import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";

import AboutPage from "./pages/AboutPage"; // Adjust path if needed
import Header from "./components/Header";
import ContactPage from "./pages/ContactPage";
import CartDrawer from "./components/CartDrawer";

function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Main Routes */}
        <Route index element={<HomePage />} />
        <Route path="shop" element={<><Header /><ShopPage /></>} />
         
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartDrawer />} />
        <Route path="checkout" element={<CheckoutPage />} />

        {/* Additional Pages */}
        <Route path="about" element={<><Header /><AboutPage /></>} />
        <Route path="contact" element={<ContactPage />} />

        {/* 404 Handling */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
