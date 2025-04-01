import { useQuery } from '@tanstack/react-query';
import { getDriverEarningsAPI } from '../../api/driver';
import LoadingSpinner from '../common/LoadingSpinner';

const DriverEarnings = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['driverEarnings'],
    queryFn: getDriverEarningsAPI,
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/50 backdrop-blur-md border border-red-500/50 rounded-2xl p-6 shadow-md text-center max-w-md w-full">
          <h2 className="text-xl font-semibold text-red-400 mb-2">Error Loading Earnings</h2>
          <p className="text-gray-300">{error?.message || 'Something went wrong'}</p>
        </div>
      </div>
    );
  }

  console.log('Earnings Data:', data);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Neon Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-12 animate-text-glow">
          My Driver Earnings
        </h2>

        {/* Summary Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <h3 className="text-lg font-medium text-cyan-400">Total Earnings</h3>
            <p className="text-3xl font-bold text-green-400 mt-2">${(data?.totalEarnings || 0).toFixed(2)}</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-md border border-purple-500/20 rounded-2xl p-6 shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]">
            <h3 className="text-lg font-medium text-purple-400">Completed Bookings</h3>
            <p className="text-3xl font-bold text-blue-400 mt-2">{data?.completedBookings || 0}</p>
          </div>
        </div>

        {/* Earnings Details */}
        {data?.details && data.details.length > 0 ? (
          <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-cyan-400 mb-6">Earnings Breakdown</h3>
            <div className="space-y-4">
              {data.details.map((earning) => (
                <div
                  key={earning.bookingId}
                  className="bg-gray-700/20 p-4 rounded-lg border border-gray-600/50 transition-all duration-300 hover:bg-gray-700/40 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  <p className="text-gray-300">
                    <span className="font-medium text-blue-400">Booking ID:</span>{' '}
                    <span className="break-all">{earning.bookingId}</span>
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium text-blue-400">Vehicle:</span> {earning.vehicle || 'N/A'}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium text-blue-400">Amount:</span>{' '}
                    <span className="text-green-400">${(earning.amount || 0).toFixed(2)}</span>
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium text-blue-400">Date:</span>{' '}
                    {new Date(earning.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 text-center">
            <p className="text-gray-300 text-lg">No earnings details available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverEarnings;