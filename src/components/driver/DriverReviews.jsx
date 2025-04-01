import { useQuery } from '@tanstack/react-query';
import { getDriverReviewsAPI } from '../../api/driver';
import { FaStar, FaUserCircle } from 'react-icons/fa';
import LoadingSpinner from '../common/LoadingSpinner';

const DriverReviews = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['driverReviews'],
    queryFn: getDriverReviewsAPI,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        My Reviews
      </h2>
      <p className="text-lg text-gray-600 text-center mb-6">
        Average Rating: <span className="font-semibold text-blue-600">{data?.averageRating || 'N/A'}</span>
      </p>
      
      <div className="grid gap-6">
        {data?.reviews?.map((review) => (
          <div key={review.bookingId} className="p-5 bg-white shadow-lg rounded-2xl flex items-center gap-4">
            <FaUserCircle className="text-5xl text-gray-400" />
            <div className="flex-1">
              <p className="text-gray-700 font-medium">Customer: {review.customer}</p>
              <p className="text-gray-500 text-sm">Booking ID: {review.bookingId}</p>
              <div className="flex items-center gap-1 mt-2">
                <FaStar className={`text-xl ${review.rating >= 3 ? 'text-yellow-500' : 'text-gray-400'}`} />
                <span className="text-gray-700 font-semibold">{review.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {data?.reviews?.length === 0 && (
        <p className="text-gray-500 text-center mt-6">No reviews available.</p>
      )}
    </div>
  );
};

export default DriverReviews;
