import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiExternalLink, HiCode } from 'react-icons/hi';
import { Rocket, Cpu, CheckCircle, Zap, Trophy, Code } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects/`);
        const data = await res.json();
        const found = data.find(p => p.id === id);
        setProject(found);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const formatDescription = (text) => {
    if (!text) return null;
    
    // Define the section markers we're looking for
    const sectionConfig = [
      { id: 'objective', label: 'Objective', icon: <Rocket size={20} className="text-secondary" /> },
      { id: 'solution', label: 'Solution Developed', icon: <Cpu size={20} className="text-accent-purple" /> },
      { id: 'features', label: 'Key Features', icon: <CheckCircle size={20} className="text-green-400" /> },
      { id: 'implementation', label: 'Technical Implementation', icon: <Code size={20} className="text-blue-400" /> },
      { id: 'challenges', label: 'Challenges Faced', icon: <Zap size={20} className="text-yellow-400" /> },
      { id: 'outcome', label: 'Outcome & Impact', icon: <Trophy size={20} className="text-accent-pink" /> }
    ];

    // Create a regex to find any of these markers (case-insensitive)
    const markers = sectionConfig.map(s => s.label.replace('&', '\\&')).join('|');
    const regex = new RegExp(`(${markers})`, 'gi');

    // Split text by markers but keep the markers in the result
    const parts = text.split(regex);
    
    const formattedSections = [];
    let currentSection = null;

    // Process parts: [intro, marker, content, marker, content...]
    parts.forEach((part, index) => {
      const trimmed = part.trim();
      if (!trimmed) return;

      // Check if this part is one of our section headers
      const matchedConfig = sectionConfig.find(s => 
        s.label.toLowerCase() === trimmed.toLowerCase() || 
        trimmed.toLowerCase().startsWith(s.label.toLowerCase())
      );

      if (matchedConfig) {
        currentSection = { ...matchedConfig, text: '' };
        formattedSections.push(currentSection);
      } else if (currentSection) {
        // Append text to the current section
        currentSection.text += (currentSection.text ? ' ' : '') + trimmed;
      } else {
        // This is introductory text before any header
        formattedSections.push({ label: 'Overview', icon: null, text: trimmed });
      }
    });

    if (formattedSections.length === 0) {
      return <div className="text-gray-400 leading-relaxed whitespace-pre-line">{text}</div>;
    }

    return (
      <div className="space-y-10">
        {formattedSections.map((sec, i) => (
          <motion.section 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative pl-10 border-l-2 border-white/5 hover:border-secondary/20 transition-colors group pb-6"
          >
            {/* Timeline Node */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-dark border-2 border-white/20 group-hover:border-secondary group-hover:scale-125 transition-all duration-300" />
            
            <div className="flex items-center gap-4 mb-4">
              <span className="p-2 bg-white/5 rounded-lg text-xl group-hover:scale-110 transition-transform">
                {sec.icon || <CheckCircle size={20} className="text-gray-500" />}
              </span>
              <h3 className="text-xl font-bold font-outfit uppercase tracking-wider text-white/90 group-hover:text-secondary transition-colors">
                {sec.label}
              </h3>
            </div>

            <div className="glass-card p-6 bg-white/[0.01] hover:bg-white/[0.03] transition-colors border-white/5 group-hover:border-white/10">
              <p className="text-gray-400 leading-relaxed font-mono text-sm whitespace-pre-line">
                {sec.text.replace(/^[:\-\s]+/, '') /* Clean up leading colons or dashes */}
              </p>
            </div>
          </motion.section>
        ))}
      </div>
    );
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-dark"><div className="w-8 h-8 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin" /></div>;
  if (!project) return <div className="h-screen flex items-center justify-center bg-dark text-white">Project not found</div>;

  return (
    <div className="pt-32 pb-24 bg-[#03050a] min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-secondary mb-12 transition-all group font-mono text-xs uppercase tracking-widest">
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to System_Core
        </Link>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left: Content - 7 cols */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-12"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-12 bg-secondary/30" />
                <span className="text-secondary font-bold text-xs uppercase tracking-[0.3em]">{project.category}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold font-outfit leading-tight mb-8">
                {project.name}
              </h1>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="btn-primary py-4 px-8 flex items-center gap-2 group">
                  Live Execution <HiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
                <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-white/10 bg-white/5 rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                  View Source <HiCode />
                </a>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5">
              <h2 className="text-2xl font-bold font-outfit mb-10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Case Study Breakdown
              </h2>
              {formatDescription(project.full_description)}
            </div>
          </motion.div>

          {/* Right: Media & Tech - 5 cols */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-10 lg:sticky lg:top-32"
          >
            <div className="space-y-6">
              {project.screenshots?.map((img, i) => (
                <div key={i} className="glass-card overflow-hidden group border-white/5 hover:border-secondary/30 transition-all">
                  <img src={img} alt={`${project.name} ${i}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>

            <div className="glass-card p-10 border-white/5">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Technical Architecture</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack?.map((tech, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 text-gray-300 border border-white/10 rounded-xl text-xs font-bold font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
