import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Home = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <h1 className="text-3xl font-bold text-center">Welcome to Bike & Car Rental</h1>
      <p className="text-center mt-4">Rent bikes and cars easily with our platform.</p>
    </main>
    <Footer />
  </div>
);

export default Home;