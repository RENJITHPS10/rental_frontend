import { useFormik } from 'formik';
import { useQuery, useMutation } from '@tanstack/react-query';
import { makePaymentAPI, getBookingByIdAPI } from '../../api/bookings';
import { useParams, useNavigate } from 'react-router-dom';
import { paymentSchema } from '../../utils/validationSchemas';
import LoadingSpinner from '../common/LoadingSpinner';

const PaymentForm = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const { data: booking, isLoading, isError, error } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBookingByIdAPI(bookingId),
  });
console.log(booking)
  const mutation = useMutation({
    mutationFn: makePaymentAPI,
    onSuccess: () => navigate('/customer/bookings'),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Payment failed'),
  });

  const formik = useFormik({
    initialValues: {
      amount: booking?.totalPrice || '',
      paymentMethod: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
    },
    enableReinitialize: true,
    validationSchema: paymentSchema,
    onSubmit: async (values) => {
      await mutation.mutateAsync({ ...values, bookingId });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-6 bg-red-100 text-red-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Error Loading Booking</h2>
          <p>{error?.msg || 'Failed to load booking details.'}</p>
        </div>
      </div>
    );
  }

  if (booking.status !== 'approved') { // Adjusted to 'confirmed'
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-6 bg-yellow-100 text-yellow-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Payment Not Available</h2>
          <p>This booking is not confirmed yet. Please wait for owner approval.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Make Payment</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
            value={formik.values.amount} // Fixed to 800 from booking
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Payment Method</label>
          <select
            name="paymentMethod"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.paymentMethod}
          >
            <option value="">Select Payment Method</option>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
          </select>
          {formik.touched.paymentMethod && formik.errors.paymentMethod && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.paymentMethod}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cardNumber}
          />
          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.cardNumber}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Expiry (MM/YY)</label>
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.expiry}
          />
          {formik.touched.expiry && formik.errors.expiry && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.expiry}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">CVV</label>
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cvv}
          />
          {formik.touched.cvv && formik.errors.cvv && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.cvv}</p>
          )}
        </div>
        {formik.status && <p className="text-red-500 mb-4 text-center">{formik.status}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;