import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '../../../lib/blog';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return post ? { title: `${post.title} — Aetherquorix`, description: post.excerpt } : {};
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const index = blogPosts.findIndex((item) => item.slug === post.slug) + 1;

  return (
    <main className="article-page">
      <div className="shell article-top">
        <Link href="/" className="brand" aria-label="Aetherquorix home">
          <img className="brand-mark" src="/assets/aetherquorix-mark-light.png" alt="" aria-hidden="true" />
          <span className="brand-word">Aetherquorix</span>
        </Link>
      </div>
      <div className="shell article-shell">
        <Link href="/#blog" className="article-back">← Back to journal</Link>
        <div className="article-kicker">{post.category} · {post.read}</div>
        <h1>{post.title}</h1>
        <p className="article-excerpt">{post.excerpt}</p>
        <div className="article-meta">{post.date}</div>
        <div className="article-hero">
          <span>0{index}</span>
          <img className="article-hero-mark" src="/assets/aetherquorix-mark-light.png" alt="" aria-hidden="true" />
          <strong>AETHERQUORIX</strong>
        </div>
        <article>
          {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </article>
        <div className="article-tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <Link href="/#blog" className="pill primary article-cta"><span>More from the journal</span></Link>
      </div>
    </main>
  );
}
