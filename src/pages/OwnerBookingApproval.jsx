import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BookingApproval from '../components/owner/BookingApproval';

const OwnerBookingApproval = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <BookingApproval />
    </main>
    <Footer />
  </div>
);

export default OwnerBookingApproval;