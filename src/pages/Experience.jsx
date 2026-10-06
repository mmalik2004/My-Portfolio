/* Experience.jsx — animated timeline, SDE Intern @ Airtel */
import { useEffect, useRef } from 'react';
import '../styles/Experience.css';

const EXPERIENCES = [
  {
    role: 'Software Development Engineer Intern',
    company: 'Airtel (Bharti Airtel)',
    period: 'May 2026 – Present',
    type: 'active',
    badge: '● Currently Working',
   bullets: [
    'Developed RESTful APIs with Spring Boot, implementing complete CRUD operations and establishing connections to MySQL and MongoDB databases.',
    'Tested and validated endpoints with Postman, handling edge cases and response payloads to ensure service reliability.',
    'Built responsive UI modules using React.js, JavaScript, and CSS3, following clean coding practices for maintainability.',
    'Collaborated with senior engineers in an Agile setting, participating in daily standups, code reviews, and debugging tasks.',
  ],
  tags: ['Spring Boot', 'Java', 'REST APIs', 'MySQL', 'MongoDB', 'Postman', 'React.js'],
    dotActive: true,
  },
];

/* Stagger hook — items slide in one by one on scroll */
function useStaggerReveal(ref, selector) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(selector);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Array.from(items).indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('visible'), idx * 200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [ref, selector]);
}

export default function Experience() {
  const timelineRef = useRef(null);
  useStaggerReveal(timelineRef, '.exp-item');

  return (
    <div className="page">
      <div className="container">

        {/* Header */}
        <div className="section-header reveal">
          <p className="section-tag">Work History</p>
          <h2 className="section-title">Experience</h2>
          <div className="section-line" />
        </div>

        {/* Timeline */}
        <div className="exp-timeline" ref={timelineRef}>
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="exp-item">

              {/* Timeline dot */}
              <div className={`exp-dot ${exp.dotActive ? 'active' : ''}`} />

              {/* Card */}
              <div className="glass exp-card">
                <div className="exp-top">
                  <h3 className="exp-role">{exp.role}</h3>
                  <span className={`exp-badge ${exp.type === 'active' ? 'exp-badge-active' : 'exp-badge-done'}`}>
                    {exp.badge}
                  </span>
                </div>

                <p className="exp-company">{exp.company}</p>
                <p className="exp-period">{exp.period}</p>

                <ul className="exp-bullets">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="exp-bullet">{b}</li>
                  ))}
                </ul>

                <div className="exp-tags">
                  {exp.tags.map((t) => <span key={t} className="exp-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}
