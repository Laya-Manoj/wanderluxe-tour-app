import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UserCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarClass = transparent && !scrolled
    ? 'bg-transparent text-white'
    : 'bg-white text-gray-900 shadow-md';

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarClass}`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl md:text-3xl font-serif font-bold tracking-wider">
            Wanderluxe
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`link-hover ${location.pathname === '/' ? 'font-medium' : ''}`}>
              Home
            </Link>
            <Link to="/tours" className={`link-hover ${location.pathname.includes('/tours') ? 'font-medium' : ''}`}>
              Tours
            </Link>
            <Link to="/about" className={`link-hover ${location.pathname === '/about' ? 'font-medium' : ''}`}>
              About
            </Link>
            <Link to="/contact" className={`link-hover ${location.pathname === '/contact' ? 'font-medium' : ''}`}>
              Contact
            </Link>
            
            
            {currentUser ? (
              <div className="relative group">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <UserCircle className="h-5 w-5" />
                  <span>{currentUser.name}</span>
                </div>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-5 py-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition"
              >
                Login
              </Link>
            )}
          </nav>
          
          <button 
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              <Link 
                to="/" 
                className="text-gray-800 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/tours" 
                className="text-gray-800 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Tours
              </Link>
              <Link 
                to="/about" 
                className="text-gray-800 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-800 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {currentUser ? (
                <>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="text-gray-800 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-800 py-2 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="w-full py-2 mt-2 text-center rounded-full bg-primary-600 text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;