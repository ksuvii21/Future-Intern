import React from 'react';
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import Squares from './components/Squares';

const Hero = ({ onLinkClick }) => (
    <section id="home" className="premium-hero">

      <div className="premium-hero-bg">
  <Squares />
</div>

      {/* GLOW EFFECTS */}
      <div className="premium-hero-glow blue" />
      <div className="premium-hero-glow purple" />

      {/* MAIN CONTAINER */}
      <div className="premium-hero-container">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="premium-hero-left"
        >

          {/* SMALL BADGE */}
          <div className="premium-hero-badge-small">
            Full Stack Developer • MERN Specialist
          </div>

          {/* MAIN HEADING */}
          <h1 className="premium-hero-heading">
            Crafting
            <span className="premium-hero-gradient-text">
              Exceptional
            </span>
            Digital Experiences
          </h1>

          {/* SUBTEXT */}
          <p className="premium-hero-subtext">
            I design and develop scalable full stack applications with
            modern technologies, performance-focused architecture,
            and beautiful user experiences.
          </p>

          {/* BUTTONS */}
          <div className="premium-hero-buttons">
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
          </div>

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

          {/* CODE CARD */}
          <div className="premium-hero-code-card">

            <div className="code-card-header">
              <div className="code-card-dot red"/>
              <div className="code-card-dot yellow"/>
              <div className="code-card-dot green"/>
            </div>

            <pre>
{`const Kritika = {
  role: "Full Stack Developer",
  stack: ["React", "Node", "MongoDB", "Express", "Rest APIs"],
  focus: "Scalable Web Apps",
  passion: "Building impactful products",
  projects: ["Sharvan Vision", "CareerFlow.io", "E-Commerce Platform (Fansee Rebel)", "Excel Analytics", "Writely Log"],
  achievements: ["Smart India Hackathon(SIH) Internal- First RunnerUp", "8 Deployed Projects", "13 Certifications"],
};`}
            </pre>

          </div>

        </motion.div>

      </div>

    </section>
);

Hero.propTypes = {
  onLinkClick: PropTypes.func.isRequired
};

export default Hero;