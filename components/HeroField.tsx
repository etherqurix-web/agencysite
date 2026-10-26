'use client';

import { useEffect, useRef } from 'react';

type Point = { x: number; y: number; vx: number; vy: number; r: number };

/** Lightweight animated node network (no external scripts). */
export default function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0, onScreen = true;
    const mouse = { x: -9999, y: -9999 };
    let pts: Point[] = [];

    const build = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 15000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.3 + 0.6,
      }));
    };

    const LINK = 125, MOUSE_LINK = 170;
    const frame = (move: boolean) => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (move) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(77,163,255,${(1 - d / LINK) * 0.32})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < MOUSE_LINK) {
          ctx.strokeStyle = `rgba(53,209,230,${(1 - dm / MOUSE_LINK) * 0.55})`;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = 'rgba(160,210,255,.85)';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    };

    const loop = () => {
      if (onScreen && !document.hidden) frame(true);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };

    build();
    const ro = new ResizeObserver(() => { build(); if (reduce) frame(false); });
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; });
    io.observe(host);

    if (reduce) frame(false);
    else {
      raf = requestAnimationFrame(loop);
      window.addEventListener('pointermove', onMove, { passive: true });
      host.addEventListener('pointerleave', onLeave);
    }

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
