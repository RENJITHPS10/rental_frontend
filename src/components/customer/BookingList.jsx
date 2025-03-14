import { useQuery, useMutation } from '@tanstack/react-query';
import { getCustomerBookingsAPI, cancelBookingAPI } from '../../api/bookings';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const BookingList = () => {
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['customerBookings'],
    queryFn: getCustomerBookingsAPI,
  });

  const cancelMutation = useMutation({
    mutationFn: cancelBookingAPI,
    onSuccess: () => refetch(),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="grid grid-cols-1 gap-4">
        {data?.map((booking) => (
          <div key={booking._id} className="p-4 border rounded shadow">
            <p>Vehicle: {booking.vehicle.model}</p>
            <p>Start: {new Date(booking.startDate).toLocaleDateString()}</p>
            <p>End: {new Date(booking.endDate).toLocaleDateString()}</p>
            <p>Status: {booking.status}</p>
            <div className="mt-2 flex space-x-2">
              {booking.status === 'pending' && (
                <button
                  onClick={() => cancelMutation.mutate(booking._id)}
                  className="bg-red-500 text-white p-2 rounded"
                  disabled={cancelMutation.isPending}
                >
                  {cancelMutation.isPending ? 'Cancelling...' : 'Cancel'}
                </button>
              )}
              {booking.status === 'confirmed' && (
                <>
                  <button
                    onClick={() => navigate(`/customer/condition-report/${booking._id}`)}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Report Condition
                  </button>
                  <button
                    onClick={() => navigate(`/customer/payment/${booking._id}`)}
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    Make Payment
                  </button>
                </>
              )}
              {booking.status === 'completed' && (
                <button
                  onClick={() => navigate(`/customer/rating/${booking._id}`)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Rate Experience
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;