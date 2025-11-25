import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import Home from './pages/Home'; 
import Models from './pages/Models'; 
import Brand from './pages/Brand'; 
import News from './pages/News'; 
import Contact from './pages/Contact'; 

import './styles/theme.css'; 

function App() {
  return (

    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<Models />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>

  );
}

export default App;
