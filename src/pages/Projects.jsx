/* ===================================================
   Projects.jsx  —  Glassmorphism project cards
   Real projects from Mehak's resume
   =================================================== */
import '../styles/Projects.css';

/* GitHub SVG icon */
const GHIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-1.93C5.74 21 5.07 18.96 5.07 18.96c-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18A10.95 10.95 0 0 1 12 7.3c.97 0 1.95.13 2.86.38 2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.13v3.17c0 .3.2.66.79.55C20.22 21.37 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5z"/>
  </svg>
);

/* ── Projects data from resume ── */
const PROJECTS = [
  {
    title: 'Banking App',
    date: 'Sept 2026',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)',
    tags: ['Java', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'REST APIs'],
    bullets: [
      'Engineered a RESTful banking application using Java, Spring Boot, Spring Data JPA, and MySQL to support secure account and transaction management.',
      'Designed and implemented REST APIs for account creation, retrieval, deposits, withdrawals, and deletion, following structured backend development practices.',
      'Implemented global exception handling with custom error responses and appropriate HTTP status codes, improving reliability and debugging experience.',
    ],
    github: 'https://github.com/mmalik2004/banking-rest-api', /* ← update link if needed */
  },
  {
    title: 'SnapURL',
    date: 'Sept 2026',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #059669 100%)',
    tags: ['Java', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'REST APIs'],
    bullets: [
      'Engineered a high-performance URL shortener using Spring Boot, Java, and MySQL, implementing Base62 encoding to generate unique aliases with sub-50ms redirection latency.',
      'Integrated Spring Data JPA and Hibernate to optimize schema mapping and query execution, handling 100% of redirect lookups through indexed key retrieval.',
    ],
    github: 'https://github.com/mmalik2004/url-shortener-spring-boot', /* ← update link if needed */
  },
  {
    title: 'Live-Code-Studio',
    date: 'Oct 2025',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)',
    tags: ['MongoDB', 'React.js', 'Node.js', 'Express.js', 'WebSockets', 'Vercel'],
    bullets: [
      'Architected and deployed a full-stack real-time collaborative editor supporting concurrent multi-user sessions with low-latency synchronization.',
      'Built room-based WebSocket architecture enabling live typing indicators, instant code propagation, conflict reduction.',
      'Leveraged React hooks (useEffect, useRef) and Socket.io to manage editor state and synchronize real-time updates without cursor-sync conflicts.',
    ],
    github: 'https://github.com/mmalik2004/Live-code-studio',
  },
  {
    title: 'Weather App',
    date: '2024',
    gradient: 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0284c7 100%)',
    tags: ['JavaScript', 'CSS', 'HTML', 'OpenWeather API'],
    bullets: [
      'Clean weather dashboard with current temperature, humidity, precipitation data.',
      'Location search with real-time API calls to OpenWeather.',
      'Fully responsive layout across all screen sizes.',
    ],
    github: 'https://github.com/mmalik2004/SkyCast',
  },
];

/* ── Project card ── */
function ProjectCard({ project, index }) {
  return (
    <div
      className="glass proj-card reveal"
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Banner */}
      <div className="proj-banner">
        <div className="proj-banner-gradient" style={{ background: project.gradient }} />
        <div className="proj-banner-glass" />
        <span className="proj-banner-title">{project.title}</span>
        <span className="proj-date-badge">{project.date}</span>
      </div>

      {/* Body */}
      <div className="proj-body">

        {/* Bullet points */}
        <ul className="proj-bullets">
          {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>

        {/* Tags */}
        <div className="proj-tags">
          {project.tags.map((t) => (
            <span key={t} className="proj-tag">{t}</span>
          ))}
        </div>

        {/* GitHub link */}
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="proj-github-btn"
        >
          <GHIcon />
          View on GitHub
        </a>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="page">
      <div className="container">

        <div className="section-header reveal">
          <p className="section-tag">My Work</p>
          <h2 className="section-title">Projects</h2>
          <div className="section-line" />
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Projects;
