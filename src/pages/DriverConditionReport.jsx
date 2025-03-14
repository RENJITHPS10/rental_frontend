import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import DriverConditionReport from '../components/driver/DriverConditionReport';

const DriverConditionReportPage = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <DriverConditionReport />
    </main>
    <Footer />
  </div>
);

export default DriverConditionReportPage;