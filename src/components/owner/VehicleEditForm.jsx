import { useFormik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateVehicleAPI, getOwnerVehiclesAPI } from '../../api/vehicles';
import { useParams, useNavigate } from 'react-router-dom';
import { vehicleSchema } from '../../utils/validationSchemas';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const VehicleEditForm = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [insurancePreview, setInsurancePreview] = useState(null);
  const [pollutionPreview, setPollutionPreview] = useState(null);

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ['vehicle', vehicleId],
    queryFn: async () => {
      const vehicles = await getOwnerVehiclesAPI();
      return vehicles.find((v) => v._id === vehicleId);
    },
  });

  const mutation = useMutation({
    mutationFn: (formData) => updateVehicleAPI(vehicleId, formData),
    onSuccess: () => navigate('/owner/vehicles'),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Update failed'),
  });

  const formik = useFormik({
    initialValues: {
      model: vehicle?.model || '',
      type: vehicle?.vehicleType || '', // Renamed to match VehicleForm
      price: vehicle?.pricePerDay || '', // Renamed to match VehicleForm
      fuelType: vehicle?.fuelType || '',
      category: vehicle?.category || '',
      seatingCapacity: vehicle?.seatingCapacity || '',
      location: vehicle?.location || '',
      registration: vehicle?.registration || '',
      images: [], // New images to upload
      insuranceImage: null, // New insurance image to upload
      pollutionImage: null, // New pollution image to upload
    },
    validationSchema: vehicleSchema,
    enableReinitialize: true,
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

      await mutation.mutateAsync(formData);
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 10 - imagePreviews.length);
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

  // Cleanup previews to prevent memory leaks
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      if (insurancePreview) URL.revokeObjectURL(insurancePreview);
      if (pollutionPreview) URL.revokeObjectURL(pollutionPreview);
    };
  }, [imagePreviews, insurancePreview, pollutionPreview]);

  // Set initial previews from existing vehicle data
  useEffect(() => {
    if (vehicle) {
      if (vehicle.images && imagePreviews.length === 0) {
        setImagePreviews(vehicle.images.map((img) => img.url || img));
      }
      if (vehicle.insuranceImage && !insurancePreview) {
        setInsurancePreview(vehicle.insuranceImage.url || vehicle.insuranceImage);
      }
      if (vehicle.pollutionImage && !pollutionPreview) {
        setPollutionPreview(vehicle.pollutionImage.url || vehicle.pollutionImage);
      }
    }
  }, [vehicle]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 transform transition-all hover:shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Edit Vehicle Details
        </h2>
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
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formik.touched.model && formik.errors.model ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.model}
            />
            {formik.touched.model && formik.errors.model && (
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.model}</p>
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
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formik.touched.type && formik.errors.type ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
            >
              <option value="">Select Type</option>
              <option value="bike">Bike</option>
              <option value="car">Car</option>
            </select>
            {formik.touched.type && formik.errors.type && (
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.type}</p>
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
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formik.touched.price && formik.errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price && (
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.price}</p>
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
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formik.touched.fuelType && formik.errors.fuelType ? 'border-red-500' : 'border-gray-300'
              }`}
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
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.fuelType}</p>
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
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formik.touched.category && formik.errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            />
            {formik.touched.category && formik.errors.category && (
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.category}</p>
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
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formik.touched.seatingCapacity && formik.errors.seatingCapacity ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.seatingCapacity}
            />
            {formik.touched.seatingCapacity && formik.errors.seatingCapacity && (
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.seatingCapacity}</p>
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
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formik.touched.location && formik.errors.location ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
            />
            {formik.touched.location && formik.errors.location && (
              <p class Pubblic="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.location}</p>
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
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formik.touched.registration && formik.errors.registration ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registration}
            />
            {formik.touched.registration && formik.errors.registration && (
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.registration}</p>
            )}
          </div>

          {/* Vehicle Images */}
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Images (Add New, Max 10)
            </label>
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-all duration-200"
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
              <p className="mt-1 text-yellow-600 text-sm">Maximum 10 images reached.</p>
            )}
            {formik.touched.images && formik.errors.images && (
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.images}</p>
            )}
          </div>

          {/* Insurance Image */}
          <div>
            <label htmlFor="insuranceImage" className="block text-sm font-medium text-gray-700 mb-1">
              Insurance Document (Update)
            </label>
            <input
              id="insuranceImage"
              type="file"
              accept="image/*"
              onChange={handleInsuranceChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-all duration-200"
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
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.insuranceImage}</p>
            )}
          </div>

          {/* Pollution Image */}
          <div>
            <label htmlFor="pollutionImage" className="block text-sm font-medium text-gray-700 mb-1">
              Pollution Certificate (Update)
            </label>
            <input
              id="pollutionImage"
              type="file"
              accept="image/*"
              onChange={handlePollutionChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-all duration-200"
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
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.pollutionImage}</p>
            )}
          </div>

          {/* Form Status */}
          {formik.status && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded animate-fade-in">
              {formik.status}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Updating...
              </span>
            ) : (
              'Update Vehicle'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleEditForm;

