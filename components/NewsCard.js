import Link from 'next/link';

export default function NewsCard({ news }) {
  const badgeColors = {
    'إنجاز قضائي': 'background:var(--matte-gold); color:#000;',
    'فعالية': 'background:var(--deep-navy); color:#fff;',
    'تطوير': 'background:var(--very-dark-navy); color:#fff;',
  };
  const badgeStyle = badgeColors[news.category] || 'background:var(--matte-gold); color:#000;';

  return (
    <div className="sector-link">
    <Link href={`/news/${news.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
    <div className="experience-card" style={{ textAlign: 'right', position: 'relative' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
    <span style={{ ...badgeStyle, padding: '0.1rem 0.8rem', borderRadius: '20px', fontSize: '0.6rem', fontWeight: '800' }}>
    {news.category || 'خبر'}
    </span>
    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
    {news.date ? new Date(news.date).toLocaleDateString('ar-EG') : ''}
    </span>
    </div>
    <span className="icon"><i className={`fas ${news.icon || 'fa-newspaper'}`} style={{ fontSize: '1.5rem' }}></i></span>
    <h4>{news.title}</h4>
    <p>{news.description || ''}</p>
    <span style={{ color: 'var(--matte-gold)', fontWeight: '700', fontSize: '0.8rem', marginTop: '0.5rem', display: 'inline-block' }}>
    اقرأ التفاصيل ←
    </span>
    </div>
    </Link>
    </div>
  );
}
