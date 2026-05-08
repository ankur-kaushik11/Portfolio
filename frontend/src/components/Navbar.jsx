import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiLockClosed } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setIsOpen(false);

    if (path.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/' + path);
      } else {
        const element = document.querySelector(path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', path);
        }
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '#about' },
    { name: 'Experience', path: '#experience' },
    { name: 'Projects', path: '#projects' },
    { name: 'Services', path: '#freelance' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" onClick={(e) => handleNavClick(e, '/')} className="text-2xl font-bold font-outfit gradient-text">
          ANKUR KAUSHIK
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className="text-sm font-medium hover:text-secondary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Link to="/login" className="p-2 rounded-full hover:bg-white/10 transition-all group">
            <HiLockClosed className="text-xl group-hover:text-secondary" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-3xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 bg-dark/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-2xl font-semibold hover:text-secondary"
                onClick={(e) => handleNavClick(e, link.path)}
              >
                {link.name}
              </a>
            ))}
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-2xl font-semibold hover:text-secondary flex items-center gap-2">
              <HiLockClosed /> Admin Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
