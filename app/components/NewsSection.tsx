import { getNews } from '@/app/lib/github';
import Link from 'next/link';

export default async function NewsSection() {
  const news = await getNews();
  const latest = news.slice(0, 3);

  const badgeColors: Record<string, string> = {
    'إنجاز قضائي': 'background:var(--matte-gold); color:#000;',
    'فعالية': 'background:var(--deep-navy); color:#fff;',
    'تطوير': 'background:var(--very-dark-navy); color:#fff;',
  };

  return (
    <section className="section section-gray" aria-label="أخبار وإنجازات المؤسسة">
      <div className="section-inner">
        <div className="section-head reveal">
          <span className="eyebrow">● أخبار المؤسسة</span>
          <h2>آخر الأخبار والمستجدات</h2>
          <p>نوافيكم بأحدث ما توصلنا إليه من أحكام، مشاركات مجتمعية، وتطورات مكتبنا القانوني.</p>
        </div>

        <div className="experience-grid">
          {latest.length === 0 ? (
            <div className="col-span-full text-center text-charcoal/50 py-10">لا توجد أخبار حالياً.</div>
          ) : (
            latest.map((item, index) => {
              const badgeStyle = badgeColors[item.category || ''] || 'background:var(--matte-gold); color:#000;';
              return (
                <Link key={item.slug} href={`/news/${item.slug}`} className="sector-link" style={{ display: 'block' }}>
                  <div className="experience-card reveal" style={{ textAlign: 'right', position: 'relative', transitionDelay: `${index * 0.08}s` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span
                        style={{
                          ...{ padding: '0.1rem 0.8rem', borderRadius: '20px', fontSize: '0.6rem', fontWeight: 800 },
                          ...{ backgroundColor: badgeColors[item.category || '']?.split(';')[0] || '#B08D57', color: badgeColors[item.category || '']?.includes('#fff') ? '#fff' : '#000' },
                        }}
                      >
                        {item.category || 'خبر'}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                        {item.date ? new Date(item.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                      </span>
                    </div>
                    <span className="icon">
                      <i className={`fas ${item.icon || 'fa-newspaper'}`} style={{ fontSize: '1.5rem' }}></i>
                    </span>
                    <h4>{item.title}</h4>
                    <p>{item.description || ''}</p>
                    <span style={{ color: 'var(--matte-gold)', fontWeight: 700, fontSize: '0.8rem', marginTop: '0.5rem', display: 'inline-block' }}>اقرأ التفاصيل ←</span>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        <div className="section-cta">
          <Link href="/news-archive" className="btn-outline-gold">أرشيف الأخبار والإنجازات</Link>
        </div>
      </div>
    </section>
  );
}
