import { useFormik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateProfileAPI, getLicenseStatusAPI } from '../../api/users';
import { useSelector } from 'react-redux';
import { profileSchema } from '../../utils/validationSchemas';
import LoadingSpinner from '../common/LoadingSpinner';

const ProfileForm = () => {
  const { userId, role } = useSelector((state) => state.auth);

  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const response = await updateProfileAPI(new FormData()); // Fetch current profile
      return response.data;
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
      email: profileData?.email || '',
      license: null,
    },
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      if (values.license) formData.append('license', values.license);
      await mutation.mutateAsync(formData);
    },
  });

  if (profileLoading || (role === 'driver' && licenseLoading)) return <LoadingSpinner />;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="file"
            name="license"
            onChange={(e) => formik.setFieldValue('license', e.target.files[0])}
            className="w-full p-2 border rounded"
          />
          {formik.touched.license && formik.errors.license && (
            <p className="text-red-500 text-sm">{formik.errors.license}</p>
          )}
        </div>
        {role === 'driver' && <p className="mb-4">License Status: {licenseStatus?.status || 'N/A'}</p>}
        {formik.status && <p className="text-red-500 mb-4">{formik.status}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;