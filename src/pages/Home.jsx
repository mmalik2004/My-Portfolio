/* Home.jsx — Two-column layout, right side visual, no scroll hint */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

/* Particle canvas */
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      o: Math.random() * 0.4 + 0.08,
    }));
    let mx = W / 2, my = H / 2;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        const dx = mx - p.x, dy = my - p.y;
        if (Math.hypot(dx, dy) < 160) { p.x += dx * 0.003; p.y += dy * 0.003; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.o})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.11 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={ref} className="particle-canvas" />;
}

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
        if (ci - 1 === 0) { st.current.del = false; st.current.wi = (wi + 1) % words.length; st.current.ci = 0; }
        else st.current.ci--;
      }
    }, 100);
    return () => clearInterval(id);
  }, [words]);
  return text;
}

/* Right side: space illustration with SVG astronaut */
function HeroVisual() {
  return (
    <div className="hero-visual">

      {/* Floating code tags */}
      <div className="hero-code-tag hero-code-tag-1">{'<Software Engineer />'}</div>
      <div className="hero-code-tag hero-code-tag-2">{'{ DSA: 900+ }'}</div>
      <div className="hero-code-tag hero-code-tag-3">{'useState()'}</div>

      {/* Planet */}
      <div className="hero-planet">
        {/* Orbiting dots */}
        <div className="orbit-dot orbit-dot-1" style={{ position:'absolute', top:'50%', left:'50%', transformOrigin:'0 0' }} />
        <div className="orbit-dot orbit-dot-2" style={{ position:'absolute', top:'50%', left:'50%', transformOrigin:'0 0' }} />
      </div>

      {/* Astronaut SVG */}
      <svg className="hero-astronaut" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="100" cy="130" rx="52" ry="60" fill="#2d1b69" stroke="#8b5cf6" strokeWidth="2"/>
        {/* Helmet */}
        <circle cx="100" cy="72" r="42" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="2.5"/>
        {/* Visor */}
        <ellipse cx="100" cy="72" rx="28" ry="25" fill="#0f0a2e"/>
        {/* Visor shine */}
        <ellipse cx="90" cy="62" rx="8" ry="6" fill="rgba(139,92,246,0.5)" />
        <ellipse cx="105" cy="58" rx="4" ry="3" fill="rgba(236,72,153,0.4)" />
        {/* Visor glow */}
        <ellipse cx="100" cy="72" rx="28" ry="25" fill="url(#visorGrad)" />
        {/* Left arm */}
        <ellipse cx="54" cy="130" rx="14" ry="36" rx2="14" fill="#2d1b69" stroke="#8b5cf6" strokeWidth="1.5" transform="rotate(-15 54 130)"/>
        {/* Right arm */}
        <ellipse cx="146" cy="130" rx="14" ry="36" fill="#2d1b69" stroke="#8b5cf6" strokeWidth="1.5" transform="rotate(15 146 130)"/>
        {/* Left glove */}
        <circle cx="46" cy="162" r="10" fill="#8b5cf6"/>
        {/* Right glove */}
        <circle cx="154" cy="162" r="10" fill="#8b5cf6"/>
        {/* Left leg */}
        <rect x="76" y="185" width="20" height="28" rx="10" fill="#2d1b69" stroke="#8b5cf6" strokeWidth="1.5"/>
        {/* Right leg */}
        <rect x="104" y="185" width="20" height="28" rx="10" fill="#2d1b69" stroke="#8b5cf6" strokeWidth="1.5"/>
        {/* Boots */}
        <ellipse cx="86" cy="213" rx="14" ry="7" fill="#8b5cf6"/>
        <ellipse cx="114" cy="213" rx="14" ry="7" fill="#8b5cf6"/>
        {/* Chest badge */}
        <rect x="86" y="118" width="28" height="20" rx="4" fill="#8b5cf6" opacity="0.7"/>
        <rect x="89" y="121" width="22" height="14" rx="3" fill="#0a0a0f" opacity="0.8"/>
        {/* Backpack */}
        <rect x="120" y="105" width="22" height="36" rx="6" fill="#1e1b4b" stroke="#ec4899" strokeWidth="1.5"/>
        <defs>
          <radialGradient id="visorGrad" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05"/>
          </radialGradient>
        </defs>
      </svg>

      {/* Star particles */}
      {[
        { s:3, t:10,  l:60,  d:0    },
        { s:2, t:60,  l:180, d:0.5  },
        { s:4, t:160, l:80,  d:1    },
        { s:2, t:300, l:160, d:1.5  },
        { s:3, t:380, l:30,  d:0.8  },
        { s:2, t:250, l:340, d:2    },
        { s:3, t:120, l:320, d:0.3  },
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

const STATS = [
  { n: '900+',    l: 'DSA Problems'  },
  { n: '8.40',    l: 'CGPA'          },
  { n: 'AIR 21K', l: 'JEE Mains 2022' },
];

export default function Home() {
  const navigate = useNavigate();
  const typed = useTypewriter([
    'Software Developer',
    'React Enthusiast',
    'DSA Problem Solver',
    'CS Engineering Student',
  ]);

  return (
    <section className="home-hero">
      <ParticleCanvas />
      <div className="grid-overlay" />

      <div className="container">
        <div className="hero-layout">

          {/* LEFT: Text */}
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
              <button className="btn-primary" onClick={() => navigate('/projects')}>View Projects</button>
              <button className="btn-outline"  onClick={() => navigate('/about')}>About Me</button>
            </div>

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
          </div>

          {/* RIGHT: Space illustration */}
          <HeroVisual />

        </div>
      </div>
    </section>
  );
}