import { useQuery } from '@tanstack/react-query';

import LoadingSpinner from '../common/LoadingSpinner';
import { getAllBookingsAPI } from '../../api/admin';

const AllBookings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['allBookings'],
    queryFn: getAllBookingsAPI,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      <div className="grid grid-cols-1 gap-4">
        {data?.map((booking) => (
          <div key={booking._id} className="p-4 border rounded shadow">
            <p>Vehicle: {booking.vehicle.model}</p>
            <p>Customer: {booking.customer.name}</p>
            <p>Start: {new Date(booking.startDate).toLocaleDateString()}</p>
            <p>End: {new Date(booking.endDate).toLocaleDateString()}</p>
            <p>Status: {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBookings;