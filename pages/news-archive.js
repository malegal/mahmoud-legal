import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { getAllNews } from '../lib/github';

export default function NewsArchive({ newsItems }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const badgeColors = {
    'إنجاز قضائي': 'background:var(--matte-gold); color:#000;',
    'فعالية': 'background:var(--deep-navy); color:#fff;',
    'تطوير': 'background:var(--very-dark-navy); color:#fff;',
  };

  // مكون الصف للقائمة الافتراضية
  const Row = ({ index, style, data }) => {
    const item = data[index];
    const badgeStyle = badgeColors[item.category] || 'background:var(--matte-gold); color:#000;';
    return (
      <div style={style} className="news-list-item">
        <div className="sector-link" style={{ display: 'block' }}>
          <Link href={`/news/${item.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            <div className="experience-card reveal" style={{ textAlign: 'right', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ ...badgeStyle, padding: '0.1rem 0.8rem', borderRadius: '20px', fontSize: '0.6rem', fontWeight: '800' }}>
                  {item.category || 'خبر'}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  {item.date ? new Date(item.date).toLocaleDateString('ar-EG') : ''}
                </span>
              </div>
              <span className="icon"><i className={`fas ${item.icon || 'fa-newspaper'}`} style={{ fontSize: '1.5rem' }}></i></span>
              <h4>{item.title}</h4>
              <p>{item.description || ''}</p>
              <span style={{ color: 'var(--matte-gold)', fontWeight: '700', fontSize: '0.8rem', marginTop: '0.5rem', display: 'inline-block' }}>
                اقرأ التفاصيل ←
              </span>
            </div>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <Head>
        <title>أرشيف الأخبار والإنجازات | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
        <meta name="description" content="أرشيف أخبار وإنجازات مؤسسة الأستاذ محمود عبد الحميد – أحدث الأحكام، المشاركات المجتمعية، وتطورات المكتب القانوني." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ostazlaw.vercel.app/news-archive.html" />
        <link rel="alternate" hreflang="ar-eg" href="https://ostazlaw.vercel.app/news-archive.html" />
        <link rel="alternate" hreflang="en" href="https://ostazlaw.vercel.app/en/news-archive.html" />
        <meta property="og:title" content="أرشيف الأخبار والإنجازات | الأستاذ محمود عبد الحميد" />
        <meta property="og:description" content="أرشيف أخبار وإنجازات مؤسسة الأستاذ محمود عبد الحميد – أحدث الأحكام والمشاركات المجتمعية." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/news-archive.html" />
        <meta property="og:image" content="https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.jpg" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" />
        <meta property="og:locale" content="ar_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.jpg" />
        <meta name="twitter:image:alt" content="الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LegalService",
                  "@id": "https://ostazlaw.vercel.app/#organization",
                  "name": "مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية",
                  "alternateName": "OSTAZ LAW",
                  "description": "مؤسسة قانونية مصرية تقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات.",
                  "url": "https://ostazlaw.vercel.app/",
                  "logo": "https://ostazlaw.vercel.app/logo.png",
                  "email": "ma.law.firm@outlook.com",
                  "telephone": "+201101076000",
                  "foundingDate": "2005",
                  "areaServed": { "@type": "Country", "name": "مصر" },
                  "availableLanguage": ["Arabic", "English"],
                  "sameAs": [
                    "https://www.facebook.com/malegal",
                    "https://x.com/mahmoud_a_hamyd",
                    "https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374"
                  ],
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "القاهرة",
                    "addressCountry": "مصر"
                  }
                },
                {
                  "@type": "Person",
                  "@id": "https://ostazlaw.vercel.app/#founder",
                  "name": "محمود عبد الحميد",
                  "jobTitle": "المحامي بالنقض والدستورية العليا",
                  "worksFor": { "@id": "https://ostazlaw.vercel.app/#organization" },
                  "url": "https://ostazlaw.vercel.app/about.html",
                  "image": {
                    "@type": "ImageObject",
                    "url": "https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.jpg",
                    "caption": "الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا"
                  }
                },
                {
                  "@type": "CollectionPage",
                  "@id": "https://ostazlaw.vercel.app/news-archive.html#webpage",
                  "url": "https://ostazlaw.vercel.app/news-archive.html",
                  "name": "أرشيف الأخبار والإنجازات",
                  "description": "أرشيف أخبار وإنجازات مؤسسة الأستاذ محمود عبد الحميد.",
                  "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" },
                  "about": { "@id": "https://ostazlaw.vercel.app/#organization" }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://ostazlaw.vercel.app/#website",
                  "name": "مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية",
                  "url": "https://ostazlaw.vercel.app/",
                  "description": "مؤسسة قانونية مصرية تقدم خدمات المحاماة والاستشارات القانونية."
                }
              ]
            })
          }}
        />
      </Head>

      {/* Hero */}
      <section className="hero-blog" aria-label="أرشيف الأخبار والإنجازات">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">News Archive</span>
            <h1>أرشيف <span className="gold-text">الأخبار</span></h1>
            <p className="sub">جميع أخبار وإنجازات مؤسسة الأستاذ محمود عبد الحميد – أحكام، مشاركات، وتطورات.</p>
          </div>
        </div>
      </section>

      {/* News Grid with Virtualization */}
      <section className="blog-section" aria-label="قائمة الأخبار">
        <div className="inner">
          {newsItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-charcoal/50">لا توجد أخبار حالياً.</p>
            </div>
          ) : (
            <List
              height={800}
              itemCount={newsItems.length}
              itemSize={220}
              width="100%"
              itemData={newsItems}
              className="virtualized-list"
            >
              {Row}
            </List>
          )}
        </div>
      </section>

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
        .hero-blog .hero-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: radial-gradient(circle at 20% 30%, var(--matte-gold) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--matte-gold) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero-blog .hero-glow {
          position: absolute;
          width: 60vw;
          height: 60vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(176, 141, 87, 0.04) 0%, transparent 70%);
          top: -20%;
          right: -20%;
          pointer-events: none;
          animation: orbFloat 20s ease-in-out infinite alternate;
        }
        .hero-blog .hero-glow-2 {
          position: absolute;
          width: 40vw;
          height: 40vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(176, 141, 87, 0.02) 0%, transparent 70%);
          bottom: -20%;
          left: -10%;
          pointer-events: none;
          animation: orbFloat 25s ease-in-out infinite alternate-reverse;
        }
        @keyframes orbFloat {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, -30px) scale(1.05); }
        }
        .hero-blog .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          width: 100%;
        }
        .hero-blog .hero-title-wrap {
          text-align: center;
        }
        .hero-blog .hero-title-wrap .en-tag {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--matte-gold);
          opacity: 0.5;
          display: block;
          margin-bottom: 0.3rem;
        }
        .hero-blog .hero-title-wrap h1 {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
        }
        .hero-blog .hero-title-wrap h1 .gold-text {
          color: var(--matte-gold);
        }
        .hero-blog .hero-title-wrap .sub {
          font-size: clamp(1rem, 1.3vw, 1.2rem);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
          max-width: 700px;
          margin: 0.8rem auto 0;
          line-height: 1.7;
        }
        .blog-section {
          padding: 5rem 2rem;
          background: var(--warm-off-white);
        }
        .blog-section .inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .sector-link {
          display: block;
          text-decoration: none;
          color: inherit;
          transition: all 0.4s var(--ease-out);
          position: relative;
          cursor: pointer;
        }
        .sector-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 3px;
          background: var(--matte-gold);
          transition: width 0.6s var(--ease-out);
          border-radius: 0 0 10px 10px;
        }
        .sector-link:hover::after {
          width: 100%;
        }
        .sector-link:hover .experience-card {
          border-color: var(--matte-gold);
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
        }
        .experience-card {
          background: var(--pure-white);
          padding: 1.6rem 1.2rem;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.4s var(--ease-out);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
          text-align: center;
          cursor: pointer;
          height: 100%;
          position: relative;
        }
        .experience-card .icon {
          font-size: 1.8rem;
          color: var(--matte-gold);
          opacity: 0.8;
          margin-bottom: 0.6rem;
          display: block;
        }
        .experience-card h4 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 0.4rem;
        }
        .experience-card p {
          font-size: 0.9rem;
          color: var(--charcoal);
          font-weight: 700;
          line-height: 1.7;
        }
        .news-list-item {
          padding: 0.3rem 0;
        }
        .text-center { text-align: center; }
        .py-10 { padding: 2.5rem 0; }
        .text-charcoal\\/50 { color: rgba(34, 34, 34, 0.5); }
        @media (max-width: 820px) {
          .hero-blog { padding: 100px 1rem 3rem; min-height: 35vh; }
          .blog-section { padding: 2.5rem 1rem; }
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  const newsItems = await getAllNews();
  return {
    props: {
      newsItems,
    },
    revalidate: 60,
  };
}
