import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { getAllNews } from '../lib/github';

export default function NewsArchive({ newsList }) {

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
    <title>أرشيف الأخبار والإنجازات | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
    <meta name="description" content="أرشيف أخبار وإنجازات مؤسسة الأستاذ محمود عبد الحميد – أحدث الأحكام، المشاركات المجتمعية، وتطورات المكتب القانوني." />
    <link rel="canonical" href="https://ostazlaw.vercel.app/news-archive" />
    </Head>

    <style jsx>{`
      .hero-blog {
        padding: 120px 2rem 4rem;
        background: var(--very-dark-navy);
        position: relative;
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
      .experience-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.2rem;
      }
      .experience-card {
        background: var(--pure-white);
        padding: 1.6rem 1.2rem;
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        transition: all 0.4s var(--ease-out);
        text-align: right;
        height: 100%;
      }
      .experience-card:hover {
        border-color: var(--matte-gold);
        transform: translateY(-4px);
      }
      @media (max-width: 1024px) {
        .experience-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 640px) {
        .experience-grid { grid-template-columns: 1fr; }
      }
      `}</style>

      <section className="hero-blog" aria-label="أرشيف الأخبار">
      <div className="hero-inner">
      <div className="hero-title-wrap reveal">
      <span className="en-tag" style={{ color: 'var(--matte-gold)', fontSize: '0.7rem', display: 'block', marginBottom: '0.5rem' }}>News Archive</span>
      <h1>أرشيف <span className="gold-text">الأخبار</span></h1>
      <p className="sub">جميع مستجدات وأخبار مؤسسة الأستاذ محمود عبد الحميد – أحكام قضائية، مشاركات فقهية، وتطورات مكتبية.</p>
      </div>
      </div>
      </section>

      <section className="blog-section" aria-label="قائمة الأخبار">
      <div className="inner" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="experience-grid">
      {newsList.length === 0 ? (
        <div className="col-span-full text-center py-16" style={{ gridColumn: 'span 3', color: 'var(--matte-gold)', fontWeight: 'bold' }}>
        <i className="far fa-clock mb-3" style={{ fontSize: '2.5rem', display: 'block' }}></i>
        قريباً - سنقوم بإضافة ونشر أحدث أخبار ومستجدات مكتبنا القانوني هنا فور صدورها.
        </div>
      ) : (
        newsList.map((item, i) => (
          <Link href={`/news/${item.slug}`} className="sector-link" key={i}>
          <div className="experience-card reveal">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ background: 'var(--matte-gold)', color: '#000', padding: '0.1rem 0.8rem', borderRadius: '20px', fontSize: '0.6rem', fontWeight: '800' }}>
          {item.category || 'خبر'}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{item.date}</span>
          </div>
          <span className="icon" style={{ fontSize: '1.5rem', color: 'var(--matte-gold)', marginBottom: '0.5rem', display: 'block' }}>
          <i className={`fas ${item.icon || 'fa-newspaper'}`}></i>
          </span>
          <h4>{item.title}</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--charcoal)', fontWeight: '700' }}>{item.description}</p>
          <span style={{ color: 'var(--matte-gold)', fontWeight: '700', fontSize: '0.8rem', marginTop: '0.5rem', display: 'inline-block' }}>
          اقرأ التفاصيل ←
          </span>
          </div>
          </Link>
        ))
      )}
      </div>
      </div>
      </section>
      </>
  );
}

export async function getStaticProps() {
  const newsList = await getAllNews();
  return {
    props: {
      newsList,
    },
    revalidate: 60,
  };
}
