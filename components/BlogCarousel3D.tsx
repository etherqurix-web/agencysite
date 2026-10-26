'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { BlogPost } from '../lib/blog';

type Props = { posts: readonly BlogPost[] };

export default function BlogCarousel3D({ posts }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = posts.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % count), 5600);
    return () => window.clearInterval(id);
  }, [count, paused]);

  if (!count) return null;

  return (
    <div className="blog-carousel-3d" aria-label="Aetherquorix journal carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="blog-carousel-stage">
        <div className="blog-carousel-track">
          {posts.map((post, index) => {
            let offset = index - active;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`blog-3d-card ${isActive ? 'is-active' : ''}`}
                onClick={(e) => { if (!isActive) { e.preventDefault(); setActive(index); } }}
                tabIndex={isActive ? 0 : -1}
                style={{ '--blog-offset': offset, '--blog-abs': abs } as React.CSSProperties}
              >
                <div className="blog-3d-visual">
                  <span className="blog-number">0{index + 1}</span>
                  <img className="blog-3d-mark" src="/assets/aetherquorix-mark-light.png" alt="" aria-hidden="true" />
                  <span className="blog-3d-category">{post.category}</span>
                </div>
                <div className="blog-3d-body">
                  <div className="blog-meta"><span>{post.read}</span><span>{post.date}</span></div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="blog-3d-read">Read article →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="carousel-controls">
        <button type="button" onClick={() => setActive((v) => (v - 1 + count) % count)} aria-label="Previous article">←</button>
        <div className="carousel-dots">
          {posts.map((post, index) => (
            <button key={post.slug} type="button" className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Go to article ${index + 1}`} />
          ))}
        </div>
        <button type="button" onClick={() => setActive((v) => (v + 1) % count)} aria-label="Next article">→</button>
      </div>
    </div>
  );
}
