const CarouselSlide = ({ title, sub, image }) => {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-8 flex items-center">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="w-full md:w-1/2 text-center md:text-left animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
              {title}
            </h1>
            <p className="text-gray-100 mt-4 mb-8 text-lg md:text-xl font-light max-w-md">
              {sub}
            </p>
            <button className="group relative overflow-hidden rounded-full bg-white px-8 py-3 text-lg font-medium text-gray-900 shadow-md transition-all duration-300 hover:shadow-lg">
              <span className="relative z-10">Book Now</span>
              <span className="absolute bottom-0 left-0 h-full w-0 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              <span className="absolute bottom-0 left-0 h-full w-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-70 blur-md transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>

          {/* Right Image */}
          <div className="hidden md:block w-full md:w-1/2 animate-fadeInScale">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 opacity-70 blur"></div>
              <img
                src={image}
                alt="Service preview"
                className="relative rounded-xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselSlide;