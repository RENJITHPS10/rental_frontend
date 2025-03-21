import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Link } from 'react-router-dom';

const OwnerDashboard = () => {
  const navItems = [
    { path: '/owner/add-vehicle', label: 'Add Vehicle', icon: '🚗', color: 'from-cyan-500 to-teal-500' },
    { path: '/owner/vehicles', label: 'My Vehicles', icon: '📋', color: 'from-blue-500 to-indigo-500' },
    { path: '/owner/earnings', label: 'Earnings', icon: '💰', color: 'from-green-500 to-lime-500' },
    { path: '/owner/booking-approval', label: 'Booking Approvals', icon: '✅', color: 'from-yellow-500 to-amber-500' },
    { path: '/owner/reviews', label: 'Reviews', icon: '⭐', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <>
    <div className="flex flex-col min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Neon Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <Navbar />
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-3xl shadow-2xl p-10 text-center transform transition-all duration-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
            <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-4 animate-text-glow">
              Owner Control Center
            </h1>
            <p className="text-gray-300 text-xl max-w-md mx-auto">
              Take charge of your rental empire—add vehicles, track earnings, and more!
            </p>
            <div className="mt-6 w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto animate-pulse"></div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 hover:bg-gradient-to-br hover:${item.color} transition-all duration-300 transform hover:-translate-y-4 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] relative overflow-hidden`}
              >
                {/* Neon Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-70 transition-opacity duration-300 rounded-2xl`}></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="text-6xl mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gray-100">
                    {item.label}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-white/90">
                    Dive into this feature
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
     
    </div>
     <Footer />
    </>
  );
};

export default OwnerDashboard;