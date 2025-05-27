import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { StarIcon, PencilIcon, TrashIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/solid';
import authApiClient from '../../Services/auth-api-client';
import useAuthContext from '../../hooks/useAuthContext';

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [serviceNames, setServiceNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({ rating: 1, comment: '' });
  const { user } = useAuthContext();

  // Fetch reviews and service names
  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!user) {
        setError('Please log in to view your reviews.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await authApiClient.get('/reviews/', {
          headers: {
            'X-CSRFTOKEN': 'VcZzeEe75L9pj5ayH1LAz0lpmFMuSkQJGMhc8zXNYKNMt8LP60OslIpMLNG75Id7',
          },
        });
        const userReviews = response.data.results.filter(
          (review) => review.user === user.id
        );
        setReviews(userReviews);

        // Fetch service names for each review
        const serviceIds = [...new Set(userReviews.map((review) => review.service))];
        const servicePromises = serviceIds.map((serviceId) =>
          authApiClient.get(`/services/${serviceId}/`, {
            headers: {
              'X-CSRFTOKEN': 'VcZzeEe75L9pj5ayH1LAz0lpmFMuSkQJGMhc8zXNYKNMt8LP60OslIpMLNG75Id7',
            },
          })
        );
        const serviceResponses = await Promise.all(servicePromises);
        const names = serviceResponses.reduce((acc, res) => {
          acc[res.data.id] = res.data.name;
          return acc;
        }, {});
        setServiceNames(names);
        setLoading(false);
      } catch (err) {
        setError('Failed to load reviews or services. Please try again.');
        setLoading(false);
        toast.error('Error fetching reviews or services');
      }
    };

    fetchUserReviews();
  }, [user]);

  // Handle delete review
  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await authApiClient.delete(`/reviews/${reviewId}/`, {
          headers: {
            'X-CSRFTOKEN': 'VcZzeEe75L9pj5ayH1LAz0lpmFMuSkQJGMhc8zXNYKNMt8LP60OslIpMLNG75Id7',
          },
        });
        setReviews(reviews.filter((review) => review.id !== reviewId));
        toast.success('Review deleted successfully');
      } catch (err) {
        toast.error('Failed to delete review');
      }
    }
  };

  // Open edit modal and prefill form
  const handleEdit = (review) => {
    setEditingReview(review);
    setFormData({ rating: review.rating, comment: review.comment });
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApiClient.patch(`/reviews/${editingReview.id}/`, {
        rating: parseFloat(formData.rating),
        comment: formData.comment,
      }, {
        headers: {
          'X-CSRFTOKEN': 'VcZzeEe75L9pj5ayH1LAz0lpmFMuSkQJGMhc8zXNYKNMt8LP60OslIpMLNG75Id7',
        },
      });
      setReviews(reviews.map((review) =>
        review.id === editingReview.id ? response.data : review
      ));
      setIsModalOpen(false);
      setEditingReview(null);
      toast.success('Review updated successfully');
    } catch (err) {
      toast.error('Failed to update review');
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReview(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex justify-center items-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-transparent border-t-white/80 border-r-purple-400/60 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-blue-400/60 border-l-indigo-400/40 rounded-full animate-spin animation-delay-150 mx-auto"></div>
          </div>
          <p className="text-white/80 mt-6 text-lg font-medium">Loading your reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <XMarkIcon className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-white text-xl font-semibold mb-2">Oops!</h2>
          <p className="text-white/80">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-6 shadow-lg shadow-purple-500/25">
              <SparklesIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
              My Reviews
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Manage and edit your service reviews with style
            </p>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <StarIcon className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">No Reviews Yet</h3>
                <p className="text-white/60 text-lg">Start sharing your experiences by writing your first review!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="group bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                        {/* <span className="text-white font-bold text-sm">{serviceNames[review.service] || 'Unknown Service'}</span> */}
                      </div>
                      <h2 className="text-white font-semibold text-lg">
                        {serviceNames[review.service] || 'Unknown Service'}
                      </h2>
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleEdit(review)}
                        className="w-10 h-10 bg-blue-500/20 hover:bg-blue-500/30 backdrop-blur rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                        title="Edit Review"
                      >
                        <PencilIcon className="h-4 w-4 text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 backdrop-blur rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                        title="Delete Review"
                      >
                        <TrashIcon className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* Rating Section */}
                  <div className="flex items-center mb-6">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-6 w-6 transition-all duration-300 ${
                            i < review.rating 
                              ? 'text-yellow-400 drop-shadow-lg' 
                              : 'text-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-3 text-white/80 font-medium text-lg">{review.rating}/5</span>
                  </div>

                  {/* Comment Section */}
                  <div className="mb-6">
                    <p className="text-white/80 leading-relaxed text-base line-clamp-4">
                      {review.comment}
                    </p>
                  </div>

                  {/* Dates Section */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-white/40 mb-1">Posted</p>
                        <p className="text-white/70 font-medium">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/40 mb-1">Updated</p>
                        <p className="text-white/70 font-medium">
                          {new Date(review.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Edit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-lg border border-white/20 shadow-2xl shadow-purple-500/20"
            style={{
              animation: 'modalSlideIn 0.3s ease-out forwards'
            }}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <PencilIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Edit Review</h2>
              </div>
              <button 
                onClick={closeModal} 
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <XMarkIcon className="h-5 w-5 text-white/80" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Rating Input */}
              <div>
                <label className="block text-white/80 font-medium mb-3 text-sm uppercase tracking-wide">
                  Rating
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                  required
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value} className="bg-slate-800 text-white">
                      {value} Star{value > 1 ? 's' : ''} ⭐
                    </option>
                  ))}
                </select>
              </div>

              {/* Comment Input */}
              <div>
                <label className="block text-white/80 font-medium mb-3 text-sm uppercase tracking-wide">
                  Comment
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-none"
                  rows="4"
                  placeholder="Share your experience..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur text-white/80 rounded-2xl font-medium transition-all duration-300 hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS-in-JS Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
};

export default UserReviews;