import { useQuery } from '@tanstack/react-query';
import { getOwnerEarningsAPI } from '../../api/owner';
import LoadingSpinner from '../common/LoadingSpinner';

const EarningsDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['ownerEarnings'],
    queryFn: getOwnerEarningsAPI,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Earnings</h2>
      <div className="p-4 border rounded shadow">
        <p>Total Earnings: ${data?.totalEarnings || 0}</p>
        <p>Completed Bookings: {data?.completedBookings || 0}</p>
      </div>
    </div>
  );
};

export default EarningsDashboard;