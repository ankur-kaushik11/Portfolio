import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaPython, FaNodeJs, FaDocker, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { SiTailwindcss, SiFastapi, SiMongodb, SiJavascript, SiTypescript, SiPostgresql } from 'react-icons/si';

const fallbackSkills = [];

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skills/`);
        const data = await response.json();
        const finalData = (Array.isArray(data) ? data : []).map(skill => ({
          ...skill,
          category: (!skill.category || skill.category === "General") ? "Core Languages" : skill.category
        }));

        setSkills(finalData);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();

    const handleSync = (e) => {
      if (e.key === 'portfolio_update') {
        fetchSkills();
      }
    };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  const renderStars = (proficiency) => {
    // Proficiency 0-100 mapped to 5 stars
    const rating = (proficiency / 100) * 5;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-secondary" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-secondary" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-600" />);
      }
    }
    return stars;
  };

  // Group skills by category with custom order
  const categoryOrder = [
    "Core Languages",
    "Frontend",
    "Backend",
    "AI",
    "Database",
    "Cloud",
    "Technical Skills",
    "Version Control"
  ];

  const categories = [...new Set(skills.map(s => s.category || "General"))].sort((a, b) => {
    let indexA = categoryOrder.indexOf(a);
    let indexB = categoryOrder.indexOf(b);
    if (indexA === -1) indexA = 99;
    if (indexB === -1) indexB = 99;
    return indexA - indexB;
  });

  if (loading) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold font-serif-premium mb-4">Technical <span className="text-secondary">Expertise</span></h2>
          <p className="text-gray-400">A curated journey through my core technical competencies.</p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-secondary via-accent-purple to-accent-pink opacity-20 rounded-full -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12 md:space-y-0">
            {categories.map((catName, catIdx) => (
              <div key={catIdx} className={`relative md:flex items-center mb-16 ${catIdx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-1/2 top-1.5 w-6 h-6 bg-dark border-4 border-secondary rounded-full -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(0,212,255,0.4)] hidden md:block" />
                
                <div className="w-full md:w-1/2 px-4 md:px-12">
                  <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: catIdx % 2 === 0 ? -50 : 50 }}
                    className={`glass-card p-6 border-l-4 ${catIdx % 2 === 0 ? 'border-l-secondary' : 'md:border-l-0 md:border-r-4 md:border-r-accent-purple border-l-secondary'}`}
                  >
                    <h3 className={`text-xl font-bold font-serif-premium mb-6 text-gray-200 ${catIdx % 2 === 0 ? 'text-left' : 'md:text-right text-left'}`}>
                      {catName}
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {skills.filter(s => (s.category || "General") === catName).map((skill, idx) => (
                        <div 
                          key={idx}
                          className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col items-center text-center group transition-all hover:bg-white/10"
                        >
                          <h4 className="text-[12px] font-bold font-serif-premium mb-2">{skill.name}</h4>
                          <div className="flex gap-0.5 scale-75">
                            {renderStars(skill.proficiency)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
