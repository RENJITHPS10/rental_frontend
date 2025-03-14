import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import PaymentForm from '../components/customer/PaymentForm';

const CustomerPayment = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <PaymentForm />
    </main>
    <Footer />
  </div>
);

export default CustomerPayment;