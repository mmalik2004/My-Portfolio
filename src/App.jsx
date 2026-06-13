import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar           from './components/Navbar';
import SocialSidebar    from './components/SocialSidebar';
// import PortfolioFAB     from './components/PortfolioFAB';
import Home             from './pages/Home';
import About            from './pages/About';
import Projects         from './pages/Projects';
import Education        from './pages/Education';
import Experience       from './pages/Experience';
import UserPortfolio    from './pages/UserPortfolio';
import Contact from './pages/Contact';

// import AboutTransition      from './transitions/AboutTransition';
import ProjectsTransition   from './transitions/ProjectsTransition';
import ExperienceTransition from './transitions/ExperienceTransition';
import EducationTransition  from './transitions/EducationTransition';

import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import './index.css';


const TRANSITION_MAP = {
  // '/about':      AboutTransition,
  '/projects':   ProjectsTransition,
  '/experience': ExperienceTransition,
  '/education':  EducationTransition,
};

function AnimatedRoutes() {
  const location = useLocation();
  const [pendingPath, setPendingPath]   = useState(null);
  const [activePath,  setActivePath]    = useState(location.pathname);
  const [showContent, setShowContent]   = useState(true);
  const { userData } = usePortfolio();

  /* Intercept route changes — show transition first */
  useEffect(() => {
    if (location.pathname === activePath) return;
    const hasTransition = TRANSITION_MAP[location.pathname];
    if (hasTransition && !userData) {
      setShowContent(false);
      setPendingPath(location.pathname);
    } else {
      setActivePath(location.pathname);
      setShowContent(true);
    }
  }, [location.pathname]);

  const handleTransitionDone = useCallback(() => {
    setActivePath(pendingPath);
    setPendingPath(null);
    setShowContent(true);
  }, [pendingPath]);

  const TransitionComp = pendingPath ? TRANSITION_MAP[pendingPath] : null;

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
  }, [activePath]);

  if (userData) {
    return (
      <>
        <Navbar userMode userData={userData} />
        <SocialSidebar userMode userData={userData} />
        {/* <PortfolioFAB /> */}
        <UserPortfolio />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <SocialSidebar />
      {/* <PortfolioFAB /> */}

      {/* Transition overlay */}
      {TransitionComp && <TransitionComp onDone={handleTransitionDone} />}

      {/* Page content */}
      {showContent && (
        <Routes location={{ pathname: activePath }}>
          <Route path="/"            element={<Home />} />
          <Route path="/about"       element={<About />} />
          <Route path="/projects"    element={<Projects />} />
          <Route path="/experience"  element={<Experience />} />
          <Route path="/education"   element={<Education />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <PortfolioProvider>
        <AnimatedRoutes />
      </PortfolioProvider>
    </BrowserRouter>
  );
}

export default App;