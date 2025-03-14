import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LoginForm from '../components/auth/LoginForm';

const Login = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <LoginForm />
    </main>
    <Footer />
  </div>
);

export default Login;