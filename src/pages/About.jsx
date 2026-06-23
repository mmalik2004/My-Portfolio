
import '../styles/About.css';


const SKILL_GROUPS = [
  {
    title: 'Languages',
    color: '#8b5cf6',
    skills: ['JavaScript', 'Java'],
  },
  {
    title: 'Web Technologies',
    color: '#ec4899',
    skills: ['ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB', 'WebSockets', 'HTML', 'CSS'],
  },
  {
    title: 'Core CS Subjects',
    color: '#f97316',
    skills: ['DSA', 'OOPs', 'DBMS', 'MySQL', 'Operating Systems'],
  },
  {
    title: 'Developer Tools',
    color: '#10b981',
    skills: ['Git', 'GitHub', 'VS Code', 'Vercel'],
  },
];

/* ── Staggered reveal delay helper ── */
function SkillChip({ name, color, delay }) {
  return (
    <span
      className="skill-chip reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="chip-dot" style={{ background: color }} />
      {name}
    </span>
  );
}

function About() {
  return (
    <div className="page">
      <div className="container">

        {/* ── Section header ── */}
        <div className="section-header reveal">
          <p className="section-tag">Who am I</p>
          <h2 className="section-title">About Me</h2>
          <div className="section-line" />
        </div>

        {/* ── Bio grid ── */}
        <div className="about-grid">

          {/* Left — avatar card */}
          <div className="glass about-avatar-card reveal">
            <div className="avatar-circle">👩‍💻</div>

            <p className="about-name">Mehak Malik</p>
            <p className="about-role">Software Developer</p>

            <div className="about-info-list">
              {[
                { icon: '🎓', text: 'J.C. Bose University (YMCA)' },
                { icon: '📍', text: 'Faridabad, Haryana, India'       },
                { icon: '📊', text: 'CGPA: 8.40'                   },
                { icon: '✉️', text: 'mehakmalik1282@gmail.com' }
              ].map(({ icon, text }) => (
                <div className="about-info-row" key={text}>
                  <div className="about-info-icon">{icon}</div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — bio text */}
          <div className="about-bio reveal" style={{ transitionDelay: '150ms' }}>
            <h3>Software Engineer </h3>

            <p>
              I'm Mehak, a B.Tech Computer Engineering student specializing in 
              web development. I enjoy building real-time, high-performance web applications
              using the MERN stack — from architecting WebSocket systems to crafting clean,
              responsive UIs.
            </p>

            <p>
              My love for problem-solving extends beyond code — I've solved 900+ DSA problems,
              secured a position in the top 1.92% in JEE Main among 1.2M+ candidates
            </p>

            <p>
              Outside of building projects, I'm an active member of Manan - A TechnoSurge club
              at YMCA, where I organized Zenith, a 24-hour cross-college hackathon.
            </p>

            <div className="tag-row">
              {['Software Development', 'Real-time Systems', 'DSA', 'Hackathons', 'Open Source'].map((t) => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Skills ── */}
        <div className="skills-section">
          <div className="section-header reveal">
            <p className="section-tag">What I know</p>
            <h2 className="section-title">Skills &amp; Tech Stack</h2>
            <div className="section-line" />
          </div>

          <div className="skills-categories">
            {SKILL_GROUPS.map((group, gi) => (
              <div key={group.title} className="glass skill-category-card reveal" style={{ transitionDelay: `${gi * 120}ms` }}>
                <p className="skill-cat-title">{group.title}</p>
                <div className="skill-chips">
                  {group.skills.map((s, si) => (
                    <SkillChip
                      key={s}
                      name={s}
                      color={group.color}
                      delay={gi * 80 + si * 60}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;