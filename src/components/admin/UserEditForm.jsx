import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';

import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { updateUserAPI } from '../../api/admin';

const userSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  role: Yup.string().oneOf(['customer', 'owner', 'driver', 'admin']).required('Role is required'),
});

const UserEditForm = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (userData) => updateUserAPI(userId, userData),
    onSuccess: () => navigate('/admin/users'),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Update failed'),
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', role: '' },
    validationSchema: userSchema,
    onSubmit: (values) => mutation.mutate(values),
  });

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <input
            name="name"
            placeholder="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="w-full p-2 border rounded"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full p-2 border rounded"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <select
            name="role"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Role</option>
            <option value="customer">Customer</option>
            <option value="owner">Owner</option>
            <option value="driver">Driver</option>
            <option value="admin">Admin</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <p className="text-red-500 text-sm">{formik.errors.role}</p>
          )}
        </div>
        {formik.status && <p className="text-red-500 mb-4">{formik.status}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Updating...' : 'Update User'}
        </button>
      </form>
    </div>
  );
};

export default UserEditForm;