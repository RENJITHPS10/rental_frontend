import { useFormik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import { reportConditionAPI, getBookingAPI } from '../../api/driver';
import { useParams, useNavigate } from 'react-router-dom';
import { conditionReportSchema } from '../../utils/validationSchemas';
import { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const DriverConditionReport = () => {
  const { bookingId } = useParams();
  console.log('Booking ID:', bookingId);
  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState([]);

  // Fetch booking data including condition reports
  const { data: booking, isLoading: bookingLoading, error: bookingError } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBookingAPI(bookingId),
  });

  const mutation = useMutation({
    mutationFn: (conditionData) => reportConditionAPI(bookingId, conditionData),
    onSuccess: () => navigate('/driver/bookings'),
    onError: (error) => formik.setStatus(error.message || 'Report submission failed'),
  });

  const formik = useFormik({
    initialValues: {
      condition: '',
      images: [],
    },
    validationSchema: conditionReportSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('condition', values.condition);
      formData.append('type', reportType);
      values.images.forEach((image) => formData.append('images', image));
      await mutation.mutateAsync(formData);
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue('images', files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  if (bookingLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  } 

  if (bookingError) {
    console.log('Booking Error:', bookingError);
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-2xl p-8">
          <p className="text-red-400 text-center">{bookingError.message}</p>
          <button
            onClick={() => navigate('/driver/bookings')}
            className="mt-4 w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md transform hover:scale-105"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  // Debugging logs
  console.log('Booking Data:', booking);
  console.log('Status:', booking?.status);
  console.log('Condition Reports:', booking?.conditionReports);

  // Determine report type and restrictions
  const hasBeforeReport = booking?.conditionReports?.some((report) => report.type === 'before');
  const hasAfterReport = booking?.conditionReports?.some((report) => report.type === 'after');
  const reportType = hasBeforeReport ? 'after' : 'before';

  // Updated conditions:
  // - "Before" report when status is 'pickup-confirmed' (no prior "before" report)
  // - "After" report when status is 'delivered' (after "before" report exists)
  const canReportBefore = booking?.status === 'pickup-confirmed' && !hasBeforeReport;
  const canReportAfter = booking?.status === 'delivered' && hasBeforeReport && !hasAfterReport;

  console.log('hasBeforeReport:', hasBeforeReport);
  console.log('hasAfterReport:', hasAfterReport);
  console.log('reportType:', reportType);
  console.log('canReportBefore:', canReportBefore);
  console.log('canReportAfter:', canReportAfter);

  if (!canReportBefore && !canReportAfter) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        </div>
        <div className="max-w-md w-full mx-auto bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-2xl p-8 relative z-10">
          <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-6 animate-text-glow">
            Condition Report
          </h2>
          <p className="text-gray-300 text-center">
            {hasBeforeReport && hasAfterReport
              ? 'Both reports have been submitted.'
              : 'Cannot report at this stage. Please confirm pickup or complete delivery.'}
          </p>
          <button
            onClick={() => navigate('/driver/bookings')}
            className="mt-4 w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md transform hover:scale-105"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-md w-full mx-auto bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-2xl p-8 relative z-10">
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-6 animate-text-glow">
          {reportType === 'before' ? 'Report Condition Before Pickup from Owner' : 'Report Condition After Delivery to Customer'}
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {reportType === 'before' ? 'Condition Before Pickup from Owner' : 'Condition After Delivery to Customer'}
            </label>
            <textarea
              name="condition"
              placeholder={`Describe vehicle condition ${reportType === 'before' ? 'before pickup from owner' : 'after delivery to customer'}`}
              className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.condition}
            />
            {formik.touched.condition && formik.errors.condition && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.condition}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Upload Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            />
            {imagePreviews.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border border-gray-600"
                  />
                ))}
              </div>
            )}
            {formik.touched.images && formik.errors.images && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.images}</p>
            )}
          </div>
          {formik.status && <p className="text-red-400 text-center">{formik.status}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md transform hover:scale-105 disabled:opacity-50"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DriverConditionReport;