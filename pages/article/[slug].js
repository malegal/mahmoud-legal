import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { getAllArticles, getArticleBySlug } from '../../lib/github';
import { remark } from 'remark';
import html from 'remark-html';

export default function ArticlePage({ article, contentHtml }) {
  return (
    <Layout>
      <Head>
        <title>{article.title} | الأستاذ محمود عبد الحميد</title>
        <meta name="description" content={article.description || ''} />
        <meta name="keywords" content={article.seoKeyword || ''} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description || ''} />
        {article.image && <meta property="og:image" content={article.image} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        {article.image && <meta name="twitter:image" content={article.image} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": article.title,
              "description": article.description,
              "author": { "@type": "Person", "name": article.author || 'محمود عبد الحميد' },
              "datePublished": article.date,
              "image": article.image || '',
              "keywords": article.seoKeyword || '',
            })
          }}
        />
      </Head>

      <div className="article-wrapper">
        <div className="article-header-info">
          <div className="meta-row">
            <span><i className="fas fa-user" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }}></i> <span style={{ fontWeight: '700', color: 'var(--deep-navy)' }}>{article.author || 'محمود عبد الحميد'}</span></span>
            <span className="divider"></span>
            <span><i className="far fa-calendar-alt" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }}></i> <span>{article.date ? new Date(article.date).toLocaleDateString('ar-EG') : ''}</span></span>
            <span className="divider"></span>
            <span><i className="far fa-clock" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }}></i> <span>{Math.ceil((article.content || '').split(/\s+/).length / 200) || 1}</span> دقائق قراءة</span>
          </div>
        </div>

        <h1 className="article-title">{article.title}</h1>

        {article.image && (
          <div className="article-image">
            <img src={article.image} alt={article.title} loading="lazy" />
          </div>
        )}

        {article.description && (
          <div className="article-intro">
            <span className="intro-label"><i className="fas fa-asterisk" style={{ marginLeft: '6px' }}></i> موجز المقال</span>
            <p>{article.description}</p>
          </div>
        )}

        <div className="article-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />

        {(article.seoKeyword || (article.tags && article.tags.length > 0)) && (
          <div className="seo-footer">
            <h4><i className="fas fa-search" style={{ marginLeft: '6px' }}></i> الكلمات المفتاحية والوسوم</h4>
            {article.seoKeyword && (
              <div>
                <span className="seo-label"><i className="fas fa-key" style={{ marginLeft: '6px' }}></i> الكلمة المفتاحية:</span>
                <span className="seo-keyword">{article.seoKeyword}</span>
              </div>
            )}
            {article.tags && article.tags.length > 0 && (
              <div style={{ marginTop: '0.5rem' }}>
                <span className="seo-label"><i className="fas fa-tags" style={{ marginLeft: '6px' }}></i> الوسوم:</span>
                {article.tags.split(',').map((tag, idx) => (
                  <span key={idx} className="seo-tag">#{tag.trim()}</span>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(34,34,34,0.05)' }}>
          <Link href="/blog" className="btn-outline-gold" style={{ display: 'inline-block', border: '2px solid var(--matte-gold)', color: 'var(--matte-gold)', padding: '0.6rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', transition: 'all 0.3s' }}>
            <i className="fas fa-arrow-right" style={{ marginLeft: '6px' }}></i> العودة إلى المكتبة
          </Link>
        </div>

        <div className="article-cta">
          <h3>هل لديك تساؤل قانوني حول هذا الموضوع؟</h3>
          <p>يمكنك الحصول على استشارة قانونية دقيقة ومباشرة من الأستاذ محمود عبد الحميد</p>
          <Link href="/contact?tab=consult" className="btn-gold">احجز استشارتك الآن</Link>
        </div>
      </div>

      <style jsx>{`
        .article-wrapper {
          max-width: 820px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem;
        }
        .article-header-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          padding-top: 120px;
          margin-top: -70px;
          margin-bottom: 2rem;
        }
        .article-header-info .meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem 1.5rem;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          color: rgba(34, 34, 34, 0.6);
        }
        .article-header-info .meta-row .divider {
          width: 1px;
          height: 18px;
          background: rgba(34, 34, 34, 0.15);
        }
        .article-header-info .meta-row span {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .article-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4.5vw, 3rem);
          font-weight: 900;
          color: var(--deep-navy);
          text-align: center;
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }
        .article-image {
          margin: 1.5rem 0 2rem;
          text-align: center;
        }
        .article-image img {
          max-width: 100%;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        .article-intro {
          background: rgba(176, 141, 87, 0.05);
          padding: 1.5rem 2rem;
          border-radius: 12px;
          border-right: 4px solid var(--matte-gold);
          margin-bottom: 2rem;
          font-size: 1.1rem;
          line-height: 1.9;
          color: var(--charcoal);
        }
        .article-intro .intro-label {
          font-weight: 700;
          color: var(--deep-navy);
          display: block;
          margin-bottom: 0.3rem;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
        }
        .article-body {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          line-height: 2.2;
          color: var(--charcoal);
        }
        .article-body h1 {
          font-size: 2rem;
          font-weight: 900;
          color: var(--deep-navy);
          margin-bottom: 1.5rem;
        }
        .article-body h2 {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--deep-navy);
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .article-body h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--deep-navy);
          margin-top: 1.5rem;
          margin-bottom: 0.8rem;
        }
        .article-body p { margin-bottom: 1.2rem; }
        .article-body ul, .article-body ol {
          margin: 1rem 0 1.5rem 0;
          padding-right: 1.5rem;
        }
        .article-body li { margin-bottom: 0.5rem; }
        .article-body blockquote {
          border-right: 4px solid var(--matte-gold);
          padding-right: 1.5rem;
          margin: 1.5rem 0;
          background: var(--warm-off-white);
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          border-radius: 4px;
          font-style: italic;
          color: #444;
        }
        .article-body img {
          max-width: 100%;
          border-radius: 12px;
          margin: 1.5rem 0;
        }
        .article-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }
        .article-body table th, .article-body table td {
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 0.7rem 1rem;
          text-align: right;
        }
        .article-body table th {
          background: rgba(176, 141, 87, 0.08);
          font-weight: 700;
        }

        .seo-footer {
          margin-top: 2.5rem;
          padding: 1.5rem 2rem;
          background: var(--warm-off-white);
          border-radius: 12px;
          border-right: 4px solid var(--matte-gold);
        }
        .seo-footer h4 {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: var(--deep-navy);
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .seo-footer h4 i { color: var(--matte-gold); }
        .seo-footer .seo-keyword {
          display: inline-block;
          background: var(--pure-white);
          padding: 0.4rem 1.2rem;
          border-radius: 20px;
          font-size: 0.9rem;
          color: var(--deep-navy);
          border: 1px solid rgba(176, 141, 87, 0.2);
          margin: 0.2rem 0.2rem 0.2rem 0;
        }
        .seo-footer .seo-tag {
          display: inline-block;
          background: var(--deep-navy);
          padding: 0.3rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          color: #fff;
          margin: 0.2rem 0.2rem 0.2rem 0;
        }
        .seo-footer .seo-label {
          font-weight: 700;
          color: var(--deep-navy);
          display: block;
          margin-bottom: 0.4rem;
          font-size: 0.9rem;
        }
        .seo-footer .seo-label i { margin-left: 6px; }

        .article-cta {
          background: var(--very-dark-navy);
          color: #fff;
          padding: 2.5rem 2rem;
          border-radius: 16px;
          text-align: center;
          margin-top: 3rem;
        }
        .article-cta h3 {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: var(--matte-gold);
          margin-bottom: 0.5rem;
        }
        .article-cta p {
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1.5rem;
        }
        .btn-gold {
          display: inline-block;
          background: var(--matte-gold);
          color: #000;
          padding: 0.7rem 2rem;
          border-radius: 8px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s;
        }
        .btn-gold:hover {
          background: #9a7848;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(176, 141, 87, 0.3);
        }
        .btn-outline-gold {
          display: inline-block;
          border: 1px solid var(--matte-gold);
          color: var(--matte-gold);
          font-weight: 700;
          padding: 8px 24px;
          border-radius: 8px;
          transition: all 0.4s var(--ease-out);
          text-align: center;
          font-size: 0.85rem;
          background: transparent;
          cursor: pointer;
          text-decoration: none;
        }
        .btn-outline-gold:hover {
          background: var(--matte-gold);
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(176, 141, 87, 0.15);
        }

        @media (max-width: 768px) {
          .article-wrapper { padding: 1rem 1rem 3rem; }
          .article-header-info { padding-top: 110px; margin-top: -60px; }
          .article-header-info .meta-row { font-size: 0.8rem; gap: 0.5rem 1rem; }
          .article-body { font-size: 1rem; line-height: 2; }
          .article-intro { padding: 1rem 1.2rem; font-size: 1rem; }
          .seo-footer { padding: 1rem 1.2rem; }
        }
        @media (max-width: 480px) {
          .article-wrapper { padding: 0.8rem 0.8rem 2.5rem; }
          .article-header-info { padding-top: 100px; margin-top: -50px; }
          .article-header-info .meta-row { font-size: 0.7rem; flex-direction: column; gap: 0.3rem; }
          .article-header-info .meta-row .divider { display: none; }
          .article-cta { padding: 1.8rem 1.2rem; }
          .article-cta h3 { font-size: 1.1rem; }
          .seo-footer .seo-keyword, .seo-footer .seo-tag { font-size: 0.7rem; padding: 0.2rem 0.6rem; }
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticPaths() {
  const articles = await getAllArticles();
  const paths = articles.map((a) => ({ params: { slug: a.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return { notFound: true };
  }
  const processed = await remark().use(html).process(article.content || '');
  const contentHtml = processed.toString();
  return {
    props: { article, contentHtml },
    revalidate: 60,
  };
}
