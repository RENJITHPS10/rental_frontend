import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { reportConditionAPI } from '../../api/driver';
import { useParams, useNavigate } from 'react-router-dom';
import { conditionReportSchema } from '../../utils/validationSchemas';
import { useState } from 'react';

const DriverConditionReport = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState([]);

  const mutation = useMutation({
    mutationFn: (conditionData) => reportConditionAPI(bookingId, conditionData),
    onSuccess: () => navigate('/driver/bookings'),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Report submission failed'),
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

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Driver Condition Report</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <textarea
            name="condition"
            placeholder="Describe vehicle condition"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.condition}
          />
          {formik.touched.condition && formik.errors.condition && (
            <p className="text-red-500 text-sm">{formik.errors.condition}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {imagePreviews.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {imagePreviews.map((preview, index) => (
                <img key={index} src={preview} alt="Preview" className="w-24 h-24 object-cover rounded" />
              ))}
            </div>
          )}
          {formik.touched.images && formik.errors.images && (
            <p className="text-red-500 text-sm">{formik.errors.images}</p>
          )}
        </div>
        {formik.status && <p className="text-red-500 mb-4">{formik.status}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default DriverConditionReport;