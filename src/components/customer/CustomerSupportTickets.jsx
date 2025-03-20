import { useQuery } from '@tanstack/react-query';
import { getSupportTicketsAPI } from '../../api/support';
import LoadingSpinner from '../common/LoadingSpinner';

const CustomerSupportTickets = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['customerTickets'],
    queryFn: getSupportTicketsAPI,
  });

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-blue-50">
        <LoadingSpinner />
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something Went Wrong</h2>
          <p className="text-gray-600">{error.message || 'Failed to load support tickets.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-10">
          My Support Tickets
        </h2>

        {/* Tickets List */}
        {data?.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-lg">No tickets submitted yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-blue-500"
              >
                <div className="space-y-3">
                  <p className="text-gray-800">
                    <span className="font-medium text-blue-600">Issue:</span> {ticket.issue}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Status:</span>{' '}
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                        ticket.resolution ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {ticket.resolution ? 'Resolved' : 'Open'}
                    </span>
                  </p>
                  {ticket.resolution && (
                    <p className="text-gray-600">
                      <span className="font-medium">Resolution:</span>{' '}
                      <span className="text-green-700">{ticket.resolution}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSupportTickets;