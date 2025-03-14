import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import DriverEarnings from '../components/driver/DriverEarnings';

const DriverEarningsPage = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <DriverEarnings />
    </main>
    <Footer />
  </div>
);

export default DriverEarningsPage;