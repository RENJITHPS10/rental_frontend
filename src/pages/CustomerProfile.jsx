import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProfileForm from '../components/customer/ProfileForm';

const CustomerProfile = () => (
  <div className="flex flex-col ">
    <Navbar />
    <main className="flex-grow p-4">
      <ProfileForm />
    </main>
    <Footer />
  </div>
);

export default CustomerProfile;