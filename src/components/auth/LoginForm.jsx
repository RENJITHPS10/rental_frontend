import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { loginUserAPI } from '../../api/users';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../utils/validationSchemas';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUserAPI,
    onSuccess: (data) => {
      sessionStorage.setItem('token', data.token);
      dispatch(loginSuccess({ role: data.role, userId: data.userId }));
      navigate(`/${data.role}`);
    },
    onError: (error) => {
      // Extract error message from response and set it in Formik status
      const errorMessage = error.response?.data?.msg || 'Login failed. Please try again.';
      formik.setStatus(errorMessage);
    },
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: (values) => mutation.mutate(values),
  });

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={formik.handleSubmit}>
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
        {formik.status && <p className="text-red-500 mb-4">{formik.status}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;