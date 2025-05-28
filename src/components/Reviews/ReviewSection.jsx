import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import useAuthContext from "../../hooks/useAuthContext";
import apiClient from "../../Services/api-client";
import authApiClient from "../../Services/auth-api-client";

const ReviewSection = ({ serviceId }) => {
  const [reviews, setReviews] = useState([]);
  const [userCanReview, setUserCanReview] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editReview, setEditReview] = useState({ rating: 0, comment: "", service: null });
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuthContext();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/reviews/", {
        params: { service: serviceId },
      });
      setReviews(res.data.results);
    } catch (error) {
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, service: parseInt(serviceId) };
      await authApiClient.post("/reviews/", payload);
      setError(null);
      fetchReviews();
    } catch (error) {
      setError(error.response?.data?.detail || "Failed to submit review");
    }
  };

  const checkUserPermission = async () => {
    if (!user) {
      setUserCanReview(false);
      return;
    }
    try {
      const res = await authApiClient.get(`/orders/has-ordered/${parseInt(serviceId)}/`);
      setUserCanReview(res.data.has_ordered);
      if (!res.data.has_ordered) {
        setError("You must order this service to leave a review");
      }
    } catch (error) {
      setError("Unable to check review permission");
      setUserCanReview(false);
    }
  };

  const handleUpdateReview = async (reviewId) => {
    try {
      await authApiClient.put(`/reviews/${reviewId}/`, {
        ...editReview,
        service: parseInt(serviceId),
      });
      setEditingId(null);
      setError(null);
      fetchReviews();
    } catch (error) {
      setError("Failed to update review");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await authApiClient.delete(`/reviews/${reviewId}/`);
      setError(null);
      fetchReviews();
    } catch (error) {
      setError("Failed to delete review");
    }
  };

  useEffect(() => {
    checkUserPermission();
    fetchReviews();
  }, [serviceId, user]);

  return (
    <div className="space-y-6 mt-8 max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
        <p className="text-gray-600 mt-1">{reviews.length} reviews</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Review Form */}
      {user && userCanReview && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Write a Review</h3>
          <ReviewForm onSubmit={onSubmit} />
        </div>
      )}

      {/* Auth/Permission Messages */}
      {!user && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
          Please log in to write a review
        </div>
      )}

      {user && !userCanReview && !error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
          You must order this service to leave a review
        </div>
      )}

      {/* Reviews Content */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Reviews Yet</h3>
          <p className="text-gray-600">Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200">
          <ReviewList
            reviews={reviews}
            user={user}
            editReview={editReview}
            setEditReview={setEditReview}
            editingId={editingId}
            setEditingId={setEditingId}
            handleUpdateReview={handleUpdateReview}
            handleDeleteReview={handleDeleteReview}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewSection;