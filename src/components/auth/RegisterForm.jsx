import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { registerUserAPI } from '../../api/users';
import { registerSchema } from '../../utils/validationSchemas';

const RegisterForm = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUserAPI,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token); // Store token if needed
      navigate('/login');
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      formik.setStatus(error.response?.data?.msg || 'Registration failed');
    },
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', role: '', license: null },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      console.log('Form values:', values);

      // Require license for customer and driver
      if ((values.role === 'customer' || values.role === 'driver') && !values.license) {
        formik.setStatus('License is required for customers and drivers');
        return;
      }

      // Prepare FormData
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('role', values.role);
      if (values.license) {
        formData.append('license', values.license); // File object
      }

      console.log('FormData:', [...formData.entries()]);

      // Submit form
      try {
        await mutation.mutateAsync(formData);
      } catch (error) {
        console.error('Mutation error:', error);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        {/* Name Field */}
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

        {/* Email Field */}
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

        {/* Password Field */}
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        {/* Role Field */}
        <div className="mb-4">
          <select
            name="role"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
          >
            <option value="">Select Role</option>
            <option value="customer">Customer</option>
            <option value="owner">Owner</option>
            <option value="driver">Driver</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <p className="text-red-500 text-sm">{formik.errors.role}</p>
          )}
        </div>

        {/* License Field (Required for customer and driver) */}
        {(formik.values.role === 'customer' || formik.values.role === 'driver') && (
          <div className="mb-4">
            <label htmlFor="license" className="block text-sm font-medium">
              License (Required)
            </label>
            <input
              type="file"
              name="license"
              id="license"
              onChange={(e) => formik.setFieldValue('license', e.target.files[0])}
              className="w-full p-2 border rounded"
              accept="image/*"
            />
            {formik.touched.license && !formik.values.license && (
              <p className="text-red-500 text-sm">License is required</p>
            )}
          </div>
        )}

        {/* Form Status (Error Messages) */}
        {formik.status && <p className="text-red-500 mb-4">{formik.status}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;