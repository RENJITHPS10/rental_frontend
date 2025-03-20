import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import { getDriverBookingsAPI } from '../../api/bookings';
import { completePickupDropAPI, confirmDriverPickupReadinessAPI } from '../../api/driver';

const DriverBookingList = () => {
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['driverBookings'],
    queryFn: getDriverBookingsAPI,
  });

  const confirmMutation = useMutation({
    mutationFn: confirmDriverPickupReadinessAPI,
    onSuccess: () => refetch(),
  });

  const completeMutation = useMutation({
    mutationFn: completePickupDropAPI,
    onSuccess: () => refetch(),
  });

  // Function to generate Google Maps URL
  const getGoogleMapsUrl = (location) => {
    if (!location) return '#'; // Fallback if no location
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h2>
      <div className="grid grid-cols-1 gap-6">
        {data?.map((booking) => (
          <div key={booking._id} className="p-4 bg-white border rounded-lg shadow-md">
            <div className="space-y-4">
              {/* Vehicle Info */}
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  Vehicle: {booking.vehicle?.model || 'N/A'}
                </p>
                <p className="text-gray-600">
                  Start: {new Date(booking.startDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  End: {new Date(booking.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Status: <span className="font-medium">{booking.status}</span>
                </p>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="text-md font-semibold text-gray-800">Customer Details</h3>
                <p className="text-gray-600">Name: {booking.customer?.name || 'N/A'}</p>
                <p className="text-gray-600">Phone: {booking.customer?.phone || 'N/A'}</p>
              </div>

              {/* Owner Info */}
              <div>
                <h3 className="text-md font-semibold text-gray-800">Owner Details</h3>
                <p className="text-gray-600">Name: {booking.vehicle?.owner?.name || 'N/A'}</p>
                <p className="text-gray-600">Phone: {booking.vehicle?.owner?.phone || 'N/A'}</p>
              </div>

              {/* Location Info with Google Maps Links */}
              <div>
                <h3 className="text-md font-semibold text-gray-800">Location Details</h3>
                <p className="text-gray-600">
                  Pickup:{' '}
                  <a
                    href={getGoogleMapsUrl(booking.pickupLocation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {booking.pickupLocation || 'N/A'}
                  </a>
                </p>
                <p className="text-gray-600">
                  Drop-off:{' '}
                  <a
                    href={getGoogleMapsUrl(booking.dropLocation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {booking.dropLocation || 'N/A'}
                  </a>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap gap-3">
              {booking.status === 'assigned' && (
                <button
                  onClick={() => confirmMutation.mutate(booking._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-300"
                  disabled={confirmMutation.isPending}
                >
                  {confirmMutation.isPending ? 'Confirming...' : 'Confirm Pickup Readiness'}
                </button>
              )}
              {booking.status === 'pickup-confirmed' && (
                <>
                  <button
                    onClick={() => navigate(`/driver/condition-report/${booking._id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Report Condition
                  </button>
                  <button
                    onClick={() => navigate(`/driver/car-location/${booking._id}`)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Update Location
                  </button>
                  <button
                    onClick={() => completeMutation.mutate(booking._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-300"
                    disabled={completeMutation.isPending}
                  >
                    {completeMutation.isPending ? 'Completing...' : 'Complete Trip'}
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