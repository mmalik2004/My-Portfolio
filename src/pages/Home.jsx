import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

/* Typewriter */
function useTypewriter(words) {
  const [text, setText] = useState('');
  const st = useRef({ wi: 0, ci: 0, del: false });
  useEffect(() => {
    const id = setInterval(() => {
      const { wi, ci, del } = st.current;
      const word = words[wi];
      if (!del) {
        setText(word.slice(0, ci + 1));
        if (ci + 1 === word.length) setTimeout(() => { st.current.del = true; }, 1200);
        else st.current.ci++;
      } else {
        setText(word.slice(0, ci - 1));
        if (ci - 1 === 0) {
          st.current.del = false;
          st.current.wi = (wi + 1) % words.length;
          st.current.ci = 0;
        } else st.current.ci--;
      }
    }, 100);
    return () => clearInterval(id);
  }, [words]);
  return text;
}

/* Shared astronaut SVG content — used in both desktop and mobile visual */
function AstronautSVG() {
  return (
    <svg className="hero-astronaut" viewBox="0 0 200 220" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="130" rx="52" ry="60" fill="#2d1b69" stroke="#8b5cf6" strokeWidth="2"/>
      <circle cx="100" cy="72" r="42" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="2.5"/>
      <ellipse cx="100" cy="72" rx="28" ry="25" fill="#0f0a2e"/>
      <ellipse cx="90" cy="62" rx="8" ry="6" fill="rgba(139,92,246,0.5)" />
      <ellipse cx="105" cy="58" rx="4" ry="3" fill="rgba(236,72,153,0.4)" />
      <ellipse cx="100" cy="72" rx="28" ry="25" fill="url(#visorGradM)" />
      <ellipse cx="54" cy="130" rx="14" ry="36" fill="#2d1b69" stroke="#8b5cf6"
        strokeWidth="1.5" transform="rotate(-15 54 130)"/>
      <ellipse cx="146" cy="130" rx="14" ry="36" fill="#2d1b69" stroke="#8b5cf6"
        strokeWidth="1.5" transform="rotate(15 146 130)"/>
      <circle cx="46"  cy="162" r="10" fill="#8b5cf6"/>
      <circle cx="154" cy="162" r="10" fill="#8b5cf6"/>
      <rect x="76"  y="185" width="20" height="28" rx="10" fill="#2d1b69" stroke="#8b5cf6" strokeWidth="1.5"/>
      <rect x="104" y="185" width="20" height="28" rx="10" fill="#2d1b69" stroke="#8b5cf6" strokeWidth="1.5"/>
      <ellipse cx="86"  cy="213" rx="14" ry="7" fill="#8b5cf6"/>
      <ellipse cx="114" cy="213" rx="14" ry="7" fill="#8b5cf6"/>
      <rect x="86" y="118" width="28" height="20" rx="4" fill="#8b5cf6" opacity="0.7"/>
      <rect x="89" y="121" width="22" height="14" rx="3" fill="#0a0a0f" opacity="0.8"/>
      <rect x="120" y="105" width="22" height="36" rx="6" fill="#1e1b4b" stroke="#ec4899" strokeWidth="1.5"/>
      <defs>
        <radialGradient id="visorGradM" cx="40%" cy="40%">
          <stop offset="0%"   stopColor="#8b5cf6" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05"/>
        </radialGradient>
      </defs>
    </svg>
  );
}

/* Desktop right visual */
function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="hero-code-tag hero-code-tag-1">{'<Software Engineer />'}</div>
      <div className="hero-code-tag hero-code-tag-2">{'{ DSA: 900+ }'}</div>
      <div className="hero-code-tag hero-code-tag-3">{'useState()'}</div>
      <div className="hero-planet">
        <div className="orbit-dot orbit-dot-1"
          style={{ position:'absolute', top:'50%', left:'50%', transformOrigin:'0 0' }} />
        <div className="orbit-dot orbit-dot-2"
          style={{ position:'absolute', top:'50%', left:'50%', transformOrigin:'0 0' }} />
      </div>
      <AstronautSVG />
      {[
        { s:3, t:10,  l:60,  d:0   },
        { s:2, t:60,  l:180, d:0.5 },
        { s:4, t:160, l:80,  d:1   },
        { s:2, t:300, l:160, d:1.5 },
        { s:3, t:380, l:30,  d:0.8 },
        { s:2, t:250, l:340, d:2   },
        { s:3, t:120, l:320, d:0.3 },
      ].map((s, i) => (
        <div key={i} className="hero-star" style={{
          width: s.s, height: s.s,
          top: s.t, left: s.l,
          animationDelay: `${s.d}s`,
          animationDuration: `${2.5 + s.d}s`,
        }} />
      ))}
    </div>
  );
}

/* Mobile visual — smaller, shown below social icons */
/* Mobile visual — fills space below social icons, mirrors desktop layout */
function HeroMobileVisual() {
  return (
    <div className="hero-mobile-visual">
      {/* Planet with orbit dots */}
      <div className="hero-planet">
        <div
          className="orbit-dot orbit-dot-1 orbit-dot-mobile"
          style={{ position: 'absolute', top: '50%', left: '50%', transformOrigin: '0 0' }}
        />
        <div
          className="orbit-dot orbit-dot-2 orbit-dot-mobile"
          style={{ position: 'absolute', top: '50%', left: '50%', transformOrigin: '0 0' }}
        />
      </div>

      {/* Astronaut */}
      <AstronautSVG />

      {/* Stars only — no code tags */}
      {[
        { s: 2, t: 20,  l: 20,  d: 0   },
        { s: 2, t: 55,  l: 250, d: 0.5 },
        { s: 3, t: 150, l: 40,  d: 1   },
        { s: 2, t: 230, l: 210, d: 1.5 },
        { s: 2, t: 90,  l: 270, d: 0.8 },
        { s: 1, t: 190, l: 70,  d: 0.3 },
      ].map((s, i) => (
        <div
          key={i}
          className="hero-star"
          style={{
            width: s.s, height: s.s,
            top: s.t, left: s.l,
            animationDelay: `${s.d}s`,
            animationDuration: `${2.5 + s.d}s`,
          }}
        />
      ))}
    </div>
  );
}

/* Social icons */
const GHIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-1.93C5.74 21 5.07 18.96 5.07 18.96c-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18A10.95 10.95 0 0 1 12 7.3c.97 0 1.95.13 2.86.38 2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.13v3.17c0 .3.2.66.79.55C20.22 21.37 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5z"/>
  </svg>
);

const LIIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 20.45h3.56V9H3.56v11.45zM22.22 0H1.78C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.78 24h20.44C23.2 24 24 23.22 24 22.26V1.74C24 .78 23.2 0 22.22 0z"/>
  </svg>
);

const LCIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H19.19a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);

const MOBILE_SOCIALS = [
  { icon: <GHIcon />, href: 'https://github.com/mmalik2004',                 label: 'GitHub'   },
  { icon: <LIIcon />, href: 'https://linkedin.com/in/mehak-malik-455b9b258', label: 'LinkedIn' },
  { icon: <LCIcon />, href: 'https://leetcode.com/u/malik01',                label: 'LeetCode' },
];

const STATS = [
  { n: '900+',    l: 'DSA Problems'   },
  { n: '8.40',    l: 'CGPA'           },
  { n: 'AIR 21K', l: 'JEE Mains 2022' },
];

export default function Home() {
  const navigate = useNavigate();
  const typed = useTypewriter([
    'Full Stack Developer',
    'React Enthusiast',
    'DSA Problem Solver',
    'CS Engineering Student',
  ]);

  return (
    <section className="home-hero">
      <div className="container">
        <div className="hero-layout">

          {/* LEFT: Text content */}
          <div className="home-content reveal visible">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Open to opportunities
            </div>

            <h1 className="hero-name">
              Hi, I'm<br />
              <span className="hero-name-grad">Mehak</span>
            </h1>

            <p className="hero-typed">
              <span className="hero-typed-text">{typed}</span>
              <span className="hero-typed-cursor">|</span>
            </p>

            <p className="hero-bio">
              B.Tech Computer Engineering student at J.C. Bose University (YMCA) — CGPA 8.40.
              I build full-stack web apps with the MERN stack, love real-time systems,
              and have solved 900+ DSA problems.
            </p>

            <div className="hero-btns">
              <button className="btn-primary" onClick={() => navigate('/projects')}>
                View Projects
              </button>
              <button className="btn-outline" onClick={() => navigate('/about')}>
                About Me
              </button>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              {STATS.map(({ n, l }, i) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="hero-stat">
                    <span className="stat-number">{n}</span>
                    <span className="stat-label">{l}</span>
                  </div>
                  {i < STATS.length - 1 && <div className="stat-divider" />}
                </div>
              ))}
            </div>

            {/* Social icons — mobile only */}
            <div className="hero-social-mobile">
              {MOBILE_SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-btn"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Mobile visual — fills empty space below social icons */}
            <HeroMobileVisual />

          </div>

          {/* RIGHT: Desktop visual */}
          <HeroVisual />

        </div>
      </div>
    </section>
  );
}