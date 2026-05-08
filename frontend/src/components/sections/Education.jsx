import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const fallbackEducation = [];

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/education/`);
        const data = await response.json();
        const finalData = Array.isArray(data) ? data : [];
        
        // Sort by start date (latest on top)
        finalData.sort((a, b) => {
          const parseDate = (d) => (!d || d.toLowerCase().includes('present')) ? new Date() : new Date(d);
          return parseDate(b.start_date) - parseDate(a.start_date);
        });

        setEducation(finalData);
      } catch (error) {
        console.error("Error fetching education:", error);
        setEducation(fallbackEducation);
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();

    const handleSync = (e) => {
      if (e.key === 'portfolio_update') {
        fetchEducation();
      }
    };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  if (loading) return null; // Or a subtle loader

  return (
    <section className="py-24 bg-primary/20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold font-serif-premium mb-16 text-center">Educational <span className="text-secondary">Journey</span></h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-1 bg-gradient-to-b from-secondary to-accent-purple -translate-x-1/2 opacity-30" />

          {education.map((item, idx) => (
            <motion.div 
              key={idx}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              className={`relative flex flex-col md:flex-row items-center mb-16 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Dot */}
              <div className="absolute left-0 md:left-1/2 w-6 h-6 bg-secondary rounded-full -translate-x-1/2 border-4 border-dark z-10 shadow-[0_0_15px_rgba(0,212,255,0.5)]" />
              
              <div className="w-full md:w-1/2 px-8">
                <div className="glass-card p-8 hover:scale-[1.02] transition-transform">
                  <span className="text-secondary font-bold text-xs tracking-widest uppercase mb-2 block">
                    {item.start_date} — {item.end_date}
                  </span>
                  <h3 className="text-2xl font-bold font-serif-premium mt-2">{item.degree}</h3>
                  <div className="text-accent-purple font-medium mb-4">{item.institution}</div>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{item.description || item.desc}</p>
                  <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-secondary border border-secondary/20 font-bold uppercase tracking-wider">
                    GPA: {item.cgpa || item.gpa}
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
