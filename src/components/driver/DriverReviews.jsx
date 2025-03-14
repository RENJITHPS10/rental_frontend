import { useQuery } from '@tanstack/react-query';
import { getDriverReviewsAPI } from '../../api/driver';
import LoadingSpinner from '../common/LoadingSpinner';

const DriverReviews = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['driverReviews'],
    queryFn: getDriverReviewsAPI,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      <div className="grid grid-cols-1 gap-4">
        {data?.map((review) => (
          <div key={review._id} className="p-4 border rounded shadow">
            <p>Booking ID: {review.bookingId}</p>
            <p>Rating: {review.driverRating}</p>
            <p>Comment: {review.driverComment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverReviews;   