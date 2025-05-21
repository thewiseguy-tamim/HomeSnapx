import React, { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';


const config = {
  contactEmail: 'support@homesnap.com',
  contactPhone: '(+880) 12456-78901',
  supportImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  apiEndpoint: 'https://api.example.com/contact' 
};

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    agreeToPolicy: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.agreeToPolicy) newErrors.agreeToPolicy = 'You must agree to the privacy policy';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for the field being edited
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(config.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: '',
          agreeToPolicy: false
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop')`
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              
              {/* Left Side - Form */}
              <div className="p-8 lg:p-12">
                <div className="mb-8">
                  <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
                    Get in Touch
                  </span>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    Let's Chat, Reach Out to Us
                  </h1>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Have questions or feedback? We're here to help. Send us a message, and we'll respond within 24 hours
                  </p>
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl">
                    Your message has been sent successfully! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl">
                    Something went wrong. Please try again later.
                  </div>
                )}

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name"
                        className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white`}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name"
                        className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white`}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Leave us a message"
                      rows={5}
                      className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none`}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="agreeToPolicy"
                      name="agreeToPolicy"
                      checked={formData.agreeToPolicy}
                      onChange={handleInputChange}
                      className={`mt-1 w-4 h-4 text-blue-600 border ${errors.agreeToPolicy ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-blue-500`}
                    />
                    <label htmlFor="agreeToPolicy" className="text-sm text-gray-600">
                      I agree to our friendly{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                        privacy policy
                      </a>
                    </label>
                  </div>
                  {errors.agreeToPolicy && <p className="text-red-500 text-sm mt-1">{errors.agreeToPolicy}</p>}

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-800'}`}
                  >
                    <Send size={20} />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </div>

              {/* Right Side - Image and Contact Info */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 lg:p-12 flex flex-col justify-between">
                <div className="flex-1 flex items-center justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
                    <div className="relative z-10 bg-white rounded-2xl p-4 shadow-xl">
                      <img
                        src={config.supportImage}
                        alt="Friendly customer support representative"
                        className="w-64 h-64 object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">Email</h3>
                        <p className="text-gray-600">{config.contactEmail}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">Phone</h3>
                        <p className="text-gray-600">{config.contactPhone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;