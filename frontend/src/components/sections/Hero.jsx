import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import { FaReact, FaPython, FaNodeJs, FaJava, FaJs, FaGoogle, FaAmazon, FaApple, FaMicrosoft } from 'react-icons/fa';
import { SiMongodb, SiFastapi, SiTailwindcss, SiCplusplus, SiJavascript, SiMeta, SiNetflix } from 'react-icons/si';

const Hero = () => {
  const [home, setHome] = useState({
    name: "",
    profile_photo_url: "",
    objective: "",
    resume_url: "#"
  });

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/home/`);
        const data = await response.json();
        if (data && data.name) {
          setHome(data);
        }
      } catch (error) {
        console.error("Error fetching home info:", error);
      }
    };
    fetchHome();

    const handleSync = (e) => {
      if (e.key === 'portfolio_update') {
        fetchHome();
      }
    };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Floating Tech & Company Icons */}
        {[
          { icon: <FaReact />, top: '15%', left: '10%', delay: 0, color: 'text-secondary/40' },
          { icon: <FaGoogle />, top: '25%', left: '20%', delay: 1.5, color: 'text-red-500/20' },
          { icon: <SiMeta />, top: '10%', right: '20%', delay: 2.5, color: 'text-blue-500/25' },
          { icon: <FaAmazon />, bottom: '30%', left: '15%', delay: 3, color: 'text-orange-500/20' },
          { icon: <FaApple />, top: '40%', right: '15%', delay: 1, color: 'text-gray-400/20' },
          { icon: <SiNetflix />, bottom: '20%', right: '20%', delay: 4, color: 'text-red-600/20' },
          { icon: <FaMicrosoft />, bottom: '10%', left: '25%', delay: 5, color: 'text-blue-400/20' },
          { icon: <FaPython />, top: '20%', right: '15%', delay: 1, color: 'text-accent-purple/40' },
          { icon: <FaJava />, bottom: '25%', left: '5%', delay: 0.5, color: 'text-red-500/30' },
          { icon: <SiFastapi />, top: '5%', right: '35%', delay: 2, color: 'text-green-500/40' },
          { icon: <SiMongodb />, bottom: '15%', right: '10%', delay: 1.5, color: 'text-green-600/40' },
          { icon: <FaJs />, top: '45%', left: '5%', delay: 2.5, color: 'text-yellow-500/30' },
          { icon: <SiTailwindcss />, bottom: '5%', left: '35%', delay: 3, color: 'text-secondary/40' },
          { icon: <SiCplusplus />, bottom: '45%', right: '5%', delay: 3.5, color: 'text-blue-600/30' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -40, 0],
              x: [0, 15, -15, 0],
              rotate: [0, 20, -20, 0],
            }}
            transition={{
              duration: 7 + Math.random() * 5,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
            className={`absolute text-7xl md:text-9xl ${item.color || ''} hidden md:block z-0 blur-[1px] hover:blur-0 transition-all duration-500`}
            style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
          >
            {item.icon}
          </motion.div>
        ))}

        {/* Decorative Grid/Dots */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
      </div>

      <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:w-1/2 text-center md:text-left"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-secondary font-semibold tracking-widest text-sm uppercase mb-4 block"
          >
            Aspiring software developer
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-bold font-serif-premium mb-6">
            Hi, I'm <span className="gradient-text">{home.name}</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            {home.objective}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="#projects" className="btn-primary flex items-center gap-2">
              View Projects
            </a>
            <a
              href={home.resume_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-bold hover:bg-white/10 transition-all text-center"
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative"
        >
          {/* Local Icon Cluster (Blending with Background) */}
          {[
            { icon: <FaReact />, top: '-10%', left: '10%', delay: 0, color: 'text-secondary/40' },
            { icon: <FaGoogle />, top: '20%', right: '-10%', delay: 1, color: 'text-red-500/30' },
            { icon: <SiMeta />, bottom: '10%', left: '-5%', delay: 2, color: 'text-blue-500/30' },
            { icon: <FaPython />, bottom: '20%', right: '0%', delay: 3, color: 'text-accent-purple/40' },
          ].map((item, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
              className={`absolute text-5xl ${item.color} hidden lg:block z-0`}
              style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
            >
              {item.icon}
            </motion.div>
          ))}

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative group"
          >
            {/* Deep Glow Behind Image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-accent-purple/20 blur-[100px] opacity-50" />

            {/* Frameless Image with Soft Edges */}
            <div className="relative w-72 h-96 md:w-80 md:h-[450px] overflow-hidden rounded-[3rem] border border-white/5 shadow-2xl">
              <img
                src={home.profile_photo_url}
                alt={home.name}
                className="w-full h-full object-cover brightness-110 transition-all duration-1000 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] opacity-70 group-hover:opacity-95 mix-blend-lighten"
              />

              {/* Subtle Scanning Light */}
              <motion.div
                animate={{ top: ['-100%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-secondary/10 to-transparent pointer-events-none"
              />
            </div>

            {/* Tech Doodles Orbiting */}
            <div className="absolute -inset-10 border border-secondary/10 rounded-full animate-spin-slow opacity-20 pointer-events-none" />
            <div className="absolute -inset-20 border border-accent-purple/5 rounded-full animate-spin-slow-reverse opacity-10 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl text-gray-500"
      >
        <HiArrowDown />
      </motion.div>
    </section>
  );
};

export default Hero;
