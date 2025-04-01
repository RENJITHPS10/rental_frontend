import { useQuery } from '@tanstack/react-query';
import { getOwnerReviewsAPI } from '../../api/owner';
import LoadingSpinner from '../common/LoadingSpinner';
import { FaStar } from 'react-icons/fa';

const OwnerVehicleReviews = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['ownerReviews'],
    queryFn: getOwnerReviewsAPI,
  });

  console.log('Raw data from API:', data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800/50 backdrop-blur-md border border-red-500/50 rounded-2xl p-8 shadow-md text-center max-w-md w-full">
          <h2 className="text-2xl font-semibold text-red-400 mb-3 animate-pulse">Error Loading Reviews</h2>
          <p className="text-gray-300">{error?.message || 'Failed to load reviews. Please try again.'}</p>
        </div>
      </div>
    );
  }

  const reviews = Array.isArray(data) ? data : [];
  console.log('Normalized reviews:', reviews);

  if (reviews.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 shadow-md text-center max-w-md w-full">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-3">No Reviews Yet</h2>
          <p className="text-gray-300">Your vehicles haven’t received any reviews yet. Keep up the great work!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Neon Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-12 animate-text-glow">
          Vehicle Reviews
        </h2>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => {
            const roundedRating = Number(review.vehicleRating || 0).toFixed(2); // Round to 2 decimal places
            const ratingForStars = Math.round(review.vehicleRating || 0); // For star display (whole stars)

            return (
              <div
                key={review._id}
                className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                <div className="space-y-4">
                  {/* Vehicle */}
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-cyan-400">Vehicle:</span>
                    <span className="ml-2 text-lg text-gray-200">{review.vehicle?.model || 'N/A'}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-cyan-400">Rating:</span>
                    <div className="ml-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={22}
                          className={`${
                            i < ratingForStars ? 'text-yellow-400' : 'text-gray-500'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-400 text-sm">({roundedRating}/5)</span>
                    </div>
                  </div>

                  {/* Comment */}
                
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OwnerVehicleReviews;