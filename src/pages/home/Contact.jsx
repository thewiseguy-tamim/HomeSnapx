import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  User, 
  Calendar,
  Star,
  CheckCircle,
  ArrowRight,
  Zap
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        preferredTime: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      info: '+1 (555) 123-4567',
      subInfo: 'Mon-Fri 8AM-8PM',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      title: 'Email Us',
      info: 'hello@homesnap.com',
      subInfo: 'We reply within 24hrs',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      info: '123 Service Street',
      subInfo: 'City, State 12345',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      info: 'Mon-Fri: 8AM-8PM',
      subInfo: 'Sat-Sun: 9AM-6PM',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const services = [
    'Home Cleaning',
    'Carpentry & Repair',
    'Interior Painting',
    'Plumbing Services',
    'Electrical Work',
    'Garden Maintenance',
    'Other'
  ];

  const stats = [
    { number: '5000+', label: 'Happy Customers' },
    { number: '99%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Support Available' },
    { number: '10+', label: 'Years Experience' }
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          
          .contact-hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            position: relative;
            overflow: hidden;
          }
          
          .contact-hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
            pointer-events: none;
          }
          
          .contact-hero::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%239C92AC" fill-opacity="0.05"><circle cx="30" cy="30" r="2"/></g></g></svg>');
            pointer-events: none;
          }
          
          .hero-content {
            position: relative;
            z-index: 1;
          }
          
          .contact-card {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 24px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .contact-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #7c3aed, #10b981);
          }
          
          .contact-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 32px 64px rgba(0, 0, 0, 0.15);
          }
          
          .info-card {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 2rem;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .info-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.05) 100%);
            pointer-events: none;
          }
          
          .info-card:hover {
            transform: translateY(-4px);
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
          
          .gradient-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            transition: all 0.3s ease;
          }
          
          .info-card:hover .gradient-icon {
            transform: scale(1.1) rotate(5deg);
          }
          
          .form-input {
            background: rgba(255, 255, 255, 0.95);
            border: 2px solid rgba(59, 130, 246, 0.1);
            border-radius: 12px;
            padding: 1rem;
            width: 100%;
            transition: all 0.3s ease;
            font-family: 'Inter', sans-serif;
          }
          
          .form-input:focus {
            outline: none;
            border-color: #3b82f6;
            background: white;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
            transform: translateY(-2px);
          }
          
          .form-textarea {
            min-height: 120px;
            resize: vertical;
          }
          
          .submit-btn {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            border: none;
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            font-family: 'Inter', sans-serif;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            width: 100%;
            position: relative;
            overflow: hidden;
          }
          
          .submit-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
          }
          
          .submit-btn:hover::before {
            left: 100%;
          }
          
          .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(59, 130, 246, 0.4);
            background: linear-gradient(135deg, #1d4ed8, #1e40af);
          }
          
          .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
          }
          
          .success-message {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-weight: 600;
            animation: slideIn 0.5s ease;
          }
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .stats-card {
            text-align: center;
            color: white;
            padding: 1.5rem;
          }
          
          .stats-number {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #60a5fa, #a78bfa);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.5rem;
          }
          
          .section-title {
            background: linear-gradient(135deg, #1e293b, #475569);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 800;
            text-align: center;
            margin-bottom: 1rem;
          }
          
          .section-subtitle {
            color: #64748b;
            text-align: center;
            margin-bottom: 3rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .floating-element {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .pulse-animation {
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}
      </style>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="contact-hero py-20 flex items-center justify-center min-h-screen">
          <div className="hero-content w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                  <Zap size={16} className="text-blue-400" />
                  <span className="text-blue-100 text-sm font-medium">24/7 Customer Support</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-inter">
                  Get In <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
                </h1>
                
                <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  Ready to transform your home? We're here to help you every step of the way. 
                  Reach out to us and let's discuss your next project.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 justify-items-center">
                {stats.map((stat, index) => (
                  <div key={index} className="stats-card floating-element" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="stats-number font-inter">{stat.number}</div>
                    <div className="text-slate-300 font-medium font-inter">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 justify-items-center">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="info-card text-center">
                      <div className={`gradient-icon bg-gradient-to-r ${info.color} mx-auto`}>
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2 font-inter">{info.title}</h3>
                      <p className="text-blue-200 font-medium mb-1 font-inter">{info.info}</p>
                      <p className="text-slate-400 text-sm font-inter">{info.subInfo}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold section-title font-inter">
                Start Your Project Today
              </h2>
              <p className="text-lg section-subtitle font-inter">
                Fill out the form below and we'll get back to you within 24 hours with a personalized quote.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="contact-card p-8 md:p-12">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-2 font-inter">
                          <User size={16} className="inline mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="form-input"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-slate-700 font-semibold mb-2 font-inter">
                          <Mail size={16} className="inline mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="form-input"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-2 font-inter">
                          <Phone size={16} className="inline mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-slate-700 font-semibold mb-2 font-inter">
                          <Calendar size={16} className="inline mr-2" />
                          Preferred Contact Time
                        </label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          className="form-input"
                        >
                          <option value="">Select preferred time</option>
                          <option value="morning">Morning (8AM - 12PM)</option>
                          <option value="afternoon">Afternoon (12PM - 5PM)</option>
                          <option value="evening">Evening (5PM - 8PM)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-2 font-inter">
                        <Star size={16} className="inline mr-2" />
                        Service Needed *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-2 font-inter">
                        <MessageCircle size={16} className="inline mr-2" />
                        Project Details *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="form-input form-textarea"
                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="success-message">
                    <CheckCircle size={24} />
                    Thank you! We've received your message and will get back to you within 24 hours.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6 font-inter">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto font-inter">
              Join thousands of satisfied customers who have transformed their homes with HomeSnap.
            </p>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 hover:transform hover:scale-105 font-inter"
            >
              <Phone size={24} />
              Call Now: (555) 123-4567
              <ArrowRight size={20} />
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;