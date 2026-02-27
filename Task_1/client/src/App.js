import React, { useState, useEffect } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"; 
import Certifications from './components/Certifications';

// Import assets
// import profileImage from './assets/profile.png';
import project1Image from './assets/project1.png';
import project2Image from './assets/project2.png';
import project3Image from './assets/project3.png'; 
import project4Image from './assets/project4.png';
import project5Image from './assets/project5.png';
import project6Image from './assets/project6.avif';

//import FloatingLines from './components/FloatingLines';
// Temporarily disabled due to build issues - using simple spinner instead
// import Hyperspeed from './components/Hyperspeed';
// import { hyperspeedPresets } from './components/HyperSpeedPresets';
import Hero from './Hero';
import Squares from './components/Squares';
import About from './About';

const Header = ({ isMenuOpen, onHamburgerClick, onLinkClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="header" className={isScrolled ? 'scrolled' : ''}>
      <div className="container">
        <nav>
          <a href="#home" className="logo" onClick={onLinkClick}>Kritika Gupta</a>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#about" onClick={onLinkClick}>About</a></li>
            <li><a href="#projects" onClick={onLinkClick}>Projects</a></li>
            <li><a href="#experience" onClick={onLinkClick}>Experience</a></li>
            <li><a href="#contact" onClick={onLinkClick}>Contact</a></li>
            <li className="dropdown">
              <a href="#more" className="dropbtn" onClick={(e) => e.preventDefault()}>More</a>
              <ul className="dropdown-menu">
                <li><a href="#skills" onClick={onLinkClick}>Skills</a></li>
                <li><a href="#education" onClick={onLinkClick}>Education</a></li>
                <li><a href="#certifications" onClick={onLinkClick}>Certifications</a></li>
              </ul>
            </li>
          </ul>
          <div className="hamburger" onClick={onHamburgerClick}>
            <i className="fas fa-bars"></i>
          </div>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  onHamburgerClick: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired
};

// Section Divider Component
const SectionDivider = () => (
  <div className="section-divider" />
);

// Premium About Section
// const About = () => {
//   const [ref, isVisible] = useScrollReveal();
  
//   return (
//     <section id="about" className="about premium-section">
//       {/* Blur Orbs */}
//       <div className="premium-blur-orb blue" style={{ width: '400px', height: '400px', top: '10%', left: '-10%' }} />
//       <div className="premium-blur-orb purple" style={{ width: '300px', height: '300px', bottom: '10%', right: '-5%' }} />
      
//       <div className="container premium-section-content" ref={ref}>
//         <motion.div 
//           className="section-title"
//           initial={{ opacity: 0, y: 30 }}
//           animate={isVisible ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="gradient-text">About Me</h2>
//         </motion.div>
//         <div className="about-content">
//           <motion.div 
//             className="about-img"
//             initial={{ opacity: 0, x: -50 }}
//             animate={isVisible ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <img src={profileImage} alt="Kritika Gupta" />
//           </motion.div>
//           <motion.div 
//             className="about-text"
//             initial={{ opacity: 0, x: 50 }}
//             animate={isVisible ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.3 }}
//           >
//             <h3 className="gradient-text">MERN Stack Developer & Graphics Designer</h3>
//             <p>I am a skilled and passionate full-stack web developer with expertise in the MERN stack (MongoDB, Express.js, React.js, Node.js). I have hands-on experience developing and maintaining web applications, creating responsive user interfaces, and assisting in backend development.</p>
//             <p>I share my projects on GitHub, where I keep track of my progress and learning journey: <a href="https://github.com/ksuvii21" target="_blank" rel="noopener noreferrer">GitHub Profile</a>. Before starting my journey into web development, I worked on various small-scale technical projects and self-learning exercises, which helped me build a foundation in problem-solving, clean coding practices, and UI development.</p>
//             <p>Currently, I&apos;m continuing to learn and create, aiming to take on projects that challenge my skills and help me grow into a well-rounded full-stack developer.</p>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

const Skills = () => {
  const skillLogosData = [
    { name: "C", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "C++", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Java", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "JavaScript", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Python", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "TypeScript", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Vue.js", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
    { name: "React", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Angular.js", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
    { name: "Bootstrap", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { name: "TailwindCSS", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Node.js", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express.js", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "GraphQL", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
    { name: "OpenCV", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
    { name: "Pandas", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "TensorFlow", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "Turtle", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Flask", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
    { name: "MongoDB", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "MySQL", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "SQL", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Chart.js", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chartjs/chartjs-original.svg" },
    { name: "Three.js", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
    { name: "Firebase", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "Figma", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Postman", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
    { name: "Linux", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Git", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "HTML5", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", badge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" }
  ];

  // Split data into two halves
  const halfIndex = Math.ceil(skillLogosData.length / 2);
  const firstHalf = skillLogosData.slice(0, halfIndex);
  const secondHalf = skillLogosData.slice(halfIndex);

  // Function to create logo elements with unique key using an offset
  const createLogos = (data, offset=0) => data.map((skill, index) => {
    // Check if the logo needs a white background fix
    const requiresBackground = ["Flask", "Express.js", "Three.js"].includes(skill.name);

    return (
      <img
        key={`${skill.name}-${index + offset}`}
        src={skill.badge}
        alt={skill.name}
        title={skill.name}
        // Conditionally apply the fix class
        className={`skill-logo ${requiresBackground ? 'black-icon-fix' : ''}`} 
      />
    );
  });

  // Create the looping content (Duplicated three times for robust infinite effect) with unique keys
  const firstLineContent = [
    ...createLogos(firstHalf, 0),
    ...createLogos(firstHalf, firstHalf.length),
    ...createLogos(firstHalf, firstHalf.length * 2)
  ];
  const secondLineContent = [
    ...createLogos(secondHalf, 0),
    ...createLogos(secondHalf, secondHalf.length),
    ...createLogos(secondHalf, secondHalf.length * 2)
  ];


  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-title">
          <h2>Skills</h2>
        </div>
        
        <div className="logo-loop-container">
          {/* First Line: Scrolls Left */}
          <div className="logo-line logo-line-1">
            {firstLineContent}
          </div>

          {/* Second Line: Scrolls Right */}
          <div className="logo-line logo-line-2">
            {secondLineContent}
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => (
  <section id="projects" className="portfolio">
    <div className="container">
      <div className="section-title">
        <h2>Projects</h2>
        <p>A selection of my work</p>
      </div>
      <div className="portfolio-grid">
        
        {/* Project 3: Sharvan Vision */}
        <div className="portfolio-item glass">
          <img src={project3Image} alt="Sharvan Vision - AI Sign Language Translator" className="portfolio-img" />
          <div className="portfolio-content">
            <h3>Sharvan Vision - AI Sign Language Translator</h3>
            <p>An AI-powered Indian Sign Language (ISL) translation application using real-time gesture recognition (MediaPipe & OpenCV) to bridge communication gaps. Built with Flutter, TensorFlow Lite, and Firebase.</p>
            <a href="https://sharvan-vision.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Check it out</a>
          </div>
        </div>

        {/* Project 4: CareerFlow.io*/}
        <div className="portfolio-item glass">
          <img src={project4Image} alt="CareerFlow.io - AI Resume & Career Ecosystem" className="portfolio-img" />
          <div className="portfolio-content">
            <h3>CareerFlow.io - AI Resume & Career Ecosystem</h3>
            <p>A full-stack MERN application with a dynamic resume builder, an AI Career Assistant (for ATS summaries, comparisons, and cover letters), and a visual Job Application Tracker.</p>
            <a href="https://careerflowio.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Check it out</a>
          </div>
        </div>
        
        {/* Project 5: Fansee Rebel */}
        <div className="portfolio-item glass">
          <img src={project5Image} alt="Fansee Rebel - E-Commerce Website" className="portfolio-img" />
          <div className="portfolio-content">
            <h3>Fansee Rebel - E-Commerce Website</h3>
            <p>A stylish e-commerce platform showcasing western dresses, jewelry, and accessories. Features responsive design, secure payments (placeholder), and a modern user interface.</p>
            <a href="https://fanseerebel.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Check it out</a>
          </div>
        </div>

        {/* Project 6: ERP Management System */}
        <div className="portfolio-item glass">
          <img src={project6Image} alt="ERP Management System (MERN Stack)" className="portfolio-img" />
          <div className="portfolio-content">
            <h3>ERP Management System (MERN Stack)</h3>
            <p>A full-featured ERP web application to manage core business operations: Products, Customers, Suppliers, Sales/Purchase Orders, Invoices, and secure role-based access control (JWT).</p>
            <a href="#projects" className="btn btn-outline">View Details (No Live Demo)</a>
          </div>
        </div>
        {/* Project 1: MERN Stack Excel Analytics Platform (Existing) */}
        <div className="portfolio-item glass">
          <img src={project1Image} alt="MERN Stack Excel Analytics Platform" className="portfolio-img" />
          <div className="portfolio-content">
            <h3>MERN Stack Excel Analytics Platform</h3>
            <p>An analytics platform to upload Excel files, analyze data, and generate interactive 2D/3D charts. Features user authentication with JWT, a dynamic UI, and chart downloads.</p>
            <a href="https://xlsx-analytics21.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Check it out</a>
          </div>
        </div>
        
        {/* Project 2: MERN Stack Blogging Platform (Existing) */}
        <div className="portfolio-item glass">
          <img src={project2Image} alt="MERN Stack Blogging Platform" className="portfolio-img" />
          <div className="portfolio-content">
            <h3>MERN Stack Blogging Platform</h3>
            <p>A full-stack blogging app where users can create, edit, and delete blogs. Includes a rich text editor, comments, likes, user authentication, and an admin dashboard for post management.</p>
            <a href="https://writely-log.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Check it out</a>
          </div>
        </div>
        
      </div>
    </div>
  </section>
);

const experiences = [
  {
    role: "Full Stack Web Development Intern",
    company: "Future Intens",
    duration: "Nov 2025 - Dec 2025",
    mode: "Remote",
    type: "Internship",
    logo: require("./assets/futureinterns_logo.jpeg"),
    technologies: ["React.js", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    achievements: [
      "Developed and maintained MERN-stack web applications",
      "Built responsive and user-friendly UI with React.js",
      "Participated in code reviews & agile processes",
      "Implemented backend APIs using Node.js & MongoDB"
    ],
    certificate: require("./assets/Future_Intens_Internship_Certificate.pdf")
  },
  {
    role: "Web Development Intern",
    company: "Zidio Development",
    duration: "Aug 2025 - Oct 2025",
    mode: "Remote",
    type: "Internship",
    logo: require("./assets/zidio_logo.png"),
    technologies: ["React.js", "HTML", "CSS", "Node.js", "MongoDB"],
    achievements: [
      "Developed and maintained web applications",
      "Created responsive UI with React.js, HTML & CSS",
      "Assisted in backend development"
    ],
    certificate: require("./assets/Zidio_Development_Internship_Certificate.pdf")
  },
  {
    role: "Software Development Intern",
    company: "Cognifyz Technologies",
    duration: "Jun 2025 - Jul 2025",
    mode: "Remote",
    type: "Internship",
    logo: require("./assets/cognifyz_logo.webp"),
    technologies: ["Flask", "Python", "MySQL", "Pandas", "Frontend UI"],
    achievements: [
      "Built projects using Python Flask & CRUD operations",
      "Worked with Pandas & MS-Excel tools",
      "Collaborated in feature development and code reviews"
    ],
    certificate: require("./assets/Cognifyz_Technologies_Internship_Certificate.pdf")
  }
];

const Experience = () => (
  <section id="experience" className="experience-section">
    <div className="container">
      <motion.div 
        className="premium-section-title"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <h2>Experience</h2>
        <p>
          Professional journey building real-world skills and contributing to innovative projects
        </p>
      </motion.div>

      <div className="experience-grid">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className="exp-card premium-glass"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
          >
            {/* Glow Orb */}
            <div className="exp-card-glow" />
            
            <img src={exp.logo} className="exp-company-logo" alt="logo" />

            <h3>{exp.role}</h3>
            <p className="exp-company-name">{exp.company}</p>

            <div className="exp-badges">
              <span className="exp-badge">{exp.duration}</span>
              <span className="exp-badge">{exp.mode}</span>
              <span className="exp-badge exp-badge-purple">{exp.type}</span>
            </div>

            <div className="exp-content-divider" />

            <h5 className="exp-sub-heading">Technologies</h5>
            <div className="exp-tech-list">
              {exp.technologies.map((tech, i) => (
                <span key={i} className="exp-tech-item">{tech}</span>
              ))}
            </div>

            <h5 className="exp-sub-heading" style={{marginTop: '24px'}}>Key Achievements</h5>
            <ul className="exp-achievement-list">
              {exp.achievements.map((ach, i) => (
                <li key={i}>{ach}</li>
              ))}
            </ul>

            <div className="exp-certificate-link">
              <a href={exp.certificate} target="_blank" rel="noopener noreferrer">View Certificate →</a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const educationData = [
  {
    institute: "Microtek College of Management & Technology",
    degree: "Bachelor of Computer Applications (BCA)",
    field: "Computer Science",
    duration: "2024 - 2027",
    location: "Varanasi, India",
    score: "8.7 CGPA",
    specialization: ["Programming", "Web Development", "Software Engineering"],
    achievements: [
      "Built strong foundation in computer science",
      "Developed multiple tech projects",
      "Active participation in coding competitions"
    ]
  },
  {
    institute: "Jeevan Jyoti Higher Secondary School, Varanasi",
    degree: "Senior Secondary (XII), CBSE",
    field: "Science",
    duration: "2024",
    location: "Varanasi, India",
    score: "84.40%",
    specialization: ["Physics", "Chemistry", "Mathematics"],
    achievements: [
      "Excelled in science subjects",
      "Strong analytical and logical reasoning",
      "Participated in science exhibitions"
    ]
  }
];

const Education = () => {
  return (
    <section id="education" className="education-section">
      <div className="container">
        <motion.div 
          className="premium-section-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2>Education</h2>
          <p>Academic qualifications and journey of continuous learning</p>
        </motion.div>

        <div className="education-grid">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              className="edu-card premium-glass"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
            >
              {/* Glow Orb */}
              <div className="edu-card-glow" />

              <div className="edu-score-badge">{edu.score}</div>

              <div className="edu-icon">
                <FaGraduationCap size={32} />
              </div>
              
              <span className="edu-badge">{edu.institute}</span>

              <h3>{edu.degree}</h3>
              <h4 className="edu-field">{edu.field}</h4>

              <div className="edu-info">
                <span><FaCalendarAlt /> {edu.duration}</span>
                <span><FaMapMarkerAlt /> {edu.location}</span>
              </div>

              <div className="edu-content-divider" />

              <h5>Specialization:</h5>
              <p className="edu-specialization">{edu.specialization.join(", ")}</p>

              <h5 style={{marginTop: '24px'}}>Key Achievements:</h5>
              <ul className="edu-list">
                {edu.achievements.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="contact">
    <div className="container">
      <div className="section-title">
        <h2>Contact</h2>
      </div>
      <div className="contact-container">
        <div className="contact-info glass">
          <div className="contact-details">
            <h3>Get in Touch</h3>
            <p><i className="fas fa-envelope"></i> <a href="mailto:k21ritikasuvi2106@gmail.com">k21ritikasuvi2106@gmail.com</a></p>
            <p><i className="fab fa-linkedin"></i> <a href="https://www.linkedin.com/in/kritika-gupta2106" target="_blank" rel="noopener noreferrer">in/kritika-gupta2106</a></p>
            <p><i className="fab fa-github"></i> <a href="https://github.com/ksuvii21" target="_blank" rel="noopener noreferrer">github.com/ksuvii21</a></p>
            <p><i className="cib-leetcode"></i> <a href="https://leetcode.com/u/KrSUVII/" target="_blank" rel="noopener noreferrer">leetcode.com/u/KrSUVII</a></p>
            <p><i className="fas fa-map-marker-alt"></i> Remote / On-site Opportunities</p>
          </div>
        </div>
        <div className="contact-form glass">
          <form onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
            <div className="form-group">
              <input type="text" name="name" placeholder="Your Name" className="form-control" required />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Your Email" className="form-control" required />
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Your Message" className="form-control" rows="4" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>
);


const Footer = () => (
  <footer>
    <div className="container">
      <div className="footer-content">
        <div className="footer-logo">Kritika Gupta</div>
        <div className="footer-social">
          <a href="https://www.linkedin.com/in/kritika-gupta2106" className="social-link" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://github.com/ksuvii21" className="social-link" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="mailto:k21ritikasuvi2106@gmail.com" className="social-link">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
      <div className="copyright">
        <p>© 2025 Kritika Gupta. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  
  const handleHamburgerClick = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const handleLinkClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // Close menu on link click for mobile
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="website-background">
        <Squares />
      </div>
      <Header 
        isMenuOpen={isMenuOpen}
        onHamburgerClick={handleHamburgerClick}
        onLinkClick={handleLinkClick}
      />
      <main>
        <Hero onLinkClick={handleLinkClick} />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Certifications />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
