import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import AllBookings from '../components/admin/AllBookings';

const AdminBookings = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <AllBookings />
    </main>
    <Footer />
  </div>
);

export default AdminBookings;