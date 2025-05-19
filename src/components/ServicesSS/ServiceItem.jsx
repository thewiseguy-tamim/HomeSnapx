import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../Services/api-client';

// Import all available images
import carpentryImage from '../../assets/carpentry.jpg';
import cleaningImage from '../../assets/cleaning.jpg';
import electricalImage from '../../assets/electrical.jpg';
import gardeningImage from '../../assets/gardening.jpg';
import paintingImage from '../../assets/painting.jpg';
import plumbingImage from '../../assets/plumbing.jpg';

const imageMap = {
  1: cleaningImage,    // House Cleaning
  2: plumbingImage,   // Plumbing
  3: electricalImage, // Electrical
  4: gardeningImage,  // Gardening
  5: paintingImage,   // Painting
  6: carpentryImage,  // Carpentry
};

const ServiceItem = ({ service }) => {
  const navigate = useNavigate();

  const handleBuyNow = async () => {
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
    <div className="flex justify-center items-center">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img
            src={imageMap[service.id] || "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg"}
            alt={service.name || "Service"}
            className="rounded-xl"
            onError={(e) => { e.target.src = "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg"; }}
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{service.name}</h2>
          <h3 className="font-bold text-xl text-green-600">${service.price}/month</h3>
          <p>{service.description}</p>
          <div className="card-actions mt-1">
            <button 
              className="btn btn-primary"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;