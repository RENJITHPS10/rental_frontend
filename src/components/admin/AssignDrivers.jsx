import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import { getAllBookingsAPI, getAvailableDriversAPI, assignDriverAPI } from '../../api/admin';

const AssignDrivers = () => {
  const queryClient = useQueryClient();

  const { data: bookings, isLoading: bookingsLoading, error: bookingsError } = useQuery({
    queryKey: ['allBookings'],
    queryFn: getAllBookingsAPI,
  });

  const [selectedDrivers, setSelectedDrivers] = useState({});

  const handleDriverChange = (bookingId, driverId) => {
    setSelectedDrivers((prev) => ({
      ...prev,
      [bookingId]: driverId,
    }));
  };

  if (bookingsLoading) return <LoadingSpinner />;
  if (bookingsError) return <div>Error loading bookings: {bookingsError.message}</div>;

  console.log('Bookings:', bookings);

  const eligibleBookings = bookings?.filter(
    (booking) =>
      booking.needsDriver &&
      !booking.driver &&
      booking.status === 'approved' && // Changed to 'approved' to match backend
      booking.ownerApproved
  ) || [];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Assign Drivers</h2>
      {bookings?.length === 0 ? (
        <p>No bookings found in the system.</p>
      ) : eligibleBookings.length === 0 ? (
        <p>No bookings available for driver assignment.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {eligibleBookings.map((booking) => (
            <BookingDriverAssignment
              key={booking._id}
              booking={booking}
              selectedDriver={selectedDrivers[booking._id] || ''}
              onDriverChange={handleDriverChange}
              queryClient={queryClient}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const BookingDriverAssignment = ({ booking, selectedDriver, onDriverChange, queryClient }) => {
  const { data, isLoading: driversLoading, error: driversError } = useQuery({
    queryKey: ['availableDrivers', booking._id],
    queryFn: () => getAvailableDriversAPI(booking._id),
  });

  const drivers = data?.drivers || []; // Access nested drivers array

  const assignDriverMutation = useMutation({
    mutationFn: ({ bookingId, driverId }) => assignDriverAPI(bookingId, driverId),
    onSuccess: () => {
      queryClient.invalidateQueries(['allBookings']);
      queryClient.invalidateQueries(['availableDrivers']);
    },
    onError: (error) => {
      console.error('Error assigning driver:', error);
      alert(`Failed to assign driver: ${error.response?.data?.msg || 'Unknown error'}`);
    },
  });

  const handleAssignDriver = () => {
    const driverId = selectedDriver;
    if (!driverId) {
      alert('Please select a driver');
      return;
    }
    assignDriverMutation.mutate({ bookingId: booking._id, driverId });
  };

  if (driversLoading) return <LoadingSpinner />;
  if (driversError) return <div>Error loading drivers: {driversError.message}</div>;

  console.log('Drivers for booking', booking._id, ':', drivers);

  return (
    <div className="p-4 border rounded shadow">
      <p>Vehicle: {booking.vehicle?.model || 'N/A'}</p>
      <p>Customer: {booking.customer?.name || 'N/A'}</p>
      <p>Pickup: {booking.pickupLocation}</p>
      <p>Start: {new Date(booking.startDate).toLocaleDateString()}</p>
      <p>End: {new Date(booking.endDate).toLocaleDateString()}</p>
      <p>Status: {booking.status}</p>
      <div className="mt-2">
        <label htmlFor={`driver-${booking._id}`} className="block text-sm font-medium">
          Select Driver (Sorted by Distance):
        </label>
        <select
          id={`driver-${booking._id}`}
          className="mt-1 block w-full p-2 border rounded"
          value={selectedDriver}
          onChange={(e) => onDriverChange(booking._id, e.target.value)}
        >
          <option value="">-- Select Driver --</option>
          {drivers.map((driver) => (
            <option key={driver._id} value={driver.user._id}>
              {driver.user.name} ({driver.user.email}) -{' '}
              {driver.distance !== null ? `${driver.distance.toFixed(2)} km` : 'Unknown distance'}
            </option>
          ))}
        </select>
        <button
          onClick={handleAssignDriver}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={driversLoading || assignDriverMutation.isPending}
        >
          {assignDriverMutation.isPending ? 'Assigning...' : 'Assign Driver'}
        </button>
      </div>
    </div>
  );
};

export default AssignDrivers;