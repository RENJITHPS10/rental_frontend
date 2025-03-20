import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Home = () => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <Navbar />
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-down">
            Welcome to Bike & Car Rental
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 animate-fade-in-up">
            Rent bikes and cars easily with our seamless platform. Your journey starts here!
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition-all duration-300 shadow-lg hover:shadow-xl">
            Get Started
          </button>
        </div>
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 C30,50 70,50 100,0 L100,100 L0,100 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book your vehicle in just a few clicks.</p>
            </div>
            <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Wide Selection</h3>
              <p className="text-gray-600">Choose from a variety of bikes and cars.</p>
            </div>
            <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600">We're here to help anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Home;


