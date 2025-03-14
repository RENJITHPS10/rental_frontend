import { useQuery } from '@tanstack/react-query';
import { getFraudulentUsersAPI } from '../../api/admin';
import LoadingSpinner from '../common/LoadingSpinner';

const FraudDetection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['fraudulentUsers'],
    queryFn: getFraudulentUsersAPI,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Fraud Detection</h2>
      <div className="grid grid-cols-1 gap-4">
        {data?.map((user) => (
          <div key={user._id} className="p-4 border rounded shadow">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Fraud Score: {user.fraudScore}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FraudDetection;