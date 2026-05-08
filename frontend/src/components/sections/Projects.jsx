import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiExternalLink, HiCode, HiX } from 'react-icons/hi';
import { Rocket, Cpu, CheckCircle, Zap, Trophy, Code } from 'lucide-react';

// 1. Fallback Dummy Data
const fallbackProjects = [];

// Helper to format description into sections
const formatDescription = (text) => {
  if (!text) return null;
  
  const sectionConfig = [
    { id: 'objective', label: 'Objective', icon: <Rocket size={18} className="text-secondary" /> },
    { id: 'solution', label: 'Solution Developed', icon: <Cpu size={18} className="text-accent-purple" /> },
    { id: 'features', label: 'Key Features', icon: <CheckCircle size={18} className="text-green-400" /> },
    { id: 'implementation', label: 'Technical Implementation', icon: <Code size={18} className="text-blue-400" /> },
    { id: 'challenges', label: 'Challenges Faced', icon: <Zap size={18} className="text-yellow-400" /> },
    { id: 'outcome', label: 'Outcome & Impact', icon: <Trophy size={18} className="text-accent-pink" /> }
  ];

  const markers = sectionConfig.map(s => s.label.replace('&', '\\&')).join('|');
  const regex = new RegExp(`(${markers})`, 'gi');
  const parts = text.split(regex);
  
  const formattedSections = [];
  let currentSection = null;

  parts.forEach((part) => {
    const trimmed = part.trim();
    if (!trimmed) return;

    const matchedConfig = sectionConfig.find(s => 
      s.label.toLowerCase() === trimmed.toLowerCase() || 
      trimmed.toLowerCase().startsWith(s.label.toLowerCase())
    );

    if (matchedConfig) {
      currentSection = { ...matchedConfig, text: '' };
      formattedSections.push(currentSection);
    } else if (currentSection) {
      currentSection.text += (currentSection.text ? ' ' : '') + trimmed;
    } else {
      formattedSections.push({ label: 'Overview', icon: null, text: trimmed });
    }
  });

  if (formattedSections.length === 0) {
    return <p className="text-gray-400 text-[14px] leading-relaxed whitespace-pre-line">{text}</p>;
  }

  return (
    <div className="space-y-6">
      {formattedSections.map((sec, i) => (
        <div key={i} className="relative pl-6 border-l border-white/10 group/sec">
          <div className="absolute -left-1 top-0 w-2 h-2 rounded-full bg-secondary scale-0 group-hover/sec:scale-100 transition-transform" />
          <div className="flex items-center gap-2 mb-2 text-white/90">
            <span className="text-base">{sec.icon || <CheckCircle size={16} className="text-gray-500" />}</span>
            <span className="text-xs font-black uppercase tracking-widest font-outfit">{sec.label}</span>
          </div>
          <p className="text-gray-400 text-[13px] leading-relaxed font-mono">
            {sec.text.replace(/^[:\-\s]+/, '')}
          </p>
        </div>
      ))}
    </div>
  );
};

// 2. Slideshow Sub-component
const ProjectSlideshow = ({ images, isModal }) => {
  const [current, setCurrent] = React.useState(0);
  const imageList = Array.isArray(images) ? images : [];

  React.useEffect(() => {
    if (imageList.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imageList.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [imageList.length]);

  if (imageList.length === 0) return (
    <div className={`relative ${isModal ? 'h-full' : 'h-32'} bg-white/5 flex items-center justify-center rounded-xl mb-4`}>
       <span className="text-gray-500 text-xs italic">No images provided</span>
    </div>
  );

  return (
    <div className={`relative ${isModal ? 'h-full' : 'h-32'} overflow-hidden rounded-xl mb-4 group/img`}>
      {imageList.map((img, i) => (
        <motion.img
          key={i}
          src={img}
          alt="project"
          initial={{ opacity: 0 }}
          animate={{ opacity: current === i ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
    </div>
  );
};

// 3. Modal Sub-component
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const screenshots = project.screenshots || project.images || [];
  const name = project.name || project.title;
  const idea = project.idea_source || project.idea;
  const description = project.full_description || project.desc;
  const tech = project.tech_stack || project.tags || [];
  const start = project.start_date || project.startDate;
  const end = project.end_date || project.endDate;
  const demo = project.live_demo_url || (project.links && project.links.demo) || "#";
  const github = project.github_url || (project.links && project.links.code) || "#";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
    >
      <div className="absolute inset-0 bg-dark/90 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl bg-dark-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-1.5 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all border border-white/10">
          <HiX size={18} />
        </button>
        <div className="w-full md:w-2/5 h-48 md:h-auto relative bg-black/20">
          <ProjectSlideshow images={screenshots} isModal />
        </div>
        <div className="w-full md:w-3/5 p-8 md:p-10 overflow-y-auto scrollbar-hide">
          <div className="mb-6">
            <div className="text-secondary font-bold text-[11px] tracking-widest uppercase mb-1">{start} — {end}</div>
            <h2 className="text-3xl font-bold font-serif-premium text-white mb-3 leading-tight">{name}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {tech.map((tag, i) => (
                <span key={i} className="text-[9px] uppercase tracking-widest font-bold text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">{tag}</span>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {idea && (
              <div>
                <span className="text-[10px] uppercase tracking-tighter font-bold text-gray-500 block mb-2">The Intuition</span>
                <p className="text-accent-purple font-medium italic text-base leading-relaxed">"{idea}"</p>
              </div>
            )}
            <div>
              <span className="text-[10px] uppercase tracking-tighter font-bold text-gray-500 block mb-4">Detailed Breakdown</span>
              {formatDescription(description)}
            </div>
            <div className="flex gap-4 pt-4">
              <a href={demo} target="_blank" rel="noopener noreferrer" className="flex-1 bg-secondary text-white py-3 rounded-xl text-center text-xs font-bold transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-secondary/20 active:scale-95">Launch Project <HiExternalLink size={16} /></a>
              <a href={github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all flex items-center justify-center active:scale-95 border border-white/5"><HiCode size={20} /></a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 4. Card Sub-component
const ProjectCard = ({ project, idx, onOpen }) => {
  const screenshots = project.screenshots || project.images || [];
  const name = project.name || project.title;
  const start = project.start_date || project.startDate;
  const end = project.end_date || project.endDate;
  const shortDesc = project.short_description || project.desc;
  const demo = project.live_demo_url || (project.links && project.links.demo) || "#";
  const github = project.github_url || (project.links && project.links.code) || "#";

  return (
    <motion.div 
      layout
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ delay: idx * 0.05 }}
      className="glass-card aspect-square overflow-hidden group hover:border-secondary/30 transition-all flex flex-col cursor-pointer shadow-xl hover:shadow-secondary/5"
      onClick={onOpen}
    >
      <div className="h-1/2 w-full relative overflow-hidden bg-black/40">
        <ProjectSlideshow images={screenshots} isModal />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="h-1/2 p-5 flex flex-col justify-between bg-dark-card/50">
        <div>
          <div className="text-[10px] text-secondary font-bold tracking-widest mb-1 uppercase">
            {start} — {end}
          </div>
          <h3 className="text-lg md:text-xl font-bold font-serif-premium mb-2 group-hover:text-secondary transition-colors line-clamp-1 leading-tight">
            {name}
          </h3>
          <p className="text-gray-400 text-[13px] leading-snug line-clamp-3">
            {shortDesc}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span className="text-secondary text-[10px] font-bold hover:underline flex items-center gap-1 group-hover:gap-2 transition-all">
            Read More ➔
          </span>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <a href={demo} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-secondary/10 hover:bg-secondary text-secondary hover:text-white rounded-lg transition-all border border-secondary/20"><HiExternalLink size={14} /></a>
            <a href={github} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg transition-all border border-white/10"><HiCode size={14} /></a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// 5. Main Component
const Projects = () => {
  const [showAll, setShowAll] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/`);
        const data = await response.json();
        const finalData = Array.isArray(data) ? data : [];
        
        const getTime = (d) => {
          if (!d || d.toLowerCase().includes('present')) return new Date().getTime();
          const p = new Date(d);
          return isNaN(p.getTime()) ? 0 : p.getTime();
        };

        finalData.sort((a, b) => getTime(b.start_date) - getTime(a.start_date));

        setProjects(finalData);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();

    const handleSync = (e) => {
      if (e.key === 'portfolio_update') {
        fetchProjects();
      }
    };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold font-serif-premium mb-6">My <span className="gradient-text">Projects</span></motion.h2>
            <p className="text-gray-400 text-lg">Explore a curated selection of my recent work, ranging from complex full-stack applications to innovative AI experiments.</p>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin" /></div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayedProjects.map((project, idx) => (
                <ProjectCard key={project.id || idx} project={project} idx={idx} onOpen={() => setSelectedProject(project)} />
              ))}
            </div>
            {projects.length > 4 && (
              <div className="mt-16 text-center">
                <button onClick={() => setShowAll(!showAll)} className="px-6 py-2.5 bg-white/5 hover:bg-secondary text-white rounded-full font-bold transition-all border border-white/10 hover:border-secondary shadow-lg text-sm flex items-center gap-2 mx-auto">
                  {showAll ? <>Hide Projects ▴</> : <>Show More Projects ▾</>}
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
