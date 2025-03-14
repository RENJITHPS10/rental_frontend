import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import UserEditForm from '../components/admin/UserEditForm';

const AdminUserEdit = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <UserEditForm />
    </main>
    <Footer />
  </div>
);

export default AdminUserEdit;