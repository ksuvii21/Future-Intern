import React from 'react';
import './App.css';

// Import assets (make sure these files exist in your assets folder)
import profileImage from './assets/profile.png';
import project1Image from './assets/project1.png';
import project2Image from './assets/project2.png';
// New Project Image Placeholders (Add these images to your assets folder)
import project3Image from './assets/project3.png'; 
import project4Image from './assets/project4.png';
import project5Image from './assets/project5.png';
import project6Image from './assets/project6.avif';

import FloatingLines from './components/FloatingLines';

const Header = () => (
  <header id="header">
    <div className="container"> 
      <nav>
        <a href="#home" className="logo">Kritika Gupta</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact">Contact</a></li>
          <li className="dropdown">
            <a href="#more" className="dropbtn">More</a>
            <ul className="dropdown-menu">
              <li><a href="#skills">Skills</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#certifications">Certifications</a></li>
            </ul>
          </li>
        </ul>
        <div className="hamburger">
          <i className="fas fa-bars"></i>
        </div>
      </nav>
    </div>
  </header>
);

const Hero = () => (
  <section id="home" className="hero">
    <FloatingLines />
    <div className="container">
      <div className="hero-content">
        <h1>I&apos;m Kritika Gupta, a <span>Full-Stack Developer</span></h1>
        <p>Passionate MERN stack developer building scalable applications and growing through hands-on experience in collaborative environments.</p>
        <div className="hero-btns">
          <a href="#projects" className="btn btn-primary">View My Projects</a>
          <a href="./resume.pdf" className="btn btn-outline" target="_blank" rel="noopener noreferrer">View Resume</a>
        </div>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="about">
    <div className="container">
      <div className="section-title">
        <h2>About Me</h2>
      </div>
      <div className="about-content">
        <div className="about-img">
          <img src={profileImage} alt="Kritika Gupta" />
        </div>
        <div className="about-text">
          <h3>MERN Stack Developer & Graphics Designer</h3>
          <p>I am a skilled and passionate full-stack web developer with expertise in the MERN stack (MongoDB, Express.js, React.js, Node.js). I have hands-on experience developing and maintaining web applications, creating responsive user interfaces, and assisting in backend development.</p>
          <p>I share my projects on GitHub, where I keep track of my progress and learning journey: <a href="https://github.com/ksuvii21" target="_blank" rel="noopener noreferrer">GitHub Profile</a>. Before starting my journey into web development, I worked on various small-scale technical projects and self-learning exercises, which helped me build a foundation in problem-solving, clean coding practices, and UI development.</p>
          <p>Currently, I&apos;m continuing to learn and create, aiming to take on projects that challenge my skills and help me grow into a well-rounded full-stack developer.</p>
        </div>
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" className="experience">
    <div className="container">
      <div className="section-title">
        <h2>Work Experience</h2>
      </div>
      <div className="experience-items">
        <div className="experience-item glass">
          <h4>Full Stack Web Development Intern</h4>
          <h5>Future Intens (Remote) | Nov 2025 - Dec 2025</h5>
          <ul>
            <li>Developed and maintained web applications using the MERN stack.</li>
            <li>Made responsive, user-friendly interfaces with React.js, HTML, and CSS.</li>
            <li>Participated in code reviews and agile development processes.</li>
            <li>Collaborated with team members to implement new features and fix bugs.</li>
            <li>Assisted in backend development with Node.js and MongoDB/MySQL.</li>
            </ul>
            <h3>Certificate: <a href="./assets/Future_Intens_Internship_Certificate.pdf" target="_blank" rel="noopener noreferrer">Future Intens</a></h3>
        </div>
        <div className="experience-item glass">
          <h4>Web Development Intern</h4>
          <h5>Zidio Development (Remote) | Aug 2025 - Oct 2025</h5>
          <ul>
            <li>Developed and maintained web applications using the MERN stack.</li>
            <li>Created responsive, user-friendly interfaces with React.js, HTML, and CSS.</li>
            <li>Assisted in backend development with Node.js and MongoDB/MySQL.</li>
            </ul>
            <h3>Certificate: <a href="./assets/Zidio_Development_Internship_Certificate.pdf" target="_blank" rel="noopener noreferrer">Zidio Development</a></h3>
        </div>
        <div className="experience-item glass">
          <h4>Software Development Intern</h4>
          <h5>Cognifyz Technologies (Remote) | Jun 2025 - Jul 2025</h5>
          <ul>
            <li>Built projects based on Frontend user interface, CRUD Operations in MySQL and MS-Excel with Python Flask and Pandas.</li>
            <li>Collaborated with team members to implement new features and fix bugs.</li>
            <li>Participated in code reviews and agile development processes.</li>
          </ul>
          <h2>Certificate: <a href="./assets/Cognifyz_Technologies_Internship_Certificate.pdf" target="_blank" rel="noopener noreferrer">Cognifyz Technologies</a></h2>
        </div>
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section id="projects" className="portfolio">
    <div className="container">
      <div className="section-title">
        <h2>Projects</h2>
        <p>A selection of my work</p>
      </div>
      <div className="portfolio-grid">
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
        
        {/* Project 3: Sharvan Vision (New) */}
        <div className="portfolio-item glass">
          <img src={project3Image} alt="Sharvan Vision - AI Sign Language Translator" className="portfolio-img" />
          <div className="portfolio-content">
            <h3>Sharvan Vision - AI Sign Language Translator</h3>
            <p>An AI-powered Indian Sign Language (ISL) translation application using real-time gesture recognition (MediaPipe & OpenCV) to bridge communication gaps. Built with Flutter, TensorFlow Lite, and Firebase.</p>
            <a href="https://sharvan-vision.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Check it out</a>
          </div>
        </div>

        {/* Project 4: CareerFlow.io (New) */}
        <div className="portfolio-item glass">
          <img src={project4Image} alt="CareerFlow.io - AI Resume & Career Ecosystem" className="portfolio-img" />
          <div className="portfolio-content">
            <h3>CareerFlow.io - AI Resume & Career Ecosystem</h3>
            <p>A full-stack MERN application with a dynamic resume builder, an AI Career Assistant (for ATS summaries, comparisons, and cover letters), and a visual Job Application Tracker.</p>
            <a href="https://careerflowio.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Check it out</a>
          </div>
        </div>
        
        {/* Project 5: Fansee Rebel (New) */}
        <div className="portfolio-item glass">
          <img src={project5Image} alt="Fansee Rebel - E-Commerce Website" className="portfolio-img" />
          <div className="portfolio-content">
            <h3>Fansee Rebel - E-Commerce Website</h3>
            <p>A stylish e-commerce platform showcasing western dresses, jewelry, and accessories. Features responsive design, secure payments (placeholder), and a modern user interface.</p>
            <a href="https://fanseerebel.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Check it out</a>
          </div>
        </div>

        {/* Project 6: ERP Management System (New) */}
        <div className="portfolio-item glass">
          <img src={project6Image} alt="ERP Management System (MERN Stack)" className="portfolio-img" />
          <div className="portfolio-content">
            <h3>ERP Management System (MERN Stack)</h3>
            <p>A full-featured ERP web application to manage core business operations: Products, Customers, Suppliers, Sales/Purchase Orders, Invoices, and secure role-based access control (JWT).</p>
            <a href="#projects" className="btn btn-outline">View Details (No Live Demo)</a>
          </div>
        </div>
        
      </div>
    </div>
  </section>
);

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

const Education = () => {
  const educationItems = [
    { degree: "Bachelor of Science in Computer Science", institution: "XYZ University", year: "2021" },
    { degree: "Full Stack Web Development Bootcamp", institution: "ABC Academy", year: "2022" }
  ];

  return (
    <section id="education" className="education">
      <div className="container">
        <div className="section-title">
          <h2>Education</h2>
        </div>
        {educationItems.map((edu, index) => (
          <div key={index} className="education-item glass">
            <h4>{edu.degree}</h4>
            <h5>{edu.institution} | {edu.year}</h5>
          </div>
        ))}
      </div>
    </section>
  );
};

const Certifications = () => {
  const certifications = [
    { title: "Certified React Developer", issuer: "React Certification Authority", year: "2023" },
    { title: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2024" }
  ];

  return (
    <section id="certifications" className="certifications">
      <div className="container">
        <div className="section-title">
          <h2>Certifications</h2>
        </div>
        {certifications.map((cert, index) => (
          <div key={index} className="certification-item glass">
            <h4>{cert.title}</h4>
            <h5>{cert.issuer} | {cert.year}</h5>
          </div>
        ))}
      </div>
    </section>
  );
};

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
  React.useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => {
      const header = document.getElementById('header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    // Smooth scrolling for anchor links
    const smoothScroll = (e) => {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // Mobile menu toggle
    const handleHamburgerClick = () => {
      const navLinks = document.querySelector('.nav-links');
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    };

    window.addEventListener('scroll', handleScroll);
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', smoothScroll);
    });

    document.querySelector('.hamburger').addEventListener('click', handleHamburgerClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', smoothScroll);
      });
      document.querySelector('.hamburger').removeEventListener('click', handleHamburgerClick);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;