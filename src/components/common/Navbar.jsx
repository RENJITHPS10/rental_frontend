import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';
import { useState } from 'react';
import { setFilters } from '../../redux/vehicleSlice';

const Navbar = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ location: search }));
    navigate('/customer/vehicles');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-300 hover:to-purple-400 transition-all duration-300"
        >
          Rentals
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Search Bar (Customer Only) */}
          {isAuthenticated && role === 'customer' && (
            <form onSubmit={handleSearch} className="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full shadow-lg">
              <input
                type="text"
                placeholder="Search by location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-3 bg-white/90 text-gray-900 w-72 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-r-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
              >
                Search
              </button>
            </form>
          )}

          {/* Navigation Links */}
          {isAuthenticated ? (
            <>
              {/* Beautiful Message */}
              <Link
               to={`/${role}`}
                className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:from-blue-400 hover:to-purple-400 transition-all duration-300 animate-pulse-slow"
              >
                Explore Your Rentals Now!
              </Link>
              <button
                onClick={handleLogout}
                className="text-lg font-medium hover:text-blue-300 transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-300 after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-lg font-medium hover:text-blue-300 transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-300 after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-lg font-medium hover:text-blue-300 transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-300 after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl focus:outline-none hover:text-blue-300 transition-colors duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-gray-800 to-gray-900 px-6 py-6 space-y-5 shadow-inner">
          {/* Search Bar (Customer Only) */}
          {isAuthenticated && role === 'customer' && (
            <form onSubmit={handleSearch} className="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full shadow-lg">
              <input
                type="text"
                placeholder="Search by location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-3 bg-white/90 text-gray-900 w-full rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-r-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
              >
                Search
              </button>
            </form>
          )}

          {/* Navigation Links */}
          {isAuthenticated ? (
            <>
              {/* Beautiful Message */}
              <Link
                to={`/${role}`}
                className="block text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:from-blue-400 hover:to-purple-400 transition-all duration-300 animate-pulse-slow"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore Your Rentals Now!
              </Link>
              <button
                onClick={handleLogout}
                className="block text-lg font-medium hover:text-blue-300 transition-colors duration-200 w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-lg font-medium hover:text-blue-300 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-lg font-medium hover:text-blue-300 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;