import { useState } from 'react'
import Footer from '../components/Footer'
import SwiperBanner from '../components/SwiperBanner'
import Categories from '../components/CategoryCard'
import Products from '../components/ProductCard'

const HomePage = () => {
  return (
    <>
      <main className="flex-grow container mx-auto px-4 py-6">
        <SwiperBanner />
        <Categories />
        <Products />
      </main>
      <Footer />
    </>
  )
}

export default HomePage