import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { makePaymentAPI } from '../../api/bookings';
import { useParams, useNavigate } from 'react-router-dom';
import { paymentSchema } from '../../utils/validationSchemas';

const PaymentForm = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: makePaymentAPI,
    onSuccess: () => navigate('/customer/bookings'),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Payment failed'),
  });

  const formik = useFormik({
    initialValues: {
      amount: '',
      paymentMethod: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
    },
    validationSchema: paymentSchema,
    onSubmit: async (values) => {
      await mutation.mutateAsync({ ...values, bookingId });
    },
  });

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Make Payment</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
          />
          {formik.touched.amount && formik.errors.amount && (
            <p className="text-red-500 text-sm">{formik.errors.amount}</p>
          )}
        </div>
        <div className="mb-4">
          <select
            name="paymentMethod"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.paymentMethod}
          >
            <option value="">Select Payment Method</option>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
          </select>
          {formik.touched.paymentMethod && formik.errors.paymentMethod && (
            <p className="text-red-500 text-sm">{formik.errors.paymentMethod}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cardNumber}
          />
          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <p className="text-red-500 text-sm">{formik.errors.cardNumber}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.expiry}
          />
          {formik.touched.expiry && formik.errors.expiry && (
            <p className="text-red-500 text-sm">{formik.errors.expiry}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cvv}
          />
          {formik.touched.cvv && formik.errors.cvv && (
            <p className="text-red-500 text-sm">{formik.errors.cvv}</p>
          )}
        </div>
        {formik.status && <p className="text-red-500 mb-4">{formik.status}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;