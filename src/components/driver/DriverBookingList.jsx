import { useQuery, useMutation } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import { getDriverBookingsAPI } from '../../api/bookings';
import { completePickupDropAPI, confirmDriverAssignmentAPI } from '../../api/driver';

const DriverBookingList = () => {
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['driverBookings'],
    queryFn: getDriverBookingsAPI,
  });

  const confirmMutation = useMutation({
    mutationFn: confirmDriverAssignmentAPI,
    onSuccess: () => refetch(),
  });

  const completeMutation = useMutation({
    mutationFn: completePickupDropAPI,
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
              {booking.status === 'assigned' && (
                <button
                  onClick={() => confirmMutation.mutate(booking._id)}
                  className="bg-green-500 text-white p-2 rounded"
                  disabled={confirmMutation.isPending}
                >
                  {confirmMutation.isPending ? 'Confirming...' : 'Confirm Assignment'}
                </button>
              )}
              {booking.status === 'confirmed' && (
                <>
                  <button
                    onClick={() => navigate(`/driver/condition-report/${booking._id}`)}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Report Condition
                  </button>
                  <button
                    onClick={() => navigate(`/driver/car-location/${booking._id}`)}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Update Location
                  </button>
                  <button
                    onClick={() => completeMutation.mutate(booking._id)}
                    className="bg-green-500 text-white p-2 rounded"
                    disabled={completeMutation.isPending}
                  >
                    {completeMutation.isPending ? 'Completing...' : 'Complete'}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverBookingList;