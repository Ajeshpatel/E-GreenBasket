import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SwiperBanner from '../components/SwiperBanner'
import Categories from '../components/CategoryCard'
import Products from '../components/ProductCard'
import CartDrawer from '../components/CartDrawer'

const HomePage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <Header onCartClick={() => setIsCartOpen(true)} />
      <main className="flex-grow container mx-auto px-4 py-6">
        <SwiperBanner />
        <Categories />
        <Products />
      </main>
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default HomePage