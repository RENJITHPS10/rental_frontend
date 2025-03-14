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
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Submit a Support Ticket</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <textarea
            name="issue"
            placeholder="Describe your issue"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.issue}
          />
          {formik.touched.issue && formik.errors.issue && (
            <p className="text-red-500 text-sm">{formik.errors.issue}</p>
          )}
        </div>
        {formik.status && <p className="text-red-500 mb-4">{formik.status}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </form>
    </div>
  );
};

export default SupportTicketForm;