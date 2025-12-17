import React from 'react';
import { Palette, Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t-2 z-40 bg-base-100 h-auto w-full py-4 px-5  transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex  flex-col justify-center pt-3">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Palette className="h-6 w-6 text-[#CA8A04]" />
              <span className="cinzel-font text-xl font-bold text-accent">ARTIFY</span>
            </div>
            <p className="text-btn-login text-sm leading-relaxed transition-colors">
              Curating the world's most exceptional digital and physical artworks. Join our community of creators and collectors.
            </p>
          </div>

          <div>
            <h3 className="cinzel-font text-lg font-bold text-accent mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm text-btn-login">
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-700 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="hover:text-orange-700 transition-colors"
                >
                  Explore Artworks
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-orange-700 transition-colors"
                >
                  Join as Artist
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-orange-700 transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="cinzel-font text-lg font-bold text-accent mb-4">CONTACT</h3>
            <ul className="space-y-4 text-sm text-btn-login">
              <li className="flex items-center space-x-3 transition-colors">
                <MapPin className="text-[#CA8A04]" />
                <span>123 Art Avenue, NY, USA</span>
              </li>
              <li className="flex items-center space-x-3 transition-colors">
                <Mail className="text-[#CA8A04]" />
                <span>contact@artify.com</span>
              </li>
              <li className="flex items-center space-x-3 transition-colors">
                <Phone className="text-[#CA8A04]" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="cinzel-font text-lg font-bold text-accent mb-4">FOLLOW US</h3>
            <div className="flex space-x-4 text-black">
              <Link
                to="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-accent hover:text-white transition-all duration-300"
              >
                {/* X Logo SVG */}
                <svg
                  viewBox="0 0 24 24"
                  aria-label="X (formerly Twitter)"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </Link>
              <Link
                to="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-accent hover:text-white transition-all duration-300"
              >
                <Instagram />
              </Link>
              <Link
                to="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-accent hover:text-white transition-all duration-300"
              >
                <Facebook />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-btn-login">
          <p>&copy; {new Date().getFullYear()} Artify. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-orange-700">Privacy Policy</Link>
            <Link to="#" className="hover:text-orange-700">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;