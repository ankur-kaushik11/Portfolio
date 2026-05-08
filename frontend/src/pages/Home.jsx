import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Education from '../components/sections/Education';
import Experience from '../components/sections/Experience';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Freelancing from '../components/sections/Freelancing';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <section id="about">
        <About />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="freelance">
        <Freelancing />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default Home;
