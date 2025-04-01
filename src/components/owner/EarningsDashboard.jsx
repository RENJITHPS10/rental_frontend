import { useQuery } from '@tanstack/react-query';
import { getOwnerEarningsAPI } from '../../api/owner';
import LoadingSpinner from '../common/LoadingSpinner';

const EarningsDashboard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['ownerEarnings'],
    queryFn: getOwnerEarningsAPI,
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
        <div className="bg-gray-800 border border-red-500/50 rounded-lg p-6 shadow-md text-center max-w-md w-full">
          <h2 className="text-xl font-semibold text-red-500 mb-2">Error Loading Earnings</h2>
          <p className="text-gray-400">{error?.message || 'Failed to load earnings.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h2 className="text-3xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            My Earnings
          </h2>
          <p className="text-gray-400 text-center mt-1">Overview of your earnings and completed bookings</p>
        </header>

        {/* Summary Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-cyan-500/20">
            <h3 className="text-lg font-medium text-cyan-400">Total Earnings</h3>
            <p className="text-3xl font-bold text-green-400 mt-2">${(data?.totalEarnings || 0).toFixed(2)}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-purple-500/20">
            <h3 className="text-lg font-medium text-purple-400">Completed Bookings</h3>
            <p className="text-3xl font-bold text-blue-400 mt-2">{data?.completedBookings || 0}</p>
          </div>
        </div>

        {/* Earnings Details Table */}
        {data?.details && data.details.length > 0 ? (
          <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700/50 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Earnings Details</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-700/50 text-gray-300 text-left text-sm uppercase font-medium">
                      <th className="px-4 py-3">Booking ID</th>
                      <th className="px-4 py-3">Vehicle</th>
                      <th className="px-4 py-3">Earnings</th>
                      <th className="px-4 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    {data.details.map((earning) => (
                      <tr
                        key={earning.bookingId}
                        className="border-t border-gray-700/50 hover:bg-gray-700/30 transition"
                      >
                        <td className="px-4 py-3 text-sm break-all">{earning.bookingId}</td>
                        <td className="px-4 py-3 text-sm">{earning.vehicleModel}</td>
                        <td className="px-4 py-3 text-sm font-medium text-green-400">
                          ${earning.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {new Date(earning.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700/50 text-center">
            <p className="text-gray-400 text-lg">No earnings available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarningsDashboard; 