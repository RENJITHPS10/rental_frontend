import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import DriverBookingList from '../components/driver/DriverBookingList';

const DriverBookings = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <DriverBookingList />
    </main>
    <Footer />
  </div>
);

export default DriverBookings;