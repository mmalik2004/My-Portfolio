import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const LINKS = [
  { label: 'Home',       to: '/'           },
  { label: 'About',      to: '/about'      },
  { label: 'Projects',   to: '/projects'   },
  { label: 'Experience', to: '/experience' },
  { label: 'Education',  to: '/education'  },
  { label: 'Contact',    to: '/contact'    },
];

function Navbar({ userMode = false, userData = null }) {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* Close drawer on route change */
  useEffect(() => { setMenuOpen(false); }, [location]);

  /* Lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  if (userMode && userData) {
    return (
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <span className="nav-logo" style={{ cursor: 'default' }}>
          {userData.name.split(' ')[0]}.
        </span>
      </nav>
    );
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <NavLink to="/" className="nav-logo">Mehak.</NavLink>

        {/* Desktop links */}
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
        </div>

        {/* Hamburger */}
        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-mobile-drawer ${menuOpen ? 'open' : ''}`}>
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              `nav-mobile-link ${isActive ? 'active' : ''}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default Navbar;