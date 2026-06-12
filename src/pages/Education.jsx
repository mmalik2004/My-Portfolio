/* Education.jsx — one-by-one stagger for achievements & leadership */
import { useEffect, useRef } from 'react';
import '../styles/Education.css';

const EDUCATION = [
  {
    degree: 'B.Tech — Computer Engineering',
    school: 'J.C. Bose University of Science & Technology, YMCA',
    period: 'Jul 2022 – Present',
    grade: 'CGPA: 8.40',
    desc: 'Full-stack web dev, DSA, and real-time systems. Active member of Manan — A TechnoSurge.',
    accentGrad: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
    cardClass: 'edu-card-purple', periodColor: '#8b5cf6',
  },
  {
    degree: 'CBSE — Class XII',
    school: 'Vivekanand Vidya Niketan, Karnal',
    period: '2021 – 2022', grade: 'Percentage: 91%',
    desc: 'Science stream. Secured top 5% in board examinations.',
    accentGrad: 'linear-gradient(90deg, #10b981, #06b6d4)',
    cardClass: 'edu-card-green', periodColor: '#10b981',
  },
  {
    degree: 'CBSE — Class X',
    school: 'Vivekanand Vidya Niketan, Karnal',
    period: '2019 – 2020', grade: 'Percentage: 95%',
    desc: 'Scored 100/100 marks in Mathematics board examination. Participated in national-level olympiads.',
    accentGrad: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
    cardClass: 'edu-card-blue', periodColor: '#3b82f6',
  },
];

const ACHIEVEMENTS = [
  { rank: '01', text: <><strong>Top 1.92%</strong> among <strong>1.2M+ candidates</strong> in the national-level JEE Main entrance examination.</> },
  { rank: '02', text: <>Achieved <strong>AIR 23K</strong> among <strong>130K participants</strong> in Naukri Campus Young Turks 2025.</> },
  { rank: '03', text: <>Placed in the <strong>top 10%</strong> of <strong>500+ teams</strong> at Vihaan 007 Hackathon (DTU Delhi).</> },
  { rank: '04', text: <>Solved <strong>900+ coding problems</strong> — accelerated feature development by <strong>15%</strong>, improving app performance.</> },
];

const LEADERSHIP = [
  { title: 'Manan — TechnoSurge, YMCA', detail: 'Active member since 2023. Coding competitions, workshops, and technical events.' },
  { title: 'Zenith — 24h Hackathon Organizer', detail: 'Organized a cross-college hackathon with 10+ member team — logistics, execution, participant experience.' },
];

/* Stagger hook: each item slides in with 180ms delay between them */
function useStaggerReveal(ref, selector) {
  useEffect(() => {
    const el = ref.current;
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

export default function Education() {
  const achRef  = useRef(null);
  const leadRef = useRef(null);
  useStaggerReveal(achRef,  '.ach-card');
  useStaggerReveal(leadRef, '.lead-card');

  return (
    <div className="page">
      <div className="container">

        {/* Education */}
        <div className="section-header reveal">
          <p className="section-tag">My Background</p>
          <h2 className="section-title">Education</h2>
          <div className="section-line" />
        </div>
        <div className="edu-grid">
          {EDUCATION.map((item, i) => (
            <div key={item.degree} className={`glass edu-card ${item.cardClass} reveal`} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="edu-card-accent" style={{ background: item.accentGrad }} />
              <p className="edu-period" style={{ color: item.periodColor }}>{item.period}</p>
              <h3 className="edu-degree">{item.degree}</h3>
              <p className="edu-school">{item.school}</p>
              <span className="edu-grade-badge">{item.grade}</span>
              <p className="edu-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="section-header reveal achievements-section">
          <p className="section-tag">Highlights</p>
          <h2 className="section-title">Achievements</h2>
          <div className="section-line" />
        </div>
        <div className="achievements-list" ref={achRef}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} className="glass ach-card">
              <div className="ach-rank">{a.rank}</div>
              <p className="ach-text">{a.text}</p>
            </div>
          ))}
        </div>

        {/* Leadership */}
        <div className="section-header reveal" style={{ marginTop: 76 }}>
          <p className="section-tag">Activities</p>
          <h2 className="section-title">Leadership</h2>
          <div className="section-line" />
        </div>
        <div className="leadership-grid" ref={leadRef}>
          {LEADERSHIP.map((l, i) => (
            <div key={i} className="glass lead-card">
              <div className="lead-dot" />
              <p className="lead-text">
                <strong>{l.title}</strong>
                {l.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}