import { useQuery, useMutation } from '@tanstack/react-query';

import LoadingSpinner from '../common/LoadingSpinner';
import { getSupportTicketsAPI } from '../../api/support';

const SupportTicketManagement = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['supportTickets'],
    queryFn: getSupportTicketsAPI,
  });

  const resolveMutation = useMutation({
    mutationFn: (ticketId) => resolveSupportTicketAPI(ticketId, 'Resolved'),
    onSuccess: () => refetch(),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Support Ticket Management</h2>
      <div className="grid grid-cols-1 gap-4">
        {data?.filter((ticket) => !ticket.resolution).map((ticket) => (
          <div key={ticket._id} className="p-4 border rounded shadow">
            <p>User: {ticket.user.name}</p>
            <p>Issue: {ticket.issue}</p>
            <p>Status: {ticket.resolution ? 'Resolved' : 'Open'}</p>
            <button
              onClick={() => resolveMutation.mutate(ticket._id)}
              className="mt-2 bg-green-500 text-white p-2 rounded"
              disabled={resolveMutation.isPending}
            >
              {resolveMutation.isPending ? 'Resolving...' : 'Resolve'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportTicketManagement;