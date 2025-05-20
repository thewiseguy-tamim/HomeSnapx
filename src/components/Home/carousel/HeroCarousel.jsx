import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import CarouselSlide from "./CarouselSlide";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Import assets
import cleaning from "../../../assets/cleaning.jpg";
import carpentry from "../../../assets/carpentry.jpg";
import painting from "../../../assets/painting.jpg";

// Import custom styles
import "./carousel.css";

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const slides = [
    {
      title: "Premium Home Cleaning",
      sub: "Experience the difference with our professional cleaning services.",
      image: cleaning,
    },
    {
      title: "Expert Carpentry Craftsmanship",
      sub: "Bespoke woodwork solutions for your unique needs.",
      image: carpentry,
    },
    {
      title: "Transform Your Space",
      sub: "Professional painting services that bring your vision to life.",
      image: painting,
    },
  ];

  return (
    <div className="relative">
      <Swiper
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className}"></span>`;
          },
        }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        modules={[Autoplay, Pagination, EffectFade]}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <CarouselSlide title={slide.title} sub={slide.sub} image={slide.image} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Progress Bar */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <div key={index} className="relative h-1 w-16 bg-white/30 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full bg-white transition-all duration-300 ${
                index === currentIndex ? "animate-progress" : "w-0"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;