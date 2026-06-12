import { useEffect } from 'react';
import '../styles/transitions/AboutTransition.css';

export default function AboutTransition({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => onDone(), 2600);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="abt-overlay">
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className="abt-star" style={{
          left:   `${Math.random() * 100}%`,
          top:    `${Math.random() * 100}%`,
          width:  `${Math.random() * 2.5 + 1}px`,
          height: `${Math.random() * 2.5 + 1}px`,
          animationDelay: `${Math.random() * 2}s`,
        }} />
      ))}

      {/* Paper Airplane — large white origami style */}
      <div className="abt-plane-wrap">
        <svg
          className="abt-plane"
          viewBox="0 0 260 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main body — top half */}
          <path
            d="M10 60 L240 10 L160 60 Z"
            fill="white"
            stroke="rgba(200,200,255,0.6)"
            strokeWidth="1"
          />
          {/* Main body — bottom half */}
          <path
            d="M10 60 L240 10 L160 60 L140 90 Z"
            fill="#e8e8ff"
            stroke="rgba(200,200,255,0.6)"
            strokeWidth="1"
          />
          {/* Inner fold crease top */}
          <path
            d="M10 60 L160 60"
            stroke="rgba(160,160,220,0.8)"
            strokeWidth="1.5"
          />
          {/* Wing fold line */}
          <path
            d="M160 60 L240 10"
            stroke="rgba(160,160,220,0.7)"
            strokeWidth="1"
          />
          {/* Bottom flap fold */}
          <path
            d="M140 90 L160 60 L200 40"
            stroke="rgba(160,160,220,0.6)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          {/* Nose shadow */}
          <path
            d="M200 28 L240 10 L180 44 Z"
            fill="rgba(180,180,255,0.4)"
          />
          {/* Center fold highlight */}
          <path
            d="M10 60 L80 38"
            stroke="white"
            strokeWidth="2"
            strokeOpacity="0.6"
          />
        </svg>

        {/* Dotted trail */}
        <div className="abt-trail">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="abt-trail-dot"
              style={{ animationDelay: `${i * 0.06}s` }}
            />
          ))}
        </div>
      </div>

      <div className="abt-text">About Me</div>
      <div className="abt-horizon-glow" />
    </div>
  );
}