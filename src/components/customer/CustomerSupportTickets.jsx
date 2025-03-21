import React from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../common/LoadingSpinner';
import { getCustomerSupportTicketsAPI } from '../../api/support'; // Use the correct API function

const CustomerSupportTickets = () => {
  const { data: tickets = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['customerTickets'],
    queryFn: getCustomerSupportTicketsAPI, // Consistent naming
  });

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-blue-50">
        <LoadingSpinner />
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-10 animate-pulse"></div>
          <h2 className="text-2xl font-bold text-red-600 mb-4 relative z-10">Something Went Wrong</h2>
          <p className="text-gray-600 relative z-10">{error.message || 'Failed to load support tickets.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading and Refresh Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            My Support Tickets
          </h2>
          <button
            onClick={() => refetch()}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-md transform hover:scale-105"
          >
            Refresh
          </button>
        </div>

        {/* Tickets List */}
        {tickets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200">
            <p className="text-gray-600 text-lg">No tickets submitted yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-l-4 border-blue-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-5 animate-pulse"></div>
                <div className="space-y-4 relative z-10">
                  <p className="text-gray-800">
                    <span className="font-medium text-blue-600">Issue:</span> {ticket.issue}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Status:</span>{' '}
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        ticket.status === 'resolved'
                          ? 'bg-green-100 text-green-800'
                          : ticket.status === 'open'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Submitted:</span>{' '}
                    {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                  {ticket.response && (
                    <p className="text-gray-600">
                      <span className="font-medium text-purple-600">Response:</span>{' '}
                      <span className="text-gray-700">{ticket.response}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSupportTickets;