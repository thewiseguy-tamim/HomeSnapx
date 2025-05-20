import React from 'react';
import { CheckCircle, Users, Award, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '5000+', label: 'Happy Customers', icon: Users },
    { number: '10+', label: 'Years Experience', icon: Award },
    { number: '24/7', label: 'Customer Support', icon: Clock },
    { number: '99%', label: 'Satisfaction Rate', icon: CheckCircle }
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We never compromise on the quality of our services. Every job is completed to the highest standards.',
      icon: Award
    },
    {
      title: 'Reliable Service',
      description: 'Count on us to be there when you need us. We respect your time and keep our commitments.',
      icon: CheckCircle
    },
    {
      title: 'Expert Team',
      description: 'Our skilled professionals are trained, certified, and passionate about delivering excellence.',
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Our Company
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're passionate about making your home a better place to live. With years of experience 
            and a commitment to excellence, we deliver reliable home services that exceed expectations.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded with a simple mission to provide exceptional home services, we started as a 
                small local business with big dreams. Today, we've grown into a trusted name in the 
                community, serving thousands of satisfied customers.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                What sets us apart is our unwavering commitment to quality, reliability, and customer 
                satisfaction. Every member of our team shares the same dedication to making your home 
                service experience smooth and stress-free.
              </p>
              <div className="flex items-center space-x-4">
                <CheckCircle className="text-green-500 w-5 h-5" />
                <span className="text-gray-700">Licensed & Insured</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <CheckCircle className="text-green-500 w-5 h-5" />
                <span className="text-gray-700">Background Checked Professionals</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <CheckCircle className="text-green-500 w-5 h-5" />
                <span className="text-gray-700">100% Satisfaction Guarantee</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-blue-100 leading-relaxed">
                To provide exceptional home services that enhance the comfort, safety, and value of 
                every home we serve. We believe everyone deserves a well-maintained, beautiful home, 
                and we're here to make that happen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Trusted by Thousands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <IconComponent className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <IconComponent className="w-10 h-10 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Our experienced professionals are the heart of our company. Each team member brings 
            expertise, dedication, and a commitment to delivering exceptional service to your home.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <img 
                  src={`/api/placeholder/150/150`} 
                  alt="Team member" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Team Member {member}</h3>
                <p className="text-blue-500 mb-3">Service Specialist</p>
                <p className="text-gray-600 text-sm">
                  Dedicated to providing exceptional service and ensuring customer satisfaction.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of satisfied customers who trust us with their home service needs.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-full sm:w-auto">
              Get Free Quote
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors w-full sm:w-auto">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;