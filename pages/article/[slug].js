import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles, getArticleBySlug } from '../../lib/github';
import { remark } from 'remark';
import html from 'remark-html';

export default function ArticlePage({ article, contentHtml }) {
  // هيكلة البيانات لمحركات البحث ونماذج الذكاء الاصطناعي (SEO & AI Readiness)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ostazlaw.vercel.app/blog/${article.slug || ''}`
    },
    "headline": article.title,
    "description": article.description,
    "image": article.image ? [article.image] : [],
    "author": { 
      "@type": "Person", 
      "name": article.author || 'محمود عبد الحميد',
      "jobTitle": "محامٍ بالنقض والدستورية العليا",
      "url": "https://ostazlaw.vercel.app/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ostaz Law",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ostazlaw.vercel.app/logo.png"
      }
    },
    "datePublished": article.date,
    "dateModified": article.date,
    "keywords": article.seoKeyword || '',
  };

  return (
    <Layout>
      <Head>
        <title>{article.title} | الأستاذ محمود عبد الحميد</title>
        <meta name="description" content={article.description || ''} />
        <meta name="keywords" content={article.seoKeyword || ''} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description || ''} />
        {article.image && <meta property="og:image" content={article.image} />}
        {article.date && <meta property="article:published_time" content={article.date} />}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description || ''} />
        {article.image && <meta name="twitter:image" content={article.image} />}
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <article className="article-wrapper">
        {/* معلومات المقال - بألوان حادة وواضحة */}
        <header className="article-header-info">
          <div className="meta-row">
            <span className="meta-item">
              <i className="fas fa-user icon-gold" aria-hidden="true"></i> 
              <span className="author-name">{article.author || 'محمود عبد الحميد'}</span>
            </span>
            <span className="divider" aria-hidden="true">|</span>
            <span className="meta-item">
              <i className="far fa-calendar-alt icon-gold" aria-hidden="true"></i> 
              <time dateTime={article.date}>{article.date ? new Date(article.date).toLocaleDateString('ar-EG') : ''}</time>
            </span>
            <span className="divider" aria-hidden="true">|</span>
            <span className="meta-item">
              <i className="far fa-clock icon-gold" aria-hidden="true"></i> 
              <span>{Math.ceil((article.content || '').split(/\s+/).length / 200) || 1}</span> دقائق قراءة
            </span>
          </div>
        </header>

        <h1 className="article-title">{article.title}</h1>

        {article.image && (
          <div className="article-image-container">
            <Image 
              src={article.image} 
              alt={article.title} 
              width={820} 
              height={460} 
              sizes="(max-width: 768px) 100vw, 820px"
              priority={true} 
              className="optimized-image"
            />
          </div>
        )}

        {article.description && (
          <div className="article-intro" role="doc-abstract">
            <span className="intro-label">
              <i className="fas fa-balance-scale icon-gold" aria-hidden="true"></i> موجز قانوني
            </span>
            <p>{article.description}</p>
          </div>
        )}

        <div className="article-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />

        {/* تذييل المقال للـ SEO */}
        {(article.seoKeyword || (article.tags && article.tags.length > 0)) && (
          <footer className="seo-footer">
            <h4 className="seo-title"><i className="fas fa-search icon-gold" aria-hidden="true"></i> الكلمات المفتاحية والوسوم</h4>
            {article.seoKeyword && (
              <div className="seo-row">
                <span className="seo-label">الكلمة المفتاحية:</span>
                <span className="seo-keyword">{article.seoKeyword}</span>
              </div>
            )}
            {article.tags && article.tags.length > 0 && (
              <div className="seo-row">
                <span className="seo-label">الوسوم:</span>
                {article.tags.split(',').map((tag, idx) => (
                  <span key={idx} className="seo-tag">#{tag.trim()}</span>
                ))}
              </div>
            )}
          </footer>
        )}

        <div className="back-link-container">
          <Link href="/blog" className="btn-outline-gold" aria-label="العودة إلى مكتبة المقالات">
            <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }} aria-hidden="true"></i> العودة إلى المكتبة
          </Link>
        </div>

        <section className="article-cta" aria-labelledby="cta-title">
          <h3 id="cta-title">هل تبحث عن حسم قانوني في هذا الشأن؟</h3>
          <p>احصل على استشارة قانونية دقيقة ومباشرة من الأستاذ محمود عبد الحميد، لضمان حماية حقوقك وموقفك القانوني.</p>
          <Link href="/contact?tab=consult" className="btn-gold" aria-label="احجز استشارة قانونية الآن">
            طلب استشارة قانونية
          </Link>
        </section>
      </article>

      <style jsx>{`
        /* المتغيرات اللونية للحفاظ على هوية المؤسسة (ألوان حادة وقوية) */
        :global(:root) {
          --deep-navy: #0A192F;
          --matte-gold: #B08D57;
          --rich-black: #111111;
          --charcoal: #222222;
          --light-bg: #F8F9FA;
        }

        .article-wrapper {
          max-width: 820px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
          color: var(--rich-black);
        }

        /* تنسيقات العناوين والمعلومات */
        .article-header-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
          padding-top: 2rem;
        }

        .meta-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--deep-navy);
        }

        .icon-gold {
          color: var(--matte-gold);
          margin-left: 6px;
        }

        .divider {
          color: rgba(10, 25, 47, 0.2);
        }

        .article-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--deep-navy);
          text-align: center;
          line-height: 1.4;
          margin-bottom: 2rem;
        }

        /* تحسينات الصورة للأداء */
        .article-image-container {
          margin: 0 0 2.5rem;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(10, 25, 47, 0.08);
          display: flex;
          justify-content: center;
          background-color: var(--light-bg);
        }

        :global(.optimized-image) {
          max-width: 100%;
          height: auto;
          object-fit: cover;
        }

        /* تنسيق الموجز (مربع مريح للقراءة ولكن بألوان متباينة بقوة) */
        .article-intro {
          background-color: rgba(176, 141, 87, 0.08);
          border-right: 5px solid var(--matte-gold);
          padding: 1.5rem 2rem;
          border-radius: 8px;
          margin-bottom: 3rem;
        }

        .intro-label {
          display: inline-block;
          font-weight: 700;
          color: var(--deep-navy);
          font-size: 1.1rem;
          margin-bottom: 0.8rem;
        }

        .article-intro p {
          color: var(--rich-black);
          font-size: 1.15rem;
          line-height: 1.8;
          margin: 0;
          font-weight: 500;
        }

        /* تنسيقات المحتوى الداخلي للمقال (لا ألوان باهتة هنا) */
        .article-body {
          font-size: 1.2rem;
          line-height: 2;
          color: var(--charcoal);
        }

        .article-body :global(h2), .article-body :global(h3) {
          color: var(--deep-navy);
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }

        .article-body :global(p) {
          margin-bottom: 1.5rem;
          color: var(--rich-black);
        }

        /* تذييل الـ SEO */
        .seo-footer {
          margin-top: 4rem;
          padding: 2rem;
          background-color: var(--light-bg);
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .seo-title {
          color: var(--deep-navy);
          font-weight: 700;
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
        }

        .seo-row {
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .seo-label {
          font-weight: 700;
          color: var(--rich-black);
        }

        .seo-keyword, .seo-tag {
          background-color: white;
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.9rem;
          color: var(--deep-navy);
          border: 1px solid rgba(176, 141, 87, 0.3);
          font-weight: 600;
        }

        /* أزرار الدعوة لاتخاذ إجراء (CTA) */
        .back-link-container {
          text-align: center;
          margin: 3rem 0;
        }

        .btn-outline-gold {
          display: inline-flex;
          align-items: center;
          padding: 0.8rem 1.8rem;
          border: 2px solid var(--matte-gold);
          color: var(--matte-gold);
          text-decoration: none;
          font-weight: 700;
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .btn-outline-gold:hover {
          background-color: var(--matte-gold);
          color: white;
        }

        .article-cta {
          background-color: var(--deep-navy);
          color: white;
          text-align: center;
          padding: 3rem 2rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(10, 25, 47, 0.2);
        }

        .article-cta h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: var(--matte-gold);
        }

        .article-cta p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .btn-gold {
          display: inline-block;
          background-color: var(--matte-gold);
          color: var(--deep-navy);
          padding: 1rem 2.5rem;
          font-weight: 700;
          font-size: 1.1rem;
          border-radius: 5px;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .btn-gold:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(176, 141, 87, 0.4);
        }

        @media (max-width: 768px) {
          .article-title {
            font-size: 2rem;
          }
          .article-wrapper {
            padding: 2rem 1rem 3rem;
          }
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticPaths() {
  const articles = await getAllArticles();
  const paths = articles.map((a) => ({ params: { slug: a.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const article = await getArticleBySlug(params.slug);
  const processed = await remark().use(html).process(article.content || '');
  const contentHtml = processed.toString();
  return {
    props: { article, contentHtml },
    revalidate: 60,
  };
}
