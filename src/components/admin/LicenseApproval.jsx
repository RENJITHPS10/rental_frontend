import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../common/LoadingSpinner';
import { getUnverifiedUsersAPI, verifyUserLicenseAPI } from '../../api/admin';

const LicenseApproval = () => {
  const queryClient = useQueryClient();

  // Fetch unverified users
  const { data: users, isLoading } = useQuery({
    queryKey: ['unverifiedUsers'],
    queryFn: getUnverifiedUsersAPI,
  });

  // Mutation to verify/reject license
  const verifyMutation = useMutation({
    mutationFn: ({ userId, approve }) => verifyUserLicenseAPI(userId, approve),
    onSuccess: () => {
      queryClient.invalidateQueries(['unverifiedUsers']);
    },
    onError: (error) => {
      console.error('Error verifying license:', error);
      alert(`Failed to update license status: ${error.response?.data?.msg || 'Unknown error'}`);
    },
  });

  const handleVerify = (userId, approve) => {
    verifyMutation.mutate({ userId, approve });
  };

  if (isLoading) return <LoadingSpinner />;

  console.log('Unverified users:', users);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">License Approval</h2>
      {users?.length === 0 ? (
        <p>No users awaiting license approval.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {users.map((user) => (
            <div key={user._id} className="p-4 border rounded shadow">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <div className="mt-2">
                <p>License:</p>
                {user.license ? (
                  <a
                    href={user.license}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View License
                  </a>
                ) : (
                  <p>No license uploaded</p>
                )}
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleVerify(user._id, true)}
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
                  disabled={verifyMutation.isLoading && verifyMutation.variables?.userId === user._id}
                >
                  {verifyMutation.isLoading && verifyMutation.variables?.userId === user._id
                    ? 'Processing...'
                    : 'Approve'}
                </button>
                <button
                  onClick={() => handleVerify(user._id, false)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 disabled:bg-gray-400"
                  disabled={verifyMutation.isLoading && verifyMutation.variables?.userId === user._id}
                >
                  {verifyMutation.isLoading && verifyMutation.variables?.userId === user._id
                    ? 'Processing...'
                    : 'Reject'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LicenseApproval;