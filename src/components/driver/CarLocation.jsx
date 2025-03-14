import { useFormik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateCarLocationAPI, getCarLocationAPI } from '../../api/driver';
import { useParams, useNavigate } from 'react-router-dom';
import { locationSchema } from '../../utils/validationSchemas';
import LoadingSpinner from '../common/LoadingSpinner';

const CarLocation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

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

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Update Car Location</h2>
      {currentLocation && (
        <div className="mb-4">
          <p>Current Latitude: {currentLocation.latitude}</p>
          <p>Current Longitude: {currentLocation.longitude}</p>
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <input
            type="number"
            name="latitude"
            placeholder="Latitude"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.latitude}
          />
          {formik.touched.latitude && formik.errors.latitude && (
            <p className="text-red-500 text-sm">{formik.errors.latitude}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="longitude"
            placeholder="Longitude"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.longitude}
          />
          {formik.touched.longitude && formik.errors.longitude && (
            <p className="text-red-500 text-sm">{formik.errors.longitude}</p>
          )}
        </div>
        {formik.status && <p className="text-red-500 mb-4">{formik.status}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Updating...' : 'Update Location'}
        </button>
      </form>
    </div>
  );
};

export default CarLocation;