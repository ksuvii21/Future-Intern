import React from 'react';
import './App.css';
import favicon from '../assets/favicon.png';
import Preview from '../assets/Preview.png';
import resume from '../assets/resume.pdf';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={favicon} className="App-logo" alt="logo" />
        <h1>My Portfolio</h1>
      </header>
      <section id="about">
        <h2>About Me</h2>
        <p>Welcome to my portfolio! I am a passionate developer with experience in React and Node.js.</p>
        <img src={Preview} alt="Preview" className="preview-image" />
      </section>
      <section id="projects">
        <h2>Projects</h2>
        <ul>
          <li>Project 1: Portfolio Website</li>
          <li>Project 2: E-commerce App</li>
          <li>Project 3: Blog Platform</li>
        </ul>
      </section>
      <section id="resume">
        <h2>Resume</h2>
        <a href={resume} target="_blank" rel="noopener noreferrer">View Resume (PDF)</a>
      </section>
      <section id="contact">
        <h2>Contact</h2>
        <p>Email: example@example.com</p>
      </section>
      <footer>
        <p>© 2024 My Portfolio</p>
      </footer>
    </div>
  );
}

export default App;
