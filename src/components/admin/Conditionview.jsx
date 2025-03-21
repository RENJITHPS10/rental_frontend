import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchConditionReportsAPI } from '../../api/admin';
import LoadingSpinner from '../common/LoadingSpinner';

function Conditionview() {
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [searchBookingId, setSearchBookingId] = useState(''); // State for active search

  const { data: reports, isLoading, error, refetch } = useQuery({
    queryKey: ['conditionReports', searchBookingId], // Include search term in query key to refetch on search
    queryFn: () => fetchConditionReportsAPI(searchBookingId), // Pass search term to API
  });

  const handleSearch = () => {
    setSearchBookingId(searchTerm.trim()); // Trigger search with trimmed input
    refetch(); // Refetch data with new search term
  };

  const handleClearSearch = () => {
    setSearchTerm(''); // Clear input
    setSearchBookingId(''); // Reset search
    refetch(); // Fetch all reports
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-2xl p-8">
          <p className="text-red-400 text-center">{error.message || 'Failed to load condition reports'}</p>
        </div>
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
        {/* Heading and Search */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-text-glow">
            Condition Reports
          </h2>
          <div className="mt-4 flex w-full max-w-md gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter Booking ID"
              className="flex-1 p-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md"
            >
              Search
            </button>
            {searchBookingId && (
              <button
                onClick={handleClearSearch}
                className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-md"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Reports Grid */}
        {reports && reports.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {reports.map((report) => (
              <div
                key={report.bookingId}
                className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                {/* Booking Info */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-cyan-400 mb-2">
                    Booking ID: {report.bookingId}
                  </h3>
                  <p className="text-gray-300">
                    <span className="font-medium">Vehicle:</span>{' '}
                    {report.bookingDetails.vehicle?.model || 'N/A'}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Customer:</span>{' '}
                    {report.bookingDetails.customer?.name || 'N/A'}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Driver:</span>{' '}
                    {report.bookingDetails.driver?.name || 'N/A'}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Status:</span>{' '}
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                        report.bookingDetails.status === 'completed'
                          ? 'bg-indigo-500/20 text-indigo-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {report.bookingDetails.status.charAt(0).toUpperCase() +
                        report.bookingDetails.status.slice(1)}
                    </span>
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Pickup:</span>{' '}
                    {report.bookingDetails.pickupLocation}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Drop-off:</span>{' '}
                    {report.bookingDetails.dropLocation}
                  </p>
                </div>

                {/* Condition Reports */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Before Report */}
                  <div className="bg-gray-700/20 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Before Pickup</h4>
                    {report.before ? (
                      <>
                        <p className="text-gray-300">
                          <span className="font-medium">Condition:</span>{' '}
                          {report.before.condition}
                        </p>
                        <p className="text-gray-300">
                          <span className="font-medium">Reported By:</span>{' '}
                          {report.before.reportedBy?.name || 'N/A'}
                        </p>
                        <p className="text-gray-300">
                          <span className="font-medium">Date:</span>{' '}
                          {new Date(report.before.createdAt).toLocaleString()}
                        </p>
                        {report.before.images && report.before.images.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {report.before.images.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt="Before condition"
                                className="w-20 h-20 object-cover rounded-md border border-gray-600 hover:scale-105 transition-transform"
                              />
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-500">No "Before" report available</p>
                    )}
                  </div>

                  {/* After Report */}
                  <div className="bg-gray-700/20 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-purple-400 mb-2">After Delivery</h4>
                    {report.after ? (
                      <>
                        <p className="text-gray-300">
                          <span className="font-medium">Condition:</span>{' '}
                          {report.after.condition}
                        </p>
                        <p className="text-gray-300">
                          <span className="font-medium">Reported By:</span>{' '}
                          {report.after.reportedBy?.name || 'N/A'}
                        </p>
                        <p className="text-gray-300">
                          <span className="font-medium">Date:</span>{' '}
                          {new Date(report.after.createdAt).toLocaleString()}
                        </p>
                        {report.after.images && report.after.images.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {report.after.images.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt="After condition"
                                className="w-20 h-20 object-cover rounded-md border border-gray-600 hover:scale-105 transition-transform"
                              />
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-500">No "After" report available</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-2xl p-8 text-center">
            <p className="text-gray-300 text-lg">
              {searchBookingId ? 'No reports found for this booking ID.' : 'No condition reports available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Conditionview;