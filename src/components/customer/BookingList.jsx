import { useQuery, useMutation } from '@tanstack/react-query';
import { getCustomerBookingsAPI, cancelBookingAPI, cancelDriverRequestAPI } from '../../api/bookings';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const BookingList = () => {
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['customerBookings'],
    queryFn: getCustomerBookingsAPI,
  });

  const cancelBookingMutation = useMutation({
    mutationFn: cancelBookingAPI,
    onSuccess: () => refetch(),
  });

  const cancelDriverMutation = useMutation({
    mutationFn: cancelDriverRequestAPI,
    onSuccess: () => refetch(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-blue-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          My Bookings
        </h2>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 gap-8">
          {data?.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <p className="text-gray-600 text-lg">You have no bookings yet.</p>
            </div>
          ) : (
            data?.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-l-4 border-blue-500"
              >
                <div className="space-y-3">
                  <p className="text-xl font-semibold text-gray-800">
                    Vehicle: <span className="text-blue-600">{booking.vehicle.model}</span>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Start:</span>{' '}
                    {new Date(booking.startDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">End:</span>{' '}
                    {new Date(booking.endDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Status:</span>{' '}
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                        booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : booking.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Needs Driver:</span>{' '}
                    <span className={booking.needsDriver ? 'text-green-600' : 'text-gray-500'}>
                      {booking.needsDriver ? 'Yes' : 'No'}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Driver Assigned:</span>{' '}
                    <span className={booking.driver ? 'text-green-600' : 'text-gray-500'}>
                      {booking.driver ? 'Yes' : 'No'}
                    </span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {/* Cancel Booking Button */}
                  {booking.status === 'pending' && (
                    <button
                      onClick={() => cancelBookingMutation.mutate(booking._id)}
                      className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={cancelBookingMutation.isPending}
                    >
                      {cancelBookingMutation.isPending ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
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
                          Cancelling...
                        </span>
                      ) : (
                        'Cancel Booking'
                      )}
                    </button>
                  )}

                  {/* Cancel Driver Button */}
                  {booking.status === 'approved' && booking.needsDriver && !booking.driver && (
                    <button
                      onClick={() => cancelDriverMutation.mutate(booking._id)}
                      className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white px-4 py-2 rounded-lg font-semibold hover:from-yellow-700 hover:to-yellow-900 transition-all duration-300 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={cancelDriverMutation.isPending}
                    >
                      {cancelDriverMutation.isPending ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
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
                          Cancelling Driver...
                        </span>
                      ) : (
                        'Cancel Driver Request'
                      )}
                    </button>
                  )}

                  {/* Payment Button */}
                  {booking.status === 'approved' && (!booking.needsDriver || booking.driver) && (
                    <button
                      onClick={() => navigate(`/customer/payment/${booking._id}`)}
                      className="bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-green-900 transition-all duration-300 shadow-md transform hover:scale-105"
                    >
                      Make Payment
                    </button>
                  )}

                  {/* Completed Status Buttons */}
                  {booking.status === 'completed' && (
                    <>
                      <button
                        onClick={() => navigate(`/customer/condition-report/${booking._id}`)}
                        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-md transform hover:scale-105"
                      >
                        Report Condition
                      </button>
                      <button
                        onClick={() => navigate(`/customer/rating/${booking._id}`)}
                        className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-4 py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-900 transition-all duration-300 shadow-md transform hover:scale-105"
                      >
                        Rate Experience
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingList;