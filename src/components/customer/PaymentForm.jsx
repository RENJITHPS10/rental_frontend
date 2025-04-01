import { useFormik } from 'formik';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getBookingByIdAPI, makePaymentAPI } from '../../api/bookings';
import { useParams, useNavigate } from 'react-router-dom';
import { paymentSchema } from '../../utils/validationSchemas';
import LoadingSpinner from '../common/LoadingSpinner';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QzxQzRubZOArVvYnMrEYZjgEialze0MQadGGf26Xjb972ZQmyzMbjVZtM35cQgJ4BkoepE3EadMwbaZUlyepEdK00cULxSHPD');

const PaymentFormInner = ({ bookingId, booking, navigate, isLoading, isError, error }) => {
  const stripe = useStripe();
  const elements = useElements();
  const mutation = useMutation({
    mutationFn: makePaymentAPI,
    onSuccess: (data) => {
      console.log('Payment Success:', data);
      navigate('/customer/payment/success');
    },
    onError: (error) => {
      console.error('Mutation Error:', error.response?.data || error.message);
      formik.setStatus(error.response?.data?.msg || 'Payment failed');
    },
  });

  const formik = useFormik({
    initialValues: { amount: booking?.totalPrice || '' },
    enableReinitialize: true,
    validationSchema: paymentSchema,
    onSubmit: async () => {
      console.log('Form Submitted'); // Debug
      if (!stripe || !elements) {
        console.error('Stripe or Elements not loaded');
        return;
      }

      const cardElement = elements.getElement(CardElement);
      console.log('Creating Payment Method'); // Debug
      const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (stripeError) {
        console.error('Stripe Error:', stripeError.message);
        formik.setStatus(stripeError.message);
        return;
      }

      console.log('Payment Method ID:', paymentMethod.id); // Debug
      try {
        await mutation.mutateAsync({ bookingId, paymentMethodId: paymentMethod.id });
      } catch (err) {
        console.error('Mutation Execution Error:', err);
      }
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Booking</h2>
          <p className="text-gray-300">{error?.msg || 'Failed to load booking details.'}</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Booking Not Found</h2>
          <p className="text-gray-300">No booking data available.</p>
        </div>
      </div>
    );
  }

  // Fix status check to match backend expectation
  if (booking.status !== 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Payment Not Available</h2>
          <p className="text-gray-300">
            {booking.status === 'paid' || booking.status === 'completed'
              ? 'This booking has already been paid or completed.'
              : 'This booking is not approved yet. Please wait for approval.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 opacity-80 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>
      <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 mt-8 relative z-10">
        <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
          Make Payment
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white cursor-not-allowed"
              value={formik.values.amount}
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Card Details</label>
            <CardElement
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              options={{ style: { base: { fontSize: '16px', color: '#fff' } } }}
            />
          </div>
          {formik.status && <p className="text-red-400 text-center">{formik.status}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!stripe || mutation.isPending}
          >
            {mutation.isPending ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
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