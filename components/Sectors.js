export default function Sectors() {
  const sectors = [
    {
      title: 'قطاع الشركات',
      desc: 'هيكلة الشركات، الحوكمة، وصياغة العقود التجارية.'
    },
    {
      title: 'القطاع التجاري',
      desc: 'صياغة ومراجعة العقود التجارية والمدنية.'
    },
    {
      title: 'قطاع التعويضات',
      desc: 'المطالبة بالتعويضات المادية والأدبية عن الأضرار.'
    }
  ];

  return (
    <section className="section section-gray" aria-label="القطاعات التي نخدمها">
      <div className="section-inner">
        <div className="section-head reveal">
          <span className="eyebrow">● القطاعات</span>
          <h2>القطاعات التي نخدمها</h2>
          <p>
            نفهم الطبيعة القانونية والعملية للقطاعات التي نعمل معها، ونقدم حلولًا قانونية تتناسب مع احتياجات كل قطاع.
          </p>
        </div>
        <div className="experience-grid">
          {sectors.map((sector) => (
            <div key={sector.title} className="sector-card reveal">
              <h3>{sector.title}</h3> {/* تم تغيير h4 إلى h3 */}
              <p>{sector.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .section {
          padding: 5rem 2rem;
        }
        .section-gray {
          background: var(--light-gray);
        }
        .section-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-head {
          text-align: center;
          margin-bottom: 3rem;
        }
        .section-head .eyebrow {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--matte-gold-light, #D4AF37);
          display: block;
          margin-bottom: 0.4rem;
        }
        .section-head h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 900;
          color: var(--charcoal, #1A1A1A);
          line-height: 1.2;
        }
        .section-head p {
          max-width: 720px;
          margin: 0.6rem auto 0;
          color: var(--text-secondary, #2D2D2D);
          font-weight: 700;
          font-size: 1.05rem;
          line-height: 1.9;
        }
        .experience-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
        }
        .sector-card {
          background: var(--pure-white);
          padding: 1.6rem 1.2rem;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.4s var(--ease-out);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
          text-align: center;
          cursor: default;
          position: relative;
        }
        .sector-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 3px;
          background: var(--matte-gold-light, #D4AF37);
          transition: width 0.6s var(--ease-out);
          border-radius: 0 0 10px 10px;
        }
        .sector-card:hover::after {
          width: 100%;
        }
        .sector-card:hover {
          border-color: var(--matte-gold-light, #D4AF37);
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
        }
        .sector-card h3 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--charcoal, #1A1A1A);
          margin-bottom: 0.4rem;
        }
        .sector-card p {
          font-size: 0.9rem;
          color: var(--text-secondary, #2D2D2D);
          font-weight: 700;
          line-height: 1.7;
        }
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s var(--ease-out);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 820px) {
          .experience-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 640px) {
          .experience-grid {
            grid-template-columns: 1fr;
            max-width: 320px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
