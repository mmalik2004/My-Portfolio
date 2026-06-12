import { useEffect } from 'react';
import '../styles/transitions/ProjectsTransition.css';

export default function ProjectsTransition({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => onDone(), 2600);
    return () => clearTimeout(timer);
  }, [onDone]);

  const particles = Array.from({ length: 28 }).map((_, i) => ({
    left:   `${44 + (Math.random() - 0.5) * 12}%`,
    bottom: `${18 + Math.random() * 8}%`,
    animationDelay:    `${0.2 + i * 0.05}s`,
    animationDuration: `${0.7 + Math.random() * 0.6}s`,
    width:  `${4 + Math.random() * 5}px`,
    height: `${4 + Math.random() * 5}px`,
    background: i % 3 === 0
      ? '#ec4899'
      : i % 3 === 1
      ? '#f97316'
      : '#fbbf24',
    '--drift': `${(Math.random() - 0.5) * 90}px`,
  }));

  return (
    <div className="rkt-overlay">
      {Array.from({ length: 55 }).map((_, i) => (
        <div key={i} className="rkt-star" style={{
          left:   `${Math.random() * 100}%`,
          top:    `${Math.random() * 100}%`,
          width:  `${Math.random() * 2.5 + 1}px`,
          height: `${Math.random() * 2.5 + 1}px`,
          animationDelay: `${Math.random() * 2}s`,
        }} />
      ))}

      <div className="rkt-launchpad-glow" />

      {particles.map((p, i) => (
        <div key={i} className="rkt-particle" style={p} />
      ))}

      <div className="rkt-rocket-wrap">
        {/* Exhaust flame BELOW rocket */}
        <div className="rkt-flame-wrap">
          <div className="rkt-flame rkt-flame-outer" />
          <div className="rkt-flame rkt-flame-mid" />
          <div className="rkt-flame rkt-flame-inner" />
        </div>

        <svg
          className="rkt-rocket"
          viewBox="0 0 90 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Nose cone */}
          <path
            d="M45 4 Q62 30 62 60 L28 60 Q28 30 45 4Z"
            fill="url(#noseGrad)"
            stroke="#a78bfa"
            strokeWidth="1.5"
          />
          {/* Body */}
          <rect
            x="28" y="58" width="34" height="72" rx="4"
            fill="#1e1b4b"
            stroke="#8b5cf6"
            strokeWidth="2"
          />
          {/* Body side stripe */}
          <rect x="28" y="70" width="34" height="4" fill="rgba(139,92,246,0.3)" />
          <rect x="28" y="112" width="34" height="4" fill="rgba(236,72,153,0.3)" />

          {/* Porthole window */}
          <circle cx="45" cy="90" r="11" fill="#0f0a2e" stroke="#c4b5fd" strokeWidth="2"/>
          <circle cx="45" cy="90" r="7"  fill="#080618"/>
          <circle cx="41" cy="86" r="2.5" fill="rgba(139,92,246,0.6)"/>
          <circle cx="48" cy="86" r="1.5" fill="rgba(255,255,255,0.3)"/>

          {/* Left fin */}
          <path
            d="M28 112 L8  148 L28 136 Z"
            fill="#6d28d9"
            stroke="#a78bfa"
            strokeWidth="1.5"
          />
          {/* Right fin */}
          <path
            d="M62 112 L82 148 L62 136 Z"
            fill="#6d28d9"
            stroke="#a78bfa"
            strokeWidth="1.5"
          />

          {/* Engine nozzle */}
          <path
            d="M32 130 Q45 138 58 130 L56 148 Q45 156 34 148 Z"
            fill="#1e1b4b"
            stroke="#ec4899"
            strokeWidth="2"
          />
          {/* Nozzle inner */}
          <ellipse cx="45" cy="148" rx="10" ry="5"
            fill="rgba(236,72,153,0.4)"
          />

          {/* Body rivets */}
          <circle cx="32" cy="78" r="1.5" fill="rgba(167,139,250,0.4)"/>
          <circle cx="58" cy="78" r="1.5" fill="rgba(167,139,250,0.4)"/>
          <circle cx="32" cy="108" r="1.5" fill="rgba(167,139,250,0.4)"/>
          <circle cx="58" cy="108" r="1.5" fill="rgba(167,139,250,0.4)"/>

          <defs>
            <linearGradient id="noseGrad" x1="45" y1="4" x2="45" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#ec4899"/>
              <stop offset="100%" stopColor="#7c3aed"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="rkt-launch-text">Launching Projects...</div>
    </div>
  );
}