import { useEffect, useState } from 'react';
import '../styles/transitions/ExperienceTransition.css';

const CODE_LINES = [
  '> Loading experience.json...',
  '> role: "SDE Intern"',
  '> company: "Airtel"',
  '> skills: ["React", "Node", "MongoDB"]',
  '> status: "Currently Working"',
  '> Rendering timeline...',
  '> Done. ✓',
];

export default function ExperienceTransition({ onDone }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [typedChars,   setTypedChars]   = useState(0);
  const [lineIdx,      setLineIdx]      = useState(0);

  useEffect(() => {
    const done = setTimeout(() => onDone(), 2700);
    return () => clearTimeout(done);
  }, [onDone]);

  /* Type each line character by character */
  useEffect(() => {
    if (lineIdx >= CODE_LINES.length) return;
    const line = CODE_LINES[lineIdx];
    if (typedChars < line.length) {
      const t = setTimeout(() => setTypedChars(c => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        setTypedChars(0);
        setLineIdx(i => i + 1);
      }, 120);
      return () => clearTimeout(t);
    }
  }, [lineIdx, typedChars]);

  const currentLine = lineIdx < CODE_LINES.length
    ? CODE_LINES[lineIdx].slice(0, typedChars)
    : '';

  return (
    <div className="term-overlay">
      {/* Scanline effect */}
      <div className="term-scanlines" />

      {/* Grid */}
      <div className="term-grid" />

      {/* Terminal window */}
      <div className="term-window">
        {/* Title bar */}
        <div className="term-titlebar">
          <div className="term-dot term-dot-red"   />
          <div className="term-dot term-dot-yellow"/>
          <div className="term-dot term-dot-green" />
          <span className="term-title">experience.sh</span>
        </div>

        {/* Terminal body */}
        <div className="term-body">
          {visibleLines.map((line, i) => (
            <div key={i} className={`term-line ${line.includes('Done') ? 'term-line-success' : ''}`}>
              {line}
            </div>
          ))}
          {lineIdx < CODE_LINES.length && (
            <div className="term-line term-line-active">
              {currentLine}
              <span className="term-cursor">|</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating binary */}
      {['01','10','11','00','10','01','11'].map((b, i) => (
        <div key={i} className="term-binary" style={{
          left:             `${5 + i * 14}%`,
          animationDelay:   `${i * 0.2}s`,
          animationDuration: `${2 + (i % 3) * 0.5}s`,
          opacity: 0.15 + (i % 3) * 0.08,
        }}>{b}</div>
      ))}

      {/* Stars */}
      {Array.from({ length: 35 }).map((_, i) => (
        <div key={i} className="term-star" style={{
          left:  `${Math.random() * 100}%`,
          top:   `${Math.random() * 100}%`,
          width:  `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          animationDelay: `${Math.random() * 2}s`,
        }} />
      ))}
    </div>
  );
}