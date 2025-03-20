import { useQuery } from '@tanstack/react-query';
import { getFraudulentUsersAPI } from '../../api/admin';
import LoadingSpinner from '../common/LoadingSpinner';

const FraudDetection = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['fraudulentUsers'],
    queryFn: getFraudulentUsersAPI,
  });

  // Handle loading state
  if (isLoading) return <LoadingSpinner />;

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">Failed to load fraudulent users: {error.message}</p>
        </div>
      </div>
    );
  }

  // Ensure data is an array; fallback to empty array if not
  const fraudulentUsers = Array.isArray(data) ? data : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 bg-clip-text  bg-gradient-to-r from-blue-600 to-purple-600 text-center">
          Fraud Detection Dashboard
        </h2>

        {fraudulentUsers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-lg">No fraudulent users detected at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fraudulentUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-red-500"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{user.name}</h3>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Role:</span> {user.role}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Fraud Score:</span>{' '}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      user.fraudScore >= 80
                        ? 'bg-red-100 text-red-800'
                        : user.fraudScore >= 50
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {user.fraudScore}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FraudDetection;