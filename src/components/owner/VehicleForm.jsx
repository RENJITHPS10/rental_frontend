import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { addVehicleAPI } from '../../api/vehicles';
import { useNavigate } from 'react-router-dom';
import { vehicleSchema } from '../../utils/validationSchemas';
import { useState, useEffect } from 'react';

const VehicleForm = () => {
  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState([]);

  const formik = useFormik({
    initialValues: {
      model: '',
      type: '', // Changed from vehicleType to match backend
      price: '', // Changed from pricePerDay to match backend
      fuelType: '',
      category: '', // Added to match backend
      seatingCapacity: '', // Added to match backend
      location: '', // Added to match backend
      registration: '', // Added to match backend
      images: [],
      insuranceImage: null, // Changed to match backend naming
    },
    validationSchema: vehicleSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('model', values.model);
      formData.append('type', values.type);
      formData.append('price', values.price);
      formData.append('fuelType', values.fuelType);
      formData.append('category', values.category);
      formData.append('seatingCapacity', values.seatingCapacity);
      formData.append('location', values.location);
      formData.append('registration', values.registration);
      values.images.forEach((image) => formData.append('images', image));
      formData.append('insuranceImage', values.insuranceImage);

      try {
        await mutation.mutateAsync(formData);
      } catch (error) {
        formik.setStatus(error.response?.data?.msg || 'Vehicle addition failed');
      }
    },
  });

  const mutation = useMutation({
    mutationKey: ['addVehicle'],
    mutationFn: addVehicleAPI,
    onSuccess: () => navigate('/owner/vehicles'),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Vehicle addition failed'),
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue('images', files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Cleanup image previews to prevent memory leaks
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add Vehicle</h2>
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
            name="type"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.type}
          >
            <option value="">Select Type</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
          </select>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-500 text-sm">{formik.errors.type}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500 text-sm">{formik.errors.price}</p>
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
            type="text"
            name="category"
            placeholder="Category"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          />
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-sm">{formik.errors.category}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="seatingCapacity"
            placeholder="Seating Capacity"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.seatingCapacity}
          />
          {formik.touched.seatingCapacity && formik.errors.seatingCapacity && (
            <p className="text-red-500 text-sm">{formik.errors.seatingCapacity}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
          />
          {formik.touched.location && formik.errors.location && (
            <p className="text-red-500 text-sm">{formik.errors.location}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="registration"
            placeholder="Registration Number"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.registration}
          />
          {formik.touched.registration && formik.errors.registration && (
            <p className="text-red-500 text-sm">{formik.errors.registration}</p>
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
                <img
                  key={index}
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded"
                />
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
            name="insuranceImage"
            onChange={(e) => formik.setFieldValue('insuranceImage', e.target.files[0])}
            className="w-full p-2 border rounded"
          />
          {formik.touched.insuranceImage && formik.errors.insuranceImage && (
            <p className="text-red-500 text-sm">{formik.errors.insuranceImage}</p>
          )}
        </div>
        {formik.status && <p className="text-red-500 mb-4">{formik.status}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Adding...' : 'Add Vehicle'}
        </button>
      </form>
    </div>
  );
};

export default VehicleForm;