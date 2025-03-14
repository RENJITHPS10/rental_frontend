import { useQuery } from '@tanstack/react-query';
import { getOwnerReviewsAPI } from '../../api/owner';
import LoadingSpinner from '../common/LoadingSpinner';

const OwnerVehicleReviews = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['ownerReviews'],
    queryFn: getOwnerReviewsAPI,
  });

  console.log('Raw data from API:', data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-6 bg-red-100 text-red-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong</h2>
          <p>{error?.message || 'Failed to load reviews. Please try again later.'}</p>
        </div>
      </div>
    );
  }

  const reviews = Array.isArray(data) ? data : [];
  console.log('Normalized reviews:', reviews);

  if (reviews.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-6 bg-gray-100 text-gray-600 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">No Reviews Yet</h2>
          <p>It looks like there are no reviews for your vehicles at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Vehicle Reviews
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="p-5 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-3">
                <span className="text-lg font-semibold text-gray-700">Vehicle:</span>
                <span className="ml-2 text-lg text-gray-900">{review.vehicle.model}</span>
              </div>
              <div className="flex items-center mb-3">
                <span className="text-lg font-semibold text-gray-700">Rating:</span>
                <div className="ml-2 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.vehicleRating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">({review.vehicleRating}/5)</span>
                </div>
              </div>
              <div>
                <span className="text-lg font-semibold text-gray-700">Comment:</span>
                <p className="mt-1 text-gray-600 italic">"{review.vehicleComment}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerVehicleReviews;