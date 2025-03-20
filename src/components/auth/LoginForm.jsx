import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../utils/validationSchemas";
import { loginUserAPI } from "../../api/users";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUserAPI,
    onSuccess: (data) => {
      sessionStorage.setItem("token", data.token);
      dispatch(loginSuccess({ role: data.role, userId: data.userId }));
      navigate(`/${data.role}`);
    },
    onError: (error) => {
      formik.setStatus(error.response?.data?.msg || "Login failed. Please try again.");
    },
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (values) => mutation.mutate(values),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 transform transition-all hover:shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Welcome Back
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
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
                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
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
              placeholder="Enter your password"
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-red-500 text-sm animate-fade-in">{formik.errors.password}</p>
            )}
          </div>

          {/* Error Message */}
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
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          {/* Additional Links */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
