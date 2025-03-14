import { useFormik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateVehicleAPI, getOwnerVehiclesAPI } from '../../api/vehicles';
import { useParams, useNavigate } from 'react-router-dom';
import { vehicleSchema } from '../../utils/validationSchemas';
import { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const VehicleEditForm = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState([]);

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ['vehicle', vehicleId],
    queryFn: async () => {
      const vehicles = await getOwnerVehiclesAPI();
      return vehicles.find((v) => v._id === vehicleId);
    },
  });

  const mutation = useMutation({
    mutationFn: updateVehicleAPI,
    onSuccess: () => navigate('/owner/vehicles'),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Update failed'),
  });

  const formik = useFormik({
    initialValues: {
      model: vehicle?.model || '',
      vehicleType: vehicle?.vehicleType || '',
      pricePerDay: vehicle?.pricePerDay || '',
      fuelType: vehicle?.fuelType || '',
      images: [],
      insurance: null,
    },
    validationSchema: vehicleSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('model', values.model);
      formData.append('vehicleType', values.vehicleType);
      formData.append('pricePerDay', values.pricePerDay);
      formData.append('fuelType', values.fuelType);
      values.images.forEach((image) => formData.append('images', image));
      if (values.insurance) formData.append('insuranceImage', values.insurance);
      await mutation.mutateAsync(vehicleId, formData);
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue('images', files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Vehicle</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="model"
            placeholder="Model"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.model}
          />
          {formik.touched.model && formik.errors.model && (
            <p className="text-red-500 text-sm">{formik.errors.model}</p>
          )}
        </div>
        <div className="mb-4">
          <select
            name="vehicleType"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.vehicleType}
          >
            <option value="">Select Type</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
          </select>
          {formik.touched.vehicleType && formik.errors.vehicleType && (
            <p className="text-red-500 text-sm">{formik.errors.vehicleType}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="pricePerDay"
            placeholder="Price/Day"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pricePerDay}
          />
          {formik.touched.pricePerDay && formik.errors.pricePerDay && (
            <p className="text-red-500 text-sm">{formik.errors.pricePerDay}</p>
          )}
        </div>
        <div className="mb-4">
          <select
            name="fuelType"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fuelType}
          >
            <option value="">Select Fuel Type</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
          </select>
          {formik.touched.fuelType && formik.errors.fuelType && (
            <p className="text-red-500 text-sm">{formik.errors.fuelType}</p>
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
        <div className="mb-4">
          <input
            type="file"
            name="insurance"
            onChange={(e) => formik.setFieldValue('insurance', e.target.files[0])}
            className="w-full p-2 border rounded"
          />
          {formik.touched.insurance && formik.errors.insurance && (
            <p className="text-red-500 text-sm">{formik.errors.insurance}</p>
          )}
        </div>
        {formik.status && <p className="text-red-500 mb-4">{formik.status}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Updating...' : 'Update Vehicle'}
        </button>
      </form>
    </div>
  );
};

export default VehicleEditForm;