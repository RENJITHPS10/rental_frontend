import { useQuery, useMutation } from '@tanstack/react-query';
import { getOwnerVehiclesAPI, deleteVehicleAPI } from '../../api/vehicles';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const OwnerVehicleList = () => {
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['ownerVehicles'],
    queryFn: getOwnerVehiclesAPI,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVehicleAPI,
    onSuccess: () => refetch(),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Vehicles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.map((vehicle) => (
          <div key={vehicle._id} className="p-4 border rounded shadow">
            <img src={vehicle.images[0]} alt={vehicle.model} className="w-full h-48 object-cover mb-2" />
            <p>Model: {vehicle.model}</p>
            <p>Type: {vehicle.vehicleType}</p>
            <p>Price: ${vehicle.pricePerDay}/day</p>
            <p>Status: {vehicle.isApproved ? 'Approved' : 'Pending'}</p>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => navigate(`/owner/edit-vehicle/${vehicle._id}`)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(vehicle._id)}
                className="bg-red-500 text-white p-2 rounded"
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerVehicleList;