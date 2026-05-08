import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { motion } from 'framer-motion';
import { FaReact, FaPython, FaNodeJs, FaJava, FaJs, FaGoogle, FaAmazon, FaApple, FaMicrosoft } from 'react-icons/fa';
import { SiMongodb, SiFastapi, SiTailwindcss, SiCplusplus, SiJavascript, SiMeta, SiNetflix } from 'react-icons/si';

const GlobalFloatingTech = () => {
  const icons = [
    { icon: <FaReact />, color: 'text-secondary/40' },
    { icon: <FaGoogle />, color: 'text-red-500/30' },
    { icon: <SiMeta />, color: 'text-blue-500/30' },
    { icon: <FaAmazon />, color: 'text-orange-500/30' },
    { icon: <FaApple />, color: 'text-gray-400/30' },
    { icon: <SiNetflix />, color: 'text-red-600/30' },
    { icon: <FaMicrosoft />, color: 'text-blue-400/30' },
    { icon: <FaPython />, color: 'text-accent-purple/40' },
    { icon: <FaJava />, color: 'text-red-500/30' },
    { icon: <SiFastapi />, color: 'text-green-500/40' },
    { icon: <SiMongodb />, color: 'text-green-600/40' },
    { icon: <FaJs />, color: 'text-yellow-500/30' },
    { icon: <SiTailwindcss />, color: 'text-secondary/40' },
    { icon: <SiCplusplus />, color: 'text-blue-600/30' },
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-80">
      {Array.from({ length: 20 }).map((_, i) => {
        const item = icons[i % icons.length];
        const row = Math.floor(i / 5);
        const col = i % 5;
        const top = (row * 20) + 5 + (Math.random() * 10);
        const left = (col * 20) + 5 + (Math.random() * 10);

        return (
          <motion.div
            key={i}
            initial={{
              top: `${top}%`,
              left: `${left}%`,
              opacity: 0
            }}
            animate={{
              opacity: 1,
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            className={`absolute text-6xl md:text-8xl ${item.color} blur-[1px]`}
          >
            {item.icon}
          </motion.div>
        );
      })}
    </div>
  );
};

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const CosmicBackground = () => {
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 1}px`,
    duration: `${Math.random() * 3 + 2}s`,
    delay: `${Math.random() * 5}s`
  }));

  return (
    <div className="cosmic-bg">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            '--duration': star.duration,
            animationDelay: star.delay
          }}
        />
      ))}
      <div className="nebula glow-blue" style={{ top: '10%', left: '10%' }} />
      <div className="nebula glow-purple" style={{ bottom: '10%', right: '10%' }} />
      <div className="nebula glow-pink" style={{ top: '40%', left: '70%' }} />
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isLogin = location.pathname === '/login';
  const hideNav = isDashboard || isLogin;

  // Handle Scroll to Hash on Load and Change
  React.useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Wait for components to mount and animations to settle
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    } else if (location.pathname === '/') {
      // If home but no hash, scroll to top (unless it's a back navigation handled by browser)
      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-secondary/30 relative">
      {!isDashboard && <CosmicBackground />}
      {!isDashboard && <GlobalFloatingTech />}
      {!hideNav && <Navbar />}
      <Suspense fallback={<LoadingScreen />}>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </main>
      </Suspense>
      {!hideNav && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
