import { useQuery, useMutation } from '@tanstack/react-query';
import { getOwnerVehiclesAPI, deleteVehicleAPI } from '../../api/vehicles';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const OwnerVehicleList = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['ownerVehicles'],
    queryFn: getOwnerVehiclesAPI,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVehicleAPI,
    onSuccess: () => refetch(),
    onError: (err) => console.error('Delete failed:', err),
  });

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-2xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Vehicles</h2>
          <p className="text-gray-300">{error.message || 'Failed to fetch vehicles.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Neon Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-12 animate-text-glow">
          My Vehicles
        </h2>

        {/* Vehicle List */}
        {data?.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-2xl p-8 text-center">
            <p className="text-gray-300 text-xl">No vehicles added yet.</p>
            <button
              onClick={() => navigate('/owner/add-vehicle')}
              className="mt-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-2 px-6 rounded-lg font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all duration-300"
            >
              Add Your First Vehicle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 transform transition-all duration-300 hover:-translate-y-4 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] relative overflow-hidden"
              >
                {/* Image */}
                <img
                  src={vehicle.images[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={vehicle.model}
                  className="w-full h-48 object-cover rounded-lg mb-4 border border-gray-600/50"
                />

                {/* Details */}
                <div className="space-y-3">
                  <p className="text-white">
                    <span className="font-semibold text-cyan-400">Model:</span> {vehicle.model}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Type:</span> {vehicle.vehicleType || vehicle.type}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Price:</span> ${vehicle.pricePerDay || vehicle.price}/day
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Fuel Type:</span> {vehicle.fuelType || 'N/A'}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Category:</span> {vehicle.category || 'N/A'}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Seating:</span> {vehicle.seatingCapacity || 'N/A'}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Location:</span> {vehicle.location || 'N/A'}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Registration:</span> {vehicle.registration || 'N/A'}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Status:</span>{' '}
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                        vehicle.isApproved ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {vehicle.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => navigate(`/owner/edit-vehicle/${vehicle._id}`)}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(vehicle._id)}
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerVehicleList;