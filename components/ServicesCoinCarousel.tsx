'use client';

import { useEffect, useState } from 'react';

const services = [
  ['01', 'AI Products & Agents', 'Custom AI tools, document intelligence, copilots, agents and computer vision.'],
  ['02', 'AI Automation & Integrations', 'Intelligent workflows connecting CRMs, ERPs, APIs, documents and internal operations.'],
  ['03', 'Software & Digital Products', 'Web apps, dashboards, SaaS interfaces, backend systems, APIs and product experiences.'],
  ['04', 'Graphic & Brand Design', 'Brand identity, social systems, marketing creatives, presentations, UI/UX and visual communication.'],
  ['05', '3D Interior & Exterior', 'Photoreal architectural visualization, materials, lighting, product scenes and 3D environments.'],
  ['06', 'AI + Creative Consulting', 'Practical strategy across AI, automation, design and 3D, turned into an executable roadmap.'],
] as const;

export default function ServicesCoinCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = services.length;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % count), 5200);
    return () => window.clearInterval(id);
  }, [paused, count]);

  return (
    <div className="service-coins" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="service-coins-stage">
        <div className="service-coins-orbit" aria-live="polite">
          {services.map((service, index) => {
            let offset = (index - active + count) % count;
            if (offset > count / 2) offset -= count;
            const abs = Math.abs(offset);
            return (
              <button
                type="button"
                className={`service-coin ${offset === 0 ? 'is-active' : ''}`}
                key={service[0]}
                onClick={() => setActive(index)}
                aria-label={`Show ${service[1]}`}
                style={{
                  '--coin-angle': `${offset * 38}deg`,
                  '--coin-depth': Math.max(0.5, 1 - abs * 0.16),
                  '--coin-opacity': Math.max(0.28, 1 - abs * 0.3),
                  '--coin-index': offset,
                  zIndex: 20 - abs,
                } as React.CSSProperties}
              >
                <span className="service-coin-face">
                  <span className="service-coin-number">{service[0]}</span>
                  <span className="service-coin-title">{service[1]}</span>
                  <span className="service-coin-description">{service[2]}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="carousel-controls">
        <button type="button" onClick={() => setActive((v) => (v - 1 + count) % count)} aria-label="Previous service">←</button>
        <div className="carousel-dots">
          {services.map((service, index) => (
            <button type="button" key={service[0]} className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Go to service ${service[0]}`} />
          ))}
        </div>
        <button type="button" onClick={() => setActive((v) => (v + 1) % count)} aria-label="Next service">→</button>
      </div>
    </div>
  );
}
