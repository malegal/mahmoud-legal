import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { getAllArticles } from '../lib/github';

export default function Blog({ articles }) {

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  return (
    <>
    <Head>
    <title>المكتبة القانونية | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
    <meta name="description" content="المكتبة القانونية لمؤسسة الأستاذ محمود عبد الحميد – مقالات وتحليلات قانونية متخصصة في مختلف مجالات القانون المصري." />
    <link rel="canonical" href="https://ostazlaw.vercel.app/blog" />
    </Head>

    <style jsx>{`
      .hero-blog {
        padding: 120px 2rem 4rem;
        background: var(--very-dark-navy);
        position: relative;
        overflow: hidden;
        min-height: 45vh;
        display: flex;
        align-items: center;
      }
      .hero-inner {
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
        position: relative;
        z-index: 1;
      }
      .hero-title-wrap { text-align: center; }
      .hero-title-wrap h1 { font-family: var(--font-serif); font-size: clamp(2.4rem, 5vw, 4rem); color: #fff; }
      .hero-title-wrap .sub {
        font-size: clamp(1rem, 1.3vw, 1.2rem);
        color: rgba(255, 255, 255, 0.7);
        max-width: 700px;
        margin: 0.8rem auto 0;
        line-height: 1.7;
      }
      .blog-section { padding: 5rem 2rem; background: var(--warm-off-white); }
      .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
      .blog-card {
        background: var(--pure-white);
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.04);
        transition: all 0.4s var(--ease-out);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
        display: flex;
        flex-direction: column;
      }
      .blog-card:hover {
        border-color: var(--matte-gold);
        transform: translateY(-6px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.04);
      }
      .card-body { padding: 1.5rem 1.4rem; flex: 1; display: flex; flex-direction: column; }
      .badge {
        font-size: 0.65rem;
        font-weight: 700;
        color: var(--matte-gold);
        margin-bottom: 0.5rem;
        display: inline-block;
      }
      .blog-card h3 { font-size: 1.1rem; font-weight: bold; color: var(--charcoal); line-height: 1.5; margin-bottom: 0.5rem; }
      .meta {
        font-size: 0.75rem;
        color: var(--charcoal);
        font-weight: 700;
        margin-bottom: 1rem;
        display: flex;
        gap: 0.8rem;
      }
      .btn-read {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--matte-gold);
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        margin-top: auto;
      }
      @media (max-width: 1024px) {
        .blog-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 640px) {
        .blog-grid { grid-template-columns: 1fr; }
      }
      `}</style>

      <section className="hero-blog" aria-label="المكتبة القانونية">
      <div className="hero-inner">
      <div className="hero-title-wrap reveal">
      <span className="en-tag" style={{ color: 'var(--matte-gold)', fontSize: '0.7rem', display: 'block', marginBottom: '0.5rem' }}>Legal Library</span>
      <h1>المكتبة <span className="gold-text">القانونية</span></h1>
      <p className="sub">مقالات وتحليلات قانونية ودراسات قضائية متخصصة، يكتبها الأستاذ محمود عبد الحميد المحامي بالنقض والدستورية العليا.</p>
      </div>
      </div>
      </section>

      <section className="blog-section" aria-label="قائمة المقالات">
      <div className="inner" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="blog-grid">
      {articles.length === 0 ? (
        <div className="col-span-full text-center py-10" style={{ gridColumn: 'span 3' }}>لا توجد مقالات منشورة حالياً.</div>
      ) : (
        articles.map((art, i) => (
          <div className="blog-card reveal" key={i}>
          <div className="card-body">
          <span className="badge">📘 دراسة قانونية</span>
          <h3>{art.title}</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--charcoal)', fontWeight: '700', marginBottom: '1rem' }}>{art.description}</p>
          <div className="meta">
          <span><i className="far fa-calendar-alt" style={{ marginLeft: '4px' }}></i> {art.date}</span>
          </div>
          <Link href={`/article/${art.slug}`} className="btn-read">
          استعراض الدراسة <i className="fas fa-arrow-left"></i>
          </Link>
          </div>
          </div>
        ))
      )}
      </div>
      </div>
      </section>
      </>
  );
}

export async function getStaticProps() {
  const articles = await getAllArticles();
  return {
    props: {
      articles,
    },
    revalidate: 60,
  };
}
