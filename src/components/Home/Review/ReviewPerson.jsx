import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import women from "../../../assets/women.png";
import man from "../../../assets/man.webp";
import man1 from "../../../assets/man2.jpeg";

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Emily Davis",
      role: "Homeowner",
      image: women,
      rating: 5,
      text: "The team arrived right on time and fixed our plumbing issue quickly. Super professional, polite, and tidy. It's hard to find reliable service like this anymore!"
    },
    {
      id: 2,
      name: "James Thompson",
      role: "Apartment Renter",
      image: man,
      rating: 5,
      text: "I booked a deep cleaning service and they did a fantastic job. Everything sparkled afterward! Their attention to detail really impressed me."
    },
    {
      id: 3,
      name: "Olivia Martinez",
      role: "Working Professional",
      image: man1,
      rating: 5,
      text: "Quick, efficient, and friendly! I used their handyman service for several small fixes around the house, and they handled everything perfectly."
    }
  ];

  // Automatic slide transition
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Happy & Satisfied Faces
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Here's what some of my satisfied clients have to say about my work
          </p>
        </div>

        {/* Testimonial Card Container */}
        <div className="relative bg-white rounded-2xl shadow-lg p-4 md:p-8 mx-2 md:mx-8">
          <div className="flex items-center justify-between">
            {/* Left Navigation Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center hover:border-gray-400 transition-colors"
            >
              <ChevronLeft size={16} md:size={20} className="text-gray-600" />
            </button>

            {/* Testimonial Content */}
            <div className="flex items-center gap-4 md:gap-8 w-full px-2 md:px-16">
              {/* Profile Image with Blue Border */}
              <div className="flex-shrink-0 w-40 h-48 md:w-64 md:h-80">
                <div className="relative w-full h-full">
                  <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-blue-500 bg-gradient-to-b from-blue-400 to-blue-600">
                    <img
                      src={testimonials[currentSlide].image}
                      alt={testimonials[currentSlide].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="flex-1 pl-2 md:pl-8">
                {/* Quote Icon */}
                <div className="text-4xl md:text-6xl text-blue-400 font-serif mb-2 md:mb-4">"</div>
                
                {/* Testimonial Text */}
                <p className="text-gray-700 text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
                  {testimonials[currentSlide].text}
                </p>

                {/* Star Rating */}
                <StarRating rating={testimonials[currentSlide].rating} />

                {/* Author Info */}
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                    {testimonials[currentSlide].name}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base">
                    {testimonials[currentSlide].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Navigation Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-blue-400 bg-white flex items-center justify-center hover:border-blue-500 transition-colors"
            >
              <ChevronRight size={16} md:size={20} className="text-blue-500" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-4 md:mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;