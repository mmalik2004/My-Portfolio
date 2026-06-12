/* UserPortfolio.jsx — with hero visual + proper resume download */
import { useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import '../styles/UserPortfolio.css';

const GHIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:14,height:14}}>
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-1.93C5.74 21 5.07 18.96 5.07 18.96c-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18A10.95 10.95 0 0 1 12 7.3c.97 0 1.95.13 2.86.38 2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.13v3.17c0 .3.2.66.79.55C20.22 21.37 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5z"/>
  </svg>
);

const PROJ_GRADIENTS = [
  'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)',
  'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #059669 100%)',
  'linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #dc2626 100%)',
  'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0284c7 100%)',
  'linear-gradient(135deg, #1e1b4b 0%, #7c3aed 50%, #ec4899 100%)',
  'linear-gradient(135deg, #14532d 0%, #15803d 50%, #22c55e 100%)',
];

const EDU_ACCENTS = [
  { grad: 'linear-gradient(90deg, #8b5cf6, #ec4899)', color: '#8b5cf6', cls: 'edu-card-purple' },
  { grad: 'linear-gradient(90deg, #10b981, #06b6d4)', color: '#10b981', cls: 'edu-card-green'  },
  { grad: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', color: '#3b82f6', cls: 'edu-card-blue'  },
];

function useStaggerReveal(ref, selector) {
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    const items = el.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Array.from(items).indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('visible'), idx * 180);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [ref, selector]);
}

/* ── Same hero visual as Mehak's home ── */
function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="hero-code-tag hero-code-tag-1">{'<Software Engineer />'}</div>
      <div className="hero-code-tag hero-code-tag-2">{'{ Code: Passion }'}</div>
      <div className="hero-code-tag hero-code-tag-3">{'useState()'}</div>

      <div className="hero-planet">
        <div className="orbit-dot orbit-dot-1" style={{ position:'absolute', top:'50%', left:'50%', transformOrigin:'0 0' }} />
        <div className="orbit-dot orbit-dot-2" style={{ position:'absolute', top:'50%', left:'50%', transformOrigin:'0 0' }} />
      </div>

      <svg className="hero-astronaut" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="130" rx="52" ry="60" fill="#2d1b69" stroke="#8b5cf6" strokeWidth="2"/>
        <circle cx="100" cy="72" r="42" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="2.5"/>
        <ellipse cx="100" cy="72" rx="28" ry="25" fill="#0f0a2e"/>
        <ellipse cx="90" cy="62" rx="8" ry="6" fill="rgba(139,92,246,0.5)" />
        <ellipse cx="105" cy="58" rx="4" ry="3" fill="rgba(236,72,153,0.4)" />
        <ellipse cx="100" cy="72" rx="28" ry="25" fill="url(#visorGradU)" />
        <ellipse cx="54" cy="130" rx="14" ry="36" fill="#2d1b69" stroke="#8b5cf6" strokeWidth="1.5" transform="rotate(-15 54 130)"/>
        <ellipse cx="146" cy="130" rx="14" ry="36" fill="#2d1b69" stroke="#8b5cf6" strokeWidth="1.5" transform="rotate(15 146 130)"/>
        <circle cx="46" cy="162" r="10" fill="#8b5cf6"/>
        <circle cx="154" cy="162" r="10" fill="#8b5cf6"/>
        <rect x="76" y="185" width="20" height="28" rx="10" fill="#2d1b69" stroke="#8b5cf6" strokeWidth="1.5"/>
        <rect x="104" y="185" width="20" height="28" rx="10" fill="#2d1b69" stroke="#8b5cf6" strokeWidth="1.5"/>
        <ellipse cx="86" cy="213" rx="14" ry="7" fill="#8b5cf6"/>
        <ellipse cx="114" cy="213" rx="14" ry="7" fill="#8b5cf6"/>
        <rect x="86" y="118" width="28" height="20" rx="4" fill="#8b5cf6" opacity="0.7"/>
        <rect x="89" y="121" width="22" height="14" rx="3" fill="#0a0a0f" opacity="0.8"/>
        <rect x="120" y="105" width="22" height="36" rx="6" fill="#1e1b4b" stroke="#ec4899" strokeWidth="1.5"/>
        <defs>
          <radialGradient id="visorGradU" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05"/>
          </radialGradient>
        </defs>
      </svg>

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

/* ── Home section ── */
function UPHome({ data }) {
  return (
    <section className="up-home page">
      <div className="container">
        <div className="hero-layout">
          {/* LEFT */}
          <div className="home-content reveal visible">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Open to opportunities
            </div>
            <h1 className="hero-name">
              Hi, I'm<br />
              <span className="hero-name-grad">{data.name.split(' ')[0]}</span>
            </h1>
            <p className="hero-typed">
              <span className="hero-typed-text">{data.role}</span>
              <span className="hero-typed-cursor">|</span>
            </p>
            <p className="hero-bio">{data.bio}</p>

            {data.stats.length > 0 && (
              <div className="hero-stats">
                {data.stats.map(({ n, l }, i) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="hero-stat">
                      <span className="stat-number">{n}</span>
                      <span className="stat-label">{l}</span>
                    </div>
                    {i < data.stats.length - 1 && <div className="stat-divider" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — same visual */}
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

/* ── Skills section ── */
function UPSkills({ data }) {
  if (!data.skillGroups?.length) return null;
  const COLORS = ['#8b5cf6','#ec4899','#f97316','#10b981','#3b82f6'];
  return (
    <section className="page">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-tag">What I Know</p>
          <h2 className="section-title">Skills</h2>
          <div className="section-line" />
        </div>
        <div className="skills-categories">
          {data.skillGroups.map((g, gi) => (
            <div key={gi} className="glass skill-category-card reveal" style={{ transitionDelay: `${gi * 100}ms` }}>
              <p className="skill-cat-title">{g.title}</p>
              <div className="skill-chips">
                {g.skills.split(',').map(s => s.trim()).filter(Boolean).map((s, si) => (
                  <span key={si} className="skill-chip">
                    <span className="chip-dot" style={{ background: COLORS[gi % COLORS.length] }} />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Projects section ── */
function UPProjects({ data }) {
  if (!data.projects?.length) return null;
  return (
    <section className="page">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-tag">My Work</p>
          <h2 className="section-title">Projects</h2>
          <div className="section-line" />
        </div>
        <div className="projects-grid">
          {data.projects.map((p, i) => (
            <div key={i} className="glass proj-card reveal" style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="proj-banner">
                <div className="proj-banner-gradient" style={{ background: PROJ_GRADIENTS[i % PROJ_GRADIENTS.length] }} />
                <div className="proj-banner-glass" />
                <span className="proj-banner-title">{p.title}</span>
                {p.date && <span className="proj-date-badge">{p.date}</span>}
              </div>
              <div className="proj-body">
                <ul className="proj-bullets">
                  {p.bullets.filter(Boolean).map((b, bi) => <li key={bi}>{b}</li>)}
                </ul>
                {p.tags && (
                  <div className="proj-tags">
                    {p.tags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                      <span key={t} className="proj-tag">{t}</span>
                    ))}
                  </div>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="proj-github-btn">
                    <GHIcon /> View on GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Experience section ── */
function UPExperience({ data }) {
  const timelineRef = useRef(null);
  useStaggerReveal(timelineRef, '.exp-item');
  if (!data.experiences?.length) return null;

  return (
    <section className="page">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-tag">Work History</p>
          <h2 className="section-title">Experience</h2>
          <div className="section-line" />
        </div>
        <div className="exp-timeline" ref={timelineRef}>
          {data.experiences.map((exp, i) => (
            <div key={i} className="exp-item">
              <div className="exp-dot active" />
              <div className="glass exp-card">
                <div className="exp-top">
                  <h3 className="exp-role">{exp.role}</h3>
                  {exp.badge && (
                    <span className="exp-badge exp-badge-active">{exp.badge}</span>
                  )}
                </div>
                <p className="exp-company">{exp.company}</p>
                {exp.period && <p className="exp-period">{exp.period}</p>}
                <ul className="exp-bullets">
                  {exp.bullets.filter(Boolean).map((b, bi) => (
                    <li key={bi} className="exp-bullet">{b}</li>
                  ))}
                </ul>
                {exp.tags && (
                  <div className="exp-tags">
                    {exp.tags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                      <span key={t} className="exp-tag">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Education section ── */
function UPEducation({ data }) {
  if (!data.education?.length) return null;
  return (
    <section className="page">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-tag">My Background</p>
          <h2 className="section-title">Education</h2>
          <div className="section-line" />
        </div>
        <div className="edu-grid">
          {data.education.map((e, i) => {
            const accent = EDU_ACCENTS[i % EDU_ACCENTS.length];
            return (
              <div key={i} className={`glass edu-card ${accent.cls} reveal`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="edu-card-accent" style={{ background: accent.grad }} />
                {e.period && <p className="edu-period" style={{ color: accent.color }}>{e.period}</p>}
                <h3 className="edu-degree">{e.degree}</h3>
                <p className="edu-school">{e.school}</p>
                {e.grade && <span className="edu-grade-badge">{e.grade}</span>}
                {e.desc && <p className="edu-desc">{e.desc}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// /* ── Resume HTML generator ── */
// function buildResumeHTML(data) {
//   const skillsHTML = data.skillGroups?.length
//     ? `<div class="section">
//         <div class="section-title">Skills</div>
//         <div class="section-line"></div>
//         ${data.skillGroups.map(g => `
//           <div class="skill-row">
//             <span class="skill-cat">${g.title}:</span>
//             <span class="skill-vals">${g.skills}</span>
//           </div>`).join('')}
//       </div>` : '';

//   const expHTML = data.experiences?.length
//     ? `<div class="section">
//         <div class="section-title">Experience</div>
//         <div class="section-line"></div>
//         ${data.experiences.map(e => `
//           <div class="entry">
//             <div class="entry-top">
//               <div>
//                 <span class="entry-role">${e.role}</span>
//                 <span class="entry-company"> — ${e.company}</span>
//               </div>
//               <span class="entry-period">${e.period || ''}</span>
//             </div>
//             ${e.badge ? `<div class="entry-badge">${e.badge}</div>` : ''}
//             <ul class="entry-bullets">
//               ${e.bullets.filter(Boolean).map(b => `<li>${b}</li>`).join('')}
//             </ul>
//             ${e.tags ? `<div class="entry-tags">${e.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('')}</div>` : ''}
//           </div>`).join('')}
//       </div>` : '';

//   const projHTML = data.projects?.length
//     ? `<div class="section">
//         <div class="section-title">Projects</div>
//         <div class="section-line"></div>
//         ${data.projects.map(p => `
//           <div class="entry">
//             <div class="entry-top">
//               <span class="entry-role">${p.title}</span>
//               <span class="entry-period">${p.date || ''}</span>
//             </div>
//             <ul class="entry-bullets">
//               ${p.bullets.filter(Boolean).map(b => `<li>${b}</li>`).join('')}
//             </ul>
//             ${p.tags ? `<div class="entry-tags">${p.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('')}</div>` : ''}
//             ${p.github ? `<div class="entry-link"><a href="${p.github}">${p.github}</a></div>` : ''}
//           </div>`).join('')}
//       </div>` : '';

//   const eduHTML = data.education?.length
//     ? `<div class="section">
//         <div class="section-title">Education</div>
//         <div class="section-line"></div>
//         ${data.education.map(e => `
//           <div class="entry">
//             <div class="entry-top">
//               <div>
//                 <span class="entry-role">${e.degree}</span>
//                 <span class="entry-company"> — ${e.school}</span>
//               </div>
//               <span class="entry-period">${e.period || ''}</span>
//             </div>
//             ${e.grade ? `<div class="entry-grade">${e.grade}</div>` : ''}
//             ${e.desc  ? `<p class="entry-desc">${e.desc}</p>` : ''}
//           </div>`).join('')}
//       </div>` : '';

//   const statsRow = data.stats.length
//     ? `<div class="stats-row">${data.stats.map(s => `<span class="stat-item"><strong>${s.n}</strong> ${s.l}</span>`).join('<span class="stat-sep">|</span>')}</div>`
//     : '';

//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8" />
// <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
// <title>${data.name} — Resume</title>
// <style>
//   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   body {
//     font-family: 'Inter', sans-serif;
//     background: #ffffff;
//     color: #1e293b;
//     line-height: 1.6;
//     -webkit-font-smoothing: antialiased;
//   }

//   .page {
//     max-width: 820px;
//     margin: 0 auto;
//     padding: 48px 52px;
//   }

//   /* Header */
//   .resume-header {
//     border-bottom: 3px solid transparent;
//     border-image: linear-gradient(90deg, #7c3aed, #ec4899) 1;
//     padding-bottom: 24px;
//     margin-bottom: 32px;
//   }

//   .resume-name {
//     font-size: 34px;
//     font-weight: 800;
//     letter-spacing: -0.8px;
//     background: linear-gradient(135deg, #7c3aed, #ec4899);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//     line-height: 1.1;
//     margin-bottom: 4px;
//   }

//   .resume-role {
//     font-size: 15px;
//     font-weight: 600;
//     color: #64748b;
//     letter-spacing: 0.5px;
//     margin-bottom: 10px;
//   }

//   .contact-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 6px 20px;
//     font-size: 12.5px;
//     color: #64748b;
//   }

//   .contact-row a { color: #7c3aed; text-decoration: none; }
//   .contact-row a:hover { text-decoration: underline; }

//   .contact-sep { color: #cbd5e1; }

//   /* Stats */
//   .stats-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 6px 24px;
//     margin-top: 14px;
//     font-size: 13px;
//     color: #475569;
//   }
//   .stat-item strong { color: #7c3aed; font-weight: 700; }
//   .stat-sep { color: #e2e8f0; }

//   /* Sections */
//   .section { margin-bottom: 30px; }

//   .section-title {
//     font-size: 13px;
//     font-weight: 800;
//     letter-spacing: 2.5px;
//     text-transform: uppercase;
//     color: #7c3aed;
//     margin-bottom: 6px;
//   }

//   .section-line {
//     height: 2px;
//     background: linear-gradient(90deg, #7c3aed, #ec4899, rgba(139,92,246,0.1));
//     border-radius: 99px;
//     margin-bottom: 18px;
//   }

//   /* About */
//   .about-text {
//     font-size: 13.5px;
//     color: #475569;
//     line-height: 1.75;
//   }

//   /* Skills */
//   .skill-row {
//     display: flex;
//     gap: 10px;
//     margin-bottom: 7px;
//     font-size: 13px;
//     align-items: baseline;
//   }
//   .skill-cat {
//     font-weight: 700;
//     color: #1e293b;
//     min-width: 130px;
//     flex-shrink: 0;
//   }
//   .skill-vals { color: #475569; }

//   /* Entries (exp / proj / edu) */
//   .entry {
//     margin-bottom: 20px;
//     padding-left: 12px;
//     border-left: 2px solid rgba(139,92,246,0.25);
//   }
//   .entry:last-child { margin-bottom: 0; }

//   .entry-top {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     gap: 12px;
//     margin-bottom: 4px;
//     flex-wrap: wrap;
//   }

//   .entry-role {
//     font-size: 14px;
//     font-weight: 700;
//     color: #1e293b;
//   }

//   .entry-company {
//     font-size: 14px;
//     font-weight: 500;
//     color: #7c3aed;
//   }

//   .entry-period {
//     font-size: 12px;
//     color: #94a3b8;
//     font-weight: 500;
//     white-space: nowrap;
//     flex-shrink: 0;
//   }

//   .entry-badge {
//     display: inline-block;
//     font-size: 11px;
//     font-weight: 600;
//     color: #10b981;
//     background: rgba(16,185,129,0.08);
//     border: 1px solid rgba(16,185,129,0.3);
//     border-radius: 999px;
//     padding: 2px 10px;
//     margin-bottom: 8px;
//   }

//   .entry-grade {
//     font-size: 12.5px;
//     font-weight: 600;
//     color: #7c3aed;
//     background: rgba(124,58,237,0.07);
//     border: 1px solid rgba(124,58,237,0.2);
//     border-radius: 999px;
//     display: inline-block;
//     padding: 2px 12px;
//     margin-bottom: 6px;
//   }

//   .entry-bullets {
//     list-style: none;
//     padding: 0;
//     margin-bottom: 8px;
//   }
//   .entry-bullets li {
//     font-size: 13px;
//     color: #475569;
//     padding-left: 14px;
//     position: relative;
//     margin-bottom: 4px;
//     line-height: 1.65;
//   }
//   .entry-bullets li::before {
//     content: '';
//     position: absolute;
//     left: 0; top: 7px;
//     width: 5px; height: 5px;
//     border-radius: 50%;
//     background: linear-gradient(135deg, #7c3aed, #ec4899);
//   }

//   .entry-tags {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 5px;
//     margin-top: 6px;
//   }
//   .tag {
//     font-size: 11px;
//     background: rgba(124,58,237,0.07);
//     border: 1px solid rgba(124,58,237,0.2);
//     color: #7c3aed;
//     padding: 2px 10px;
//     border-radius: 999px;
//     font-weight: 500;
//   }

//   .entry-link {
//     font-size: 12px;
//     margin-top: 5px;
//   }
//   .entry-link a { color: #7c3aed; }

//   .entry-desc {
//     font-size: 12.5px;
//     color: #64748b;
//     margin-top: 6px;
//     line-height: 1.6;
//   }

//   /* Print */
//   @media print {
//     body { background: #fff; }
//     .page { padding: 28px 36px; }
//     a { color: #7c3aed !important; }
//   }
// </style>
// </head>
// <body>
// <div class="page">

//   <div class="resume-header">
//     <div class="resume-name">${data.name}</div>
//     <div class="resume-role">${data.role}</div>
//     <div class="contact-row">
//       ${data.email    ? `<span>${data.email}</span>`                                          : ''}
//       ${data.location ? `<span class="contact-sep">|</span><span>${data.location}</span>`    : ''}
//       ${data.github   ? `<span class="contact-sep">|</span><a href="${data.github}" target="_blank">${data.github}</a>` : ''}
//       ${data.linkedin ? `<span class="contact-sep">|</span><a href="${data.linkedin}" target="_blank">${data.linkedin}</a>` : ''}
//     </div>
//     ${statsRow}
//   </div>

//   <div class="section">
//     <div class="section-title">About</div>
//     <div class="section-line"></div>
//     <p class="about-text">${data.bio}</p>
//   </div>

//   ${skillsHTML}
//   ${expHTML}
//   ${projHTML}
//   ${eduHTML}

// </div>
// </body>
// </html>`;
// }

// /* ── Download Resume ── */
// function DownloadResume({ data }) {
//   const handleDownload = () => {
//     const html = buildResumeHTML(data);
//     const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
//     const url  = URL.createObjectURL(blob);
//     const a    = document.createElement('a');
//     a.href     = url;
//     a.download = `${data.name.replace(/\s+/g, '_')}_Resume.html`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="up-download-bar">
//       <p className="up-download-label">Your portfolio is ready!</p>
//       <button className="btn-primary" onClick={handleDownload}>
//         Download Resume
//       </button>
//     </div>
//   );
// }

export default function UserPortfolio() {
  const { userData } = usePortfolio();
  if (!userData) return null;

  return (
    <div className="user-portfolio">
      {/* <DownloadResume data={userData} /> */}
      <UPHome       data={userData} />
      <UPSkills     data={userData} />
      <UPProjects   data={userData} />
      <UPExperience data={userData} />
      <UPEducation  data={userData} />
    </div>
  );
}