import React, { useEffect, useState } from 'react';
import ServiceItem from './ServiceItem';
import ErrorAlert from '../ErrorAlert';
import apiClient from '../../Services/api-client';
import backgroundImage from '../../assets/bgg.jpg'; // Import the background image

const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab] = useState('FEATURED');

  useEffect(() => {
    setLoading(true);
    apiClient
      .get('/services')
      .then((res) => {
        setServices(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section
      className="mx-auto py-16 bg-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Optional: for parallax effect
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex">
            <button
              className="px-6 py-2 text-lg font-medium tracking-wide uppercase text-black border-b-2 border-black"
            >
              FEATURED
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center my-20">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-black"></div>
          </div>
        ) : error ? (
          <ErrorAlert message={error} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 4).map((service, index) => (
              <ServiceItem key={service.id} service={service} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Service;