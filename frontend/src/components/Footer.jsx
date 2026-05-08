import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-bold font-outfit gradient-text uppercase tracking-wider">
          ANKUR KAUSHIK
        </div>
        
        <div className="text-gray-500 text-sm font-mono">
          © {new Date().getFullYear()} All rights reserved.
        </div>

        <div className="flex flex-col items-center md:items-end text-gray-400 text-sm gap-1">
          <span className="font-bold text-white tracking-widest">ANKUR KAUSHIK</span>
          <a href="mailto:ANKURKASHIK672@gmail.com" className="hover:text-secondary transition-colors">ANKURKASHIK672@gmail.com</a>
          <a href="tel:+918570950305" className="hover:text-secondary transition-colors">+91 8570950305</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
