import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Link } from 'react-router-dom';

const DriverDashboard = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <h1 className="text-2xl font-bold mb-4">Driver Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/driver/bookings" className="p-4 bg-blue-500 text-white rounded text-center">
          My Bookings
        </Link>
        <Link to="/driver/earnings" className="p-4 bg-blue-500 text-white rounded text-center">
          Earnings
        </Link>
        <Link to="/driver/reviews" className="p-4 bg-blue-500 text-white rounded text-center">
          Reviews
        </Link>
        <Link to="/driver/profile" className="p-4 bg-blue-500 text-white rounded text-center">
          Update Location
        </Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default DriverDashboard;