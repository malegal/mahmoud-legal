import Link from 'next/link';

export default function SectorsSection() {
  const sectors = [
    { icon: 'fa-building', title: 'قطاع الشركات', desc: 'هيكلة الشركات، الحوكمة، وصياغة العقود التجارية.' },
    { icon: 'fa-handshake', title: 'القطاع التجاري', desc: 'صياغة ومراجعة العقود التجارية والمدنية.' },
    { icon: 'fa-gavel', title: 'قطاع التعويضات', desc: 'المطالبة بالتعويضات المادية والأدبية عن الأضرار.' },
  ];

  return (
    <section className="section section-gray" aria-label="القطاعات التي نخدمها">
      <div className="section-inner">
        <div className="section-head reveal">
          <span className="eyebrow">● القطاعات</span>
          <h2>القطاعات التي نخدمها</h2>
          <p>نفهم الطبيعة القانونية والعملية للقطاعات التي نعمل معها، ونقدم حلولًا قانونية تتناسب مع احتياجات كل قطاع.</p>
        </div>

        <div className="experience-grid">
          {sectors.map((sector, index) => (
            <Link key={index} href="/sectors" className="sector-link">
              <div className="experience-card reveal" style={{ transitionDelay: `${index * 0.08}s` }}>
                <span className="icon">
                  <i className={`fas ${sector.icon}`}></i>
                </span>
                <h4>{sector.title}</h4>
                <p>{sector.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
