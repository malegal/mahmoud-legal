import Head from 'next/head';
import Image from 'next/image';

export default function About() {
  return (
    <>
    <Head>
    <title>عن المؤسسة | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
    <meta name="description" content="مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية – تأسست عام 2005، تقدم خدمات قانونية واستشارات متكاملة للأفراد والشركات." />
    <link rel="canonical" href="https://ostazlaw.vercel.app/about" />
    </Head>

    <style jsx>{`
      .hero-about {
        padding: 120px 2rem 4rem;
        background: var(--very-dark-navy);
        position: relative;
        min-height: 85vh;
        display: flex;
        align-items: center;
      }
      .hero-inner { max-width: 1200px; margin: 0 auto; width: 100%; position: relative; z-index: 2; }
      .hero-title-wrap { text-align: center; margin-bottom: 3rem; }
      .hero-title-wrap h1 { font-family: var(--font-serif); font-size: clamp(2.4rem, 5vw, 4rem); color: #fff; }
      .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
      .hero-image { border-radius: 12px; overflow: hidden; border: 1px solid rgba(176, 141, 87, 0.1); }
      .hero-text p { color: #fff; font-weight: 600; font-size: 1.05rem; line-height: 1.9; margin-bottom: 0.8rem; }
      .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
      @media (max-width: 820px) {
        .hero-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        .gallery-grid { grid-template-columns: 1fr 1fr; }
      }
      `}</style>

      <section className="hero-about" aria-label="عن المؤسسة">
      <div className="hero-inner">
      <div className="hero-title-wrap">
      <span className="en-tag" style={{ color: 'var(--matte-gold)', fontSize: '0.7rem', display: 'block', marginBottom: '0.5rem' }}>About Our Firm</span>
      <h1>مؤسسة الأستاذ <br /><span className="gold-text">محمود عبد الحميد</span></h1>
      <p className="sub" style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.5rem' }}>نبني الثقة بالخبرة، ونحمي المصالح باستراتيجية قانونية مدروسة.</p>
      </div>

      <div className="hero-grid">
      <div className="hero-image">
      <div style={{ position: 'relative', width: '100%', height: '350px' }}>
      <Image
      src="/mahmoud-abdel-hamid-lawyer-portrait.webp"
      alt="مقر مؤسسة الأستاذ محمود عبد الحميد للمحاماة"
      fill
      style={{ objectFit: 'cover' }}
      />
      </div>
      </div>
      <div className="hero-text">
      <p>
      تُعد مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية (OSTAZ LAW) مؤسسة قانونية متكاملة تقدم خدماتها للأفراد والشركات في مصر.
      </p>
      <p>
      نؤمن بأن العمل القانوني الفعال يحتاج إلى الدقة والالتزام والسرية التامة، وهي المبادئ التي نحافظ عليها في تمثيل موكلينا وحماية مصالحهم الاستثمارية والمدنية.
      </p>
      </div>
      </div>
      </div>
      </section>

      {/* معرض الصور التفاعلي (مؤمن) */}
      <section className="section section-light" aria-label="داخل المؤسسة">
      <div className="section-inner">
      <div className="section-head">
      <span className="eyebrow" style={{ color: 'var(--matte-gold)', fontWeight: 'bold' }}>● داخل المؤسسة</span>
      <h2>معرض الصور</h2>
      <p>بيئة العمل القانونية لدينا تعكس قيم ومبادئ الاحترافية والهدوء لخدمة الموكلين.</p>
      </div>

      <div className="gallery-grid">
      {[
        { title: 'المكتب الرئيسي', desc: 'مساحة العمل القانوني الأساسية' },
        { title: 'غرفة الاجتماعات', desc: 'مناقشة الاستراتيجيات والقضايا الحساسة' },
        { title: 'المكتبة القانونية', desc: 'المراجع القانونية ومراجع محكمة النقض' },
        { title: 'قاعة الاستقبال', desc: 'استقبال الموكلين ومراجعة الطلبات الأولية' },
        { title: 'غرفة الانتظار', desc: 'مساحة هادئة ومريحة لزوارنا' },
        { title: 'غرفة المتابعة', desc: 'فريق العمل والاتصال ومتابعة ملفات القضايا' }
      ].map((item, i) => (
        <div className="placeholder-gallery-item" key={i}>
        <i className="fas fa-image"></i>
        <span>{item.title}</span>
        <small>{item.desc}</small>
        </div>
      ))}
      </div>
      </div>
      </section>
      </>
  );
}
