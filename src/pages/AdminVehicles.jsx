import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import VehicleApproval from '../components/admin/VehicleApproval';

const AdminVehicles = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <VehicleApproval />
    </main>
    <Footer />
  </div>
);

export default AdminVehicles;