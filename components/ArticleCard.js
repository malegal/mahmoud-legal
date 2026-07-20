import Link from 'next/link';

export default function ArticleCard({ article }) {
  return (
    <div className="blog-card">
      <div className="card-body">
        <span className="badge">📘 دراسة قانونية</span>
        <h3>{article.title}</h3>
        <div className="meta">
          <span><i className="far fa-clock" style={{ marginLeft: '4px' }}></i> {Math.ceil(article.title.length / 40) || 1} دقائق قراءة</span>
          {article.date && <span><i className="far fa-calendar-alt" style={{ marginLeft: '4px' }}></i> {new Date(article.date).toLocaleDateString('ar-EG')}</span>}
        </div>
        <Link href={`/article/${article.slug}`} className="btn-read">
          استعراض الدراسة <i className="fas fa-arrow-left"></i>
        </Link>
      </div>
    </div>
  );
}
