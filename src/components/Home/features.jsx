import { Calendar, Clock, Wrench, ChevronRight } from 'lucide-react';
import backgroundImage from '../../assets/bgg.jpg';

const Features = () => {
  const steps = [
    {
      icon: <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-primary group-hover:text-accent" />,
      title: "Choose a Service",
      description: "Select from our wide range of professional home services",
    },
    {
      icon: <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-primary group-hover:text-accent" />,
      title: "Schedule a Time",
      description: "Pick a convenient time that works with your schedule",
    },
    {
      icon: <Wrench className="w-8 h-8 sm:w-10 sm:h-10 text-primary group-hover:text-accent" />,
      title: "We Do the Work",
      description: "Our verified professionals handle everything with care",
    },
  ];

  console.log('Features component rendered');

  return (
    <section
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-[400px] sm:min-h-[500px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
      }}
    >
      <div className="max-w-full sm:max-w-4xl md:max-w-6xl mx-auto px-2 sm:px-0">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary mb-3 sm:mb-4 font-inter">
            How It Works
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-secondary max-w-full sm:max-w-2xl mx-auto leading-relaxed">
            Get your home services done in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center p-6 sm:p-8 bg-white/90 border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300 group w-full"
            >
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-6 sm:top-8 left-full w-full md:w-auto md:left-auto md:right-[-50%] flex justify-center sm:hidden md:flex">
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2 font-inter">{step.title}</h3>
              <p className="text-sm sm:text-base text-secondary leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;