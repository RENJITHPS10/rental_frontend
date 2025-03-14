import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SupportTicketForm from '../components/customer/SupportTicketForm';
import CustomerSupportTickets from '../components/customer/CustomerSupportTickets';

const CustomerSupport = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow p-4">
      <SupportTicketForm />
      <CustomerSupportTickets />
    </main>
    <Footer />
  </div>
);

export default CustomerSupport;