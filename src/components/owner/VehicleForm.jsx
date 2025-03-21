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

  const mutation = useMutation({
    mutationFn: addVehicleAPI, // Corrected: mutationKey is optional, removed ['addVehicle']
    onSuccess: () => navigate('/owner/vehicles'),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Failed to add vehicle'),
  });

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
      pollutionImage: null,
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
      if (values.pollutionImage) formData.append('pollutionImage', values.pollutionImage);

      await mutation.mutateAsync(formData); // Simplified: Removed try-catch, handled by onError
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 10 - formik.values.images.length); // Limit to 10
    const updatedImages = [...formik.values.images, ...newImages].slice(0, 10);
    formik.setFieldValue('images', updatedImages);
    const previews = updatedImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleInsuranceChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue('insuranceImage', file);
      setInsurancePreview(URL.createObjectURL(file));
    }
  };

  const handlePollutionChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue('pollutionImage', file);
      setPollutionPreview(URL.createObjectURL(file));
    }
  };

  // Cleanup previews
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      if (insurancePreview) URL.revokeObjectURL(insurancePreview);
      if (pollutionPreview) URL.revokeObjectURL(pollutionPreview);
    };
  }, [imagePreviews, insurancePreview, pollutionPreview]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Neon Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-2xl w-full mx-auto bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] relative z-10">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-8 animate-text-glow">
          Add New Vehicle
        </h2>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Model */}
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-300 mb-2">
              Vehicle Model
            </label>
            <input
              id="model"
              type="text"
              name="model"
              placeholder="e.g., Toyota Camry"
              className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.model}
            />
            {formik.touched.model && formik.errors.model && (
              <p className="mt-2 text-red-400 text-sm animate-fade-in">{formik.errors.model}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
              Vehicle Type
            </label>
            <select
              id="type"
              name="type"
              className="w gehen-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
            >
              <option value="" className="bg-gray-800">Select Type</option>
              <option value="bike" className="bg-gray-800">Bike</option>
              <option value="car" className="bg-gray-800">Car</option>
            </select>
            {formik.touched.type && formik.errors.type && (
              <p className="mt-2 text-red-400 text-sm animate-fade-in">{formik.errors.type}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
              Price per Day ($)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              placeholder="e.g., 50"
              className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price && (
              <p className="mt-2 text-red-400 text-sm animate-fade-in">{formik.errors.price}</p>
            )}
          </div>

          {/* Fuel Type */}
          <div>
            <label htmlFor="fuelType" className="block text-sm font-medium text-gray-300 mb-2">
              Fuel Type
            </label>
            <select
              id="fuelType"
              name="fuelType"
              className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fuelType}
            >
              <option value="" className="bg-gray-800">Select Fuel Type</option>
              <option value="petrol" className="bg-gray-800">Petrol</option>
              <option value="diesel" className="bg-gray-800">Diesel</option>
              <option value="electric" className="bg-gray-800">Electric</option>
            </select>
            {formik.touched.fuelType && formik.errors.fuelType && (
              <p className="mt-2 text-red-400 text-sm animate-fade-in">{formik.errors.fuelType}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <input
              id="category"
              type="text"
              name="category"
              placeholder="e.g., Sedan, SUV"
              className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            />
            {formik.touched.category && formik.errors.category && (
              <p className="mt-2 text-red-400 text-sm animate-fade-in">{formik.errors.category}</p>
            )}
          </div>

          {/* Seating Capacity */}
          <div>
            <label htmlFor="seatingCapacity" className="block text-sm font-medium text-gray-300 mb-2">
              Seating Capacity
            </label>
            <input
              id="seatingCapacity"
              type="number"
              name="seatingCapacity"
              placeholder="e.g., 5"
              className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.seatingCapacity}
            />
            {formik.touched.seatingCapacity && formik.errors.seatingCapacity && (
              <p className="mt-2 text-red-400 text-sm animate-fade-in">{formik.errors.seatingCapacity}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
              Pickup Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="e.g., Thrissur"
              className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
            />
            {formik.touched.location && formik.errors.location && (
              <p className="mt-2 text-red-400 text-sm animate-fade-in">{formik.errors.location}</p>
            )}
          </div>

          {/* Registration */}
          <div>
            <label htmlFor="registration" className="block text-sm font-medium text-gray-300 mb-2">
              Registration Number
            </label>
            <input
              id="registration"
              type="text"
              name="registration"
              placeholder="e.g., KL-08-AB-1234"
              className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registration}
            />
            {formik.touched.registration && formik.errors.registration && (
              <p className="mt-2 text-red-400 text-sm animate-fade-in">{formik.errors.registration}</p>
            )}
          </div>

          {/* Vehicle Images */}
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-300 mb-2">
              Vehicle Images (Max 10)
            </label>
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              disabled={imagePreviews.length >= 10}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white file:font-semibold hover:file:bg-cyan-700 transition-all duration-300 disabled:opacity-50"
            />
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Vehicle Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md border border-gray-600/50"
                  />
                ))}
              </div>
            )}
            {imagePreviews.length >= 10 && (
              <p className="mt-2 text-yellow-400 text-sm">Maximum 10 images reached.</p>
            )}
            {formik.touched.images && formik.errors.images && (
              <p className="mt-2 text-red-400 text-sm animate-fade-in">{formik.errors.images}</p>
            )}
          </div>

          {/* Insurance Image */}
          <div>
            <label htmlFor="insuranceImage" className="block text-sm font-medium text-gray-300 mb-2">
              Insurance Document
            </label>
            <input
              id="insuranceImage"
              type="file"
              accept="image/*"
              onChange={handleInsuranceChange}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white file:font-semibold hover:file:bg-cyan-700 transition-all duration-300"
            />
            {insurancePreview && (
              <div className="mt-4">
                <img
                  src={insurancePreview}
                  alt="Insurance Preview"
                  className="w-full h-32 object-cover rounded-lg shadow-md border border-gray-600/50"
                />
              </div>
            )}
            {formik.touched.insuranceImage && formik.errors.insuranceImage && (
              <p className="mt-2 text-red-400 text-sm animate-fade-in">{formik.errors.insuranceImage}</p>
            )}
          </div>

          {/* Pollution Image */}
          <div>
            <label htmlFor="pollutionImage" className="block text-sm font-medium text-gray-300 mb-2">
              Pollution Certificate
            </label>
            <input
              id="pollutionImage"
              type="file"
              accept="image/*"
              onChange={handlePollutionChange}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white file:font-semibold hover:file:bg-cyan-700 transition-all duration-300"
            />
            {pollutionPreview && (
              <div className="mt-4">
                <img
                  src={pollutionPreview}
                  alt="Pollution Certificate Preview"
                  className="w-full h-32 object-cover rounded-lg shadow-md border border-gray-600/50"
                />
              </div>
            )}
            {formik.touched.pollutionImage && formik.errors.pollutionImage && (
              <p className="mt-2 text-red-400 text-sm animate-fade-in">{formik.errors.pollutionImage}</p>
            )}
          </div>

          {/* Status and Submit */}
          {formik.status && (
            <p className="text-red-400 text-sm text-center animate-fade-in">{formik.status}</p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all duration-300 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Adding Vehicle...
              </span>
            ) : (
              'Add Vehicle'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleForm;