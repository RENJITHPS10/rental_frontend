import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Link } from 'react-router-dom';

const OwnerDashboard = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/owner/add-vehicle" className="p-4 bg-blue-500 text-white rounded text-center">Add Vehicle</Link>
        <Link to="/owner/vehicles" className="p-4 bg-blue-500 text-white rounded text-center">My Vehicles</Link>
        <Link to="/owner/earnings" className="p-4 bg-blue-500 text-white rounded text-center">Earnings</Link>
        <Link to="/owner/booking-approval" className="p-4 bg-blue-500 text-white rounded text-center">Booking Approvals</Link>
        <Link to="/owner/reviews" className="p-4 bg-blue-500 text-white rounded text-center">Reviews</Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default OwnerDashboard;