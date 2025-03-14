import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import OwnerVehicleReviews from '../components/owner/OwnerVehicleReviews';

const OwnerReviews = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <OwnerVehicleReviews />
    </main>
    <Footer />
  </div>
);

export default OwnerReviews;