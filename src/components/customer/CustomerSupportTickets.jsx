import { useQuery } from '@tanstack/react-query';
import { getSupportTicketsAPI } from '../../api/support';
import LoadingSpinner from '../common/LoadingSpinner';

const CustomerSupportTickets = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['customerTickets'],
    queryFn: getSupportTicketsAPI,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Support Tickets</h2>
      {data?.length === 0 ? (
        <p>No tickets submitted yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {data.map((ticket) => (
            <div key={ticket._id} className="p-4 border rounded shadow">
              <p>Issue: {ticket.issue}</p>
              <p>Status: {ticket.resolution ? 'Resolved' : 'Open'}</p>
              {ticket.resolution && <p>Resolution: {ticket.resolution}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerSupportTickets;