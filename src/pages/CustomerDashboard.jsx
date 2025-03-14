import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/customer/vehicles" className="p-4 bg-blue-500 text-white rounded text-center">Browse Vehicles</Link>
        <Link to="/customer/bookings" className="p-4 bg-blue-500 text-white rounded text-center">My Bookings</Link>
        <Link to="/customer/support" className="p-4 bg-blue-500 text-white rounded text-center">Support</Link>
        <Link to="/customer/profile" className="p-4 bg-blue-500 text-white rounded text-center">Profile</Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default CustomerDashboard;