import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ConditionReportForm from '../components/customer/ConditionReportForm';

const CustomerConditionReport = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <ConditionReportForm />
    </main>
    <Footer />
  </div>
);

export default CustomerConditionReport;