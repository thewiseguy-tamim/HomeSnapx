import React, { useEffect, useState } from 'react';
import ServiceItem from './ServiceItem';

import apiClient from '../../Services/api-client';
import backgroundImage from '../../assets/bgg.jpg'; 
import { Import } from 'lucide-react';
import ServiceAlert from '../ServiceAlert';
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
        backgroundAttachment: 'fixed', 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex">
            <h2
              className="text-4xl md:text-5xl font-semibold text-primary mb-4 font-inter"
            >
              FEATURED
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center my-20">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-black"></div>
          </div>
        ) : error ? (
          <ServiceAlert message={error} />
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