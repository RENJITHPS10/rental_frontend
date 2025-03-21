import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarLocationAPI } from '../api/driver';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DriverLocation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const { data: location, isLoading, isError, error } = useQuery({
    queryKey: ['carLocation', bookingId],
    queryFn: () => getCarLocationAPI(bookingId),
    onSuccess: (data) => console.log('Fetched location in DriverLocation:', data), // Debug
    onError: (err) => console.error('Error fetching location:', err), // Debug
    staleTime: 0, // Ensure fresh data
    cacheTime: 0, // Disable caching
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
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        </div>
        <div className="max-w-md w-full mx-auto bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-2xl p-8 relative z-10">
          <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-6 animate-text-glow">
            Error
          </h2>
          <p className="text-red-400 text-center">
            {error?.response?.data?.msg || 'Failed to load driver location.'}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 block mx-auto bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-2 px-6 rounded-lg font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-md w-full mx-auto bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] relative z-10">
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-6 animate-text-glow">
          Driver’s Current Location
        </h2>
        {location && location.latitude && location.longitude ? (
          <div className="space-y-4">
            <p className="text-gray-300">
              <span className="font-medium text-cyan-400">Latitude:</span> {location.latitude}
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-cyan-400">Longitude:</span> {location.longitude}
            </p>
            <p className="text-gray-400 text-sm">
              Updated:{' '}
              {location.updatedAt
                ? new Date(location.updatedAt).toLocaleString()
                : 'Not available'}
            </p>
            <a
              href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-gradient-to-r from-teal-600 to-teal-800 text-white py-2 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-900 transition-all duration-300 shadow-md transform hover:scale-105"
            >
              View on Google Maps
            </a>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-gray-300">Location not available yet.</p>
            <p className="text-gray-400 text-sm">The driver may not have updated their location.</p>
            <button
              onClick={() => navigate(-1)}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-2 px-6 rounded-lg font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all duration-300"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverLocation;