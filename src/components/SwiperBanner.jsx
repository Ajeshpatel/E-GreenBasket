import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './SwiperBanner.css'

const bannerSlides = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 50% off selected items",
    image: "https://images.pexels.com/photos/14924052/pexels-photo-14924052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cta: "Shop Now",
    link: "/shop"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Discover our latest collection",
    image: "https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cta: "Explore",
    link: "/shop"
  },
  {
    id: 3,
    title: "Exclusive Deals",
    subtitle: "Limited time offers",
    image: "https://images.pexels.com/photos/3184464/pexels-photo-3184464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cta: "Grab Now",
    link: "/shop"
  },
  {
    id: 4,
    title: "Trendy Picks",
    subtitle: "Discover your style",
    image: "https://images.pexels.com/photos/14666034/pexels-photo-14666034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cta: "Browse",
    link: "/shop"
  }
]

const SwiperBanner = () => {
  return (
    <div className="mb-10 rounded-xl overflow-hidden relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        onSwiper={(swiper) => {
          swiper.autoplay.start(); // 🛠 Ensure autoplay starts on mount
        }}
      >
        {bannerSlides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-64 md:h-96 w-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="text-center  bg-opacity-50 p-6 rounded-lg max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{slide.title}</h2>
                <p className="text-lg md:text-xl text-white mb-4">{slide.subtitle}</p>
                <a
                  href={slide.link}
                  className="inline-block bg-white text-gray-800 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  {slide.cta}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SwiperBanner
