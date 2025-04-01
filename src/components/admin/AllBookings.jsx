import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../common/LoadingSpinner';
import { getAllBookingsAPI } from '../../api/admin';

const AllBookings = () => {
  const { data: bookings, isLoading, isError, error } = useQuery({
    queryKey: ['allBookings'],
    queryFn: getAllBookingsAPI,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Bookings</h2>
          <p className="text-gray-300">{error?.message || 'Failed to load bookings.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 opacity-80 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-8 animate-text-glow">
          All Bookings
        </h2>

        {bookings && bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                <div className="space-y-4">
                  {/* Booking ID */}
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-400">Booking ID</h3>
                    <p className="text-gray-300 break-all">{booking._id}</p>
                  </div>

                  {/* Vehicle */}
                  <div>
                    <h3 className="text-lg font-medium text-blue-400">Vehicle</h3>
                    <p className="text-gray-300">{booking.vehicle?.model || 'N/A'}</p>
                  </div>

                  {/* Customer */}
                  <div>
                    <h3 className="text-lg font-medium text-blue-400">Customer</h3>
                    <p className="text-gray-300">{booking.customer?.name || 'N/A'}</p>
                  </div>

                  {/* Dates */}
                  <div>
                    <h3 className="text-lg font-medium text-blue-400">Dates</h3>
                    <p className="text-gray-300">
                      <span className="font-medium">Start:</span>{' '}
                      {new Date(booking.startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-medium">End:</span>{' '}
                      {new Date(booking.endDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <h3 className="text-lg font-medium text-blue-400">Status</h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : booking.status === 'approved'
                          ? 'bg-blue-500/20 text-blue-400'
                          : booking.status === 'paid'
                          ? 'bg-teal-500/20 text-teal-400'
                          : booking.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 text-center">
            <p className="text-gray-300 text-lg">No bookings available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBookings;