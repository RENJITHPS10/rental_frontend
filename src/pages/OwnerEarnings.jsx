import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import EarningsDashboard from '../components/owner/EarningsDashboard';

const OwnerEarnings = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <EarningsDashboard />
    </main>
    <Footer />
  </div>
);

export default OwnerEarnings;