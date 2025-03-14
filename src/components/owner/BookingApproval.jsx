  import { useQuery, useMutation } from '@tanstack/react-query';

  import LoadingSpinner from '../common/LoadingSpinner';
  import { approveBookingAPI, getOwnerBookingsAPI } from '../../api/bookings';

  const BookingApproval = () => {
    const { data, isLoading, isError, error, refetch } = useQuery({
      queryKey: ['ownerBookings'],
      queryFn: getOwnerBookingsAPI,
    });

    const approveMutation = useMutation({
      mutationFn: ({ bookingId, approval }) => approveBookingAPI(bookingId, approval),
      onSuccess: () => refetch(),
      onError: (err) => console.error('Approval error:', err),
    });

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
            <h2 className="text-xl font-semibold mb-2">Error Loading Bookings</h2>
            <p>{error?.msg || 'Failed to fetch bookings. Please try again.'}</p>
          </div>
        </div>
      );
    }

    const bookings = Array.isArray(data) ? data.filter((b) => b.status === 'pending') : [];
    if (bookings.length === 0) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center p-6 bg-gray-100 text-gray-600 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">No Pending Bookings</h2>
            <p>There are no bookings awaiting your approval at this time.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Booking Approvals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="p-5 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="space-y-2">
                  <p className="text-lg">
                    <span className="font-semibold text-gray-700">Vehicle:</span>{' '}
                    {booking.vehicle?.model || 'Unknown'}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-gray-700">Customer:</span>{' '}
                    {booking.customer?.name || 'Unknown'}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-gray-700">Start:</span>{' '}
                    {new Date(booking.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-gray-700">End:</span>{' '}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() =>
                      approveMutation.mutate({ bookingId: booking._id, approval: true })
                    }
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:bg-green-300"
                    disabled={approveMutation.isPending}
                  >
                    {approveMutation.isPending ? 'Approving...' : 'Approve'}
                  </button>
                  <button
                    onClick={() =>
                      approveMutation.mutate({ bookingId: booking._id, approval: false })
                    }
                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors disabled:bg-red-300"
                    disabled={approveMutation.isPending}
                  >
                    {approveMutation.isPending ? 'Rejecting...' : 'Reject'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default BookingApproval;