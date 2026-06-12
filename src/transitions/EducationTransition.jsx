import { useEffect, useState } from 'react';
import '../styles/transitions/EducationTransition.css';

export default function EducationTransition({ onDone }) {
  const [phase, setPhase] = useState('closed'); // closed → opening → fluttering → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'),    300);
    const t2 = setTimeout(() => setPhase('fluttering'), 1100);
    const t3 = setTimeout(() => setPhase('done'),       2400);
    const t4 = setTimeout(() => onDone(),               2700);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, [onDone]);

  /* 8 flutter pages with staggered delays */
  const flutterPages = Array.from({ length: 8 }).map((_, i) => ({
    delay: i * 0.1,
    rotation: -30 + i * 8,
    tx: -20 + i * 6,
    ty: -10 - i * 8,
  }));

  return (
    <div className="bk-overlay">
      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="bk-star" style={{
          left:  `${Math.random() * 100}%`,
          top:   `${Math.random() * 100}%`,
          width:  `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          animationDelay: `${Math.random() * 2}s`,
        }} />
      ))}

      {/* Floating particles when fluttering */}
      {phase === 'fluttering' && Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="bk-float-particle" style={{
          left: `${30 + Math.random() * 40}%`,
          bottom: `${35 + Math.random() * 20}%`,
          animationDelay: `${i * 0.07}s`,
          width:  `${30 + Math.random() * 50}px`,
          height: `${2 + Math.random() * 3}px`,
          '--drift': `${(Math.random() - 0.5) * 120}px`,
          '--rot':   `${(Math.random() - 0.5) * 40}deg`,
        }} />
      ))}

      {/* Main book */}
      <div className={`bk-scene bk-scene-${phase}`}>

        {/* Right page (static, always visible) */}
        <div className="bk-page bk-page-right">
          <div className="bk-page-lines">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bk-line" style={{
                width: `${55 + Math.random() * 35}%`,
                opacity: 0.25 + Math.random() * 0.2,
              }} />
            ))}
          </div>
          <div className="bk-page-corner bk-corner-br" />
        </div>

        {/* Spine */}
        <div className="bk-spine" />

        {/* Left page — opens from closed (folded right) to flat left */}
        <div className={`bk-page bk-page-left bk-page-left-${phase}`}>
          <div className="bk-page-lines">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bk-line" style={{
                width: `${55 + Math.random() * 35}%`,
                opacity: 0.25 + Math.random() * 0.2,
              }} />
            ))}
          </div>
          {/* Gradient fade on fold */}
          <div className="bk-page-fold-shadow" />
          <div className="bk-page-corner bk-corner-bl" />
        </div>

        {/* Flutter pages — fly out when fluttering */}
        {phase === 'fluttering' && flutterPages.map((p, i) => (
          <div
            key={i}
            className="bk-flutter-page"
            style={{
              animationDelay:    `${p.delay}s`,
              '--rot': `${p.rotation}deg`,
              '--tx':  `${p.tx}px`,
              '--ty':  `${p.ty}px`,
              zIndex: 10 + i,
            }}
          />
        ))}

        {/* Book cover bottom */}
        <div className="bk-cover-bottom" />
      </div>

      {/* Glow under book */}
      <div className="bk-floor-glow" />

      {/* Text */}
      <div className="bk-text">Opening Education...</div>
    </div>
  );
}