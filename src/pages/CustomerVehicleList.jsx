import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import VehicleList from '../components/customer/VehicleList';

const CustomerVehicleList = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <VehicleList />
    </main>
    <Footer />
  </div>
);

export default CustomerVehicleList;