import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CarLocation from '../components/driver/CarLocation';

const DriverCarLocation = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <CarLocation />
    </main>
    <Footer />
  </div>
);

export default DriverCarLocation;