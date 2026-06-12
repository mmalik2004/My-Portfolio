import { useState } from 'react';
import PortfolioForm from './PortfolioForm';
import '../styles/PortfolioFAB.css';

const WandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8 19 13M17.8 6.2 19 5M3 21l9-9M12.2 6.2 11 5"/>
    <path d="m5 3 1 1"/>
  </svg>
);

export default function PortfolioFAB() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="portfolio-fab"
        onClick={() => setOpen(true)}
        aria-label="Make your own portfolio"
        title="Make your own portfolio"
      >
        <WandIcon />
        <span className="fab-label">Create Your Own Portfolio</span>
      </button>

      {/* Modal overlay */}
      {open && <PortfolioForm onClose={() => setOpen(false)} />}
    </>
  );
}