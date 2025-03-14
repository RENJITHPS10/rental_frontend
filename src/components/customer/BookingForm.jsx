import { useFormik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useParams, useNavigate } from 'react-router-dom';
import { bookingSchema } from '../../utils/validationSchemas';
import LoadingSpinner from '../common/LoadingSpinner';
import { createBookingAPI } from '../../api/bookings';
import { getVehicleAPI} from '../../api/vehicles';

const BookingForm = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  // Fetch vehicle data
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
      dropLocation: '', // Optional, defaults to pickupLocation on backend
      needsDriver: false, // Added as per backend
    },
    validationSchema: bookingSchema,
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
    },
    enableReinitialize: true, // Allows form to update if vehicleId changes
  });

  // Loading state for vehicle data
  if (isVehicleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state for vehicle data
  if (isVehicleError || !vehicle) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-6 bg-red-100 text-red-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>Failed to load vehicle details. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Book a Vehicle</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Vehicle Info */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Vehicle Model</label>
          <input
            type="text"
            value={vehicle.model}
            disabled
            className="w-full p-2 border rounded bg-gray-100 text-gray-600"
          />
        </div>

        {/* Pickup Location (Read-Only) */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Pickup Location</label>
          <input
            type="text"
            value={vehicle.location || 'Not specified'}
            disabled
            className="w-full p-2 border rounded bg-gray-100 text-gray-600"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.startDate}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.startDate && formik.errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.startDate}</p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.endDate}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.endDate && formik.errors.endDate && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.endDate}</p>
          )}
        </div>

        {/* Drop-off Location (Optional) */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Drop-off Location (Optional)</label>
          <input
            type="text"
            name="dropLocation"
            placeholder="Same as pickup if left blank"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dropLocation}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.dropLocation && formik.errors.dropLocation && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.dropLocation}</p>
          )}
        </div>

        {/* Needs Driver */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="needsDriver"
            onChange={formik.handleChange}
            checked={formik.values.needsDriver}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-gray-700 font-medium">Need a driver?</label>
        </div>

        {/* Error Message */}
        {formik.status && (
          <p className="text-red-500 text-sm text-center">{formik.status}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Booking...' : 'Book Now'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;