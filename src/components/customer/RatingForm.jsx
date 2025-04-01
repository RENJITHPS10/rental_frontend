import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { ratingSchema } from '../../utils/validationSchemas';
import { submitRatingAPI } from '../../api/vehicles';
import { rateDriverAPI } from '../../api/driver';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';



const RatingForm = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [vehicleHover, setVehicleHover] = useState(null); // For hover effect on vehicle stars
  const [driverHover, setDriverHover] = useState(null);

  const vehicleMutation = useMutation({
    mutationFn: (data) => submitRatingAPI(bookingId, data),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Vehicle rating submission failed'),
  });

  const driverMutation = useMutation({
    mutationFn: (data) => rateDriverAPI(bookingId, data),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Driver rating submission failed'),
  });

  const formik = useFormik({
    initialValues: {
      vehicleRating: '',
      driverRating: '',
    },
    validationSchema: ratingSchema,
    onSubmit: async (values) => {
      try {
        const vehicleData = { rating: Number(values.vehicleRating) };
        const driverData = { rating: Number(values.driverRating) };

        // Build array of promises dynamically
        const requests = [vehicleMutation.mutateAsync(vehicleData)];
        if (values.driverRating) {
          requests.push(driverMutation.mutateAsync(driverData));
        }

        // Send all requests concurrently
        await Promise.all(requests);
        navigate('/customer/bookings');
      } catch (error) {
        // Error is already set in onError callbacks
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    {/* Neon Background Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
    </div>

    <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-lg p-8 relative z-10">
      <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-8">
        Rate Your Experience
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-8">
        {/* Vehicle Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Vehicle Rating</label>
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="vehicleRating"
                    value={ratingValue}
                    onChange={() => formik.setFieldValue('vehicleRating', ratingValue)}
                    className="hidden"
                  />
                  <FaStar
                    size={30}
                    className={`cursor-pointer transition-colors duration-200 ${
                      ratingValue <= (vehicleHover || formik.values.vehicleRating)
                        ? 'text-yellow-400'
                        : 'text-gray-500'
                    }`}
                    onMouseEnter={() => setVehicleHover(ratingValue)}
                    onMouseLeave={() => setVehicleHover(null)}
                  />
                </label>
              );
            })}
          </div>
          {formik.touched.vehicleRating && formik.errors.vehicleRating && (
            <p className="text-red-400 text-sm mt-2 text-center">{formik.errors.vehicleRating}</p>
          )}
        </div>

        {/* Driver Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Driver Rating (Optional)</label>
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="driverRating"
                    value={ratingValue}
                    onChange={() => formik.setFieldValue('driverRating', ratingValue)}
                    className="hidden"
                  />
                  <FaStar
                    size={30}
                    className={`cursor-pointer transition-colors duration-200 ${
                      ratingValue <= (driverHover || formik.values.driverRating)
                        ? 'text-yellow-400'
                        : 'text-gray-500'
                    }`}
                    onMouseEnter={() => setDriverHover(ratingValue)}
                    onMouseLeave={() => setDriverHover(null)}
                  />
                </label>
              );
            })}
          </div>
          {formik.touched.driverRating && formik.errors.driverRating && (
            <p className="text-red-400 text-sm mt-2 text-center">{formik.errors.driverRating}</p>
          )}
        </div>

        {/* Error Message */}
        {formik.status && (
          <p className="text-red-400 text-sm text-center">{formik.status}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white p-3 rounded-md font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all duration-300 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={vehicleMutation.isPending || driverMutation.isPending}
        >
          {vehicleMutation.isPending || driverMutation.isPending ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Submitting...
            </span>
          ) : (
            'Submit Rating'
          )}
        </button>
      </form>
    </div>
  </div>
  );
};

export default RatingForm;