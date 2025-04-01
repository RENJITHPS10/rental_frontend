import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 opacity-80 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 mt-8 relative z-10 text-center">
        <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500 mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-300 mb-6">
          Your payment has been processed successfully. Thank you for your booking!
        </p>
        <button
          onClick={() => navigate('/customer/bookings')}
          className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-md transform hover:scale-105"
        >
          View Your Bookings
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;