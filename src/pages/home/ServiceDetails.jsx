import { Link, useParams } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import apiClient from "../../Services/api-client";
import ServiceImage from "../../components/ServiceDetails/ServiceImage";
import AddToCartButton from "../../components/ServiceDetails/AddToCartButton";
import ReviewSection from "../../components/Reviews/ReviewSection";

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

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">{error}</div>;
  if (!service) return <div className="text-center">No Service Data Available...</div>;

  return (
    <div className="w-full md:w-3/4 mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/shop"
          className="flex items-center text-sm text-base-content/70 hover:text-base-content transition-colors"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Back to services
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <Suspense
          fallback={
            <div className="aspect-square bg-base-300 animate-pulse rounded-lg"></div>
          }
        >
          <ServiceImage
            images={service.images || []}
            serviceName={service.name}
          />
        </Suspense>

        <div className="flex flex-col">
          <div className="mb-4">
            <h1 className="text-3xl font-bold tracking-tight">{service.name}</h1>
          </div>

          <div className="mt-2 mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">${service.price}</span>
            </div>
          </div>

          <div className="prose prose-sm mb-6">
            <p>{service.description}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              <div className="mr-2 text-sm font-medium">Duration:</div>
              <div className="badge badge-outline bg-info/10 text-info border-info/20">
                {service.duration}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              <div className="mr-2 text-sm font-medium">Rating:</div>
              <div className="badge badge-outline bg-warning/10 text-warning border-warning/20">
                {service.rating} / 5
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <AddToCartButton service={service} />
          </div>
        </div>
      </div>
      <ReviewSection serviceId={service.id} />
    </div>
  );
};

export default ServiceDetail;