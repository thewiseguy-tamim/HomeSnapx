import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../Services/api-client';
import carpentryImage from '../../assets/carpentry.jpg';
import cleaningImage from '../../assets/cleaning.jpg';
import electricalImage from '../../assets/electrical.jpg';
import gardeningImage from '../../assets/gardening.jpg';
import paintingImage from '../../assets/painting.jpg';
import plumbingImage from '../../assets/plumbing.jpg';

const imageMap = {
  1: cleaningImage,
  2: plumbingImage,
  3: electricalImage,
  4: gardeningImage,
  5: paintingImage,
  6: carpentryImage,
};

const ServiceItem = ({ service, index }) => {
  const navigate = useNavigate();
  const isOnSale = index === 2; // Mock sale status for demo
  const originalPrice = isOnSale ? (service.price * 1.6).toFixed(2) : null;

  const handleBookNow = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `JWT ${token}` } : {};
      const response = await apiClient.get('/api/purchase/check/', { headers });
      if (response.data.has_purchased) {
        navigate(`/shop/${service.id}`);
      } else {
        navigate(`/purchase/${service.id}`);
      }
    } catch (err) {
      console.error('Purchase check error:', err.response?.data);
      navigate(`/purchase/${service.id}`);
    }
  };

  return (
    <div className="group cursor-pointer flex flex-col h-full">
      {/* Product Image */}
      <div className="relative mb-4">
        {isOnSale && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
            sale
          </span>
        )}
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <img
            src={imageMap[service.id] || '/api/placeholder/300/300'}
            alt={service.name || 'Service'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow space-y-2">
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
          {service.name}
        </h3>
        
        <div className="flex items-center space-x-2">
          {isOnSale ? (
            <>
              <span className="text-sm font-medium text-red-500">
                Now ${service.price}/month
              </span>
              <span className="text-sm text-gray-400 line-through">
                Was ${originalPrice}/month
              </span>
            </>
          ) : (
            <span className="text-sm font-medium text-gray-900">
              ${service.price}/month
            </span>
          )}
        </div>

        {/* Service Description with truncation */}
        <p className="text-sm text-gray-600 line-clamp-3 flex-grow">
          {service.description || 'Professional service to meet your needs.'}
        </p>

        {/* Book Now Button - Slightly visible, aligned at bottom */}
        <div className="mt-auto opacity-30 group-hover:opacity-100 transition-opacity duration-300 pt-4">
          <button
            onClick={handleBookNow}
            className="w-full bg-black text-white text-sm py-2 px-4 rounded hover:bg-gray-800 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;