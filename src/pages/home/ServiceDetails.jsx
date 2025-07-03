import { Link, useParams } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import apiClient from "../../Services/api-client";
import ServiceImage from "../../components/ServiceDetails/ServiceImage";
import AddToCartButton from "../../components/ServiceDetails/AddToCartButton";
import ReviewSection from "../../components/Reviews/ReviewSection";

// Import images
import carpentryImage from '../../assets/carpentry.jpg';
import cleaningImage from '../../assets/cleaning.jpg';
import electricalImage from '../../assets/electrical.jpg';
import gardeningImage from '../../assets/gardening.jpg';
import paintingImage from '../../assets/painting.jpg';
import plumbingImage from '../../assets/plumbing.jpg';
import backgroundImage from '../../assets/bgg.jpg';

const imageMap = {
  1: cleaningImage,
  2: plumbingImage,
  3: electricalImage,
  4: gardeningImage,
  5: paintingImage,
  6: carpentryImage,
};

const ServiceDetail = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchService = async () => {
      if (!id) {
        console.error("No serviceId provided");
        setError("No serviceId provided");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log("Fetching service with ID:", id);
        const res = await apiClient.get(`/services/${id}/`);
        console.log("Fetched service:", res.data);
        setService(res.data);
      } catch (err) {
        console.error("Error fetching service:", err);
        setError("Service not found");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  // Get the appropriate image for the service - using same logic as ServiceItem
  const getServiceImage = () => {
    const serviceImage = imageMap[service?.id] || '/api/placeholder/400/400';
    return [serviceImage];
  };

  if (loading) return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <span className="loading loading-bars loading-xl"></span>
    </div>
  );

  if (error) return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="text-center bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        {error}
      </div>
    </div>
  );

  if (!service) return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="text-center bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        No Service Data Available...
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="w-full md:w-3/4 mx-auto px-4 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="mb-6">
            <Link
              to="/shop"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaArrowLeft className="mr-2 h-4 w-4" />
              Back to services
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <Suspense
              fallback={
                <div className="aspect-square bg-gray-100 animate-pulse rounded-xl"></div>
              }
            >
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={imageMap[service.id] || '/api/placeholder/400/400'}
                  alt={service.name || 'Service'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </Suspense>

            <div className="flex flex-col">
              <div className="mb-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{service.name}</h1>
              </div>

              <div className="mt-2 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">${service.price}</span>
                </div>
              </div>

              <div className="prose prose-sm mb-6">
                <p className="text-gray-600">{service.description}</p>
              </div>

              {/* <div className="mb-6">
                <div className="flex items-center">
                  <div className="mr-2 text-sm font-medium text-gray-700">Duration:</div>
                  <div className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm">
                    {service.duration}
                  </div>
                </div>
              </div> */}

              <div className="mb-6">
                <div className="flex items-center">
                  <div className="mr-2 text-sm font-medium text-gray-700">Rating:</div>
                  <div className="px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full text-sm">
                    {service.rating} / 5
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <AddToCartButton service={service} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 p-6">
          <ReviewSection serviceId={service.id} />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;