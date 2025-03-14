import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BookingForm from '../components/customer/BookingForm';

const CustomerBookingForm = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <BookingForm />
    </main>
    <Footer />
  </div>
);

export default CustomerBookingForm;