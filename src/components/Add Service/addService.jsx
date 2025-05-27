import React, { useState } from 'react';
import authApiClient from '../../Services/auth-api-client';

const AddService = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Convert duration to ISO 8601 format (e.g., PT1H30M for 1 hour 30 minutes)
      const durationParts = formData.duration.split(':');
      const hours = parseInt(durationParts[0]) || 0;
      const minutes = parseInt(durationParts[1]) || 0;
      const duration = `PT${hours}H${minutes}M`;

      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price).toFixed(2),
        duration,
      };

      const response = await authApiClient.post('/services/', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSuccess('Service added successfully!');
      setFormData({ name: '', description: '', price: '', duration: '' });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add service');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Create New Service
          </h1>
          <p className="text-slate-600 text-lg">
            Add a new service to your catalog
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Success/Error Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-emerald-700 font-medium">{success}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Name Field */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                Service Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength="100"
                  minLength="1"
                  className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 placeholder-slate-400 text-slate-700 font-medium group-hover:border-indigo-300/50"
                  placeholder="Enter service name"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Description Field */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Description
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  minLength="1"
                  rows="4"
                  className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 placeholder-slate-400 text-slate-700 font-medium resize-none group-hover:border-indigo-300/50"
                  placeholder="Enter service description"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Price and Duration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Field */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  Price ($)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0.01"
                    step="0.01"
                    className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 placeholder-slate-400 text-slate-700 font-medium group-hover:border-indigo-300/50"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Duration Field */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Duration (HH:MM)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    pattern="\d{1,2}:\d{2}"
                    className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 placeholder-slate-400 text-slate-700 font-medium group-hover:border-indigo-300/50"
                    placeholder="e.g., 01:30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="group relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-indigo-700 hover:to-purple-700"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Service
                </div>
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </form>

          {/* Decorative Elements */}
          <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 right-4 w-2 h-16 bg-gradient-to-b from-indigo-200/50 to-purple-200/50 rounded-full"></div>
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <span>Fill out all fields to create your service</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;