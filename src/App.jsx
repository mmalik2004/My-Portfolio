/* App.jsx — Added Experience route */
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar        from './components/Navbar';
import SocialSidebar from './components/SocialSidebar';
import Home          from './pages/Home';
import About         from './pages/About';
import Projects      from './pages/Projects';
import Education     from './pages/Education';
import Experience    from './pages/Experience';

import './index.css';

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    const attach = () => document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mo.disconnect(); };
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <SocialSidebar />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/about"       element={<About />} />
        <Route path="/projects"    element={<Projects />} />
        <Route path="/experience"  element={<Experience />} />
        <Route path="/education"   element={<Education />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;