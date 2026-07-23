import { getArticle, getArticles } from '@/app/lib/github';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: 'المقال غير موجود' };
  return {
    title: article.meta.title,
    description: article.meta.description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      images: article.meta.image ? [{ url: article.meta.image }] : [],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const { meta, content } = article;
  // ✅ إصلاح: استخدام marked.parse() للحصول على string مباشرة
  const html = marked.parse(content) as string;
  const sanitizedHtml = DOMPurify.sanitize(html);

  return (
    <div className="article-wrapper">
      {/* ===== معلومات المقال ===== */}
      <div className="article-header-info">
        <div className="meta-row">
          <span>
            <i className="fas fa-user" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }}></i> {meta.author || 'الأستاذ / محمود عبد الحميد'}
          </span>
          <span className="divider"></span>
          <span>
            <i className="far fa-calendar-alt" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }}></i>{' '}
            {meta.date ? new Date(meta.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }) : 'غير محدد'}
          </span>
          <span className="divider"></span>
          <span>
            <i className="far fa-clock" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }}></i> {Math.ceil(content.split(/\s+/).length / 200) || 1} دقائق قراءة
          </span>
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

      {/* ===== المختصر ===== */}
      {meta.description && (
        <div className="article-intro">
          <span className="intro-label">
            <i className="fas fa-asterisk"></i> موجز المقال
          </span>
          <p>{meta.description}</p>
        </div>
      )}

      {/* ===== المحتوى ===== */}
      <div className="article-body" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />

      {/* ===== الكلمات المفتاحية والوسوم ===== */}
      {(meta.seoKeyword || (meta.tags && meta.tags.length > 0)) && (
        <div className="seo-footer">
          <h4>
            <i className="fas fa-search"></i> الكلمات المفتاحية والوسوم
          </h4>
          {meta.seoKeyword && (
            <div>
              <span className="seo-label">
                <i className="fas fa-key" style={{ marginLeft: '6px' }}></i> الكلمة المفتاحية:
              </span>
              <span className="seo-keyword">{meta.seoKeyword}</span>
            </div>
          )}
          {meta.tags && meta.tags.length > 0 && (
            <div style={{ marginTop: '0.5rem' }}>
              <span className="seo-label">
                <i className="fas fa-tags" style={{ marginLeft: '6px' }}></i> الوسوم:
              </span>
              {meta.tags.map((tag) => (
                <span key={tag} className="seo-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===== العودة إلى المكتبة ===== */}
      <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(34,34,34,0.05)' }}>
        <Link href="/blog" className="btn-outline-gold" style={{ display: 'inline-block', border: '2px solid var(--matte-gold)', color: 'var(--matte-gold)', padding: '0.6rem 2rem', borderRadius: '8px', fontWeight: 600 }}>
          <i className="fas fa-arrow-right" style={{ marginLeft: '6px' }}></i> العودة إلى المكتبة
        </Link>
      </div>

      {/* ===== CTA ===== */}
      <div className="article-cta">
        <h3>هل لديك تساؤل قانوني حول هذا الموضوع؟</h3>
        <p>يمكنك الحصول على استشارة قانونية دقيقة ومباشرة من الأستاذ محمود عبد الحميد</p>
        <Link href="/contact?tab=consult" className="btn-gold">احجز استشارتك الآن</Link>
      </div>

      {/* ===== أنماط إضافية مدمجة لهذه الصفحة ===== */}
      <style>{`
        /* ===== معلومات المقال ===== */
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
          color: rgba(34,34,34,0.6);
        }
        .article-header-info .meta-row .divider {
          width: 1px;
          height: 18px;
          background: rgba(34,34,34,0.15);
        }
        .article-header-info .meta-row span {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .article-header-info .meta-row i {
          font-size: 0.9rem;
          opacity: 0.6;
        }

        /* ===== المختصر ===== */
        .article-intro {
          background: rgba(176,141,87,0.05);
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
        .article-intro .intro-label i {
          color: var(--matte-gold);
          margin-left: 0.4rem;
        }

        /* ===== المحتوى ===== */
        .article-body {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          line-height: 2.2;
          color: var(--charcoal);
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
        .article-body p {
          margin-bottom: 1.2rem;
        }
        .article-body ul, .article-body ol {
          margin: 1rem 0 1.5rem 0;
          padding-right: 1.5rem;
        }
        .article-body li {
          margin-bottom: 0.5rem;
        }
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
        .article-body table th,
        .article-body table td {
          border: 1px solid rgba(0,0,0,0.08);
          padding: 0.7rem 1rem;
          text-align: right;
        }
        .article-body table th {
          background: rgba(176,141,87,0.05);
          font-weight: 700;
        }

        /* ===== SEO FOOTER ===== */
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
        .seo-footer h4 i {
          color: var(--matte-gold);
        }
        .seo-footer .seo-keyword {
          display: inline-block;
          background: var(--pure-white);
          padding: 0.4rem 1.2rem;
          border-radius: 20px;
          font-size: 0.9rem;
          color: var(--deep-navy);
          border: 1px solid rgba(176,141,87,0.2);
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
        .seo-footer .seo-label i {
          margin-left: 0.4rem;
        }

        /* ===== التجاوب ===== */
        @media (max-width: 768px) {
          .article-header-info { padding-top: 110px; margin-top: -60px; }
          .article-header-info .meta-row { font-size: 0.8rem; gap: 0.5rem 1rem; }
          .article-body { font-size: 1rem; line-height: 2; }
          .article-intro { padding: 1rem 1.2rem; font-size: 1rem; }
          .seo-footer { padding: 1rem 1.2rem; }
        }
        @media (max-width: 480px) {
          .article-header-info { padding-top: 100px; margin-top: -50px; }
          .article-header-info .meta-row { font-size: 0.7rem; flex-direction: column; gap: 0.3rem; }
          .article-header-info .meta-row .divider { display: none; }
          .seo-footer .seo-keyword,
          .seo-footer .seo-tag { font-size: 0.7rem; padding: 0.2rem 0.6rem; }
          .seo-footer { padding: 0.8rem 1rem; }
          .article-intro { padding: 0.8rem 1rem; font-size: 0.95rem; }
          .article-cta { padding: 1.8rem 1.2rem; }
          .article-cta h3 { font-size: 1.1rem; }
        }
      `}</style>
    </div>
  );
}
