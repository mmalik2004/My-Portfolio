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
      'Developed responsive web applications using React.js, JavaScript, HTML5, and CSS3 for internal business tools.',
      'Created reusable UI components and implemented modern frontend practices to improve maintainability and user experience.',
      'Contributed to debugging, testing, and code review processes while working in an Agile development environment',
      'Improved application responsiveness and ensured compatibility across multiple browsers and screen sizes.',
    ],
    tags: ['React', 'JavaScript', 'Responsive Design', 'Advanced CSS'],
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