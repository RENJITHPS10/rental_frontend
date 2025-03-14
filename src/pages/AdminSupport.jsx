import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SupportTicketManagement from '../components/admin/SupportTicketManagement';

const AdminSupport = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <SupportTicketManagement />
    </main>
    <Footer />
  </div>
);

export default AdminSupport;