import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import AssignDrivers from '../components/admin/AssignDrivers';


const AdminAssignDriver = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <AssignDrivers />
    </main>
    <Footer />
  </div>
);

export default AdminAssignDriver;