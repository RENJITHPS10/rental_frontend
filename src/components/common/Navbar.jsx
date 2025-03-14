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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false); // Close menu on logout
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ location: search }));
    navigate('/customer/vehicles');
    setIsMenuOpen(false); // Close menu on search
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight hover:text-gray-300 transition-colors">
          Rental System
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search Bar (Customer Only) */}
          {isAuthenticated && role === 'customer' && (
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search by location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 p-2 rounded-r-md hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
          )}

          {/* Navigation Links */}
          {isAuthenticated ? (
            <>
              <Link
                to={`/${role}`}
                className="text-lg hover:text-gray-300 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-lg hover:text-gray-300 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-lg hover:text-gray-300 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-lg hover:text-gray-300 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'} {/* Hamburger or close icon */}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-3">
          {/* Search Bar (Customer Only) */}
          {isAuthenticated && role === 'customer' && (
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search by location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 rounded-l-md text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 p-2 rounded-r-md hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
          )}

          {/* Navigation Links */}
          {isAuthenticated ? (
            <>
              <Link
                to={`/${role}`}
                className="block text-lg hover:text-gray-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block text-lg hover:text-gray-300 transition-colors w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-lg hover:text-gray-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-lg hover:text-gray-300 transition-colors"
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