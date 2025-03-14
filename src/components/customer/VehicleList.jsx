import { useQuery } from '@tanstack/react-query';
import { getVehiclesAPI } from '../../api/vehicles';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters, clearFilters } from '../../redux/vehicleSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const VehicleList = () => {
  const { filters } = useSelector((state) => state.vehicles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localFilters, setLocalFilters] = useState(filters);

  const { data, isLoading } = useQuery({
    queryKey: ['vehicles', filters],
    queryFn: () => getVehiclesAPI(filters),
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    dispatch(setFilters(localFilters));
  };

  const resetFilters = () => {
    setLocalFilters({ location: '', priceMax: '', type: '', fuelType: '' });
    dispatch(clearFilters());
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Vehicles</h2>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={localFilters.location}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="priceMax"
          placeholder="Max Price/Day"
          value={localFilters.priceMax}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <select
          name="type"
          value={localFilters.type}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Types</option>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
        </select>
        <select
          name="fuelType"
          value={localFilters.fuelType}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Fuel Types</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
        </select>
        <button onClick={applyFilters} className="bg-blue-500 text-white p-2 rounded">Apply Filters</button>
        <button onClick={resetFilters} className="bg-gray-500 text-white p-2 rounded">Clear Filters</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.map((vehicle) => (
          <div key={vehicle._id} className="p-4 border rounded shadow">
            <img src={vehicle.images[0]} alt={vehicle.model} className="w-full h-48 object-cover mb-2" />
            <h3 className="text-xl font-semibold">{vehicle.model}</h3>
            <p>Type: {vehicle.vehicleType}</p>
            <p>Price: ${vehicle.pricePerDay}/day</p>
            <p>Fuel: {vehicle.fuelType}</p>
            <button
              onClick={() => navigate(`/customer/book/${vehicle._id}`)}
              className="mt-2 bg-blue-500 text-white p-2 rounded"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;