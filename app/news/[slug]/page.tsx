import { getNewsItem, getNews } from '@/app/lib/github';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const news = await getNews();
  return news.map(item => ({ slug: item.slug }));
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
  const html = marked(content);
  const sanitizedHtml = DOMPurify.sanitize(html);

  return (
    <div className="article-wrapper">
      <div className="article-header-info">
        <div className="meta-row">
          <span><i className="far fa-clock" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }}></i> {Math.ceil(content.split(/\s+/).length / 200) || 1} دقائق قراءة</span>
          <span className="divider"></span>
          <span>خبر وإنجاز</span>
          <span className="divider"></span>
          {meta.date && (
            <span><i className="far fa-calendar-alt" style={{ marginLeft: '6px', color: 'var(--matte-gold)' }}></i> {new Date(meta.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          )}
        </div>
      </div>

      <h1 className="article-title">{meta.title}</h1>

      {meta.image && (
        <div className="article-image">
          <img src={meta.image} alt={meta.title} loading="lazy" />
        </div>
      )}

      <div className="article-body" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />

      <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(34,34,34,0.05)' }}>
        <Link href="/news-archive" className="btn-outline-gold" style={{ display: 'inline-block', border: '2px solid var(--matte-gold)', color: 'var(--matte-gold)', padding: '0.6rem 2rem', borderRadius: '8px', fontWeight: 600 }}>
          <i className="fas fa-arrow-right" style={{ marginLeft: '6px' }}></i> العودة إلى أرشيف الأخبار
        </Link>
      </div>

      <div className="article-cta">
        <h3>هل لديك استفسار حول هذا الخبر أو موضوع قانوني مشابه؟</h3>
        <p>يمكنك الحصول على استشارة قانونية دقيقة ومباشرة من الأستاذ محمود عبد الحميد</p>
        <Link href="/contact?tab=consult" className="btn-gold">احجز استشارتك الآن</Link>
      </div>
    </div>
  );
}
