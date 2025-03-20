import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { createSupportTicketAPI } from '../../api/support';
import { supportTicketSchema } from '../../utils/validationSchemas';

const SupportTicketForm = () => {
  const mutation = useMutation({
    mutationFn: createSupportTicketAPI,
    onSuccess: () => formik.resetForm(),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Ticket submission failed'),
  });

  const formik = useFormik({
    initialValues: { issue: '' },
    validationSchema: supportTicketSchema,
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full mx-auto bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10 rounded-2xl animate-pulse"></div>
        <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6 relative z-10">
          Submit a Support Ticket
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-2">
              Describe Your Issue
            </label>
            <textarea
              name="issue"
              id="issue"
              placeholder="Tell us how we can assist you..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400 resize-y min-h-[120px] bg-gray-50 text-gray-800 placeholder-gray-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.issue}
            />
            {formik.touched.issue && formik.errors.issue && (
              <p className="mt-2 text-red-500 text-sm animate-fade-in">{formik.errors.issue}</p>
            )}
          </div>
          {formik.status && (
            <p className="text-red-500 text-sm text-center animate-fade-in">{formik.status}</p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Ticket'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportTicketForm;