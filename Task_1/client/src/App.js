import React from 'react';
import './App.css';

// Import assets (make sure these files exist in your assets folder)
import profileImage from './assets/profile.png';
import project1Image from './assets/project1.png';
import project2Image from './assets/project2.png';

import FloatingLines from './components/FloatingLines';
import ScrollVelocity from './components/ScrollVelocity';
import LogoLoop from './components/LogoLoop';

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
          <h4>Web Development Intern</h4>
          <h5>Zidio Development (Remote) | Aug 2025 - Oct 2025</h5>
          <ul>
            <li>Developed and maintained web applications using the MERN stack.</li>
            <li>Created responsive, user-friendly interfaces with React.js, HTML, and CSS.</li>
            <li>Assisted in backend development with Node.js and MongoDB/MySQL.</li>
          </ul>
        </div>
        <div className="experience-item glass">
          <h4>Software Development Intern</h4>
          <h5>Cognifyz Technologies (Remote) | Jun 2025 - Jul 2025</h5>
          <ul>
            <li>Built projects based on Frontend user interface, CRUD Operations in MySQL and MS-Excel with Python Flask and Pandas.</li>
            <li>Collaborated with team members to implement new features and fix bugs.</li>
            <li>Participated in code reviews and agile development processes.</li>
          </ul>
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
        <div className="portfolio-item glass">
          <img src={project1Image} alt="MERN Stack Excel Analytics Platform" className="portfolio-img" />
          <div className="portfolio-content">
            <h3>MERN Stack Excel Analytics Platform</h3>
            <p>An analytics platform to upload Excel files, analyze data, and generate interactive 2D/3D charts. Features user authentication with JWT, a dynamic UI, and chart downloads.</p>
            <a href="https://xlsx-analytics21.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Check it out</a>
          </div>
        </div>
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

const Contact = () => (
  <section id="contact" className="contact">
    <div className="container">
      <div className="section-title">
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
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
  const skillLogos = [
    { node: <svg width="40" height="40" viewBox="0 0 24 24" key="js"><circle cx="12" cy="12" r="10" fill="#F0DB4F" /><text x="12" y="16" fontSize="12" fontWeight="bold" fill="#000" textAnchor="middle">JS</text></svg>, title: 'JavaScript' },
    { node: <svg width="40" height="40" viewBox="0 0 24 24" key="react"><rect width="24" height="24" fill="#61DBFB" /><text x="12" y="16" fontSize="12" fontWeight="bold" fill="#000" textAnchor="middle">R</text></svg>, title: 'React' },
    { node: <svg width="40" height="40" viewBox="0 0 24 24" key="node"><rect width="24" height="24" fill="#68A063" /><text x="12" y="16" fontSize="12" fontWeight="bold" fill="#FFF" textAnchor="middle">N</text></svg>, title: 'Node.js' },
    { node: <svg width="40" height="40" viewBox="0 0 24 24" key="express"><rect width="24" height="24" fill="#4DB33D" /><text x="12" y="16" fontSize="12" fontWeight="bold" fill="#FFF" textAnchor="middle">Ex</text></svg>, title: 'Express' },
    { node: <svg width="40" height="40" viewBox="0 0 24 24" key="mongodb"><rect width="24" height="24" fill="#4DB33D" /><text x="12" y="16" fontSize="12" fontWeight="bold" fill="#FFF" textAnchor="middle">MDB</text></svg>, title: 'MongoDB' },
    { node: <svg width="40" height="40" viewBox="0 0 24 24" key="html"><rect width="24" height="24" fill="#E34C26" /><text x="12" y="16" fontSize="12" fontWeight="bold" fill="#FFF" textAnchor="middle">HTML</text></svg>, title: 'HTML5' },
    { node: <svg width="40" height="40" viewBox="0 0 24 24" key="css"><rect width="24" height="24" fill="#2965f1" /><text x="12" y="16" fontSize="12" fontWeight="bold" fill="#FFF" textAnchor="middle">CSS</text></svg>, title: 'CSS3' },
    { node: <svg width="40" height="40" viewBox="0 0 24 24" key="git"><circle cx="12" cy="12" r="10" fill="#F1502F" /><text x="12" y="16" fontSize="12" fontWeight="bold" fill="#FFF" textAnchor="middle">Git</text></svg>, title: 'Git' },
    { node: <svg width="40" height="40" viewBox="0 0 24 24" key="docker"><rect width="24" height="24" fill="#0db7ed" /><text x="12" y="16" fontSize="12" fontWeight="bold" fill="#FFF" textAnchor="middle">Docker</text></svg>, title: 'Docker' },
    { node: <svg width="40" height="40" viewBox="0 0 24 24" key="aws"><rect width="24" height="24" fill="#ff9900" /><text x="12" y="16" fontSize="12" fontWeight="bold" fill="#000" textAnchor="middle">AWS</text></svg>, title: 'AWS' },
    { node: <svg width="40" height="40" viewBox="0 0 24 24" key="python"><rect width="24" height="24" fill="#306998" /><text x="12" y="16" fontSize="12" fontWeight="bold" fill="#FFF" textAnchor="middle">Py</text></svg>, title: 'Python' },
    { node: <svg width="40" height="40" viewBox="0 0 24 24" key="graphicdesign"><rect width="24" height="24" fill="#a259ff" /><text x="12" y="16" fontSize="12" fontWeight="bold" fill="#FFF" textAnchor="middle">GD</text></svg>, title: 'Graphic Design' }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-title">
          <h2>Skills</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {skillLogos.map((logo, index) => (
            <div key={index} title={logo.title}>
              {logo.node}
            </div>
          ))}
        </div>

        {/* Uncomment below lines to test LogoLoop and ScrollVelocity stepwise */}
        {/*
        <ScrollVelocity velocity={100}>
          <LogoLoop
            logos={skillLogos}
            speed={100}
            direction="left"
            logoHeight={50}
            gap={20}
            pauseOnHover={true}
            scaleOnHover={true}
            className="skills-logo-loop"
          />
        </ScrollVelocity>
        */}
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
