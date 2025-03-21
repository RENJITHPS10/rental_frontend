import { useFormik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateCarLocationAPI, getCarLocationAPI } from '../../api/driver';
import { useParams, useNavigate } from 'react-router-dom';
import { locationSchema } from '../../utils/validationSchemas';
import LoadingSpinner from '../common/LoadingSpinner';
import { useState } from 'react';

const CarLocation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [geoError, setGeoError] = useState(null);
  const [useManual, setUseManual] = useState(false);

  const { data: currentLocation, isLoading } = useQuery({
    queryKey: ['carLocation', bookingId],
    queryFn: () => getCarLocationAPI(bookingId),
  });

  const mutation = useMutation({
    mutationFn: (locationData) => updateCarLocationAPI(bookingId, locationData),
    onSuccess: () => navigate('/driver/bookings'),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Location update failed'),
  });

  const formik = useFormik({
    initialValues: {
      latitude: currentLocation?.latitude || '',
      longitude: currentLocation?.longitude || '',
    },
    validationSchema: locationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
    },
  });

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      setUseManual(true);
      return;
    }

    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        formik.setValues({ latitude, longitude });
      },
      (error) => {
        let message;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Permission denied. Please allow location access.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location unavailable. Check your device’s GPS.';
            break;
          case error.TIMEOUT:
            message = 'Request timed out. Try again.';
            break;
          default:
            message = 'An unknown error occurred.';
        }
        setGeoError(message);
        setUseManual(true); // Enable manual input as fallback
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Neon Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-md w-full mx-auto bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] relative z-10">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-6 animate-text-glow">
          Update Car Location
        </h2>

        {/* Current Location */}
        {currentLocation && (
          <div className="mb-6 bg-gray-700/30 p-4 rounded-lg">
            <p className="text-gray-300">
              <span className="font-semibold text-cyan-400">Current Latitude:</span> {currentLocation.latitude}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-cyan-400">Current Longitude:</span> {currentLocation.longitude}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Last Updated: {new Date(currentLocation.updatedAt).toLocaleString()}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Latitude */}
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-300 mb-2">
              Latitude
            </label>
            <input
              id="latitude"
              type="number"
              name="latitude"
              placeholder="Click 'Get Location' or enter manually"
              className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.latitude}
              readOnly={!useManual} // Editable only if manual mode is enabled
            />
            {formik.touched.latitude && formik.errors.latitude && (
              <p className="mt-2 text-red-400 text-sm animate-fade-in">{formik.errors.latitude}</p>
            )}
          </div>

          {/* Longitude */}
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-300 mb-2">
              Longitude
            </label>
            <input
              id="longitude"
              type="number"
              name="longitude"
              placeholder="Click 'Get Location' or enter manually"
              className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.longitude}
              readOnly={!useManual} // Editable only if manual mode is enabled
            />
            {formik.touched.longitude && formik.errors.longitude && (
              <p className="mt-2 text-red-400 text-sm animate-fade-in">{formik.errors.longitude}</p>
            )}
          </div>

          {/* Get Location Button */}
          <button
            type="button"
            onClick={handleGetLocation}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md transform hover:scale-105 disabled:opacity-50"
            disabled={mutation.isPending}
          >
            Get Current Location
          </button>

          {/* Toggle Manual Input */}
          {geoError && (
            <div className="text-center">
              <p className="text-red-400 text-sm mb-2 animate-fade-in">{geoError}</p>
              <button
                type="button"
                onClick={() => setUseManual(!useManual)}
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
              >
                {useManual ? 'Use Geolocation Instead' : 'Enter Manually'}
              </button>
            </div>
          )}

          {/* Status */}
          {formik.status && (
            <p className="text-red-400 text-sm text-center animate-fade-in">{formik.status}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all duration-300 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={mutation.isPending || (!formik.values.latitude && !formik.values.longitude)}
          >
            {mutation.isPending ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Updating...
              </span>
            ) : (
              'Update Location'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CarLocation;