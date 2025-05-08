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
      console.log("Error fetching reviews:", error.response?.data || error.message);
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
      setError(
        error.response?.data?.detail || "Failed to submit review"
      );
      console.log("Error submitting review:", error.response?.data || error.message);
    }
  };

  const checkUserPermission = async () => {
    if (!user) {
      setError("Please log in to write a review");
      setUserCanReview(false);
      return;
    }
    try {
      const parsedServiceId = parseInt(serviceId);
      const res = await authApiClient.get(`/orders/has-ordered/${parsedServiceId}/`);
      console.log("HasOrdered response:", res.data);
      setUserCanReview(res.data.has_ordered);
      if (!res.data.has_ordered) {
        setError("You must order this service to leave a review");
      } else {
        setError(null); // Clear error if user can review
      }
    } catch (error) {
      setError("Unable to check review permission: " + (error.response?.data?.detail || error.message));
      setUserCanReview(false);
      console.log("Error checking user permission:", error.response?.data || error.message);
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
      setError(
        error.response?.data?.detail || "Failed to update review"
      );
      console.log("Error updating review:", error.response?.data || error.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await authApiClient.delete(`/reviews/${reviewId}/`);
      setError(null);
      fetchReviews();
    } catch (error) {
      setError("Failed to delete review");
      console.log("Error deleting review:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    checkUserPermission();
    fetchReviews();
  }, [serviceId, user]);

  return (
    <div className="space-y-8 mt-10 max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="badge badge-lg">
          {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
        </div>
      </div>

      {error && (
        <div className="alert alert-warning">
          <span>{error}</span>
        </div>
      )}

      {user && userCanReview && (
        <div className="card bg-base-100 shadow-lg border border-base-200 rounded-xl overflow-hidden">
          <div className="card-body">
            <h3 className="card-title text-lg">Write a Review</h3>
            <ReviewForm onSubmit={onSubmit} />
          </div>
        </div>
      )}

      {!user && !error && (
        <div className="alert alert-info">
          <span>Please log in to write a review.</span>
        </div>
      )}

      {!userCanReview && user && !error && (
        <div className="alert alert-info">
          <span>You must order this service to leave a review.</span>
        </div>
      )}

      <div className="divider"></div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
          <p className="text-base-content/70">
            Be the first to review this service!
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default ReviewSection;