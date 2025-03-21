import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Conditionview from '../components/admin/Conditionview';


const AdminCondition = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <Conditionview/>
    </main>
    <Footer />
  </div>
);

export default AdminCondition;