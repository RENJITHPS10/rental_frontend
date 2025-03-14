import { useQuery, useMutation } from '@tanstack/react-query';
import LoadingSpinner from '../common/LoadingSpinner';
import { getUnapprovedVehiclesAPI } from '../../api/admin';
import { approveVehicleAPI } from '../../api/vehicles';

const VehicleApproval = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['unapprovedVehicles'],
    queryFn: getUnapprovedVehiclesAPI,
  });

  const approveMutation = useMutation({
    mutationKey: ['approveVehicle'],
    mutationFn: ({ vehicleId, approval }) => approveVehicleAPI(vehicleId, approval),
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
          <h2 className="text-xl font-semibold mb-2">Error Loading Vehicles</h2>
          <p>{error?.msg || error?.message || 'Failed to fetch vehicles. Please try again.'}</p>
        </div>
      </div>
    );
  }

  const vehicles = Array.isArray(data) ? data : [];
  if (vehicles.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-6 bg-gray-100 text-gray-600 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">No Vehicles to Approve</h2>
          <p>All vehicles are either approved or none are pending.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Vehicle Approvals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="p-5 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={vehicle.images[0] || 'https://via.placeholder.com/150'}
                alt={vehicle.model}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <div className="space-y-2">
                <p className="text-lg">
                  <span className="font-semibold text-gray-700">Model:</span>{' '}
                  {vehicle.model}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-gray-700">Type:</span>{' '}
                  {vehicle.type}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-gray-700">Owner:</span>{' '}
                  {vehicle.owner?.name || 'Unknown'}
                </p>
              </div>
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() =>
                    approveMutation.mutate({ vehicleId: vehicle._id, approval: true })
                  }
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200 disabled:bg-green-300"
                  disabled={approveMutation.isPending}
                >
                  {approveMutation.isPending ? 'Approving...' : 'Approve'}
                </button>
                <button
                  onClick={() =>
                    approveMutation.mutate({ vehicleId: vehicle._id, approval: false })
                  }
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-200 disabled:bg-red-300"
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

export default VehicleApproval;