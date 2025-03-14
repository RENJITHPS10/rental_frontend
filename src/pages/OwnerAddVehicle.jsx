import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import VehicleForm from '../components/owner/VehicleForm';

const OwnerAddVehicle = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <VehicleForm />
    </main>
    <Footer />
  </div>
);

export default OwnerAddVehicle;