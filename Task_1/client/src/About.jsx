import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

const AboutTextCard = () => (
  <div className="premium-glass about-text-card">
    <h3>MERN Stack Developer & Graphics Designer</h3>
    <p>
      I am a skilled and passionate full-stack web developer with expertise in the MERN stack (MongoDB, Express.js, React.js, Node.js). 
      I have hands-on experience developing and maintaining web applications, creating responsive user interfaces, and assisting in backend development.
    </p>
    <p>
      Currently pursuing a Bachelor of Computer Applications (BCA), I am constantly learning and exploring new technologies 
      to solve complex problems and deliver impactful solutions.
    </p>
  </div>
);

const InfoCard = ({ title, value }) => (
  <div className="premium-glass about-info-card">
    <p className="label">{title}</p>
    <p className="value">{value}</p>
  </div>
);

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const AboutInfoGrid = () => (
  <div className="about-info-grid">
    <InfoCard title="Location" value="Varanasi, India" />
    <InfoCard title="Email" value="k21ritikasuvi2106@gmail.com" />
    <InfoCard title="LinkedIn" value="in/kritika-gupta2106" />
    <InfoCard title="GitHub" value="github.com/ksuvii21" />
  </div>
);

const Stat = ({ value, label }) => (
  <div className="stat-item">
    <h4>{value}</h4>
    <p>{label}</p>
  </div>
);

Stat.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const ProfileCard = () => (
  <div className="premium-glass about-profile-card">
    <div className="profile-glow" />
    
    <div className="profile-avatar">
      KG
    </div>

    <h3 className="profile-name">Kritika Gupta</h3>
    <p className="profile-role">MERN Stack Developer</p>

    <div className="profile-divider" />
    

    <div className="profile-stats">
      <Stat value="8.7" label="CGPA" />
      <Stat value="6+" label="Projects" />
      <Stat value="3" label="Internships" />
    </div>
  </div>
);

const About = () => {
  return (
    <section className="about-section premium-grid-bg" id="about">
      <div className="container">
        <div className="premium-section-title">
          <h2>About Me</h2>
          <p>Get to know me better</p>
        </div>

        <div className="about-grid">
          <div className="about-left">
            <AboutTextCard />
            <AboutInfoGrid />
          </div>
          <ProfileCard />
        </div>
      </div>
    </section>
  );
};

export default About;