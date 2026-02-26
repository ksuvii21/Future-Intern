import React, { useRef } from 'react';
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { TypeAnimation } from 'react-type-animation';
import Squares from './components/Squares';

const Hero = ({ onLinkClick }) => {
  const cardRef = useRef(null);

  // Parallax effect for code card
  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const x = (e.clientX - window.innerWidth / 2) / 50;
    const y = (e.clientY - window.innerHeight / 2) / 50;
    cardRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleCardMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'translate(0px, 0px)';
  };

  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section id="home" className="premium-hero">

      <div className="premium-hero-bg">
        <Squares />
      </div>

      {/* MAIN CONTAINER */}
      <div className="premium-hero-container">

        {/* LEFT SIDE */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="premium-hero-left"
        >

          {/* SMALL BADGE */}
          <motion.div variants={itemVariants} className="premium-hero-badge-small">
            Full Stack Developer • MERN Specialist
          </motion.div>

          {/* MAIN HEADING */}
          <motion.h1 variants={itemVariants} className="premium-hero-heading">
            Full Stack Developer
            <span className="premium-hero-gradient-text">
              Building Scalable
            </span>
            Web Applications
          </motion.h1>

          {/* SUBTEXT */}
          <motion.p variants={itemVariants} className="premium-hero-subtext">
            I design and develop scalable full stack applications with
            modern technologies, performance-focused architecture,
            and beautiful user experiences.
          </motion.p>

          {/* BUTTONS */}
          <motion.div variants={itemVariants} className="premium-hero-buttons">
            <a href="#projects" onClick={onLinkClick}>
                <button className="btn-premium-primary">
                View Projects
                </button>
            </a>
            <a href="#contact" onClick={onLinkClick}>
                <button className="btn-premium-secondary">
                Contact Me
                </button>
            </a>
          </motion.div>

          {/* TRUST INDICATORS */}
          <motion.div variants={itemVariants} className="premium-hero-trust">
            <span>13 Certifications</span>
            <span>•</span>
            <span>8 Projects</span>
            <span>•</span>
            <span>Full Stack MERN</span>
          </motion.div>

        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="premium-hero-right"
        >

          {/* FLOATING BADGES */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="premium-hero-badge-floating react"
          >
            React
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="premium-hero-badge-floating node"
          >
            Node.js
          </motion.div>

          {/* CODE CARD WITH PARALLAX */}
          <div 
            className="premium-hero-code-card"
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >

            <div className="code-card-header">
              <div className="code-card-dot red"/>
              <div className="code-card-dot yellow"/>
              <div className="code-card-dot green"/>
            </div>

            <pre>
              <TypeAnimation
                sequence={[
                  `const Kritika = {`,
                  1000,
                  `const Kritika = {\n  role: "Full Stack Developer",`,
                  1000,
                  `const Kritika = {\n  role: "Full Stack Developer",\n  stack: ["React", "Node", "MongoDB"],`,
                  1000,
                  `const Kritika = {\n  role: "Full Stack Developer",\n  stack: ["React", "Node", "MongoDB", "Express"],`,
                  1000,
                  `const Kritika = {\n  role: "Full Stack Developer",\n  stack: ["React", "Node", "MongoDB", "Express", "Rest APIs"],\n  focus: "Scalable Web Apps",`,
                  1000,
                  `const Kritika = {\n  role: "Full Stack Developer",\n  stack: ["React", "Node", "MongoDB", "Express", "Rest APIs"],\n  focus: "Scalable Web Apps",\n  passion: "Building impactful products",\n  projects: ["Sharvan Vision", "CareerFlow.io", "Fansee Rebel"],\n  achievements: ["SIH First RunnerUp", "8 Deployed Projects", "13 Certifications"],\n};`,
                ]}
                speed={50}
                repeat={Infinity}
                style={{ fontFamily: "'Fira Code', 'Courier New', monospace", fontSize: '0.875rem', color: '#94a3b8', textAlign: 'left', whiteSpace: 'pre-wrap' }}
              />
            </pre>

          </div>

        </motion.div>

      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </motion.div>

    </section>
  );
};

Hero.propTypes = {
  onLinkClick: PropTypes.func.isRequired
};

export default Hero;
