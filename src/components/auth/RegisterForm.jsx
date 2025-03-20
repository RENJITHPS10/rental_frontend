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
      localStorage.setItem('token', data.token);
      navigate('/login');
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      formik.setStatus(error.response?.data?.msg || 'Registration failed');
    },
  });

  const formik = useFormik({
    initialValues: { 
      name: '', 
      email: '', 
      password: '', 
      role: '', 
      mobile: '', 
      license: null 
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      if ((values.role === 'customer' || values.role === 'driver') && !values.license) {
        formik.setStatus('License is required for customers and drivers');
        return;
      }

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('role', values.role);
      formData.append('mobile', values.mobile);
      if (values.license) {
        formData.append('license', values.license);
      }

      try {
        await mutation.mutateAsync(formData);
      } catch (error) {
        console.error('Mutation error:', error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 transform transition-all hover:shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6 bg-clip-text  bg-gradient-to-r from-blue-600 to-purple-600">
          Create Your Account
        </h2>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your full name"
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Create a password"
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.password}</p>
            )}
          </div>

          {/* Mobile Field */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              id="mobile"
              placeholder="Enter your mobile number"
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formik.touched.mobile && formik.errors.mobile ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.mobile}</p>
            )}
          </div>

          {/* Role Field */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Select Role
            </label>
            <select
              name="role"
              id="role"
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formik.touched.role && formik.errors.role ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
            >
              <option value="">Choose your role</option>
              <option value="customer">Customer</option>
              <option value="owner">Owner</option>
              <option value="driver">Driver</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.role}</p>
            )}
          </div>

          {/* License Field */}
          {(formik.values.role === 'customer' || formik.values.role === 'driver') && (
            <div>
              <label htmlFor="license" className="block text-sm font-medium text-gray-700 mb-1">
                Driver's License (Required)
              </label>
              <input
                type="file"
                name="license"
                id="license"
                className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  formik.touched.license && !formik.values.license ? 'border-red-500' : 'border-gray-300'
                }`}
                onChange={(e) => formik.setFieldValue('license', e.target.files[0])}
                accept="image/*"
              />
              {formik.touched.license && !formik.values.license && (
                <p className="mt-1 text-red-500 text-sm animate-fade-in">License is required</p>
              )}
            </div>
          )}

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
                Registering...
              </span>
            ) : (
              'Register'
            )}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

