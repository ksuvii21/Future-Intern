import React from 'react';
import FloatingLines from './components/FloatingLines';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <nav className="container">
          <a href="#" className="logo">Future-Intern</a>
        </nav>
      </header>

      <section id="home" className="hero">
        <FloatingLines 
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[10, 15, 20]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
        <div className="hero-content">
          <h1>Welcome to <span>My Portfolio</span></h1>
          <p>A creative developer passionate about building beautiful and functional web experiences.</p>
          <div className="hero-btns">
            <a href="#portfolio" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-outline">Get in Touch</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;