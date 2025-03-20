import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const navItems = [
    { path: '/customer/vehicles', label: 'Browse Vehicles', icon: '🚗' },
    { path: '/customer/bookings', label: 'My Bookings', icon: '📅' },
    { path: '/customer/support', label: 'Support', icon: '📞' },
    { path: '/customer/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 relative overflow-hidden">
      {/* Subtle Wave Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#bfdbfe"
            d="M0,224L48,213.3C96,203,192,181,288,170.7C384,160,480,160,576,181.3C672,203,768,245,864,250.7C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <Navbar />
      {/* Main Content */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-10 text-center transform transition-all duration-500 hover:shadow-3xl relative overflow-hidden">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse opacity-20 rounded-2xl"></div>
            <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4 animate-gradient-x relative z-10">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-xl max-w-lg mx-auto relative z-10">
              Your journey starts here—explore rentals, manage bookings, and enjoy the ride!
            </p>
            {/* Decorative Element */}
            <div className="mt-6 w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group bg-white rounded-2xl shadow-lg p-8 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl border-t-4 border-blue-500 relative overflow-hidden"
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-0 group-hover:opacity-90 transition-opacity duration-300 rounded-2xl"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="text-5xl mb-4 text-blue-600 group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white mb-2">
                    {item.label}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-white/90">
                    Dive into this feature now
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerDashboard;