import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FraudDetection from '../components/admin/FraudDetection';

const AdminFraud = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <FraudDetection />
    </main>
    <Footer />
  </div>
);

export default AdminFraud;