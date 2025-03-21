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
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Neon Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-12 animate-text-glow">
          My Bookings
        </h2>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 gap-8">
          {data?.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-2xl p-8 text-center">
              <p className="text-gray-300 text-lg">You have no bookings yet.</p>
              <button
                onClick={() => navigate('/customer/vehicles')}
                className="mt-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-2 px-6 rounded-lg font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all duration-300"
              >
                Book a Vehicle
              </button>
            </div>
          ) : (
            data?.map((booking) => (
              <div
                key={booking._id}
                className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 transform transition-all duration-300 hover:-translate-y-4 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)]"
              >
                <div className="space-y-3">
                  <p className="text-xl font-semibold text-white">
                    Vehicle: <span className="text-cyan-400">{booking.vehicle.model}</span>
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Start:</span>{' '}
                    {new Date(booking.startDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">End:</span>{' '}
                    {new Date(booking.endDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Pickup Location:</span> {booking.pickupLocation}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Drop-off Location:</span> {booking.dropLocation}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Total Price:</span> ${booking.totalPrice}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Status:</span>{' '}
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${booking.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : booking.status === 'approved'
                            ? 'bg-green-500/20 text-green-400'
                            : booking.status === 'assigned' || booking.status === 'pickup-confirmed'
                              ? 'bg-blue-500/20 text-blue-400'
                              : booking.status === 'completed'
                                ? 'bg-indigo-500/20 text-indigo-400'
                                : 'bg-red-500/20 text-red-400'
                        }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Needs Driver:</span>{' '}
                    <span className={booking.needsDriver ? 'text-green-400' : 'text-gray-500'}>
                      {booking.needsDriver ? 'Yes' : 'No'}
                    </span>
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Driver Assigned:</span>{' '}
                    <span className={booking.driver ? 'text-green-400' : 'text-gray-500'}>
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
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
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
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Cancelling Driver...
                        </span>
                      ) : (
                        'Cancel Driver Request'
                      )}
                    </button>
                  )}

                  {/* Payment Button */}
                  {booking.status === 'completed' && (
                    <button
                      onClick={() => navigate(`/customer/payment/${booking._id}`)}
                      className="bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-green-900 transition-all duration-300 shadow-md transform hover:scale-105"
                    >
                      Make Payment
                    </button>
                  )}

                  {/* View Driver Location Link */}
                  {booking.driver && (booking.status === 'assigned' || booking.status === 'pickup-confirmed') && booking.currentLocation && (
                    <a
                      href={`https://www.google.com/maps?q=${booking.currentLocation.latitude},${booking.currentLocation.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-teal-600 to-teal-800 text-white px-4 py-2 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-900 transition-all duration-300 shadow-md transform hover:scale-105"
                    >
                      View Driver Location
                    </a>
                  )}


          

                  {/* Completed Status Buttons */}
                  {booking.status === 'completed' && (
                    <>
                   
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