import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import RatingForm from '../components/customer/RatingForm';

const CustomerRating = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <RatingForm />
    </main>
    <Footer />
  </div>
);

export default CustomerRating;