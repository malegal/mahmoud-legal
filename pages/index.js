import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { getAllArticles, getAllNews } from '../lib/github';
import ArticleCard from '../components/ArticleCard';
import NewsCard from '../components/NewsCard';
import dynamic from 'next/dynamic';

const MapSection = dynamic(() => import('../components/MapSection'), {
  loading: () => <div className="map-loading">جاري تحميل الخريطة...</div>,
  ssr: false,
});

export default function Home({ articles, news }) {
  const latestArticles = articles.slice(0, 3);
  const latestNews = news.slice(0, 3);
  const hasNews = latestNews.length > 0;

  return (
    <Layout>
      <Head>
        <title>مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية | OSTAZ LAW</title>
        <meta name="description" content="مؤسسة قانونية مصرية تقدم استشارات، تمثيلاً قضائياً، وحلولاً قانونية للشركات والأفراد. خبرة في النقض والدستورية العليا." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ostazlaw.vercel.app/" />
        <link rel="alternate" hreflang="ar-eg" href="https://ostazlaw.vercel.app/" />
        <link rel="alternate" hreflang="en" href="https://ostazlaw.vercel.app/en/" />
        <meta property="og:title" content="مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية | OSTAZ LAW" />
        <meta property="og:description" content="بوابة الوصول إلى خدمات قانونية متخصصة: استشارات، تمثيل قضائي، وحلول قانونية للشركات والأفراد." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/" />
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
                  "description": "مؤسسة قانونية مصرية تقدم استشارات وتمثيلاً قضائياً وحلولاً قانونية للشركات والأفراد.",
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
                    "addressLocality": "أسوان",
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
                  "@type": "WebPage",
                  "@id": "https://ostazlaw.vercel.app/#webpage",
                  "url": "https://ostazlaw.vercel.app/",
                  "name": "الصفحة الرئيسية – مؤسسة الأستاذ محمود عبد الحميد للمحاماة",
                  "description": "بوابة الوصول إلى خدمات قانونية متخصصة: استشارات، تمثيل قضائي، وحلول قانونية.",
                  "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" },
                  "about": { "@id": "https://ostazlaw.vercel.app/#organization" },
                  "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": "https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.jpg",
                    "caption": "الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://ostazlaw.vercel.app/#website",
                  "name": "مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية",
                  "url": "https://ostazlaw.vercel.app/",
                  "description": "مؤسسة قانونية مصرية تقدم استشارات وتمثيلاً قضائياً وحلولاً قانونية."
                }
              ]
            })
          }}
        />
      </Head>

      {/* Hero, Trust Bar, About, Practice Areas, Process, Sectors */}
      {/* ... هذه الأقسام كما هي من index.js السابق ... */}

      {/* News Section - مع معالجة عدم وجود أخبار */}
      <section className="section section-gray" aria-label="أخبار وإنجازات المؤسسة">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● أخبار المؤسسة</span>
            <h2>آخر الأخبار والمستجدات</h2>
            <p>نوافيكم بأحدث ما توصلنا إليه من أحكام، مشاركات مجتمعية، وتطورات مكتبنا القانوني.</p>
          </div>
          {hasNews ? (
            <div className="experience-grid">
              {latestNews.map((item) => (
                <NewsCard key={item.slug} news={item} />
              ))}
            </div>
          ) : (
            <div className="news-placeholder">
              <div className="news-placeholder-icon">📢</div>
              <h3>جارٍ إعداد وتجهيز قسم الأخبار</h3>
              <p>
                نعمل حاليًا على تجهيز قسم الأخبار بأحدث المستجدات والإنجازات القانونية.
                <br />
                <strong>سيتم نشر الخبر الأول قريباً، وعندها سيختفي هذا التنبيه تلقائياً.</strong>
              </p>
              <span className="news-placeholder-badge">قريباً</span>
            </div>
          )}
          <div className="section-cta">
            <Link href="/news-archive" className="btn-outline-gold">أرشيف الأخبار والإنجازات</Link>
          </div>
        </div>
      </section>

      {/* Articles, Map, CTA */}
      {/* ... هذه الأقسام كما هي من index.js السابق ... */}

      <style jsx>{`
        .news-placeholder {
          background: white;
          padding: 3rem 2rem;
          border-radius: 16px;
          text-align: center;
          border: 2px dashed var(--matte-gold, #B08D57);
          max-width: 600px;
          margin: 0 auto;
        }
        .news-placeholder-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .news-placeholder h3 {
          font-size: 1.4rem;
          color: var(--deep-navy, #102A43);
          margin-bottom: 0.5rem;
        }
        .news-placeholder p {
          color: var(--text-secondary, #2D2D2D);
          opacity: 0.85;
          line-height: 1.8;
        }
        .news-placeholder-badge {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.3rem 1.5rem;
          background: var(--matte-gold, #B08D57);
          color: #0B111B;
          font-weight: 700;
          border-radius: 20px;
          font-size: 0.8rem;
        }
        .map-loading {
          padding: 2rem;
          text-align: center;
          color: var(--text-secondary);
          background: var(--light-gray);
          border-radius: 12px;
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  const [articles, news] = await Promise.all([
    getAllArticles().catch(() => []),
    getAllNews().catch(() => []),
  ]);
  return {
    props: { articles, news },
    revalidate: 60,
  };
}
