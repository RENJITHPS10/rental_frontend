import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import DriverReviews from '../components/driver/DriverReviews';

const DriverReviewsPage = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <DriverReviews />
    </main>
    <Footer />
  </div>
);

export default DriverReviewsPage;