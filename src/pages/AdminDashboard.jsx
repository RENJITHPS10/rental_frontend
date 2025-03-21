import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Link } from 'react-router-dom';

const AdminDashboard = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/users" className="p-4 bg-blue-500 text-white rounded text-center">User Management</Link>
        <Link to="/admin/vehicles" className="p-4 bg-blue-500 text-white rounded text-center">Vehicle Approvals</Link>
        <Link to="/admin/bookings" className="p-4 bg-blue-500 text-white rounded text-center">All Bookings</Link>
        <Link to="/admin/assign-drivers" className="p-4 bg-blue-500 text-white rounded text-center">Assign Drivers </Link>
        <Link to="/admin/license-approval" className="p-4 bg-blue-500 text-white rounded text-center">  License Approval </Link>
        <Link to="/admin/fraud" className="p-4 bg-blue-500 text-white rounded text-center">Fraud Detection</Link>
        <Link to="/admin/support" className="p-4 bg-blue-500 text-white rounded text-center">Support Tickets</Link>
        <Link to="/admin/conditionreport" className="p-4 bg-blue-500 text-white rounded text-center">View Condition report</Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default AdminDashboard;