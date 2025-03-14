import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Forbidden = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4 text-center">
      <h1 className="text-3xl font-bold">403 - Forbidden</h1>
      <p>You do not have permission to access this page.</p>
    </main>
    <Footer />
  </div>
);

export default Forbidden;