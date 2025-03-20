import { useFormik } from 'formik';
import { useQuery, useMutation } from '@tanstack/react-query';
import { makePaymentAPI } from '../../api/bookings';
import { useParams, useNavigate } from 'react-router-dom';
import { paymentSchema } from '../../utils/validationSchemas';
import LoadingSpinner from '../common/LoadingSpinner';

import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QzxQzRubZOArVvYnMrEYZjgEialze0MQadGGf26Xjb972ZQmyzMbjVZtM35cQgJ4BkoepE3EadMwbaZUlyepEdK00cULxSHPD'); // Add your Stripe public key

const PaymentFormInner = ({ bookingId, booking, navigate, isLoading, isError, error }) => {
  const stripe = useStripe();
  const elements = useElements();
  const mutation = useMutation({
    mutationFn: makePaymentAPI,
    onSuccess: () => navigate('/customer/bookings'),
    onError: (error) => formik.setStatus(error.response?.data?.msg || 'Payment failed'),
  });

  const formik = useFormik({
    initialValues: {
      amount: booking?.totalPrice || '',
      paymentMethod: 'card', // Default to card
    },
    enableReinitialize: true,
    validationSchema: paymentSchema,
    onSubmit: async (values) => {
      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);
      const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (stripeError) {
        formik.setStatus(stripeError.message);
        return;
      }

      await mutation.mutateAsync({ bookingId, paymentMethodId: paymentMethod.id });
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    return (
      <div className="text-center p-6 bg-red-100 text-red-800 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Error Loading Booking</h2>
        <p>{error?.msg || 'Failed to load booking details.'}</p>
      </div>
    );
  }

  if (booking.status !== 'approved') {
    return (
      <div className="text-center p-6 bg-yellow-100 text-yellow-800 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Payment Not Available</h2>
        <p>This booking is not approved yet. Please wait for approval.</p>
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
            value={formik.values.amount}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Card Details</label>
          <CardElement
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            options={{ style: { base: { fontSize: '16px' } } }}
          />
        </div>
        {formik.status && <p className="text-red-500 mb-4 text-center">{formik.status}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          disabled={!stripe || mutation.isPending}
        >
          {mutation.isPending ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

const PaymentForm = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const { data: booking, isLoading, isError, error } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBookingByIdAPI(bookingId),
  });

  console.log('Booking:', booking);

  return (
    <Elements stripe={stripePromise}>
      <PaymentFormInner
        bookingId={bookingId}
        booking={booking}
        navigate={navigate}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </Elements>
  );
};

export default PaymentForm;