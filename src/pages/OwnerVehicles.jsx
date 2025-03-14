import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import OwnerVehicleList from '../components/owner/OwnerVehicleList';

const OwnerVehicles = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <OwnerVehicleList />
    </main>
    <Footer />
  </div>
);

export default OwnerVehicles;