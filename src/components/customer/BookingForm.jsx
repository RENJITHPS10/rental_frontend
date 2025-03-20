import { useFormik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingSchema } from '../../utils/validationSchemas';
import LoadingSpinner from '../common/LoadingSpinner';
import { createBookingAPI } from '../../api/bookings';
import { getVehicleAPI } from '../../api/vehicles';

const BookingForm = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const { data: vehicle, isLoading: isVehicleLoading, isError: isVehicleError } = useQuery({
    queryKey: ['vehicle', vehicleId],
    queryFn: () => getVehicleAPI(vehicleId),
  });

  const mutation = useMutation({
    mutationFn: createBookingAPI,
    onSuccess: () => navigate('/customer/bookings'),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Booking failed'),
  });

  const formik = useFormik({
    initialValues: {
      vehicleId,
      startDate: '',
      endDate: '',
      dropLocation: '',
      needsDriver: false,
    },
    validationSchema: bookingSchema,
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
    },
    enableReinitialize: true,
  });

  if (isVehicleLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-blue-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (isVehicleError || !vehicle) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-blue-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-2xl border-l-4 border-red-500 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-3 bg-clip-text  bg-gradient-to-r from-red-500 to-pink-500">
            Oops! Something Went Wrong
          </h2>
          <p className="text-gray-600">Failed to load vehicle details. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
        <h2 className="text-3xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Book Your Ride
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Vehicle Info */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2">Vehicle Model</label>
            <div className="flex items-center">
              <span className="absolute left-3 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-8H5" />
                </svg>
              </span>
              <input
                type="text"
                value={vehicle.model}
                disabled
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 shadow-inner"
              />
            </div>
          </div>

          {/* Pickup Location */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2">Pickup Location</label>
            <div className="flex items-center">
              <span className="absolute left-3 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={vehicle.location || 'Not specified'}
                disabled
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 shadow-inner"
              />
            </div>
          </div>

          {/* Start Date */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
            <div className="flex items-center">
              <span className="absolute left-3 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                type="date"
                name="startDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDate}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
              />
            </div>
            {formik.touched.startDate && formik.errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.startDate}</p>
            )}
          </div>

          {/* End Date */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2">End Date</label>
            <div className="flex items-center">
              <span className="absolute left-3 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                type="date"
                name="endDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endDate}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
              />
            </div>
            {formik.touched.endDate && formik.errors.endDate && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.endDate}</p>
            )}
          </div>

          {/* Drop-off Location */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2">Drop-off Location (Optional)</label>
            <div className="flex items-center">
              <span className="absolute left-3 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <input
                type="text"
                name="dropLocation"
                placeholder="Same as pickup if left blank"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dropLocation}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
              />
            </div>
            {formik.touched.dropLocation && formik.errors.dropLocation && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.dropLocation}</p>
            )}
          </div>

          {/* Needs Driver */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="needsDriver"
              onChange={formik.handleChange}
              checked={formik.values.needsDriver}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-all duration-200"
            />
            <label className="text-gray-700 font-semibold">Need a driver?</label>
          </div>

          {/* Error Message */}
          {formik.status && (
            <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-lg">{formik.status}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-105"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Booking...
              </span>
            ) : (
              'Book Now'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;