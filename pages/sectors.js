import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Sectors() {
  const sectorsList = [
    { title: 'الشركات التجارية', desc: 'تأسيس وحوكمة ومراجعة القضايا والاندماج والاستحواذ.', icon: 'fa-building', path: 'companies' },
    { title: 'الجمعيات والمؤسسات الأهلية', desc: 'التسجيل وتكييف الأوضاع وفقاً للوائح والأنظمة المصرية.', icon: 'fa-hand-holding-heart', path: 'ngos' },
    { title: 'المستثمرون', desc: 'تقييم المخاطر وتأمين الاستثمارات في مصر والتمثيل القضائي.', icon: 'fa-chart-line', path: 'investors' },
    { title: 'المطورون العقاريون', desc: 'صياغة عقود البيع والتطوير والمراجعة القانونية للأراضي.', icon: 'fa-city', path: 'developers' },
    { title: 'المقاولون', desc: 'صياغة عقود التشييد والبناء، إدارة المطالبات، والمنازعات الهندسية.', icon: 'fa-hard-hat', path: 'contractors' },
    { title: 'الورثة والتركات', desc: 'تقسيم التركات وإدارة المواريث وحل منازعات الإرث وفق القوانين.', icon: 'fa-tree', path: 'heirs' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  return (
    <>
    <Head>
    <title>القطاعات التي نخدمها | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
    <meta name="description" content="نقدم خدمات قانونية متخصصة للشركات، المستثمرين، المطورين العقاريين، الجمعيات الأهلية، الأفراد، والورثة." />
    <link rel="canonical" href="https://ostazlaw.vercel.app/sectors" />
    </Head>

    <style jsx>{`
      .hero-sectors {
        padding: 120px 2rem 4rem;
        background: var(--very-dark-navy);
        position: relative;
        overflow: hidden;
        min-height: 50vh;
        display: flex;
        align-items: center;
      }
      .hero-inner {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
        width: 100%;
      }
      .hero-title-wrap {
        text-align: center;
        max-width: 860px;
        margin: 0 auto;
      }
      .hero-title-wrap h1 {
        font-family: var(--font-serif);
        font-size: clamp(2.4rem, 5vw, 4rem);
        font-weight: 900;
        color: #fff;
        line-height: 1.1;
      }
      .hero-title-wrap .sub {
        font-size: clamp(1rem, 1.3vw, 1.2rem);
        color: rgba(255, 255, 255, 0.7);
        max-width: 720px;
        margin: 0.8rem auto 0;
        line-height: 1.8;
      }
      .intro-text {
        max-width: 780px;
        margin: 0 auto;
        font-size: 1.05rem;
        color: var(--charcoal);
        font-weight: 700;
        line-height: 1.9;
        text-align: center;
      }
      .sectors-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
      }
      .industry-card {
        background: var(--pure-white);
        border-radius: 16px;
        border: 1px solid rgba(0, 0, 0, 0.04);
        padding: 2.5rem 1.8rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
        transition: all 0.4s var(--ease-out);
        display: flex;
        flex-direction: column;
      }
      .industry-card:hover {
        border-color: var(--matte-gold);
        transform: translateY(-6px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.04);
      }
      .icon-wrap {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: rgba(176, 141, 87, 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
      }
      .icon-wrap i {
        font-size: 1.3rem;
        color: var(--matte-gold);
      }
      .industry-card h3 {
        font-size: 1.2rem;
        font-weight: 800;
        color: var(--charcoal);
        margin-bottom: 0.5rem;
      }
      .desc {
        font-size: 0.95rem;
        color: var(--charcoal);
        font-weight: 700;
        line-height: 1.7;
        margin-bottom: 1.5rem;
        flex: 1;
      }
      @media (max-width: 1024px) {
        .sectors-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 820px) {
        .hero-sectors { padding: 100px 1rem 3rem; }
        .sectors-grid { grid-template-columns: 1fr; }
      }
      `}</style>

      <section className="hero-sectors" aria-label="القطاعات التي نخدمها">
      <div className="hero-inner">
      <div className="hero-title-wrap reveal">
      <span className="en-tag" style={{ color: 'var(--matte-gold)', fontSize: '0.7rem', display: 'block', marginBottom: '0.5rem' }}>Our Sectors</span>
      <h1>القطاعات <span className="gold-text">التي نخدمها</span></h1>
      <p className="sub">
      لكل قطاع طبيعته وتحدياته القانونية الخاصة، ولذلك نعتمد على فهم دقيق للنشاط والبيئة المحيطة به لتقديم حلول دقيقة ومثمرة.
      </p>
      </div>
      </div>
      </section>

      <section className="section section-light">
      <div className="section-inner">
      <div className="intro-text reveal">
      <p>
      لا يمكن أن تكون الاستشارة القانونية واحدة لجميع العملاء، فلكل قطاع خصوصيته التشغيلية، ولكل نشاط بيئته القانونية التي تختلف عن غيره.
      </p>
      </div>
      </div>
      </section>

      <section className="section section-gray">
      <div className="section-inner">
      <div className="sectors-grid">
      {sectorsList.map((sector, i) => (
        <div className="industry-card reveal" key={i}>
        <div className="icon-wrap">
        <i className={`fas ${sector.icon}`}></i>
        </div>
        <h3>{sector.title}</h3>
        <p className="desc">{sector.desc}</p>
        <Link href={`/contact?tab=consult&sector=${encodeURIComponent(sector.title)}`} className="btn-outline-gold" style={{ alignSelf: 'flex-start', padding: '8px 20px', fontSize: '0.8rem' }}>
        اطلب استشارة متخصصة
        </Link>
        </div>
      ))}
      </div>
      </div>
      </section>
      </>
  );
}
