import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiHome, HiUser, HiAcademicCap, HiBriefcase, 
  HiCollection, HiPhone, HiCloudUpload, HiLogout,
  HiPlus, HiTrash, HiPencil, HiCheckCircle, HiExclamationCircle, HiX
} from 'react-icons/hi';

// --- CLOUDINARY CONFIG ---
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; 
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Use global API URL from env
const API_URL = import.meta.env.VITE_API_URL;

const uploadToCloudinary = async (file) => {
  if (CLOUDINARY_CLOUD_NAME === "your_cloud_name" || CLOUDINARY_UPLOAD_PRESET === "your_preset") {
    alert("Please set your Cloudinary 'Upload Preset' in Dashboard.jsx first. You can find this in Cloudinary Settings > Upload.");
    return null;
  }
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (!res.ok) {
      alert(`Upload Error: ${data.error?.message || 'Unknown error'}`);
      return null;
    }
    return data.secure_url;
  } catch (err) {
    alert("Network Error: Could not connect to Cloudinary.");
    console.error(err);
    return null;
  }
};

const ImageUpload = ({ label, value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadToCloudinary(file);
    if (url) onChange(url);
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">{label}</label>
      <div className="flex gap-3">
        <input 
          type="text" value={value || ''} readOnly 
          placeholder="Upload or enter URL..."
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-xs outline-none"
        />
        <label className={`w-14 h-14 flex items-center justify-center rounded-2xl font-bold cursor-pointer transition-all ${uploading ? 'bg-gray-700' : 'bg-secondary hover:shadow-lg hover:shadow-secondary/20 text-white'}`}>
          {uploading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <HiCloudUpload size={24} />}
          <input type="file" className="hidden" onChange={handleFile} accept="image/*" />
        </label>
      </div>
    </div>
  );
};

// --- FALLBACK DATA (Source of Truth for Templates) ---
const fallbacks = {
  home: { name: "", profile_photo_url: "", objective: "", resume_url: "#", why_hire_me: [] },
  about: { introduction: "", professional_summary: "", years_exp: "0", projects_count: "0", why_hire_me: [] },
  projects: [],
  skills: [],
  experience: [],
  education: [],
  freelance_services: [],
  freelance_stats: [],
  contact: { email: "", phone: "", location: "", social_media: [] }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Home');

  const menuItems = [
    { name: 'Dashboard', icon: <HiHome />, path: '' },
    { name: 'Hero Section', icon: <HiUser />, path: 'hero' },
    { name: 'About', icon: <HiUser />, path: 'about' },
    { name: 'Education', icon: <HiAcademicCap />, path: 'education' },
    { name: 'Experience', icon: <HiBriefcase />, path: 'experience' },
    { name: 'Projects', icon: <HiCollection />, path: 'projects' },
    { name: 'Skills', icon: <HiAcademicCap />, path: 'skills' },
    { name: 'Freelance', icon: <HiPlus />, path: 'freelance' },
    { name: 'Contact & Socials', icon: <HiPhone />, path: 'contact' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <div className="h-screen bg-[#050810] flex overflow-hidden">
      {/* Sidebar - Fixed Height to Screen */}
      <aside className="w-64 glass-nav border-r border-white/5 h-full overflow-y-auto flex-shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-8 h-8 bg-secondary rounded-lg" />
            <span className="text-xl font-bold font-serif-premium tracking-tight">Admin</span>
          </div>

          <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black mb-6 px-2 opacity-50">Management</div>
          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === item.name 
                  ? 'bg-secondary/10 text-secondary border border-secondary/20 shadow-lg shadow-secondary/5' 
                  : 'text-gray-500 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-bold tracking-wide">{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className="mt-10 pt-6 border-t border-white/5">
            <button onClick={handleLogout} className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-red-400/60 hover:bg-red-400/10 hover:text-red-400 transition-all w-full group">
              <HiLogout className="text-xl group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold tracking-wide">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Internally Scrollable */}
      <main className="flex-1 h-full overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent custom-scrollbar flex flex-col">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between glass-nav sticky top-0 z-[110]">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-secondary rounded-full" />
            <h1 className="text-sm font-black uppercase tracking-[0.3em] text-white/80">Portfolio Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/" className="px-5 py-1.5 bg-secondary/10 border border-secondary/20 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-secondary hover:text-white transition-all flex items-center gap-2">
              <span className="w-1 h-1 bg-current rounded-full" />
              Back to Portfolio
            </Link>
          </div>
        </header>

        <div className="max-w-5xl mx-auto w-full p-8 pt-12 flex-1">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/hero" element={<HomeManager />} />
            <Route path="/about" element={<AboutManager />} />
            <Route path="/education" element={<EducationManager />} />
            <Route path="/experience" element={<ExperienceManager />} />
            <Route path="/projects" element={<ProjectsManager />} />
            <Route path="/skills" element={<SkillsManager />} />
            <Route path="/freelance" element={<FreelanceManager />} />
            <Route path="/contact" element={<ContactManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

// --- GENERIC MANAGER COMPONENT (CRUD ENGINE) ---
const GenericManager = ({ title, endpoint, icon, FormComponent, subTitle }) => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Utility to parse date strings for sorting
  const parseDate = (dateStr) => {
    if (!dateStr || dateStr.toLowerCase().includes('present')) return new Date();
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? new Date(0) : date;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/${endpoint}/`);
      const data = await response.json();
      
      const isList = ['education', 'experience', 'projects', 'skills', 'freelance/services', 'freelance/stats', 'freelance/work'].includes(endpoint);
      let finalData = isList ? (Array.isArray(data) ? data : []) : (data && !data.detail ? [data] : []);
      
      // Sort lists by date (latest on top) if they have date fields
      if (['education', 'experience', 'projects'].includes(endpoint)) {
        finalData.sort((a, b) => {
          const keyA = endpoint === 'projects' ? a.start_date : (a.end_date || a.start_date);
          const keyB = endpoint === 'projects' ? b.start_date : (b.end_date || b.start_date);
          return parseDate(keyB) - parseDate(keyA);
        });
      }

      // Normalize skills (General -> Core Languages)
      if (endpoint === 'skills') {
        finalData = finalData.map(s => ({
          ...s,
          category: (!s.category || s.category === "General") ? "Core Languages" : s.category
        }));
      }
      
      setItems(finalData);
      localStorage.setItem('portfolio_update', Date.now());
    } catch (error) {
      setItems(Array.isArray(fallbacks[endpoint]) ? fallbacks[endpoint] : [fallbacks[endpoint]]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [endpoint]);

  const handleDelete = async (id) => {
    if (id?.toString().startsWith('fallback')) {
        if (window.confirm("Hide template entry?")) {
            const hiddenIds = JSON.parse(localStorage.getItem(`hidden_${endpoint}`) || "[]");
            localStorage.setItem(`hidden_${endpoint}`, JSON.stringify([...hiddenIds, id]));
            fetchData();
        }
        return;
    }
    if (!window.confirm("Permanently delete?")) return;
    try {
        const res = await fetch(`${API_URL}/api/${endpoint}/${id}`, { method: 'DELETE' });
        if (res.ok) fetchData(); else alert("Failed to delete.");
    } catch (err) { alert("Network error."); }
  };

  const isSingleton = !['education', 'experience', 'projects', 'skills', 'freelance/services', 'freelance/stats', 'freelance/work'].includes(endpoint);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold font-serif-premium">{title}</h2>
          <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">{subTitle || `Manage your ${title.toLowerCase()}`}</p>
        </div>
        {!isSingleton && (
          <button onClick={() => { setCurrentItem(null); setIsModalOpen(true); }} className="btn-primary py-2.5 px-6 flex items-center gap-2 text-xs font-bold">
            <HiPlus size={18} /> New Entry
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item, i) => (
            <div key={item.id || i} className="group flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl transition-all hover:bg-white/[0.06] hover:border-secondary/30">
              <div className="flex items-center gap-5">
                <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary text-xl">{icon}</div>
                <div>
                  <h3 className="font-bold tracking-tight text-base">{item.title || item.name || item.institution || item.company || item.label || item.project_title}</h3>
                  <p className="text-gray-500 text-sm mt-0.5">{item.degree || item.position || item.short_description || item.client_name || "Primary Identity"}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setCurrentItem(item); setIsModalOpen(true); }} className="px-5 py-2.5 bg-white/5 hover:bg-secondary text-white rounded-lg text-sm font-bold transition-all border border-white/5">Edit</button>
                {!isSingleton && <button onClick={() => handleDelete(item.id)} className="p-2.5 bg-red-400/5 hover:bg-red-400/20 text-red-400 rounded-lg transition-all border border-red-400/10"><HiTrash size={18} /></button>}
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && <FormComponent item={currentItem} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); fetchData(); }} />}
    </motion.div>
  );
};

// --- DASHBOARD HOME (Overview Stats) ---
const DashboardHome = () => {
  const [statsData, setStatsData] = useState({ projects: 0, experience: 0, skills: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const endpoints = ['projects', 'experience', 'skills'];
        const counts = await Promise.all(endpoints.map(async (ep) => {
          const res = await fetch(`${API_URL}/api/${ep}/`);
          const data = await res.json();
          return Array.isArray(data) ? data.length : 0;
        }));
        setStatsData({ projects: counts[0], experience: counts[1], skills: counts[2] });
      } catch (e) { console.error(e); }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Projects', count: statsData.projects.toString(), icon: <HiCollection />, color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Experience', count: statsData.experience.toString(), icon: <HiBriefcase />, color: 'bg-purple-500/10 text-purple-500' },
    { label: 'Skills', count: statsData.skills.toString(), icon: <HiAcademicCap />, color: 'bg-green-500/10 text-green-500' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
      <div className="glass-card p-10 border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        <h1 className="text-4xl font-bold font-serif-premium mb-4">Welcome back, <span className="text-secondary">Ankur</span></h1>
        <p className="text-gray-400 max-w-xl leading-relaxed">Everything on your portfolio is live and synced. Use the sidebar to manage your content, update your projects, and keep your skills fresh.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6 border-white/5 hover:border-secondary/30 transition-all group">
            <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold font-serif-premium">{stat.count}</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[40px]">
         <div className="flex items-center gap-3 text-secondary mb-4">
            <HiCheckCircle size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">System Status</span>
         </div>
         <p className="text-gray-500 text-sm">All systems operational. MongoDB connected. Real-time sync active.</p>
      </div>
    </motion.div>
  );
};

// --- SECTION MANAGERS ---
const HomeManager = () => <GenericManager title="Hero & Identity" endpoint="home" icon={<HiHome />} FormComponent={HomeForm} subTitle="This section controls your name, role, and bio in the main Hero section." />;
const AboutManager = () => <GenericManager title="About Me" endpoint="about" icon={<HiUser />} FormComponent={AboutForm} subTitle="Control your introduction and detailed professional summary." />;
const EducationManager = () => <GenericManager title="Education" endpoint="education" icon={<HiAcademicCap />} FormComponent={EducationForm} subTitle="Manage your academic journey and degrees." />;
const ExperienceManager = () => <GenericManager title="Experience" endpoint="experience" icon={<HiBriefcase />} FormComponent={ExperienceForm} subTitle="Track your professional milestones and roles." />;
const ProjectsManager = () => <GenericManager title="Projects" endpoint="projects" icon={<HiCollection />} FormComponent={ProjectForm} subTitle="Showcase your best work with full case studies." />;
const SkillsManager = () => <GenericManager title="Skills" endpoint="skills" icon={<HiAcademicCap />} FormComponent={SkillForm} subTitle="Map your technical and core competencies." />;

const FreelanceManager = () => {
  return (
    <div className="space-y-12">
      <GenericManager 
        title="Freelance Services" 
        endpoint="freelance/services" 
        icon={<HiPlus />} 
        FormComponent={FreelanceServiceForm} 
        subTitle="Manage the service cards shown in your freelance section." 
      />
      
      <div className="pt-12 border-t border-white/5">
        <GenericManager 
          title="Work History" 
          endpoint="freelance/work" 
          icon={<HiBriefcase />} 
          FormComponent={FreelanceWorkForm} 
          subTitle="Showcase your past freelance projects and client success stories." 
        />
      </div>

      <div className="pt-12 border-t border-white/5">
        <GenericManager 
          title="Impact Stats" 
          endpoint="freelance/stats" 
          icon={<HiCheckCircle />} 
          FormComponent={FreelanceStatForm} 
          subTitle="Update your professional metrics (Projects, Clients, etc.)." 
        />
      </div>
    </div>
  );
};

const ContactManager = () => <GenericManager title="Contact Info" endpoint="contact" icon={<HiPhone />} FormComponent={ContactForm} subTitle="Update your contact details and social links." />;

// --- FREELANCE FORMS ---
const FreelanceServiceForm = ({ item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(item || { title: '', description: '', icon: 'FaLaptopCode', color: 'from-secondary to-blue-600', order: 0 });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = item && item.id;
    const res = await fetch(`${API_URL}/api/freelance/services/${isEdit ? item.id : ''}`, { 
      method: isEdit ? 'PUT' : 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(formData) 
    });
    if (res.ok) onSuccess(); else alert("Save failed.");
  };
  return (
    <ModalPortal title="Freelance Service" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Service Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
        <TextArea label="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Icon Name (FontAwesome)" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} placeholder="e.g. FaReact, FaCode" />
          <Input label="Gradient Color" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} placeholder="from-blue-500 to-cyan-500" />
        </div>
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={onClose} className="flex-1 py-4 bg-white/5 rounded-2xl font-bold">Cancel</button>
          <button type="submit" className="flex-[2] btn-primary py-4">Save Service</button>
        </div>
      </form>
    </ModalPortal>
  );
};

const FreelanceStatForm = ({ item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(item || { label: '', value: '', order: 0 });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = item && item.id;
    const res = await fetch(`${API_URL}/api/freelance/stats/${isEdit ? item.id : ''}`, { 
      method: isEdit ? 'PUT' : 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(formData) 
    });
    if (res.ok) onSuccess(); else alert("Save failed.");
  };
  return (
    <ModalPortal title="Impact Stat" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Label (e.g. Happy Clients)" value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} required />
        <Input label="Value (e.g. 15+)" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} required />
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={onClose} className="flex-1 py-4 bg-white/5 rounded-2xl font-bold">Cancel</button>
          <button type="submit" className="flex-[2] btn-primary py-4">Save Stat</button>
        </div>
      </form>
    </ModalPortal>
  );
};

const FreelanceWorkForm = ({ item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(item || { client_name: '', project_title: '', description: '', outcome: '', tech_used: '', link: '#', order: 0 });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = item && item.id;
    const payload = {
      ...formData,
      tech_used: Array.isArray(formData.tech_used) ? formData.tech_used : (formData.tech_used || '').split(',').map(s => s.trim()).filter(s => s)
    };
    const res = await fetch(`${API_URL}/api/freelance/work/${isEdit ? item.id : ''}`, { 
      method: isEdit ? 'PUT' : 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(payload) 
    });
    if (res.ok) onSuccess(); else alert("Save failed.");
  };
  return (
    <ModalPortal title="Work History Entry" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Client/Brand Name" value={formData.client_name} onChange={e => setFormData({...formData, client_name: e.target.value})} required />
          <Input label="Project Title" value={formData.project_title} onChange={e => setFormData({...formData, project_title: e.target.value})} required />
        </div>
        <TextArea label="Project Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
        <TextArea label="Outcome & Results" value={formData.outcome} onChange={e => setFormData({...formData, outcome: e.target.value})} required />
        <Input label="Tech Stack (Comma separated)" value={Array.isArray(formData.tech_used) ? formData.tech_used.join(', ') : formData.tech_used} onChange={e => setFormData({...formData, tech_used: e.target.value})} />
        <Input label="Project Link" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={onClose} className="flex-1 py-4 bg-white/5 rounded-2xl font-bold">Cancel</button>
          <button type="submit" className="flex-[2] btn-primary py-4">Save Work</button>
        </div>
      </form>
    </ModalPortal>
  );
};

// --- MODAL WRAPPER ---
const ModalPortal = ({ children, title, onClose }) => (
  <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-dark/95 backdrop-blur-xl" onClick={onClose} />
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 40 }} 
      animate={{ opacity: 1, scale: 1, y: 0 }} 
      exit={{ opacity: 0, scale: 0.9, y: 40 }} 
      className="relative w-full max-w-2xl bg-[#0a0f1a] border border-white/10 rounded-[40px] p-10 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
    >
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold font-serif-premium">{title}</h2>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all text-gray-500 hover:text-white"><HiX size={24} /></button>
      </div>
      {children}
    </motion.div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">{label}</label>
    <input {...props} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-secondary focus:bg-white/[0.06] transition-all text-white placeholder:text-gray-700" />
  </div>
);

const TextArea = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">{label}</label>
    <textarea {...props} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-secondary focus:bg-white/[0.06] transition-all text-white placeholder:text-gray-700 h-32 custom-scrollbar" />
  </div>
);

// --- FORMS ---
const HomeForm = ({ item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(item || fallbacks.home);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/home/`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    if (res.ok) onSuccess(); else alert("Save failed.");
  };
  return (
    <ModalPortal title="Edit Hero Identity" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Display Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <ImageUpload label="Profile Photo" value={formData.profile_photo_url} onChange={url => setFormData({...formData, profile_photo_url: url})} />
        </div>
        <Input label="Resume Link / URL" value={formData.resume_url || ''} onChange={e => setFormData({...formData, resume_url: e.target.value})} placeholder="Link to your resume file (e.g., Google Drive or /resume.pdf)" />
        <TextArea label="Objective Statement" value={formData.objective || ''} onChange={e => setFormData({...formData, objective: e.target.value})} required />
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={onClose} className="flex-1 py-4 bg-white/5 rounded-2xl font-bold hover:bg-white/10 transition-all border border-white/5">Cancel</button>
          <button type="submit" className="flex-[2] btn-primary py-4 shadow-lg shadow-secondary/20">Save All Changes</button>
        </div>
      </form>
    </ModalPortal>
  );
};

const AboutForm = ({ item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(item || fallbacks.about);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/about/`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    if (res.ok) onSuccess(); else alert("Save failed.");
  };
  return (
    <ModalPortal title="About Profile" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Years of Experience" value={formData.years_exp || ''} onChange={e => setFormData({...formData, years_exp: e.target.value})} placeholder="e.g. 5+" />
          <Input label="Projects Completed" value={formData.projects_count || ''} onChange={e => setFormData({...formData, projects_count: e.target.value})} placeholder="e.g. 50+" />
        </div>
        <TextArea label="Introduction (Hero Text)" value={formData.introduction || ''} onChange={e => setFormData({...formData, introduction: e.target.value})} required />
        <TextArea label="Professional Summary (Details)" value={formData.professional_summary || ''} onChange={e => setFormData({...formData, professional_summary: e.target.value})} required />
        
        <div className="space-y-4 border-t border-white/5 pt-6">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary">Why Hire Me Section (Cards)</label>
            <button 
              type="button" 
              onClick={() => setFormData({...formData, why_hire_me: [...(formData.why_hire_me || []), { title: '', description: '' }]})}
              className="text-[10px] font-bold uppercase bg-secondary/10 text-secondary px-3 py-1 rounded-full border border-secondary/20 hover:bg-secondary hover:text-white transition-all"
            >
              + Add Card
            </button>
          </div>
          
          <div className="space-y-4">
            {(formData.why_hire_me || []).map((reason, idx) => (
              <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3 relative group">
                <button 
                  type="button" 
                  onClick={() => {
                    const newList = [...formData.why_hire_me];
                    newList.splice(idx, 1);
                    setFormData({...formData, why_hire_me: newList});
                  }}
                  className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <HiX size={16} />
                </button>
                <Input 
                  label={`Card ${idx + 1} Title`} 
                  value={reason.title} 
                  onChange={e => {
                    const newList = [...formData.why_hire_me];
                    newList[idx].title = e.target.value;
                    setFormData({...formData, why_hire_me: newList});
                  }} 
                />
                <TextArea 
                  label={`Card ${idx + 1} Description`} 
                  value={reason.description} 
                  onChange={e => {
                    const newList = [...formData.why_hire_me];
                    newList[idx].description = e.target.value;
                    setFormData({...formData, why_hire_me: newList});
                  }} 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="button" onClick={onClose} className="flex-1 py-4 bg-white/5 rounded-2xl font-bold hover:bg-white/10 transition-all">Cancel</button>
          <button type="submit" className="flex-[2] btn-primary py-4">Save Profile</button>
        </div>
      </form>
    </ModalPortal>
  );
};

const EducationForm = ({ item, onClose, onSuccess }) => {
  const isFallback = item?.id?.toString().startsWith('fallback');
  const [formData, setFormData] = useState(item ? (isFallback ? { ...item, id: undefined } : item) : { institution: '', degree: '', start_date: '', end_date: '', cgpa: '', description: '', order: 0 });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = item && item.id && !isFallback;
    const res = await fetch(`${API_URL}/api/education/${isEdit ? item.id : ''}`, { 
      method: isEdit ? 'PUT' : 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(formData) 
    });
    if (res.ok) onSuccess(); else alert("Save failed.");
  };
  return (
    <ModalPortal title="Education Entry" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Institution" value={formData.institution || ''} onChange={e => setFormData({...formData, institution: e.target.value})} required />
        <Input label="Degree / Certification" value={formData.degree || ''} onChange={e => setFormData({...formData, degree: e.target.value})} required />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Start Date" value={formData.start_date || ''} onChange={e => setFormData({...formData, start_date: e.target.value})} />
          <Input label="End Date" value={formData.end_date || ''} onChange={e => setFormData({...formData, end_date: e.target.value})} />
        </div>
        <Input label="GPA / Score" value={formData.cgpa || ''} onChange={e => setFormData({...formData, cgpa: e.target.value})} />
        <TextArea label="Description / Achievements" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={onClose} className="flex-1 py-4 bg-white/5 rounded-2xl font-bold transition-all">Cancel</button>
          <button type="submit" className="flex-[2] btn-primary py-4">Save Record</button>
        </div>
      </form>
    </ModalPortal>
  );
};

const ExperienceForm = ({ item, onClose, onSuccess }) => {
  const isFallback = item?.id?.toString().startsWith('fallback');
  const [formData, setFormData] = useState(item ? (isFallback ? { ...item, id: undefined } : item) : { company: '', position: '', start_date: '', end_date: '', description: '', order: 0 });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = item && item.id && !isFallback;
    const res = await fetch(`${API_URL}/api/experience/${isEdit ? item.id : ''}`, { 
      method: isEdit ? 'PUT' : 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(formData) 
    });
    if (res.ok) onSuccess(); else alert("Save failed.");
  };
  return (
    <ModalPortal title="Experience Entry" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Company Name" value={formData.company || ''} onChange={e => setFormData({...formData, company: e.target.value})} required />
        <Input label="Job Title" value={formData.position || ''} onChange={e => setFormData({...formData, position: e.target.value})} required />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Start Date" value={formData.start_date || ''} onChange={e => setFormData({...formData, start_date: e.target.value})} />
          <Input label="End Date" value={formData.end_date || ''} onChange={e => setFormData({...formData, end_date: e.target.value})} />
        </div>
        <TextArea label="Responsibilities" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={onClose} className="flex-1 py-4 bg-white/5 rounded-2xl font-bold transition-all">Cancel</button>
          <button type="submit" className="flex-[2] btn-primary py-4">Save Entry</button>
        </div>
      </form>
    </ModalPortal>
  );
};

const SkillForm = ({ item, onClose, onSuccess }) => {
  const isFallback = item?.id?.toString().startsWith('fallback');
  const [formData, setFormData] = useState(item ? (isFallback ? { ...item, id: undefined } : item) : { name: '', category: 'Core Languages', proficiency: 80, order: 0 });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = item && item.id && !isFallback;
    const res = await fetch(`${API_URL}/api/skills/${isEdit ? item.id : ''}`, { 
      method: isEdit ? 'PUT' : 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(formData) 
    });
    if (res.ok) onSuccess(); else alert("Save failed.");
  };
  return (
    <ModalPortal title="Skill Configuration" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input label="Skill Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required />
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">Category</label>
          <select 
            value={formData.category} 
            onChange={e => setFormData({...formData, category: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-secondary transition-all outline-none appearance-none cursor-pointer"
          >
            {["Core Languages", "Frontend", "Backend", "AI", "Database", "Cloud", "Technical Skills", "Version Control"].map(cat => (
              <option key={cat} value={cat} className="bg-dark text-white">{cat}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Proficiency Level ({formData.proficiency}%)</label>
          <input type="range" className="w-full accent-secondary h-2 bg-white/5 rounded-full appearance-none" value={formData.proficiency} onChange={e => setFormData({...formData, proficiency: parseInt(e.target.value)})} min="0" max="100" />
        </div>
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={onClose} className="flex-1 py-4 bg-white/5 rounded-2xl font-bold transition-all">Cancel</button>
          <button type="submit" className="flex-[2] btn-primary py-4">Save Skill</button>
        </div>
      </form>
    </ModalPortal>
  );
};

const ProjectForm = ({ item, onClose, onSuccess }) => {
  const isFallback = item?.id?.toString().startsWith('fallback');
  const [formData, setFormData] = useState(item ? (isFallback ? { ...item, id: undefined } : item) : { 
    name: '', start_date: '', end_date: '', short_description: '', full_description: '', 
    tech_stack: [], screenshots: [], live_demo_url: '', github_url: '', order: 0 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = item && item.id && !isFallback;
    const payload = {
        ...formData,
        tech_stack: Array.isArray(formData.tech_stack) ? formData.tech_stack : (formData.tech_stack || '').split(',').map(s => s.trim()).filter(s => s),
        screenshots: Array.isArray(formData.screenshots) ? formData.screenshots : (formData.screenshots || '').split(',').map(s => s.trim()).filter(s => s)
    };
    const res = await fetch(`${API_URL}/api/projects/${isEdit ? item.id : ''}`, { 
      method: isEdit ? 'PUT' : 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(payload) 
    });
    if (res.ok) onSuccess(); else alert("Save failed.");
  };

  return (
    <ModalPortal title="Case Study Editor" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Project Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Start Date" value={formData.start_date || ''} onChange={e => setFormData({...formData, start_date: e.target.value})} />
          <Input label="End Date" value={formData.end_date || ''} onChange={e => setFormData({...formData, end_date: e.target.value})} />
        </div>
        <Input label="Tech Stack (Comma separated)" value={Array.isArray(formData.tech_stack) ? formData.tech_stack.join(', ') : formData.tech_stack} onChange={e => setFormData({...formData, tech_stack: e.target.value})} />
        <TextArea label="Short Description (Card text)" value={formData.short_description || ''} onChange={e => setFormData({...formData, short_description: e.target.value})} />
        <TextArea label="Full Case Study Description" value={formData.full_description || ''} onChange={e => setFormData({...formData, full_description: e.target.value})} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Live Demo URL" value={formData.live_demo_url || ''} onChange={e => setFormData({...formData, live_demo_url: e.target.value})} />
          <Input label="GitHub URL" value={formData.github_url || ''} onChange={e => setFormData({...formData, github_url: e.target.value})} />
        </div>
        <ImageUpload 
          label="Add Project Screenshot" 
          value="" 
          onChange={url => setFormData({
            ...formData, 
            screenshots: Array.isArray(formData.screenshots) ? [...formData.screenshots, url] : [url]
          })} 
        />
        <div className="text-[10px] text-gray-500 uppercase tracking-widest px-1">
          {Array.isArray(formData.screenshots) ? `${formData.screenshots.length} Screenshots uploaded` : "No screenshots"}
        </div>
        <Input label="Screenshots (Comma separated URLs)" value={Array.isArray(formData.screenshots) ? formData.screenshots.join(', ') : formData.screenshots} onChange={e => setFormData({...formData, screenshots: e.target.value})} />
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={onClose} className="flex-1 py-4 bg-white/5 rounded-2xl font-bold transition-all">Cancel</button>
          <button type="submit" className="flex-[2] btn-primary py-4">Publish Project</button>
        </div>
      </form>
    </ModalPortal>
  );
};

const ContactForm = ({ item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(item || fallbacks.contact);
  
  const getSocialUrl = (platform) => formData.social_media?.find(s => s.platform === platform)?.url || '';
  const setSocialUrl = (platform, url) => {
    const others = formData.social_media?.filter(s => s.platform !== platform) || [];
    setFormData({
      ...formData,
      social_media: [...others, { platform, url, active: true, order: others.length }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/contact/`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    if (res.ok) onSuccess(); else alert("Save failed.");
  };

  return (
    <ModalPortal title="Contact & Socials" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Primary Email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} required />
          <Input label="Phone Number" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} />
        </div>
        <Input label="Location" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} />
        
        <div className="pt-4 border-t border-white/5">
          <div className="flex justify-between items-center mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Social Media & Coding Profiles</p>
            <button 
              type="button" 
              onClick={() => setFormData({
                ...formData, 
                social_media: [...(formData.social_media || []), { platform: '', url: '', active: true, order: (formData.social_media || []).length }]
              })}
              className="text-[10px] font-bold uppercase bg-secondary/10 text-secondary px-3 py-1 rounded-full border border-secondary/20 hover:bg-secondary hover:text-white transition-all"
            >
              + Add Link
            </button>
          </div>
          
          <div className="space-y-4">
            {(formData.social_media || []).map((social, idx) => (
              <div key={idx} className="flex gap-3 items-end bg-white/5 p-4 rounded-2xl border border-white/5 relative group">
                <button 
                  type="button" 
                  onClick={() => {
                    const newList = [...formData.social_media];
                    newList.splice(idx, 1);
                    setFormData({...formData, social_media: newList});
                  }}
                  className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <HiX size={16} />
                </button>
                <div className="flex-1">
                  <Input 
                    label="Platform Name" 
                    placeholder="e.g. LeetCode, GitHub, LinkedIn" 
                    value={social.platform} 
                    onChange={e => {
                      const newList = [...formData.social_media];
                      newList[idx].platform = e.target.value;
                      setFormData({...formData, social_media: newList});
                    }} 
                  />
                </div>
                <div className="flex-[2]">
                  <Input 
                    label="Profile URL" 
                    placeholder="https://..." 
                    value={social.url} 
                    onChange={e => {
                      const newList = [...formData.social_media];
                      newList[idx].url = e.target.value;
                      setFormData({...formData, social_media: newList});
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="button" onClick={onClose} className="flex-1 py-4 bg-white/5 rounded-2xl font-bold transition-all">Cancel</button>
          <button type="submit" className="flex-[2] btn-primary py-4">Save All Changes</button>
        </div>
      </form>
    </ModalPortal>
  );
};

export default Dashboard;
