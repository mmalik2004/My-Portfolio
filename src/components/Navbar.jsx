/* Navbar.jsx — Added Experience link + resume download with correct path */
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const LINKS = [
  { label: 'Home',       to: '/'           },
  { label: 'About',      to: '/about'      },
  { label: 'Projects',   to: '/projects'   },
  { label: 'Experience', to: '/experience' },
  { label: 'Education',  to: '/education'  },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* Resume download handler */
  const handleResume = () => {
    /* Creates a hidden <a> tag and clicks it to force download */
    const link = document.createElement('a');
    link.href = '/Mehak_Malik_Resume.pdf';
    link.download = 'Mehak_Malik_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <NavLink to="/" className="nav-logo">Mehak.</NavLink>

      <div className="nav-links">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {l.label}
          </NavLink>
        ))}

        {/* Resume button — triggers download */}
        <button
          onClick={handleResume}
          className="nav-link nav-resume"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Resume ↓
        </button>
      </div>
    </nav>
  );
}

export default Navbar;