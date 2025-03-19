import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Profileupdate from '../components/driver/Profileupdate';


const DriverProfile = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
    <Profileupdate/>
    </main>
    <Footer />
  </div>
);

export default DriverProfile;