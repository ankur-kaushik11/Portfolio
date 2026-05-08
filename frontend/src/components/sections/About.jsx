import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const [about, setAbout] = React.useState({
    introduction: "",
    professional_summary: "",
    years_exp: "0",
    projects_count: "0",
    why_hire_me: []
  });

  React.useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/about/`);
        const data = await response.json();
        if (data) setAbout(data);
      } catch (e) { console.error(e); }
    };
    fetchAbout();
    const handleSync = (e) => { if (e.key === 'portfolio_update') fetchAbout(); };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  const cards = about.why_hire_me && about.why_hire_me.length > 0 ? about.why_hire_me : [
    { title: "Innovation", description: "Passionate about building cutting-edge solutions using the latest tech stacks." },
    { title: "Quality", description: "Committed to writing clean, maintainable, and high-performance code." },
    { title: "Design", description: "Strong focus on creating beautiful, user-centric interfaces and experiences." }
  ];

  return (
    <section className="py-24 relative" id="about">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            className="md:w-1/2"
          >
            <h2 className="text-4xl font-bold font-outfit mb-8">About <span className="text-secondary">Me</span></h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {about.introduction}
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {about.professional_summary}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 glass-card">
                <div className="text-secondary text-2xl font-bold">{about.years_exp}</div>
                <div className="text-xs text-gray-500 uppercase">Years Exp</div>
              </div>
              <div className="p-4 glass-card">
                <div className="text-accent-purple text-2xl font-bold">{about.projects_count}</div>
                <div className="text-xs text-gray-500 uppercase">Projects</div>
              </div>
            </div>
          </motion.div>

          <div className="md:w-1/2 grid gap-6">
            {cards.map((card, idx) => (
              <motion.div 
                key={idx}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 hover:border-secondary/50 transition-all group"
              >
                <h3 className="text-xl font-bold font-outfit mb-2 group-hover:text-secondary transition-colors">{card.title}</h3>
                <p className="text-gray-400 text-sm">{card.description || card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
