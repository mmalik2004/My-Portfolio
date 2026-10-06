
import '../styles/About.css';


const SKILL_GROUPS = [
  {
    title: 'Languages',
    color: '#8b5cf6',
    skills: ['JavaScript', 'Java','SQL'],
  },
  {
    title: 'Frameworks & Libraries',
    color: '#ec4899',
    skills: ['Spring Boot','React.js', 'Node.js', 'Express.js','WebSockets','Spring Data JPA', 'Hibernate', 'HTML', 'CSS'],
  },
  {
    title: 'Databases & Tools',
    color: '#10b981',
    skills: ['MongoDB', 'MySQL', 'Postman', 'Git', 'GitHub', 'Vercel'],
  },
  {
    title: 'Core Concepts',
    color: '#f97316',
    skills: ['DSA', 'OOP', 'DBMS', 'Operating Systems','REST APIs'],
  }
  
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
                { icon: '🎓', text: 'B.Tech CSE, YMCA' },
                { icon: '💼', text: 'SDE Intern @ Bharti Airtel'},
                { icon: '📍', text: 'Gurugram, Haryana, India' },
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
             I'm Mehak, a B.Tech Computer Engineering graduate from J.C. Bose University (YMCA). 
              I specialize in building robust backend architectures and scalable RESTful APIs using Java and Spring Boot, paired with interactive, modern frontends in React.js.
            </p>

            <p>
             My focus on problem-solving extends beyond code — I've solved 900+ DSA problems,
              ranked in the top 1.92% in JEE Main among 1.2M+ candidates, and engineered real-time systems using WebSockets.
            </p>

            <p>
              Beyond development, I was an active member of Manan – A TechnoSurge at YMCA, 
              where I organized hackathons and contributed to creating high-impact technical experiences for students.
            </p>

            <div className="tag-row">
              {['Software Development', 'Java & Spring Boot' , 'Real-time Systems', 'DSA'].map((t) => (
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
