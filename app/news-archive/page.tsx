import { getNews } from '@/app/lib/github';
import Link from 'next/link';

export const metadata = {
  title: 'أرشيف الأخبار والإنجازات',
  description: 'جميع أخبار وإنجازات مؤسسة الأستاذ محمود عبد الحميد – أحكام، مشاركات، وتطورات.',
};

export default async function NewsArchivePage() {
  const news = await getNews();

  const badgeColors: Record<string, string> = {
    'إنجاز قضائي': 'background:var(--matte-gold); color:#000;',
    'فعالية': 'background:var(--deep-navy); color:#fff;',
    'تطوير': 'background:var(--very-dark-navy); color:#fff;',
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero-archive" aria-label="أرشيف الأخبار والإنجازات">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>

        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">News Archive</span>
            <h1>
              أرشيف <span className="gold-text">الأخبار</span>
            </h1>
            <p className="sub">جميع أخبار وإنجازات مؤسسة الأستاذ محمود عبد الحميد – أحكام، مشاركات، وتطورات.</p>
          </div>
        </div>
      </section>

      {/* ===== NEWS GRID ===== */}
      <section className="archive-section" aria-label="قائمة الأخبار">
        <div className="inner">
          <div className="experience-grid">
            {news.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <i className="fas fa-newspaper text-4xl text-matte-gold/30 mb-4"></i>
                <p className="text-charcoal/50 text-2xl font-bold">قريباً</p>
                <p className="text-charcoal/30 text-sm mt-2">سيتم نشر أخبار وإنجازات جديدة</p>
              </div>
            ) : (
              news.map((item, index) => {
                const badgeStyle = badgeColors[item.category || ''] || 'background:var(--matte-gold); color:#000;';
                return (
                  <Link key={item.slug} href={`/news/${item.slug}`} className="sector-link" style={{ display: 'block' }}>
                    <div className="experience-card reveal" style={{ textAlign: 'right', position: 'relative', transitionDelay: `${index * 0.04}s` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span
                          style={{
                            padding: '0.1rem 0.8rem',
                            borderRadius: '20px',
                            fontSize: '0.6rem',
                            fontWeight: 800,
                            backgroundColor: badgeColors[item.category || '']?.split(';')[0] || '#B08D57',
                            color: badgeColors[item.category || '']?.includes('#fff') ? '#fff' : '#000',
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
                      <span style={{ color: 'var(--matte-gold)', fontWeight: 700, fontSize: '0.8rem', marginTop: '0.5rem', display: 'inline-block' }}>
                        اقرأ التفاصيل ←
                      </span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ===== أنماط إضافية ===== */}
      <style>{`
        .hero-archive {
          padding: 120px 2rem 4rem;
          background: var(--very-dark-navy);
          position: relative;
          overflow: hidden;
          min-height: 45vh;
          display: flex;
          align-items: center;
        }
        .hero-archive .hero-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: radial-gradient(circle at 20% 30%, var(--matte-gold) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--matte-gold) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero-archive .hero-glow {
          position: absolute;
          width: 60vw;
          height: 60vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(176,141,87,0.04) 0%, transparent 70%);
          top: -20%;
          right: -20%;
          pointer-events: none;
          animation: orbFloat 20s ease-in-out infinite alternate;
        }
        .hero-archive .hero-glow-2 {
          position: absolute;
          width: 40vw;
          height: 40vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(176,141,87,0.02) 0%, transparent 70%);
          bottom: -20%;
          left: -10%;
          pointer-events: none;
          animation: orbFloat 25s ease-in-out infinite alternate-reverse;
        }
        @keyframes orbFloat {
          0% { transform: translate(0,0) scale(1); }
          100% { transform: translate(40px, -30px) scale(1.05); }
        }
        .hero-archive .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          width: 100%;
        }
        .hero-archive .hero-title-wrap {
          text-align: center;
        }
        .hero-archive .hero-title-wrap .en-tag {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--matte-gold);
          opacity: 0.5;
          display: block;
          margin-bottom: 0.3rem;
        }
        .hero-archive .hero-title-wrap h1 {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
        }
        .hero-archive .hero-title-wrap h1 .gold-text {
          color: var(--matte-gold);
        }
        .hero-archive .hero-title-wrap .sub {
          font-size: clamp(1rem, 1.3vw, 1.2rem);
          font-weight: 400;
          color: rgba(255,255,255,0.5);
          max-width: 700px;
          margin: 0.8rem auto 0;
          line-height: 1.7;
        }
        .archive-section {
          padding: 5rem 2rem;
          background: var(--warm-off-white);
        }
        .archive-section .inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .experience-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
        }
        .sector-link {
          display: block;
          text-decoration: none;
          color: inherit;
          transition: all 0.4s var(--ease-out);
          position: relative;
          cursor: pointer;
        }
        .sector-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 3px;
          background: var(--matte-gold);
          transition: width 0.6s var(--ease-out);
          border-radius: 0 0 10px 10px;
        }
        .sector-link:hover::after {
          width: 100%;
        }
        .sector-link:hover .experience-card {
          border-color: var(--matte-gold);
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.06);
        }
        .experience-card {
          background: var(--pure-white);
          padding: 1.6rem 1.2rem;
          border-radius: 10px;
          border: 1px solid rgba(0,0,0,0.06);
          transition: all 0.4s var(--ease-out);
          box-shadow: 0 2px 12px rgba(0,0,0,0.03);
          text-align: center;
          cursor: pointer;
          height: 100%;
          position: relative;
        }
        .experience-card .icon {
          font-size: 1.8rem;
          color: var(--matte-gold);
          opacity: 0.8;
          margin-bottom: 0.6rem;
          display: block;
        }
        .experience-card h4 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 0.4rem;
        }
        .experience-card p {
          font-size: 0.9rem;
          color: var(--charcoal);
          font-weight: 700;
          line-height: 1.7;
        }
        @media (max-width: 1024px) {
          .experience-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 820px) {
          .hero-archive { padding: 100px 1rem 3rem; min-height: 35vh; }
          .archive-section { padding: 2.5rem 1rem; }
        }
        @media (max-width: 640px) {
          .experience-grid { grid-template-columns: 1fr; max-width: 360px; margin: 0 auto; }
        }
      `}</style>
    </>
  );
}
