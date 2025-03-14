import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BookingList from '../components/customer/BookingList';

const CustomerBookings = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <BookingList />
    </main>
    <Footer />
  </div>
);

export default CustomerBookings;