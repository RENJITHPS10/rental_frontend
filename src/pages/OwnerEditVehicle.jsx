import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import VehicleEditForm from '../components/owner/VehicleEditForm';

const OwnerEditVehicle = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <VehicleEditForm />
    </main>
    <Footer />
  </div>
);

export default OwnerEditVehicle;