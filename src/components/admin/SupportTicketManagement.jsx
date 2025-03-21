import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import LoadingSpinner from '../common/LoadingSpinner';
import { getSupportTicketsAPI, resolveSupportTicketAPI } from '../../api/support';

const SupportTicketManagement = () => {
  const { data: tickets = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['supportTickets'],
    queryFn: getSupportTicketsAPI,
  });

  const resolveMutation = useMutation({
    mutationFn: ({ ticketId, resolution }) => resolveSupportTicketAPI(ticketId, resolution),
    onSuccess: () => refetch(),
    onError: (err) => console.error('Resolve Error:', err),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-blue-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Tickets</h2>
          <p className="text-gray-300">{error.message || 'Failed to load support tickets.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Neon Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 opacity-80 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-10 animate-text-glow">
          Support Ticket Management
        </h2>

        {tickets.filter((ticket) => ticket.status !== 'resolved').length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 text-center">
            <p className="text-gray-300 text-lg">No open support tickets.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tickets
              .filter((ticket) => ticket.status !== 'resolved')
              .map((ticket) => (
                <div
                  key={ticket._id}
                  className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 transform transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-5 animate-pulse"></div>
                  <div className="space-y-4 relative z-10">
                    <p className="text-gray-200">
                      <span className="font-medium text-cyan-400">Customer:</span>{' '}
                      {ticket.customer?.name || 'Unknown'}
                    </p>
                    <p className="text-gray-200">
                      <span className="font-medium text-cyan-400">Issue:</span> {ticket.issue}
                    </p>
                    <p className="text-gray-200">
                      <span className="font-medium text-cyan-400">Status:</span>{' '}
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          ticket.status === 'open'
                            ? 'bg-yellow-100/20 text-yellow-400'
                            : 'bg-gray-100/20 text-gray-400'
                        }`}
                      >
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                    </p>
                    <p className="text-gray-400 text-sm">
                      <span className="font-medium">Submitted:</span>{' '}
                      {new Date(ticket.createdAt).toLocaleString()}
                    </p>
                    <button
                      onClick={() =>
                        resolveMutation.mutate({ ticketId: ticket._id, resolution: 'Issue resolved' })
                      }
                      className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={resolveMutation.isPending}
                    >
                      {resolveMutation.isPending ? 'Resolving...' : 'Resolve Ticket'}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportTicketManagement;