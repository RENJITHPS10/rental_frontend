import { useQuery } from '@tanstack/react-query';
import { getVehiclesAPI } from '../../api/vehicles';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters, clearFilters } from '../../redux/vehicleSlice';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const VehicleList = () => {
  const { filters } = useSelector((state) => state.vehicles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localFilters, setLocalFilters] = useState(filters);
  const [activeImages, setActiveImages] = useState({}); // Track active image index per vehicle

  const { data, isLoading } = useQuery({
    queryKey: ['vehicles', filters],
    queryFn: () => getVehiclesAPI(filters),
  });

  // Carousel Effect
  useEffect(() => {
    if (!data) return;

    const interval = setInterval(() => {
      setActiveImages((prev) => {
        const newActiveImages = { ...prev };
        data.forEach((vehicle) => {
          const imageCount = vehicle.images?.length || 1;
          newActiveImages[vehicle._id] = ((prev[vehicle._id] || 0) + 1) % imageCount;
        });
        return newActiveImages;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [data]);

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

  const handleDotClick = (vehicleId, index) => {
    setActiveImages((prev) => ({ ...prev, [vehicleId]: index }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-blue-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Explore Available Vehicles
        </h2>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Location */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={localFilters.location}
                onChange={handleFilterChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
              />
            </div>

            {/* Max Price */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="priceMax"
                placeholder="Max Price/Day"
                value={localFilters.priceMax}
                onChange={handleFilterChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
              />
            </div>

            {/* Vehicle Type */}
            <div className="relative">
              <select
                name="type"
                value={localFilters.type}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 appearance-none bg-white"
              >
                <option value="">All Types</option>
                <option value="bike">Bike</option>
                <option value="car">Car</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>

            {/* Fuel Type */}
            <div className="relative">
              <select
                name="fuelType"
                value={localFilters.fuelType}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 appearance-none bg-white"
              >
                <option value="">All Fuel Types</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>

            {/* Apply Filters Button */}
            <button
              onClick={applyFilters}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md transform hover:scale-105"
            >
              Apply Filters
            </button>

            {/* Clear Filters Button */}
            <button
              onClick={resetFilters}
              className="bg-gray-600 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 shadow-md transform hover:scale-105"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.length === 0 ? (
            <div className="col-span-full text-center p-6 bg-white rounded-xl shadow-lg">
              <p className="text-gray-600 text-lg">No vehicles match your filters.</p>
            </div>
          ) : (
            data?.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105 border-l-4 border-blue-500"
              >
                {/* Carousel */}
                <div className="relative h-64 bg-gray-200 rounded-t-xl">
                  {vehicle.images && vehicle.images.length > 0 ? (
                    <img
                      src={vehicle.images[activeImages[vehicle._id] || 0]}
                      alt={`${vehicle.model} - Image ${activeImages[vehicle._id] + 1 || 1}`}
                      className="h-full w-full object-contain transition-opacity duration-500 ease-in-out"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/300x200?text=No+Image"
                      alt="No Image"
                      className="h-full w-full object-contain transition-opacity duration-500 ease-in-out"
                    />
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none"></div>
                  {/* Pagination Dots */}
                  {vehicle.images && vehicle.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {vehicle.images.map((_, index) => (
                        <span
                          key={index}
                          onClick={() => handleDotClick(vehicle._id, index)}
                          className={`w-3 h-3 rounded-full shadow-md transition-all duration-300 cursor-pointer ${
                            activeImages[vehicle._id] === index
                              ? 'bg-blue-500 scale-125'
                              : 'bg-white/70 hover:bg-blue-400 hover:scale-110'
                          }`}
                        ></span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{vehicle.model}</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <span className="font-medium">Type:</span> {vehicle.type}
                    </p>
                    <p>
                      <span className="font-medium">Category:</span> {vehicle.category}
                    </p>
                    <p>
                      <span className="font-medium">Price:</span> ${vehicle.price}/day
                    </p>
                    <p>
                      <span className="font-medium">Fuel:</span> {vehicle.fuelType || 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium">Seating:</span>{' '}
                      {vehicle.seatingCapacity ? `${vehicle.seatingCapacity} seats` : 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium">Location:</span> {vehicle.location}
                    </p>
                    <p>
                      <span className="font-medium">Registration:</span> {vehicle.registration}
                    </p>
                    <p className="flex items-center">
                      <span className="font-medium">Rating:</span>{' '}
                      <span className="ml-1 text-yellow-500">
                        {vehicle.rating > 0
                          ? '★'.repeat(Math.round(vehicle.rating)) +
                            '☆'.repeat(5 - Math.round(vehicle.rating))
                          : 'No ratings yet'}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/customer/book/${vehicle._id}`)}
                    className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md transform hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleList;