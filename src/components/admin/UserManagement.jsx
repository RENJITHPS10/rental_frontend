import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import { getAllUsersAPI, suspendUserAPI } from '../../api/admin';
import { useState } from 'react';

const UserManagement = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['allUsers'],
    queryFn: getAllUsersAPI,
  });

  const suspendMutation = useMutation({
    mutationFn: ({ userId, suspend }) => suspendUserAPI(userId, suspend),
    onSuccess: () => refetch(),
    onError: (error) => console.error('Suspend error:', error),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800/80 border border-red-500/50 rounded-xl p-8 shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-semibold text-red-400 mb-3 animate-pulse">Error Loading Users</h2>
          <p className="text-gray-300">{error?.message || 'Failed to load users. Please try again.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Neon Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-10 animate-text-glow">
          User Management
        </h2>

        {/* Table Container */}
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              {/* Table Header */}
              <thead className="bg-gray-700/50 border-b border-gray-600/50">
                <tr>
                  <th className="py-4 px-6 text-sm font-medium text-cyan-400">Name</th>
                  <th className="py-4 px-6 text-sm font-medium text-cyan-400">Email</th>
                  <th className="py-4 px-6 text-sm font-medium text-cyan-400">Role</th>
                  <th className="py-4 px-6 text-sm font-medium text-cyan-400">License</th>
                  <th className="py-4 px-6 text-sm font-medium text-cyan-400">Status</th>
                  <th className="py-4 px-6 text-sm font-medium text-cyan-400">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {data?.map((user, index) => {
                  const isPendingForUser = suspendMutation.isPending && suspendMutation.variables?.userId === user._id;

                  return (
                    <tr
                      key={user._id}
                      className={`border-b border-gray-700/50 transition-all duration-300 hover:bg-gray-700/70 ${
                        index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/50'
                      }`}
                    >
                      <td className="py-4 px-6 text-gray-300">{user.name || 'N/A'}</td>
                      <td className="py-4 px-6 text-gray-300 break-all">{user.email || 'N/A'}</td>
                      <td className="py-4 px-6 text-gray-300 capitalize">{user.role || 'N/A'}</td>
                      <td className="py-4 px-6">
                        {(user.role === 'driver' || user.role === 'customer') && user.license ? (
                          <img
                            src={user.license}
                            alt="License"
                            className="w-12 h-12 object-cover rounded-md border border-gray-600/50 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                            onClick={() => setSelectedImage(user.license)}
                            onError={(e) =>
                              (e.target.src = 'https://via.placeholder.com/48?text=Image+Not+Found')
                            }
                          />
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`font-semibold ${
                            user.isSuspended ? 'text-red-400' : 'text-green-400'
                          }`}
                        >
                          {user.isSuspended ? 'Suspended' : 'Active'}
                        </span>
                      </td>
                      <td className="py-4 px-6 flex space-x-3">
                        <button
                          onClick={() => navigate(`/admin/users/${user._id}/edit`)}
                          className="bg-blue-600 text-white px-3 py-1.5 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            suspendMutation.mutate({ userId: user._id, suspend: !user.isSuspended })
                          }
                          className={`px-3 py-1.5 rounded-md font-medium text-white transition-colors duration-300 ${
                            user.isSuspended
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-red-600 hover:bg-red-700'
                          } ${isPendingForUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={isPendingForUser}
                        >
                          {isPendingForUser ? (
                            <span className="flex items-center">
                              <svg
                                className="animate-spin h-4 w-4 mr-2 text-white"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8H4z"
                                />
                              </svg>
                              Processing
                            </span>
                          ) : user.isSuspended ? (
                            'Activate'
                          ) : (
                            'Suspend'
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Full-Size Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Full-size License"
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-xl border border-cyan-500/50"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/400?text=Image+Not+Found')}
            />
            <button
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-300"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;  