import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { getAllArticles, getAllNews } from '../lib/github';

export default function Home({ latestArticles, latestNews }) {

  useEffect(() => {
    // تفعيل تأثير التمرير للظهور
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  return (
    <>
    <Head>
    <title>مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية | OSTAZ LAW</title>
    <meta name="description" content="مؤسسة قانونية مصرية تقدم استشارات، تمثيلاً قضائياً، وحلولاً قانونية للشركات والأفراد. خبرة في النقض والدستورية العليا." />
    <link rel="canonical" href="https://ostazlaw.vercel.app/" />

    {/* Open Graph */}
    <meta property="og:title" content="مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية | OSTAZ LAW" />
    <meta property="og:description" content="بوابة الوصول إلى خدمات قانونية متخصصة: استشارات، تمثيل قضائي، وحلول قانونية للشركات والأفراد." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://ostazlaw.vercel.app/" />
    <meta property="og:image" content="https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.webp" />
    <meta property="og:locale" content="ar_EG" />
    <meta name="twitter:card" content="summary_large_image" />

    {/* JSON-LD Structured Data */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [{
        "@type": "LegalService",
        "@id": "https://ostazlaw.vercel.app/#organization",
        "name": "مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية",
        "alternateName": "OSTAZ LAW",
        "description": "مؤسسة قانونية مصرية تقدم استشارات وتمثيلاً قضائياً وحلولاً قانونية للشركات والأفراد.",
        "url": "https://ostazlaw.vercel.app/",
        "logo": "https://ostazlaw.vercel.app/logo.png",
        "email": "ma.law.firm@outlook.com",
        "telephone": "+201101076000",
        "foundingDate": "2005",
        "areaServed": { "@type": "Country", "name": "مصر" }
      }]
    })}} />
    </Head>

    <style jsx>{`
      /* HERO */
      .hero {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 160px 24px 80px;
        overflow: hidden;
        background-color: var(--very-dark-navy);
      }
      .hero-content { position: relative; z-index: 2; max-width: 1000px; }
      .hero-brand-signature {
        font-size: 0.75rem;
        font-weight: 800;
        letter-spacing: 0.4em;
        color: var(--matte-gold);
        margin-bottom: 0.8rem;
      }
      .hero-title {
        font-family: var(--font-serif);
        font-size: clamp(2.4rem, 6vw, 4.4rem);
        font-weight: 900;
        line-height: 1.1;
        color: #fff;
      }
      .hero-subtitle {
        font-size: clamp(1.1rem, 1.4vw, 1.4rem);
        font-weight: 500;
        color: rgba(255, 255, 255, 0.8);
        margin-top: 0.2rem;
      }
      .hero-value {
        max-width: 720px;
        margin: 1.5rem auto 0;
        font-size: clamp(1rem, 1.1vw, 1.15rem);
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.9;
      }
      .hero-actions {
        display: flex;
        justify-content: center;
        gap: 3rem;
        margin-top: 2.5rem;
        flex-wrap: wrap;
      }
      .hero-action-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;
        color: rgba(255, 255, 255, 0.8);
        transition: all 0.4s var(--ease-out);
      }
      .hero-action-item:hover {
        color: #fff;
        transform: translateY(-4px);
      }
      .hero-action-item .icon-wrap {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(176, 141, 87, 0.08);
        border: 1px solid rgba(176, 141, 87, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.5s var(--ease-out);
      }
      .hero-action-item:hover .icon-wrap {
        background: var(--matte-gold);
        box-shadow: 0 0 40px rgba(176, 141, 87, 0.25);
      }
      .hero-action-item:hover .icon-wrap i { color: #000; }
      .hero-action-item .icon-wrap i { font-size: 1.6rem; color: var(--matte-gold); }

      /* TRUST BAR */
      .trust-bar {
        background: var(--deep-navy);
        padding: 2.2rem 1.5rem;
        border-top: 1px solid rgba(176, 141, 87, 0.1);
        border-bottom: 1px solid rgba(176, 141, 87, 0.1);
      }
      .trust-bar-inner {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
      }
      .trust-item {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        justify-content: center;
        color: rgba(255, 255, 255, 0.95);
        font-weight: 600;
      }
      .trust-item i { font-size: 1.3rem; color: var(--matte-gold); }

      /* ABOUT */
      .about-why-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;
      }
      .about-image { position: relative; }
      .about-image .frame {
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid rgba(176, 141, 87, 0.2);
        aspect-ratio: 3/4;
      }
      .about-image .badge {
        position: absolute;
        bottom: -1rem;
        right: -1rem;
        background: var(--matte-gold);
        color: #000;
        padding: 0.6rem 1.4rem;
        border-radius: 6px;
        font-weight: 800;
        font-size: 0.75rem;
      }
      .about-content h2 {
        font-family: var(--font-serif);
        font-size: clamp(1.6rem, 2.6vw, 2.2rem);
        font-weight: 900;
        line-height: 1.3;
        margin-bottom: 1rem;
      }
      .about-content p {
        font-weight: 700;
        font-size: 1.05rem;
        line-height: 1.9;
        margin-bottom: 0.8rem;
      }
      .about-why-points {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem 1.5rem;
        margin-top: 1.5rem;
      }
      .about-why-points .point {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        font-size: 0.95rem;
        font-weight: 700;
      }
      .about-why-points .point i { color: var(--matte-gold); }
      .signature {
        margin-top: 1.5rem;
        padding-top: 1.2rem;
        border-top: 1px solid rgba(176, 141, 87, 0.15);
        display: flex;
        align-items: center;
        gap: 1.2rem;
        flex-wrap: wrap;
      }
      .signature .name { font-family: var(--font-serif); font-size: 1.35rem; font-weight: 700; }

      /* PRACTICE AREAS */
      .practice-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
      }
      .practice-card {
        background: var(--pure-white);
        padding: 1.6rem 1.1rem;
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        transition: all 0.4s var(--ease-out);
        text-align: center;
        height: 100%;
      }
      .practice-card:hover {
        border-color: var(--matte-gold);
        transform: translateY(-4px);
      }
      .practice-card .icon-wrap {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(176, 141, 87, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 0.8rem;
      }
      .practice-card h3 { font-size: 0.95rem; font-weight: 700; margin-bottom: 0.4rem; }
      .practice-card p { font-size: 0.9rem; font-weight: 700; line-height: 1.6; }

      /* TIMELINE */
      .process-timeline {
        max-width: 780px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .process-step {
        display: flex;
        align-items: flex-start;
        gap: 1.2rem;
        padding: 1.2rem 1.8rem;
        background: var(--pure-white);
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        transition: all 0.4s var(--ease-out);
      }
      .process-step:hover {
        border-color: var(--matte-gold);
        transform: translateX(-4px);
      }
      .process-step .num {
        font-family: var(--font-serif);
        font-size: 1.8rem;
        font-weight: 900;
        color: var(--matte-gold);
        opacity: 0.25;
        min-width: 36px;
      }
      .process-step h4 { font-size: 1rem; font-weight: 700; margin-bottom: 0.2rem; }
      .process-step p { font-size: 0.95rem; font-weight: 700; }

      /* GRID SECTORS / NEWS / BLOG */
      .experience-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.2rem;
      }
      .experience-card {
        background: var(--pure-white);
        padding: 1.6rem 1.2rem;
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        transition: all 0.4s var(--ease-out);
        text-align: center;
        height: 100%;
      }
      .experience-card:hover {
        border-color: var(--matte-gold);
        transform: translateY(-4px);
      }
      .experience-card .icon { font-size: 1.8rem; color: var(--matte-gold); margin-bottom: 0.6rem; display: block; }
      .experience-card h4 { font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
      .experience-card p { font-size: 0.9rem; font-weight: 700; }

      .blog-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.2rem;
      }
      .blog-card {
        background: var(--pure-white);
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        transition: all 0.4s var(--ease-out);
        display: flex;
        flex-direction: column;
      }
      .blog-card:hover {
        border-color: var(--matte-gold);
        transform: translateY(-4px);
      }
      .blog-card .card-body { padding: 1.2rem; flex: 1; display: flex; flex-direction: column; }
      .blog-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
      .blog-card p { font-size: 0.9rem; font-weight: 700; margin-bottom: 0.8rem; flex: 1; }
      .blog-card .btn-read { font-size: 0.8rem; font-weight: 700; color: var(--matte-gold); }

      /* MAP */
      .map-section { padding: 5rem 2rem; background: var(--light-gray); }
      .map-container {
        max-width: 1200px;
        margin: 0 auto;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid rgba(176, 141, 87, 0.15);
        height: 350px;
      }
      .map-address { text-align: center; margin-top: 1.5rem; font-weight: 700; font-size: 1.05rem; }
      .map-address i { color: var(--matte-gold); margin-left: 0.4rem; }

      @media (max-width: 1024px) {
        .practice-grid { grid-template-columns: repeat(3, 1fr); }
        .experience-grid, .blog-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 820px) {
        .about-why-grid { grid-template-columns: 1fr; }
        .trust-bar-inner { grid-template-columns: 1fr; }
        .practice-grid { grid-template-columns: 1fr 1fr; }
        .experience-grid, .blog-grid { grid-template-columns: 1fr; }
      }
      `}</style>

      {/* ===== HERO ===== */}
      <section className="hero" aria-label="الصفحة الرئيسية">
      <div className="hero-content">
      <div className="hero-brand-signature">OSTAZ LAW</div>
      <h1 className="hero-title">مؤسسة الأستاذ محمود عبد الحميد</h1>
      <p className="hero-subtitle">للمحاماة والاستشارات القانونية</p>
      <p className="hero-value">
      نقدم تمثيلًا قضائيًا واستشارات قانونية للشركات والأفراد، مستندين إلى خبرة راسخة أمام محكمة النقض والمحكمة الدستورية العليا، لحماية الحقوق والمصالح والاستثمارات.
      </p>

      <div className="hero-actions">
      <Link href="/contact?tab=consult" className="hero-action-item">
      <span className="icon-wrap"><i className="fas fa-file-signature"></i></span>
      <span className="label">استشارة قانونية</span>
      </Link>
      <Link href="/contact?tab=appointment" className="hero-action-item">
      <span className="icon-wrap"><i className="fas fa-calendar-check"></i></span>
      <span className="label">حجز موعد</span>
      </Link>
      <Link href="/contact?tab=representation" className="hero-action-item">
      <span className="icon-wrap"><i className="fas fa-gavel"></i></span>
      <span className="label">تمثيل قضائي</span>
      </Link>
      </div>
      </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="trust-bar" aria-label="شريط الثقة">
      <div className="trust-bar-inner">
      <div className="trust-item">
      <i className="fas fa-gavel"></i>
      <span>محامون بالنقض والدستورية العليا</span>
      </div>
      <div className="trust-item">
      <i className="fas fa-briefcase"></i>
      <span>حلول قانونية للشركات والأفراد</span>
      </div>
      <div className="trust-item">
      <i className="fas fa-scale-balanced"></i>
      <span>تمثيل واستشارات في مختلف مراحل التقاضي</span>
      </div>
      </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="section section-light" aria-label="عن المؤسسة">
      <div className="section-inner">
      <div className="about-why-grid">
      <div className="about-image reveal">
      <div className="frame">
      <Image
      src="/mahmoud-abdel-hamid-lawyer-portrait.webp"
      alt="الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا"
      width={600}
      height={800}
      priority
      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
      </div>
      <div className="badge">خبرة قانونية منذ 2005</div>
      </div>

      <div className="about-content reveal">
      <span className="eyebrow" style={{ color: 'var(--matte-gold)', fontWeight: 'bold' }}>● المؤسس</span>
      <h2>خبرة قانونية تُرسخ الثقة،<br /><span className="gold-text">وحلولٌ تحمي المصالح والاستثمارات</span></h2>
      <p>
      نؤمن بأن العمل القانوني المتميز يبدأ بفهمٍ عميق للوقائع، وصياغة استراتيجية قانونية دقيقة، ثم تقديم تمثيل قانوني مهني ونزيه يهدف إلى حماية الحقوق والمصالح وتحقيق أفضل النتائج الممكنة. ونؤمن كذلك بأن الثقة لا تُبني باستعراض ملفات العملاء وإعلان نتائج قضاياهم بل تُبنى على الكفاءة والالتزام...
      </p>
      <p>
      تأسست مؤسسة الأستاذ محمود عبد الحميد للمحاماة عام <strong>2005</strong> واكتسبت منذ ذلك الحين خبرة عملية متراكمة تقوم علي :
      </p>

      <div className="about-why-points">
      <span className="point"><i className="fas fa-check-circle"></i> خبرة متراكمة في التقاضي والوصول إلى النقض والدستورية</span>
      <span className="point"><i className="fas fa-check-circle"></i> حلول قانونية متخصصة للشركات والمستثمرين</span>
      <span className="point"><i className="fas fa-check-circle"></i> سرية تامة وشفافية كاملة</span>
      <span className="point"><i className="fas fa-check-circle"></i> استراتيجيات مبنية على التحليل وإدارة المخاطر</span>
      </div>

      <div className="signature">
      <div>
      <div className="name">الأستاذ محمود عبد الحميد</div>
      <div className="title" style={{ fontSize: '0.8rem', color: 'var(--matte-gold)' }}>المؤسس – المحامي بالنقض والدستورية العليا</div>
      </div>
      <Link href="/about" className="btn-outline-gold" style={{ padding: '8px 24px', fontSize: '0.75rem' }}>
      تعرف على المؤسسة
      </Link>
      </div>
      </div>
      </div>
      </div>
      </section>

      {/* ===== PRACTICE AREAS ===== */}
      <section className="section section-gray" aria-label="مجالات الممارسة القانونية">
      <div className="section-inner">
      <div className="section-head reveal">
      <span className="eyebrow">● الممارسة</span>
      <h2>مجالات الممارسة القانونية</h2>
      <p>نقدم حلولاً قانونية متكاملة في التخصصات التالية، بدءاً من الاستشارة وصولاً إلى التمثيل القضائي.</p>
      </div>

      <div className="practice-grid">
      {['المنازعات المدنية', 'القانون التجاري', 'الخدمات القانونية للشركات', 'القضاء الإداري', 'الطعن الدستوري'].map((spec, i) => (
        <Link href="/specialties" key={i} className="practice-link">
        <div className="practice-card reveal">
        <div className="icon-wrap"><i className="fas fa-gavel"></i></div>
        <h3>{spec}</h3>
        <p>حلول واستشارات متكاملة بأعلى كفاءة.</p>
        </div>
        </Link>
      ))}
      </div>
      </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="section section-light" aria-label="سير العمل القانوني">
      <div className="section-inner">
      <div className="section-head reveal">
      <span className="eyebrow">● سير العمل</span>
      <h2>مراحل التعاون القانوني</h2>
      <p>رحلة قانونية واضحة ومنظمة، من الاستشارة الأولى إلى الحكم النهائي.</p>
      </div>

      <div className="process-timeline">
      {[
        { num: '01', title: 'الاستشارة الأولية', desc: 'مناقشة وقائع القضية وتحليل الموقف القانوني وتحديد المسار الأمثل.' },
        { num: '02', title: 'تحليل الملف وإعداد الاستراتيجية', desc: 'جمع المستندات، تحليل الأدلة، وصياغة الدفوع القانونية المناسبة.' },
        { num: '03', title: 'التمثيل القضائي والمتابعة', desc: 'الترافع أمام المحاكم بكفاءة مع متابعة دقيقة لكل جلسة.' },
        { num: '04', title: 'المتابعة حتى الحكم النهائي', desc: 'متابعة القضية حتى صدور الحكم والاستشارة بشأن الطعن عليه إن لزم.' }
      ].map((step, i) => (
        <div className="process-step reveal" key={i}>
        <span className="num">{step.num}</span>
        <div className="step-content">
        <h4>{step.title}</h4>
        <p>{step.desc}</p>
        </div>
        </div>
      ))}
      </div>
      </div>
      </section>

      {/* ===== SECTORS ===== */}
      <section className="section section-gray" aria-label="القطاعات التي نخدمها">
      <div className="section-inner">
      <div className="section-head reveal">
      <span className="eyebrow">● القطاعات</span>
      <h2>القطاعات التي نخدمها</h2>
      <p>نفهم الطبيعة القانونية والعملية للقطاعات التي نعمل معها، ونقدم حلولًا قانونية تتناسب مع احتياجات كل قطاع.</p>
      </div>

      <div className="experience-grid">
      {[
        { icon: 'fa-building', title: 'قطاع الشركات', desc: 'هيكلة الشركات، الحوكمة، وصياغة العقود التجارية.' },
        { icon: 'fa-handshake', title: 'القطاع التجاري', desc: 'صياغة ومراجعة العقود التجارية والمدنية.' },
        { icon: 'fa-gavel', title: 'قطاع التعويضات', desc: 'المطالبة بالتعويضات المادية والأدبية عن الأضرار.' }
      ].map((sec, i) => (
        <Link href="/sectors" key={i} className="sector-link">
        <div className="experience-card reveal">
        <span className="icon"><i className={`fas ${sec.icon}`}></i></span>
        <h4>{sec.title}</h4>
        <p>{sec.desc}</p>
        </div>
        </Link>
      ))}
      </div>
      </div>
      </section>

      {/* ===== LATEST NEWS (DYNAMIC) ===== */}
      <section className="section section-gray" aria-label="أخبار وإنجازات المؤسسة">
      <div className="section-inner">
      <div className="section-head reveal">
      <span className="eyebrow">● أخبار المؤسسة</span>
      <h2>آخر الأخبار والمستجدات</h2>
      <p>نوافيكم بأحدث ما توصلنا إليه من أحكام، مشاركات مجتمعية، وتطورات مكتبنا القانوني.</p>
      </div>

      <div className="experience-grid">
      {latestNews.length === 0 ? (
        <div className="col-span-full text-center py-10" style={{ gridColumn: 'span 3', color: 'var(--matte-gold)', fontWeight: 'bold' }}>
        <i className="far fa-clock mb-2" style={{ fontSize: '2rem', display: 'block' }}></i>
        قريباً - سنوافيكم بأحدث المستجدات والأخبار القانونية فور نشرها.
        </div>
      ) : (
        latestNews.map((item, i) => (
          <Link href={`/news/${item.slug}`} key={i} className="sector-link">
          <div className="experience-card reveal" style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ background: 'var(--matte-gold)', color: '#000', padding: '0.1rem 0.8rem', borderRadius: '20px', fontSize: '0.6rem', fontWeight: '800' }}>
          {item.category || 'مستجدات'}
          </span>
          <span style={{ fontSize: '0.7rem' }}>{item.date}</span>
          </div>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <span style={{ color: 'var(--matte-gold)', fontWeight: '700', fontSize: '0.8rem', marginTop: '0.5rem', display: 'inline-block' }}>
          اقرأ التفاصيل ←
          </span>
          </div>
          </Link>
        ))
      )}
      </div>
      </div>
      </section>

      {/* ===== LATEST ARTICLES (DYNAMIC) ===== */}
      <section className="section section-light" aria-label="المكتبة القانونية">
      <div className="section-inner">
      <div className="section-head reveal">
      <span className="eyebrow">● المكتبة القانونية</span>
      <h2>أحدث المقالات القانونية</h2>
      <p>اطلع على أحدث ما ننشره في مجال القانون المصري.</p>
      </div>

      <div className="blog-grid">
      {latestArticles.length === 0 ? (
        <div className="col-span-full text-center py-10" style={{ gridColumn: 'span 3' }}>لا توجد مقالات قانونية منشورة حالياً.</div>
      ) : (
        latestArticles.map((art, i) => (
          <div className="blog-card reveal" key={i}>
          <div className="card-body">
          <span className="badge" style={{ color: 'var(--matte-gold)', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>
          دراسة قانونية
          </span>
          <h3>{art.title}</h3>
          <div className="meta" style={{ fontSize: '0.75rem', marginBottom: '1rem', color: 'rgba(34,34,34,0.6)' }}>
          <span><i className="far fa-calendar-alt"></i> {art.date}</span>
          </div>
          <Link href={`/article/${art.slug}`} className="btn-read">
          استعراض الدراسة <i className="fas fa-arrow-left"></i>
          </Link>
          </div>
          </div>
        ))
      )}
      </div>
      </div>
      </section>

      {/* ===== MAP ===== */}
      <section className="map-section" aria-label="موقع المكتب">
      <div className="map-container">
      <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1819.3414902100868!2d32.8988582!3d24.0886561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA1JzE5LjIiTiAzMsKwNTMnNTUuOSJF!5e0!3m2!1sar!2seg!4v1700000000000"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-cross-origin"
      title="موقع مؤسسة الأستاذ محمود عبد الحميد للمحاماة في أسوان"
      style={{ width: '100%', height: '100%', border: 0 }}
      ></iframe>
      </div>
      <div className="map-address">
      <i className="fas fa-map-marker-alt"></i>
      شارع كسر الحجر، المتفرع من شارع كورنيش النيل، أمام مجمع المحاكم – أسوان، مصر
      </div>
      </section>
      </>
  );
}

export async function getStaticProps() {
  const articles = await getAllArticles();
  const news = await getAllNews();

  return {
    props: {
      latestArticles: articles.slice(0, 3),
      latestNews: news.slice(0, 3),
    },
    revalidate: 60, // بناء تلقائي ذكي كل دقيقة
  };
}
