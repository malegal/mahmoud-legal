import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
import { getAllArticles } from '../lib/github';
import ArticleCard from '../components/ArticleCard';

export default function Blog({ articles }) {
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

  return (
    <Layout>
      <Head>
        <title>المكتبة القانونية | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
        <meta name="description" content="المكتبة القانونية لمؤسسة الأستاذ محمود عبد الحميد – مقالات وتحليلات قانونية متخصصة في مختلف مجالات القانون المصري." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ostazlaw.vercel.app/blog.html" />
        <link rel="alternate" hreflang="ar-eg" href="https://ostazlaw.vercel.app/blog.html" />
        <link rel="alternate" hreflang="en" href="https://ostazlaw.vercel.app/en/blog.html" />
        <meta property="og:title" content="المكتبة القانونية | الأستاذ محمود عبد الحميد" />
        <meta property="og:description" content="مقالات وتحليلات قانونية متخصصة في مختلف مجالات القانون المصري." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/blog.html" />
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
                  "@id": "https://ostazlaw.vercel.app/blog.html#webpage",
                  "url": "https://ostazlaw.vercel.app/blog.html",
                  "name": "المكتبة القانونية",
                  "description": "مقالات وتحليلات قانونية متخصصة في مختلف مجالات القانون المصري.",
                  "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" },
                  "about": { "@id": "https://ostazlaw.vercel.app/#organization" }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://ostazlaw.vercel.app/#website",
                  "name": "مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية",
                  "url": "https://ostazlaw.vercel.app/",
                  "description": "مؤسسة قانونية مصرية تقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات."
                }
              ]
            })
          }}
        />
      </Head>

      <section className="hero-blog" aria-label="المكتبة القانونية">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">Legal Library</span>
            <h1>المكتبة <span className="gold-text">القانونية</span></h1>
            <p className="sub">مقالات وتحليلات قانونية متخصصة، كتبها الأستاذ محمود عبد الحميد المحامي بالنقض والدستورية العليا.</p>
          </div>
        </div>
      </section>

      <section className="blog-section" aria-label="قائمة المقالات">
        <div className="inner">
          <div className="blog-grid">
            {articles.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <i className="fas fa-book-open text-4xl text-matte-gold/30 mb-4"></i>
                <p className="text-charcoal/50">لا توجد مقالات قانونية حالياً</p>
                <p className="text-charcoal/30 text-sm mt-2">سيتم نشر محتوى جديد قريباً</p>
              </div>
            ) : (
              articles.map((article) => (
                <div className="blog-card reveal" key={article.slug}>
                  <div className="card-body">
                    <span className="badge">📘 دراسة قانونية</span>
                    <h3>{article.title}</h3>
                    <div className="meta">
                      <span><i className="far fa-clock" style={{ marginLeft: '4px' }}></i> {Math.ceil(article.title.length / 40) || 1} دقائق قراءة</span>
                      {article.date && (
                        <span><i className="far fa-calendar-alt" style={{ marginLeft: '4px' }}></i> {new Date(article.date).toLocaleDateString('ar-EG')}</span>
                      )}
                    </div>
                    <Link href={`/article/${article.slug}`} className="btn-read">
                      استعراض الدراسة <i className="fas fa-arrow-left"></i>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
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

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .blog-card {
          background: var(--pure-white);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.04);
          transition: all 0.4s var(--ease-out);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
          cursor: pointer;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .blog-card::after {
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
        .blog-card:hover::after {
          width: 100%;
        }
        .blog-card:hover {
          border-color: var(--matte-gold);
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.04);
        }
        .blog-card .card-body {
          padding: 1.5rem 1.4rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .blog-card .card-body .badge {
          font-size: 0.55rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--matte-gold);
          margin-bottom: 0.4rem;
          display: inline-block;
        }
        .blog-card .card-body h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--charcoal);
          line-height: 1.5;
          margin-bottom: 0.3rem;
          flex: 1;
        }
        .blog-card .card-body .meta {
          font-size: 0.7rem;
          color: var(--charcoal);
          font-weight: 700;
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }
        .blog-card .card-body .btn-read {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--matte-gold);
          margin-top: 0.8rem;
          transition: gap 0.3s ease;
          position: relative;
          text-decoration: none;
        }
        .blog-card .card-body .btn-read::after {
          content: '';
          position: absolute;
          bottom: -2px;
          right: 0;
          width: 0;
          height: 2px;
          background: var(--matte-gold);
          transition: width 0.4s var(--ease-out);
        }
        .blog-card .card-body .btn-read:hover::after {
          width: 100%;
        }
        .blog-card .card-body .btn-read:hover {
          gap: 0.8rem;
        }

        @media (max-width: 1024px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 820px) {
          .hero-blog { padding: 100px 1rem 3rem; min-height: 35vh; }
          .blog-section { padding: 2.5rem 1rem; }
          .blog-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr; max-width: 360px; margin: 0 auto; }
        }
      `}</style>
    </Layout>
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
