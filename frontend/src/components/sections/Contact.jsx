import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks, SiCodechef, SiCodeforces } from 'react-icons/si';
import { HiEnvelope } from 'react-icons/hi2';

const Contact = () => {
  const [contact, setContact] = React.useState({
    email: "",
    phone: "",
    location: "",
    social_media: []
  });

  React.useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/`);
        const data = await response.json();
        if (data) setContact(data);
      } catch (e) { console.error(e); }
    };
    fetchContact();
    const handleSync = (e) => { if (e.key === 'portfolio_update') fetchContact(); };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  const getIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes('linkedin')) return <FaLinkedin />;
    if (p.includes('github')) return <FaGithub />;
    if (p.includes('instagram')) return <FaInstagram />;
    if (p.includes('whatsapp')) return <FaWhatsapp />;
    if (p.includes('leetcode')) return <SiLeetcode />;
    if (p.includes('geeksforgeeks') || p.includes('gfg')) return <SiGeeksforgeeks />;
    if (p.includes('codechef')) return <SiCodechef />;
    if (p.includes('codeforces')) return <SiCodeforces />;
    return <HiEnvelope />;
  };

  const getColor = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes('linkedin')) return "hover:text-[#0077b5]";
    if (p.includes('github')) return "hover:text-[#333]";
    if (p.includes('instagram')) return "hover:text-[#e4405f]";
    if (p.includes('whatsapp')) return "hover:text-[#25d366]";
    if (p.includes('leetcode')) return "hover:text-[#FFA116]";
    if (p.includes('geeksforgeeks') || p.includes('gfg')) return "hover:text-[#2F8D46]";
    return "hover:text-secondary";
  };

  const socialLinks = (contact.social_media || []).map(s => ({
    name: s.platform,
    icon: getIcon(s.platform),
    color: getColor(s.platform),
    url: s.url
  }));

  if (contact.email) {
    socialLinks.push({ name: "Email", icon: <FaEnvelope />, color: "hover:text-secondary", url: `mailto:${contact.email}` });
  }

  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Failed to connect to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-primary/20" id="contact">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold font-outfit mb-8">Let's <span className="text-secondary">Connect</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-16">
          I'm always open to new opportunities, collaborations, or just a friendly chat about technology. Feel free to reach out through any of these platforms!
        </p>

        <div className="flex flex-wrap justify-center gap-8 mb-24">
          {socialLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -10, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`text-4xl text-gray-500 transition-colors p-6 glass-card rounded-3xl ${link.color} group relative`}
            >
              <span className="relative z-10">{link.icon}</span>
              <div className="absolute inset-0 bg-secondary/5 rounded-3xl scale-0 group-hover:scale-100 transition-transform blur-xl" />
            </motion.a>
          ))}
        </div>

        <div className="max-w-4xl mx-auto glass-card p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent-purple" />
          <h3 className="text-2xl font-bold font-outfit mb-8">Send me a message</h3>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-2">
              <label className="text-sm text-gray-500 ml-2">Name</label>
              <input 
                type="text" required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-secondary transition-colors" 
                placeholder="Your Name" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500 ml-2">Email</label>
              <input 
                type="email" required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-secondary transition-colors" 
                placeholder="Your Email" 
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm text-gray-500 ml-2">Message</label>
              <textarea 
                rows="5" required
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-secondary transition-colors resize-none" 
                placeholder="Your Message"
              ></textarea>
            </div>
            <div className="md:col-span-2 text-center mt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full md:w-auto disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
