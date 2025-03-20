const Footer = () => (
  <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
    <div className="container mx-auto px-6">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Rental System
          </h3>
          <p className="text-gray-300 text-sm">
            Your premier destination for bike and car rentals. Experience freedom on wheels!
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-blue-300">Quick Links</h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/" className="hover:text-blue-300 transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-300 transition-colors duration-200">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-300 transition-colors duration-200">
                Contact
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-blue-300 transition-colors duration-200">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-blue-300">Get in Touch</h4>
          <ul className="space-y-2 text-gray-300">
            <li>Email: <a href="mailto:support@rentalsystem.com" className="hover:text-blue-300 transition-colors duration-200">support@rentalsystem.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:text-blue-300 transition-colors duration-200">+1 (234) 567-890</a></li>
            <li>Address: 123 Rental Street, Mobility City</li>
          </ul>
          {/* Social Icons */}
          <div className="flex space-x-4 pt-2">
            <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4a4 4 0 014-4h8a4 4 0 014 4v16a4 4 0 01-4 4H8a4 4 0 01-4-4V4zm5 4h6v6h-6V8zm3 10a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
        <p>© 2025 Bike & Car Rental System. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="/privacy" className="hover:text-blue-300 transition-colors duration-200">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-300 transition-colors duration-200">Terms & Conditions</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;