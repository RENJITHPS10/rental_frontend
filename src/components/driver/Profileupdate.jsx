import { useFormik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../common/LoadingSpinner';
import { updateDriverAPI, getDriverProfileAPI } from '../../api/driver';

const ProfileUpdate = () => {
  const { userId } = useSelector((state) => state.auth); // Assuming { userId, role } in auth slice
  console.log('User ID from Redux:', userId);

  // Fetch current driver profile
  const { data: driver, isLoading, isError, error } = useQuery({
    queryKey: ['driverProfile', userId],
    queryFn: getDriverProfileAPI, // No need to pass userId explicitly
    enabled: !!userId, // Only run if userId exists
  });

  const mutation = useMutation({
    mutationFn: updateDriverAPI,
    onSuccess: () => {
      alert('Profile updated successfully');
    },
    onError: (error) => {
      console.error('Update error:', error);
      formik.setStatus(error.response?.data?.msg || 'Failed to update profile');
    },
  });

  const formik = useFormik({
    initialValues: {
      availability: driver?.availability ?? true,
      location: driver?.location ?? '',
    },
    enableReinitialize: true, // Reinitialize when driver data loads
    onSubmit: (values) => {
      if (!driver?._id) {
        formik.setStatus('Driver data not loaded yet');
        return;
      }
      mutation.mutate({ driverId: driver._id, ...values });
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="availability" className="block text-sm font-medium">
            Availability
          </label>
          <select
            id="availability"
            name="availability"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            value={formik.values.availability}
          >
            <option value={true}>Available</option>
            <option value={false}>Unavailable</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter your location (e.g., Boston, MA)"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            value={formik.values.location}
          />
        </div>
        {formik.status && <p className="text-red-500 mb-4">{formik.status}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
          disabled={mutation.isPending || isLoading || !driver}
        >
          {mutation.isPending ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;