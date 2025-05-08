import React, { useEffect, useState } from 'react';
import apiClient from '../../../Services/api-client';
import { Star, User } from 'lucide-react';

// Star Rating Component
const StarRating = ({ rating }) => {
  const maxRating = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
      ))}
      
      {hasHalfStar && (
        <div className="relative">
          <Star className="w-5 h-5 text-yellow-500" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          </div>
        </div>
      )}
      
      {[...Array(maxRating - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-yellow-500" />
      ))}
      
      <span className="ml-2 font-medium text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
};

const Review = ({ data }) => {
  return (
    <div className="p-6 shadow-lg rounded-xl bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <User size={18} />
          </div>
          
        </div>
        
        <StarRating rating={parseFloat(data.rating) || 5} />
      </div>
      
      <div className="mt-4">
        <p className="text-gray-700 leading-relaxed line-clamp-4">{data.comment}</p>
      </div>
    </div>
  );
};

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/reviews")
      .then(res => {
        // Get only the first 3 reviews from the response
        const topThreeReviews = (res.data.results || []).slice(0, 3);
        setReviews(topThreeReviews); 
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  }, []);

  // Calculate average rating
  const averageRating = reviews.length 
    ? (reviews.reduce((sum, review) => sum + parseFloat(review.rating || 5), 0) / reviews.length).toFixed(1)
    : '0.0';

  // Featured reviews placeholder in case we don't have 3 from the API
  const featuredReviews = reviews.length < 3 
    ? [
        ...reviews,
        ...Array(3 - reviews.length).fill().map((_, index) => ({
          id: `placeholder-${index}`,
          user: 'Happy Customer',
          rating: '5.0',
          comment: 'This product exceeded my expectations. The quality is outstanding and the service was excellent!',
        }))
      ]
    : reviews;

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
          
          {reviews.length > 0 && (
            <div className="flex justify-center items-center mb-4">
              <StarRating rating={parseFloat(averageRating)} />
              <span className="ml-2 text-gray-600">Based on {reviews.length} reviews</span>
            </div>
          )}
          
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 shadow-lg rounded-xl bg-white animate-pulse">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      <div className="h-4 bg-gray-200 rounded w-24 ml-2"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            featuredReviews.map((review) => (
              <Review key={review.id} data={review} />
            ))
          )}
        </div>
        
        
      </div>
    </section>
  );
};

export default ReviewSection;