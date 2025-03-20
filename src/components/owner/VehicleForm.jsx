import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { addVehicleAPI } from '../../api/vehicles';
import { useNavigate } from 'react-router-dom';
import { vehicleSchema } from '../../utils/validationSchemas';
import { useState, useEffect } from 'react';

const VehicleForm = () => {
  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [insurancePreview, setInsurancePreview] = useState(null);
  const [pollutionPreview, setPollutionPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      model: '',
      type: '',
      price: '',
      fuelType: '',
      category: '',
      seatingCapacity: '',
      location: '',
      registration: '',
      images: [],
      insuranceImage: null,
      pollutionImage: null, // New field
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
      if (values.insuranceImage) formData.append('insuranceImage', values.insuranceImage);
      if (values.pollutionImage) formData.append('pollutionImage', values.pollutionImage)

      try {
        await mutation.mutateAsync(formData);
      } catch (error) {
        formik.setStatus(error.response?.data?.msg || 'Failed to add vehicle');
      }
    },
  });

  const mutation = useMutation({
    mutationKey: ['addVehicle'],
    mutationFn: addVehicleAPI,
    onSuccess: () => navigate('/owner/vehicles'),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Failed to add vehicle'),
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 10 - formik.values.images.length); // Limit to 10 total
    const updatedImages = [...formik.values.images, ...newImages].slice(0, 10);
    formik.setFieldValue('images', updatedImages);
    const previews = updatedImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };
  const handlePollutionChange = (e) => {
    const file = e.target.files[0]; // Only take the first file
    if (file) {
      formik.setFieldValue('pollutionImage', file);
      setPollutionPreview(URL.createObjectURL(file));
    }
  };


  const handleInsuranceChange = (e) => {
    const file = e.target.files[0]; // Only take the first file
    if (file) {
      formik.setFieldValue('insuranceImage', file);
      setInsurancePreview(URL.createObjectURL(file));
    }
  };

  // Cleanup previews to prevent memory leaks
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      if (insurancePreview) URL.revokeObjectURL(insurancePreview);
      if (pollutionPreview) URL.revokeObjectURL(pollutionPreview);
    };
  }, [imagePreviews, insurancePreview,pollutionPreview]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Vehicle</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Model */}
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Model
          </label>
          <input
            id="model"
            type="text"
            name="model"
            placeholder="e.g., Toyota Camry"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.model}
          />
          {formik.touched.model && formik.errors.model && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.model}</p>
          )}
        </div>

        {/* Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Type
          </label>
          <select
            id="type"
            name="type"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.type}
          >
            <option value="">Select Type</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
          </select>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.type}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price per Day ($)
          </label>
          <input
            id="price"
            type="number"
            name="price"
            placeholder="e.g., 50"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
          )}
        </div>

        {/* Fuel Type */}
        <div>
          <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
            Fuel Type
          </label>
          <select
            id="fuelType"
            name="fuelType"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <p className="text-red-500 text-sm mt-1">{formik.errors.fuelType}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            id="category"
            type="text"
            name="category"
            placeholder="e.g., Sedan, SUV"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          />
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.category}</p>
          )}
        </div>

        {/* Seating Capacity */}
        <div>
          <label htmlFor="seatingCapacity" className="block text-sm font-medium text-gray-700 mb-1">
            Seating Capacity
          </label>
          <input
            id="seatingCapacity"
            type="number"
            name="seatingCapacity"
            placeholder="e.g., 5"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.seatingCapacity}
          />
          {formik.touched.seatingCapacity && formik.errors.seatingCapacity && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.seatingCapacity}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="e.g., Thrissur"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
          />
          {formik.touched.location && formik.errors.location && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.location}</p>
          )}
        </div>

        {/* Registration */}
        <div>
          <label htmlFor="registration" className="block text-sm font-medium text-gray-700 mb-1">
            Registration Number
          </label>
          <input
            id="registration"
            type="text"
            name="registration"
            placeholder="e.g., KL-08-AB-1234"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.registration}
          />
          {formik.touched.registration && formik.errors.registration && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.registration}</p>
          )}
        </div>

        {/* Vehicle Images */}
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Images (Max 10)
          </label>
          <input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            disabled={imagePreviews.length >= 10}
          />
          {imagePreviews.length > 0 && (
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Vehicle Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md shadow-sm"
                />
              ))}
            </div>
          )}
          {imagePreviews.length >= 10 && (
            <p className="text-yellow-600 text-sm mt-1">Maximum 10 images reached.</p>
          )}
          {formik.touched.images && formik.errors.images && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.images}</p>
          )}
        </div>

        {/* Insurance Image */}
        <div>
          <label htmlFor="insuranceImage" className="block text-sm font-medium text-gray-700 mb-1">
            Insurance Document (1 Image)
          </label>
          <input
            id="insuranceImage"
            type="file"
            accept="image/*"
            onChange={handleInsuranceChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
          {insurancePreview && (
            <div className="mt-3">
              <img
                src={insurancePreview}
                alt="Insurance Preview"
                className="w-full h-32 object-cover rounded-md shadow-sm"
              />
            </div>
          )}
          {formik.touched.insuranceImage && formik.errors.insuranceImage && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.insuranceImage}</p>
          )}
        </div>
        <div>
          <label htmlFor="pollutionImage" className="block text-sm font-medium text-gray-700 mb-1">
            Pollution Certificate (1 Image)
          </label>
          <input
            id="pollutionImage"
            type="file"
            accept="image/*"
            onChange={handlePollutionChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
          {pollutionPreview && (
            <div className="mt-3">
              <img
                src={pollutionPreview}
                alt="Pollution Certificate Preview"
                className="w-full h-32 object-cover rounded-md shadow-sm"
              />
            </div>
          )}
          {formik.touched.pollutionImage && formik.errors.pollutionImage && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.pollutionImage}</p>
          )}
        </div>

        {/* Status and Submit */}
        {formik.status && (
          <p className="text-red-500 text-center text-sm">{formik.status}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Adding Vehicle...' : 'Add Vehicle'}
        </button>
      </form>
    </div>
  );
};

export default VehicleForm;