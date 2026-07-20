import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { getFilesFromGitHub, getFileData } from '../../lib/github';

export default function NewsDetails({ newsItem }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div style={{ padding: '150px 0', textAnd: 'center', color: 'var(--matte-gold)' }}>
      <div className="spinner" style={{ margin: '0 auto' }}></div>
      <p style={{ marginTop: '1rem' }}>جاري تحميل مستجدات الخبر القضائي...</p>
      </div>
    );
  }

  const parsedHtml = marked.parse(newsItem.content || '');
  const cleanHtml = DOMPurify.sanitize(parsedHtml);

  return (
    <>
    <Head>
    <title>{`${newsItem.title} | أخبار المؤسسة`}</title>
    <meta name="description" content={newsItem.description} />
    <link rel="canonical" href={`https://ostazlaw.vercel.app/news/${newsItem.slug}`} />
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
      `}</style>

      <main className="article-wrapper">
      <h1 className="article-title">{newsItem.title}</h1>

      <div className="article-meta">
      <span><i className="far fa-clock" style={{ color: 'var(--matte-gold)', marginLeft: '6px' }}></i> {newsItem.category || 'خبر ومستجد'}</span>
      <span><i className="far fa-calendar-alt" style={{ color: 'var(--matte-gold)', marginLeft: '6px' }}></i> {newsItem.date}</span>
      </div>

      {newsItem.image && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src={newsItem.image} alt={newsItem.title} style={{ maxWidth: '100%', borderRadius: '12px' }} />
        </div>
      )}

      <div className="article-body" dangerouslySetInnerHTML={{ __html: cleanHtml }} />

      <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(34,34,34,0.05)' }}>
      <Link href="/news-archive" className="btn-outline-gold">
      <i className="fas fa-arrow-right" style={{ marginLeft: '6px' }}></i> العودة إلى أرشيف الأخبار
      </Link>
      </div>
      </main>
      </>
  );
}

export async function getStaticPaths() {
  const files = await getFilesFromGitHub('blog/news');
  const paths = files.map(file => ({
    params: { slug: file.name.replace('.md', '') },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const fileName = `${params.slug}.md`;
  const newsItem = await getFileData('blog/news', fileName);

  if (!newsItem) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      newsItem,
    },
    revalidate: 60,
  };
}
