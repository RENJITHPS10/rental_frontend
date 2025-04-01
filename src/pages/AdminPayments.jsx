import { useQuery } from '@tanstack/react-query';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getAllPaymentsAPI } from '../api/admin';

const AdminPayments = () => {
  const { data: payments, isLoading, isError, error } = useQuery({
    queryKey: ['payments'],
    queryFn: getAllPaymentsAPI,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Payments</h2>
          <p className="text-gray-300">{error?.message || 'Failed to load payments.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <Navbar />
      <main className="flex-grow p-4">
        <h1 className="text-2xl font-bold text-white mb-4">All Payments</h1>
        {payments.length === 0 ? (
          <p className="text-gray-300">No payments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800/50 border border-gray-700/50 rounded-lg text-white">
              <thead>
                <tr className="bg-gray-700/50">
                  <th className="p-3 text-left">Booking ID</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Owner</th>
                  <th className="p-3 text-left">Driver</th>
                  <th className="p-3 text-left">Driver Fee</th>
                  <th className="p-3 text-left">Owner Amount</th>
                  <th className="p-3 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="border-t border-gray-700/50">
                    <td className="p-3">{payment.booking?._id || 'N/A'}</td>
                    <td className="p-3">${payment.amount.toFixed(2)}</td>
                    <td className="p-3">{payment.status}</td>
                    <td className="p-3">{payment.customerId?.name || 'N/A'} ({payment.customerId?.email || 'N/A'})</td>
                    <td className="p-3">{payment.ownerId?.name || 'N/A'} ({payment.ownerId?.email || 'N/A'})</td>
                    <td className="p-3">{payment.driverId?.name || 'None'} ({payment.driverId?.email || 'N/A'})</td>
                    <td className="p-3">${payment.driverFee.toFixed(2)}</td>
                    <td className="p-3">${payment.ownerAmount.toFixed(2)}</td>
                    <td className="p-3">{new Date(payment.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminPayments;