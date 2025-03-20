import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import { getAllUsersAPI, suspendUserAPI } from '../../api/admin';

const UserManagement = () => {
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allUsers'],
    queryFn: getAllUsersAPI,
  });

  const suspendMutation = useMutation({
    mutationFn: ({ userId, suspend }) => suspendUserAPI(userId, suspend),
    onSuccess: () => refetch(),
    // Optional: Add onError for better feedback
    onError: (error) => console.error('Suspend error:', error),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="grid grid-cols-1 gap-4">
        {data?.map((user) => {
          // Check if this specific user's mutation is pending
          const isPendingForUser = suspendMutation.isPending && suspendMutation.variables?.userId === user._id;

          return (
            <div key={user._id} className="p-4 border rounded shadow">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <p>Status: {user.isSuspended ? 'Suspended' : 'Active'}</p>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => navigate(`/admin/users/${user._id}/edit`)}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    suspendMutation.mutate({ userId: user._id, suspend: !user.isSuspended })
                  }
                  className={`p-2 rounded text-white ${
                    user.isSuspended ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                  } ${isPendingForUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isPendingForUser}
                >
                  {isPendingForUser
                    ? 'Processing...'
                    : user.isSuspended
                    ? 'Activate'
                    : 'Suspend'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserManagement;