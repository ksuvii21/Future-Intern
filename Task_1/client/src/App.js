import React from 'react';

import profileImage from './assets/profile.png';
import project1Image from './assets/project1.png';
import project2Image from './assets/project2.png';



// You can move these components to their own files in a 'components' folder
// For simplicity, I'm defining them here.

const Header = () => (
  <header>
    <div className="container">
      <nav>
        <a href="#home" className="logo">
          Kritika Gupta
        </a>
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
      </nav>
    </div>
  </header>
);

const Hero = () => (
  <section id="home" className="hero">
    <div className="container">
      <div className="hero-content">
        <h1>
          I'm Kritika Gupta, a <span>Full-Stack Developer</span>
        </h1>
        <p>
          Passionate MERN stack developer building scalable applications and growing through hands-on experience in collaborative environments.
        </p>
        <div>
          <a href="#projects" className="btn">View My Projects</a>
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
          <p>
            I am a skilled and passionate full-stack web developer with expertise in the MERN stack (MongoDB, Express.js, React.js, Node.js). I have hands-on experience developing and maintaining web applications, creating responsive user interfaces, and assisting in backend development. I am a quick learner, a collaborative team player, and I am always eager to apply modern web technologies to build scalable and impactful solutions.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => {
  const skillsList = [
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "HTML5",
    "CSS3",
    "Git",
    "Docker",
    "AWS"
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-title">
          <h2>Skills</h2>
        </div>
        <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', listStyle: 'none', padding: 0 }}>
          {skillsList.map(skill => (
            <li key={skill} style={{ margin: '10px 20px', fontSize: '1.2rem', color: '#FFA500' }}>
              {skill}
            </li>
          ))}
        </ul>
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
          <div key={index} className="education-item">
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
          <div key={index} className="certification-item">
            <h4>{cert.title}</h4>
            <h5>{cert.issuer} | {cert.year}</h5>
          </div>
        ))}
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
        <div className="portfolio-item">
          <img src={project1Image} alt="MERN Stack Excel Analytics Platform" className="portfolio-img" />
          <h3>MERN Stack Excel Analytics Platform</h3>
          <p>An analytics platform to upload Excel files, analyze data, and generate interactive 2D/3D charts. Features user authentication with JWT, a dynamic UI, and chart downloads.</p>
          <a href="https://xlsx-analytics21.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn-outline">Check it out</a>
        </div>
        <div className="portfolio-item">
          <img src={project2Image} alt="MERN Stack Blogging Platform" className="portfolio-img" />
          <h3>MERN Stack Blogging Platform</h3>
          <p>A full-stack blogging app where users can create, edit, and delete blogs. Includes a rich text editor, comments, likes, user authentication, and an admin dashboard for post management.</p>
          <a href="https://writely-log.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn-outline">Check it out</a>
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
      <div className="experience-item" style={{borderLeftColor: '#ff69b4'}}>
        <h4>Web Development Intern</h4>
        <h5>Zidio Development (Remote) | Aug 2025 - Oct 2025</h5>
        <ul>
          <li>Developed and maintained web applications using the MERN stack.</li>
          <li>Created responsive, user-friendly interfaces with React.js, HTML, and CSS.</li>
          <li>Assisted in backend development with Node.js and MongoDB/MySQL.</li>
        </ul>
      </div>
       <div className="experience-item" style={{borderLeftColor: '#ff69b4'}}>
        <h4>Software Development Intern</h4>
        <h5>Cognifyz Technologies (Remote) | Jun 2025 - Jul 2025</h5>
        <ul>
          <li>Built projects based on Frontend user interface, CRUD Operations in MySQL and MS-Excel with Python Flask and Pandas.</li>
        </ul>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="contact">
    <div className="container contact-container">
      <div className="contact-info">
        <div className="section-title">
          <h2>Contact</h2>
          <p>Feel free to reach out!</p>
        </div>
        <div style={{textAlign: 'center'}}>
          <p>Email: <a href="mailto:k21ritikasuvi2106@gmail.com">k21ritikasuvi2106@gmail.com</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/kritika-gupta2106" target="_blank" rel="noopener noreferrer">in/kritika-gupta2106</a></p>
          <p>GitHub: <a href="https://github.com/ksuvii21" target="_blank" rel="noopener noreferrer">github.com/ksuvii21</a></p>
        </div>
      </div>
      <div className="contact-form" style={{marginTop: '0'}}>
        <form onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
          <div className="form-group">
            <input type="text" name="name" placeholder="Your Name" className="form-control" required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Your Email" className="form-control" required />
          </div>
          <div className="form-group">
            <textarea name="message" placeholder="Your Message" className="form-control" rows="4" required />
          </div>
          <button type="submit" className="btn">Send Message</button>
        </form>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer>
    <div className="container">
      <div className="copyright">
        <p>© 2025 Kritika Gupta</p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Certifications />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
