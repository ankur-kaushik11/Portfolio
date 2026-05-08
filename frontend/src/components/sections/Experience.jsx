import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const fallbackExperience = [];

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/experience/`);
        const data = await response.json();
        const finalData = Array.isArray(data) ? data : [];

        // Sort by start date (latest on top)
        finalData.sort((a, b) => {
          const parseDate = (d) => (!d || d.toLowerCase().includes('present')) ? new Date() : new Date(d);
          return parseDate(b.start_date) - parseDate(a.start_date);
        });

        setExperiences(finalData);
      } catch (error) {
        console.error("Error fetching experience:", error);
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();

    const handleSync = (e) => {
      if (e.key === 'portfolio_update') {
        fetchExperience();
      }
    };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  if (loading) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold font-serif-premium mb-4">Work <span className="text-secondary">Experience</span></h2>
          <p className="text-gray-400">A chronological timeline of my professional career.</p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Centered Track Line */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-secondary via-accent-purple to-accent-pink opacity-20 rounded-full -translate-x-1/2 hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {experiences.map((exp, idx) => (
              <div key={idx} className={`relative md:flex items-center mb-16 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Pathway Marker (Centered) */}
                <div className="absolute left-1/2 top-1.5 w-6 h-6 bg-dark border-4 border-secondary rounded-full -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(0,212,255,0.4)] hidden md:block" />
                
                {/* Content Side */}
                <div className="w-full md:w-1/2 px-4 md:px-12">
                  <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    className={`glass-card p-8 group relative overflow-hidden ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-secondary/10 transition-all" />
                    
                    <div className="mb-6">
                      <span className="text-secondary font-bold text-xs tracking-widest uppercase mb-2 block">
                        {exp.start_date} — {exp.end_date}
                      </span>
                      <h3 className="text-2xl font-bold font-serif-premium group-hover:text-secondary transition-colors">{exp.position || exp.role}</h3>
                      <div className="text-accent-purple font-medium text-lg">{exp.company}</div>
                    </div>

                    <p className={`text-gray-400 text-sm leading-relaxed mb-6 ${idx % 2 === 0 ? '' : 'md:text-right'}`}>
                      {exp.description || exp.desc}
                    </p>

                    <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? 'justify-start' : 'md:justify-end justify-start'}`}>
                      {(exp.technologies || exp.techs || []).map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-xs text-gray-300 border border-white/10 group-hover:border-secondary/30 transition-all">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Empty Side for Spacing */}
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
