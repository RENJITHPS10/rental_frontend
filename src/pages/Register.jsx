import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <RegisterForm />
    </main>
    <Footer />
  </div>
);

export default Register;