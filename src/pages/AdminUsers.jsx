import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import UserManagement from '../components/admin/UserManagement';

const AdminUsers = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <UserManagement />
    </main>
    <Footer />
  </div>
);

export default AdminUsers;