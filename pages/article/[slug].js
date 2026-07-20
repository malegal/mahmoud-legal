import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { getFilesFromGitHub, getFileData } from '../../lib/github';

export default function ArticleDetails({ article }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div style={{ padding: '150px 0', textAnd: 'center', color: 'var(--matte-gold)' }}>
      <div className="spinner" style={{ margin: '0 auto' }}></div>
      <p style={{ marginTop: '1rem' }}>جاري تحميل المقالة العلمية...</p>
      </div>
    );
  }

  // معالجة وتنقية المحتوى المكتوب بـ HTML
  const parsedHtml = marked.parse(article.content || '');
  const cleanHtml = DOMPurify.sanitize(parsedHtml);

  // تحديث روابط المشاركة للشبكات الاجتماعية بشكل ديناميكي
  const shareUrl = encodeURIComponent(`https://ostazlaw.vercel.app/article/${article.slug}`);
  const shareTitle = encodeURIComponent(article.title);

  return (
    <>
    <Head>
    <title>{`${article.title} | المكتبة القانونية`}</title>
    <meta name="description" content={article.description} />
    <link rel="canonical" href={`https://ostazlaw.vercel.app/article/${article.slug}`} />

    {/* Open Graph */}
    <meta property="og:title" content={`${article.title} | الأستاذ محمود عبد الحميد`} />
    <meta property="og:description" content={article.description} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={`https://ostazlaw.vercel.app/article/${article.slug}`} />
    {article.image && <meta property="og:image" content={article.image} />}

    {/* JSON-LD Structured Data */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.description,
      "datePublished": article.date,
      "author": {
        "@type": "Person",
        "name": article.author
      }
    })}} />
    </Head>

    <style jsx>{`
      .article-wrapper {
        padding: 120px 2rem 4rem;
        max-width: 820px;
        margin: 0 auto;
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
      .article-meta {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        font-size: 0.95rem;
        color: rgba(34, 34, 34, 0.6);
        margin-bottom: 2rem;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        padding-bottom: 1rem;
      }
      .article-body {
        font-family: var(--font-serif);
        font-size: 1.15rem;
        line-height: 2.2;
        color: var(--charcoal);
      }
      .article-cta {
        background: var(--very-dark-navy);
        color: #fff;
        padding: 2.5rem 2rem;
        border-radius: 16px;
        text-align: center;
        margin-top: 3rem;
      }
      .article-cta h3 { color: var(--matte-gold); margin-bottom: 0.5rem; }
      .article-share {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        gap: 0.8rem;
      }
      .share-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 1.1rem;
      }
      `}</style>

      <main className="article-wrapper">
      <h1 className="article-title">{article.title}</h1>

      <div className="article-meta">
      <span><i className="fas fa-user" style={{ color: 'var(--matte-gold)', marginLeft: '6px' }}></i> {article.author}</span>
      <span><i className="far fa-calendar-alt" style={{ color: 'var(--matte-gold)', marginLeft: '6px' }}></i> {article.date}</span>
      </div>

      {article.image && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src={article.image} alt={article.title} style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }} />
        </div>
      )}

      <div className="article-body" dangerouslySetInnerHTML={{ __html: cleanHtml }} />

      {/* أزرار المشاركة الذكية */}
      <div className="article-share">
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="share-btn" style={{ background: '#1877f2' }}><i className="fab fa-facebook-f"></i></a>
      <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="share-btn" style={{ background: '#000000' }}><i className="fab fa-x-twitter"></i></a>
      <a href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`} target="_blank" rel="noopener noreferrer" className="share-btn" style={{ background: '#25d366' }}><i className="fab fa-whatsapp"></i></a>
      <a href={`https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="share-btn" style={{ background: '#0088cc' }}><i className="fab fa-telegram-plane"></i></a>
      </div>

      <div className="article-cta">
      <h3>هل لديك تساؤل قانوني حول هذا الموضوع؟</h3>
      <p>يمكنك الحصول على استشارة قانونية دقيقة ومباشرة من الأستاذ محمود عبد الحميد</p>
      <Link href="/contact?tab=consult" className="btn-gold">احجز استشارتك الآن</Link>
      </div>
      </main>
      </>
  );
}

export async function getStaticPaths() {
  const files = await getFilesFromGitHub('blog/articles');
  const paths = files.map(file => ({
    params: { slug: file.name.replace('.md', '') },
  }));

  return {
    paths,
    fallback: 'blocking', // لإصدار المكون فور حفظ الملف بـ GitHub
  };
}

export async function getStaticProps({ params }) {
  const fileName = `${params.slug}.md`;
  const article = await getFileData('blog/articles', fileName);

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
    },
    revalidate: 60,
  };
}
