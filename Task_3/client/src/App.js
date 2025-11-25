import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'; // Corrected path
import Footer from './components/Footer'; // Corrected path
import Home from './pages/Home'; // Corrected path
import Models from './pages/Models'; // Corrected path
import Brand from './pages/Brand'; // Corrected path
import News from './pages/News'; // Corrected path
import Contact from './pages/Contact'; // Corrected path

import './styles/theme.css'; // Corrected path

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
