import { Calendar, Clock, Wrench, ChevronRight } from 'lucide-react';

const Features = () => {
  const steps = [
    {
      icon: <Calendar className="w-10 h-10 text-primary group-hover:text-accent" />,
      title: "Choose a Service",
      description: "Select from our wide range of professional home services",
    },
    {
      icon: <Clock className="w-10 h-10 text-primary group-hover:text-accent" />,
      title: "Schedule a Time",
      description: "Pick a convenient time that works with your schedule",
    },
    {
      icon: <Wrench className="w-10 h-10 text-primary group-hover:text-accent" />,
      title: "We Do the Work",
      description: "Our verified professionals handle everything with care",
    },
  ];

  console.log('Features component rendered');

  return (
    <section className="py-24 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-[500px] flex items-center justify-center">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-primary mb-4 font-inter">
            How It Works
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            Get your home services done in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center p-8 bg-bg-primary rounded-2xl shadow-md hover:shadow-lg hover:scale-102 transition-all duration-300 group"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-full w-full md:w-auto md:left-auto md:right-[-50%] flex justify-center">
                    <ChevronRight className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2 font-inter">{step.title}</h3>
              <p className="text-secondary text-base leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;