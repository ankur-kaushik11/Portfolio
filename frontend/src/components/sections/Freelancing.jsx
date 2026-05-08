import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

const Freelancing = () => {
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState([]);
  const [workHistory, setWorkHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIcon = (iconName) => {
    const Icon = FaIcons[iconName] || SiIcons[iconName] || FaIcons.FaLaptopCode;
    return <Icon />;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, statsRes, workRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/freelance/services`),
          fetch(`${import.meta.env.VITE_API_URL}/api/freelance/stats`),
          fetch(`${import.meta.env.VITE_API_URL}/api/freelance/work`)
        ]);
        const servicesData = await servicesRes.json();
        const statsData = await statsRes.json();
        const workData = await workRes.json();
        setServices(servicesData);
        setStats(statsData);
        setWorkHistory(workData);
      } catch (error) {
        console.error("Error fetching freelance data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return null;

  return (
    <div className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4">
            Freelance <span className="gradient-text">& Services</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-8 group relative overflow-hidden border border-white/5 hover:border-secondary/30 transition-all duration-500"
            >
              <div className={`absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity`} />
              
              <div className={`text-4xl mb-6 bg-gradient-to-br ${service.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500`}>
                {getIcon(service.icon)}
              </div>
              
              <h3 className="text-xl font-bold mb-4 font-outfit text-white group-hover:text-secondary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex items-center gap-2 text-xs font-mono text-secondary opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                ACTIVE_SERVICE
              </div>
            </motion.div>
          ))}
        </div>

        {/* Work Gallery Section */}
        {workHistory.length > 0 && (
          <div className="mt-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h3 className="text-3xl font-bold font-outfit mb-4">Client <span className="gradient-text">Success Stories</span></h3>
              <p className="text-gray-400 font-mono text-xs uppercase tracking-tighter">// Selection of past projects and results</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workHistory.map((work, idx) => (
                <motion.div
                  key={work.id || idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="glass-card p-10 border-white/5 hover:border-secondary/20 transition-all relative group"
                >
                  <div className="absolute top-6 right-8 text-[10px] font-black uppercase tracking-widest text-secondary opacity-40">#{idx + 1}</div>
                  
                  <div className="mb-6">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 block mb-1">Client: {work.client_name}</span>
                    <h4 className="text-2xl font-bold text-white group-hover:text-secondary transition-colors font-outfit">{work.project_title}</h4>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-8 border-l-2 border-secondary/20 pl-4 italic">
                    "{work.description}"
                  </p>

                  <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/5">
                    <div className="text-[10px] font-black uppercase tracking-widest text-secondary mb-3 flex items-center gap-2">
                      <div className="w-1 h-1 bg-secondary rounded-full" />
                      Key Outcome
                    </div>
                    <p className="text-white font-bold text-sm">{work.outcome}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(work.tech_used || []).map((tech, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-gray-400 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {work.link && work.link !== "#" && (
                    <a 
                      href={work.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute bottom-6 right-8 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all border border-secondary/20"
                    >
                      <FaIcons.FaExternalLinkAlt size={14} />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Impact Stats */}
        <div className="mt-32 flex flex-wrap justify-center gap-12 border-t border-white/5 pt-12">
          {stats.map((stat, i) => (
            <div key={stat.id || i} className="text-center">
              <div className="text-4xl font-bold font-outfit gradient-text mb-1">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-mono">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Freelancing;
