import { getNews } from '@/app/lib/github';
import Link from 'next/link';

export const metadata = {
  title: 'أرشيف الأخبار والإنجازات',
  description: 'جميع أخبار وإنجازات مؤسسة الأستاذ محمود عبد الحميد – أحكام، مشاركات، وتطورات.',
};

export default async function NewsArchivePage() {
  const news = await getNews();

  return (
    <>
      <section className="hero-blog" aria-label="أرشيف الأخبار والإنجازات">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">News Archive</span>
            <h1>أرشيف <span className="gold-text">الأخبار</span></h1>
            <p className="sub">جميع أخبار وإنجازات مؤسسة الأستاذ محمود عبد الحميد – أحكام، مشاركات، وتطورات.</p>
          </div>
        </div>
      </section>

      <section className="blog-section" aria-label="قائمة الأخبار">
        <div className="inner">
          <div className="experience-grid">
            {news.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-charcoal/50">لا توجد أخبار حالياً</p>
              </div>
            ) : (
              news.map((item, index) => {
                const badgeColors: Record<string, string> = {
                  'إنجاز قضائي': 'background:var(--matte-gold); color:#000;',
                  'فعالية': 'background:var(--deep-navy); color:#fff;',
                  'تطوير': 'background:var(--very-dark-navy); color:#fff;',
                };
                const badgeStyle = badgeColors[item.category || ''] || 'background:var(--matte-gold); color:#000;';

                return (
                  <Link href={`/news/${item.slug}`} key={item.slug} className="sector-link" style={{ display: 'block' }}>
                    <div className="experience-card reveal" style={{ textAlign: 'right', position: 'relative' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ ...{ padding: '0.1rem 0.8rem', borderRadius: '20px', fontSize: '0.6rem', fontWeight: 800 }, ...{ backgroundColor: badgeColors[item.category || '']?.split(';')[0] || '#B08D57', color: badgeColors[item.category || '']?.includes('#fff') ? '#fff' : '#000' } }}>
                          {item.category || 'خبر'}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                          {item.date ? new Date(item.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                        </span>
                      </div>
                      <span className="icon"><i className={`fas ${item.icon || 'fa-newspaper'}`} style={{ fontSize: '1.5rem' }}></i></span>
                      <h4>{item.title}</h4>
                      <p>{item.description || ''}</p>
                      <span style={{ color: 'var(--matte-gold)', fontWeight: 700, fontSize: '0.8rem', marginTop: '0.5rem', display: 'inline-block' }}>اقرأ التفاصيل ←</span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
