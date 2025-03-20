import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import { getUnverifiedUsersAPI, verifyUserLicenseAPI } from '../../api/admin';

const LicenseApproval = () => {
  const queryClient = useQueryClient();
  const [rejectionReason, setRejectionReason] = useState({}); // Track rejection reasons per user
  const [rejectedUsers, setRejectedUsers] = useState({}); // Track rejected users locally

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['unverifiedUsers'],
    queryFn: getUnverifiedUsersAPI,
  });

  const verifyMutation = useMutation({
    mutationFn: ({ userId, approve, rejectionReason }) => 
      verifyUserLicenseAPI(userId, approve, rejectionReason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['unverifiedUsers']);
      if (!variables.approve) {
        setRejectedUsers((prev) => ({ ...prev, [variables.userId]: true }));
      }
    },
    onError: (error) => {
      console.error('Error updating license:', error);
      alert(`Failed to update license: ${error.response?.data?.msg || 'Unknown error'}`);
    },
  });

  const handleVerify = (userId, approve) => {
    if (!approve && !rejectionReason[userId]) {
      alert('Please provide a rejection reason.');
      return;
    }
    verifyMutation.mutate({ 
      userId, 
      approve, 
      rejectionReason: approve ? null : rejectionReason[userId] 
    });
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">Failed to load unverified users: {error.message}</p>
        </div>
      </div>
    );
  }

  const unverifiedUsers = Array.isArray(users) ? users : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-center">
          License Approval Dashboard
        </h2>

        {unverifiedUsers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-lg">No users awaiting license approval.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {unverifiedUsers.map((user) => (
              <div
                key={user._id}
                className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border-l-4 ${
                  rejectedUsers[user._id] || user.licenseStatus === 'rejected' ? 'border-red-500' : 'border-blue-500'
                }`}
              >
                {/* Rejection Badge */}
                {(rejectedUsers[user._id] || user.licenseStatus === 'rejected') && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    Rejected
                  </div>
                )}

                <h3 className="text-lg font-semibold text-gray-800 mb-2">{user.name}</h3>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Role:</span> {user.role}
                </p>
                <div className="mt-3">
                  <p className="text-gray-600 font-medium">License:</p>
                  {user.license ? (
                    <a
                      href={user.license}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
                    >
                      View License
                    </a>
                  ) : (
                    <p className="text-gray-500 italic">No license uploaded</p>
                  )}
                </div>

                {/* Rejection Reason Display */}
                {(rejectedUsers[user._id] || user.licenseStatus === 'rejected') && user.licenseRejectionReason && (
                  <p className="mt-2 text-sm text-red-600">
                    <span className="font-medium">Reason:</span> {user.licenseRejectionReason}
                  </p>
                )}

                <div className="mt-4">
                  {!(rejectedUsers[user._id] || user.licenseStatus === 'rejected') && (
                    <>
                      <input
                        type="text"
                        placeholder="Reason for rejection (required if rejecting)"
                        value={rejectionReason[user._id] || ''}
                        onChange={(e) =>
                          setRejectionReason({ ...rejectionReason, [user._id]: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg mb-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      />
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleVerify(user._id, true)}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                          disabled={verifyMutation.isPending && verifyMutation.variables?.userId === user._id}
                        >
                          {verifyMutation.isPending && verifyMutation.variables?.userId === user._id ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            'Approve'
                          )}
                        </button>
                        <button
                          onClick={() => handleVerify(user._id, false)}
                          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                          disabled={verifyMutation.isPending && verifyMutation.variables?.userId === user._id}
                        >
                          {verifyMutation.isPending && verifyMutation.variables?.userId === user._id ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            'Reject'
                          )}
                        </button>
                      </div>
                    </>
                  )}
                  {(rejectedUsers[user._id] || user.licenseStatus === 'rejected') && (
                    <button
                      onClick={() => handleVerify(user._id, true)}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      {verifyMutation.isPending && verifyMutation.variables?.userId === user._id ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Approve'
                      )}
                    </button>
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

export default LicenseApproval;