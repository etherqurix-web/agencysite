'use client';

type Props = {
  open: boolean;
  onClose: () => void;
  items: readonly (readonly [string, string])[];
  onNavigate: (id: string) => void;
  onContact: () => void;
  time: string;
};

export default function AetherMenuOverlay({ open, onClose, items, onNavigate, onContact, time }: Props) {
  return (
    <div className={`aq-menu-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="aq-menu-glow" />
      <div className="aq-menu-top shell">
        <div className="brand">
          <img className="brand-mark" src="/assets/aetherquorix-mark-light.png" alt="" aria-hidden="true" />
          <span className="brand-word">Aetherquorix</span>
        </div>
        <button className="aq-menu-close" type="button" onClick={onClose} aria-label="Close menu">
          <span className="aq-close-lines"><i /><i /></span> Close
        </button>
      </div>
      <nav className="aq-menu-main shell" aria-label="Menu">
        <ul>
          {items.map(([label, id], index) => (
            <li key={id} style={{ transitionDelay: `${index * 60 + 120}ms` }}>
              <button type="button" onClick={() => { onClose(); if (id === 'contact') onContact(); else onNavigate(id); }}>
                <span className="aq-menu-index">0{index + 1}</span>
                <span>{label}</span>
                <span className="aq-menu-arrow">↗</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="aq-menu-bottom shell">
        <span>Local time — <strong>{time}</strong></span>
        <button type="button" onClick={() => { onClose(); onContact(); }}>Start a project <span>↗</span></button>
      </div>
    </div>
  );
}
