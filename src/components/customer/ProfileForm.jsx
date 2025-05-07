import { useFormik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateProfileAPI, getLicenseStatusAPI, getProfileAPI } from '../../api/users';
import { useSelector } from 'react-redux';
import { profileSchema } from '../../utils/validationSchemas';
import LoadingSpinner from '../common/LoadingSpinner';

const ProfileForm = () => {
  const { userId, role } = useSelector((state) => state.auth);

  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const response = await getProfileAPI();
      return response.user;
    },
    enabled: !!userId,
  });

  const { data: licenseStatus, isLoading: licenseLoading } = useQuery({
    queryKey: ['licenseStatus'],
    queryFn: getLicenseStatusAPI,
    enabled: role === 'driver',
  });

  const mutation = useMutation({
    mutationFn: updateProfileAPI,
    onSuccess: () => alert('Profile updated successfully'),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Update failed'),
  });

  const formik = useFormik({
    initialValues: {
      name: profileData?.name || '',
      mobile: profileData?.mobile || '',
      license: null,
    },
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('mobile', values.mobile);
      if (values.license) formData.append('license', values.license);
      await mutation.mutateAsync(formData);
    },
  });

  if (profileLoading || (role === 'driver' && licenseLoading)) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-blue-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
        {/* Subtle Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10 rounded-2xl animate-pulse"></div>

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6 relative z-10">
          Update Your Profile
        </h2>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6 relative z-10">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400 bg-gray-50 text-gray-800 placeholder-gray-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-2 text-red-500 text-sm animate-fade-in">{formik.errors.name}</p>
            )}
          </div>

          {/* Mobile Number Field */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              id="mobile"
              placeholder="Enter your mobile number"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400 bg-gray-50 text-gray-800 placeholder-gray-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <p className="mt-2 text-red-500 text-sm animate-fade-in">{formik.errors.mobile}</p>
            )}
          </div>

          {/* License Field */}
          <div>
            <label htmlFor="license" className="block text-sm font-medium text-gray-700 mb-2">
              Driver’s License (Optional)
            </label>
            <input
              type="file"
              name="license"
              id="license"
              onChange={(e) => formik.setFieldValue('license', e.target.files[0])}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-semibold hover:file:bg-blue-700 transition-all duration-200 bg-gray-50"
            />
            {formik.touched.license && formik.errors.license && (
              <p className="mt-2 text-red-500 text-sm animate-fade-in">{formik.errors.license}</p>
            )}
          </div>

          {/* License Status (Driver Only) */}
          {role === 'driver' && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <span className="font-medium">License Status:</span>{' '}
                <span
                  className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                    licenseStatus?.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : licenseStatus?.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {licenseStatus?.status || 'N/A'}
                </span>
              </p>
            </div>
          )}

          {/* Error Message */}
          {formik.status && (
            <p className="text-red-500 text-sm text-center animate-fade-in">{formik.status}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                Updating...
              </span>
            ) : (
              'Update Profile'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;