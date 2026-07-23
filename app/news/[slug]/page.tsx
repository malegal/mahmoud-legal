import { getNewsItem, getNews } from '@/app/lib/github';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  try {
    const news = await getNews();
    return news.map((item) => ({ slug: item.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsItem(slug);
  if (!news) return { title: 'الخبر غير موجود' };
  return {
    title: news.meta.title,
    description: news.meta.description,
    openGraph: {
      title: news.meta.title,
      description: news.meta.description,
      images: news.meta.image ? [{ url: news.meta.image }] : [],
    },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = await getNewsItem(slug);
  if (!news) notFound();

  const { meta, content } = news;
  const html = marked.parse(content) as string;
  const sanitizedHtml = DOMPurify.sanitize(html);

  return (
    <div className="article-wrapper news-detail">
      {/* ===== معلومات الخبر ===== */}
      <div className="article-header-info">
        <div className="meta-row">
          <span>
            <i className="far fa-clock" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }}></i> {Math.ceil(content.split(/\s+/).length / 200) || 1} دقائق قراءة
          </span>
          <span className="divider"></span>
          <span>
            <span className="news-badge" style={{ backgroundColor: 'var(--matte-gold)', color: '#000', padding: '0.1rem 0.8rem', borderRadius: '20px', fontSize: '0.6rem', fontWeight: 800 }}>
              {meta.category || 'خبر'}
            </span>
          </span>
          <span className="divider"></span>
          {meta.date && (
            <span>
              <i className="far fa-calendar-alt" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }}></i>{' '}
              {new Date(meta.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          )}
        </div>
      </div>

      {/* ===== العنوان ===== */}
      <h1 className="article-title">{meta.title}</h1>

      {/* ===== الصورة ===== */}
      {meta.image && (
        <div className="article-image">
          <img src={meta.image} alt={meta.title} loading="lazy" />
        </div>
      )}

      {/* ===== المحتوى ===== */}
      <div className="article-body" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />

      {/* ===== العودة إلى أرشيف الأخبار ===== */}
      <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(34,34,34,0.05)' }}>
        <Link href="/news-archive" className="btn-outline-gold" style={{ display: 'inline-block', border: '2px solid var(--matte-gold)', color: 'var(--matte-gold)', padding: '0.6rem 2rem', borderRadius: '8px', fontWeight: 600 }}>
          <i className="fas fa-arrow-right" style={{ marginLeft: '6px' }}></i> العودة إلى أرشيف الأخبار
        </Link>
      </div>

      {/* ===== CTA ===== */}
      <div className="article-cta">
        <h3>هل لديك استفسار حول هذا الخبر أو موضوع قانوني مشابه؟</h3>
        <p>يمكنك الحصول على استشارة قانونية دقيقة ومباشرة من الأستاذ محمود عبد الحميد</p>
        <Link href="/contact?tab=consult" className="btn-gold">احجز استشارتك الآن</Link>
      </div>

      {/* ===== أنماط إضافية ===== */}
      <style>{`
        .news-detail .article-header-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          padding-top: 120px;
          margin-top: -70px;
          margin-bottom: 2rem;
        }
        .news-detail .article-header-info .meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem 1.5rem;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          color: rgba(34,34,34,0.6);
        }
        .news-detail .article-header-info .meta-row .divider {
          width: 1px;
          height: 18px;
          background: rgba(34,34,34,0.15);
        }
        .news-detail .article-header-info .meta-row span {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .news-detail .article-header-info .meta-row i {
          font-size: 0.9rem;
          opacity: 0.6;
        }
        .news-detail .article-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          color: var(--charcoal);
          line-height: 1.15;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid rgba(0,0,0,0.04);
          padding-bottom: 1.5rem;
          text-align: center;
        }
        .news-detail .article-body {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          line-height: 2.2;
          color: var(--charcoal);
        }
        .news-detail .article-body h2 {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--deep-navy);
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .news-detail .article-body h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--deep-navy);
          margin-top: 1.5rem;
          margin-bottom: 0.8rem;
        }
        .news-detail .article-body p {
          margin-bottom: 1.2rem;
        }
        .news-detail .article-body ul, .news-detail .article-body ol {
          margin: 1rem 0 1.5rem 0;
          padding-right: 1.5rem;
        }
        .news-detail .article-body li {
          margin-bottom: 0.5rem;
        }
        .news-detail .article-body blockquote {
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
        .news-detail .article-body img {
          max-width: 100%;
          border-radius: 12px;
          margin: 1.5rem 0;
        }
        .news-detail .article-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }
        .news-detail .article-body table th,
        .news-detail .article-body table td {
          border: 1px solid rgba(0,0,0,0.08);
          padding: 0.7rem 1rem;
          text-align: right;
        }
        .news-detail .article-body table th {
          background: rgba(176,141,87,0.05);
          font-weight: 700;
        }
        .news-detail .article-cta {
          margin-top: 3rem;
          padding: 2.5rem 2rem;
          background: var(--deep-navy);
          border-radius: 12px;
          text-align: center;
          color: #fff;
        }
        .news-detail .article-cta h3 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .news-detail .article-cta p {
          color: rgba(255,255,255,0.6);
          font-weight: 300;
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }
        .news-detail .btn-gold {
          display: inline-block;
          background: var(--matte-gold);
          color: #000;
          font-weight: 700;
          padding: 12px 32px;
          border-radius: 8px;
          transition: all 0.4s var(--ease-out);
          text-decoration: none;
        }
        .news-detail .btn-gold:hover {
          background: #c4a06a;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(176,141,87,0.25);
        }
        .news-detail .btn-outline-gold {
          display: inline-block;
          border: 2px solid var(--matte-gold);
          color: var(--matte-gold);
          font-weight: 700;
          padding: 10px 28px;
          border-radius: 8px;
          transition: all 0.4s var(--ease-out);
          text-decoration: none;
          background: transparent;
        }
        .news-detail .btn-outline-gold:hover {
          background: var(--matte-gold);
          color: #000;
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .news-detail .article-header-info { padding-top: 110px; margin-top: -60px; }
          .news-detail .article-header-info .meta-row { font-size: 0.8rem; gap: 0.5rem 1rem; }
          .news-detail .article-body { font-size: 1rem; line-height: 2; }
          .news-detail .article-cta { padding: 1.8rem 1.2rem; }
          .news-detail .article-cta h3 { font-size: 1.3rem; }
        }
        @media (max-width: 480px) {
          .news-detail .article-header-info { padding-top: 100px; margin-top: -50px; }
          .news-detail .article-header-info .meta-row { font-size: 0.7rem; flex-direction: column; gap: 0.3rem; }
          .news-detail .article-header-info .meta-row .divider { display: none; }
          .news-detail .article-title { font-size: 1.6rem; }
          .news-detail .article-cta { padding: 1.2rem 0.8rem; }
          .news-detail .article-cta h3 { font-size: 1.1rem; }
        }
      `}</style>
    </div>
  );
}
