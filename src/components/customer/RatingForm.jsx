import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';

import { useParams, useNavigate } from 'react-router-dom';
import { ratingSchema } from '../../utils/validationSchemas';
import { rateDriverAPI } from '../../api/driver';
import { submitRatingAPI } from '../../api/bookings';

const RatingForm = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const vehicleMutation = useMutation({
    mutationFn: submitRatingAPI,
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Rating submission failed'),
  });

  const driverMutation = useMutation({
    mutationFn: rateDriverAPI,
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Driver rating failed'),
  });

  const formik = useFormik({
    initialValues: {
      vehicleRating: '',
      vehicleComment: '',
      driverRating: '',
      driverComment: '',
    },
    validationSchema: ratingSchema,
    onSubmit: async (values) => {
      const vehicleData = { vehicleRating: values.vehicleRating, vehicleComment: values.vehicleComment };
      const driverData = { driverRating: values.driverRating, driverComment: values.driverComment };
      await Promise.all([
        vehicleMutation.mutateAsync(bookingId, vehicleData),
        values.driverRating && driverMutation.mutateAsync(bookingId, driverData),
      ]);
      navigate('/customer/bookings');
    },
  });

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Rate Your Experience</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Vehicle Rating (1-5)</label>
          <input
            type="number"
            name="vehicleRating"
            min="1"
            max="5"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.vehicleRating}
          />
          {formik.touched.vehicleRating && formik.errors.vehicleRating && (
            <p className="text-red-500 text-sm">{formik.errors.vehicleRating}</p>
          )}
        </div>
        <div className="mb-4">
          <textarea
            name="vehicleComment"
            placeholder="Vehicle Comment"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.vehicleComment}
          />
          {formik.touched.vehicleComment && formik.errors.vehicleComment && (
            <p className="text-red-500 text-sm">{formik.errors.vehicleComment}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Driver Rating (1-5, optional)</label>
          <input
            type="number"
            name="driverRating"
            min="1"
            max="5"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.driverRating}
          />
          {formik.touched.driverRating && formik.errors.driverRating && (
            <p className="text-red-500 text-sm">{formik.errors.driverRating}</p>
          )}
        </div>
        <div className="mb-4">
          <textarea
            name="driverComment"
            placeholder="Driver Comment"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.driverComment}
          />
          {formik.touched.driverComment && formik.errors.driverComment && (
            <p className="text-red-500 text-sm">{formik.errors.driverComment}</p>
          )}
        </div>
        {formik.status && <p className="text-red-500 mb-4">{formik.status}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={vehicleMutation.isPending || driverMutation.isPending}
        >
          {vehicleMutation.isPending || driverMutation.isPending ? 'Submitting...' : 'Submit Rating'}
        </button>
      </form>
    </div>
  );
};

export default RatingForm;