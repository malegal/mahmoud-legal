import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Specialties() {
  const [activeSpecialty, setActiveSpecialty] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // بيانات التخصصات (مأخوذة من specialties.html الأصلي)
  const specialtiesData = [
    {
      id: 'civil',
      icon: 'fa-gavel',
      title: 'المنازعات المدنية',
      subtitle: 'حلول قانونية للنزاعات المالية والعقارية',
      desc: 'نحن نتفهم أن المنازعات المدنية قد تستنزف وقتك وجهدك ومالك. لهذا نضع خبرتنا التي تمتد منذ 2005 بين يديك، لنقدم دفاعاً قانونياً قوياً وحلولاً مبتكرة.',
      services: ['دعاوى التعويض بجميع أنواعها', 'نزاعات الملكية العقارية والأراضي', 'دعاوى صحة ونفاذ العقود', 'دعاوى الطرد والإيجارات', 'المطالبات المالية والمديونيات'],
      why: 'نضع استراتيجيات تقاضي مدروسة، ونمتلك خبرة واسعة في إدارة الأدلة وتقديم المرافعات القوية.',
      steps: ['مراجعة قضيتك وفهم التفاصيل', 'تحليل قانوني شامل ودراسة الأدلة', 'وضع خطة قانونية مخصصة', 'التمثيل أمام المحكمة بثقة']
    },
    {
      id: 'commercial',
      icon: 'fa-balance-scale',
      title: 'المنازعات التجارية',
      subtitle: 'حماية مصالحك التجارية والشركات',
      desc: 'العالم التجاري مليء بالفرص، لكنه أيضاً مليء بالتحديات القانونية. نحن هنا لحماية عملك واستثماراتك من أي نزاعات.',
      services: ['تأسيس الشركات بجميع أنواعها', 'قضايا الإفلاس والإعسار', 'منازعات الأوراق التجارية', 'قضايا العلامات التجارية', 'التمثيل القانوني للشركات'],
      why: 'نفهم تعقيدات القوانين التجارية ونمتلك شبكة علاقات واسعة تمكننا من حل النزاعات بسرعة وحكمة.',
      steps: ['تقييم وضعك التجاري والقانوني', 'تحليل المخاطر والبدائل المتاحة', 'وضع خطة قانونية تحمي عملك', 'التفاوض أو التمثيل أمام المحاكم']
    },
    {
      id: 'family',
      icon: 'fa-users',
      title: 'قضايا الأسرة والأحوال الشخصية',
      subtitle: 'حلول رحيمة وخصوصية تامة',
      desc: 'قضايا الأسرة هي الأكثر حساسية في حياتنا. نتعامل معها بكل رحمة وحكمة، ونقدم لك الدعم القانوني والنفسي الذي تحتاجه.',
      services: ['دعاوى الطلاق والخلع والفسخ', 'قضايا النفقة بأنواعها', 'دعاوى الرؤية والحضانة', 'إعلام الوراثة وتقسيم التركات', 'تصحيح أسماء ووثائق الزواج'],
      why: 'نهجنا حساس ويحترم خصوصيتك. لدينا خبرة عميقة في قضايا الأسرة وفقاً للشريعة والقانون المصري.',
      steps: ['فهم قضيتك واحتياجات أسرتك', 'جمع الوثائق والمستندات اللازمة', 'صياغة الدعوى أو الاتفاق الودي', 'التمثيل أمام محاكم الأسرة']
    },
    {
      id: 'criminal',
      icon: 'fa-shield-alt',
      title: 'الدفاع الجنائي',
      subtitle: 'نحمي حقوقك وكرامتك',
      desc: 'الاتهام الجنائي هو من أصعب اللحظات التي قد تمر بها. نحن هنا للدفاع عنك بكل قوة، نستمع لك، ندرس أدلة الاتهام بدقة، ونضع استراتيجية دفاع قوية.',
      services: ['الدفاع في قضايا الجنايات الكبرى', 'الدفاع في الجنح والمخالفات', 'إعداد مذكرات الطعن بالنقض الجنائي', 'قضايا الأموال العامة والرشوة', 'حضور التحقيقات أمام النيابة العامة'],
      why: 'لدينا فهم دقيق لآليات النظام الجنائي المصري، ونعرف كيف نفنّد الأدلة ونكشف نقاط الضعف في الاتهام.',
      steps: ['مراجعة ملف قضيتك والأدلة', 'تحليل التهم ونقاط القوة والضعف', 'وضع خطة دفاع قوية ومخصصة', 'التمثيل أمام المحكمة بثقة']
    },
    {
      id: 'admin',
      icon: 'fa-building',
      title: 'المنازعات الإدارية',
      subtitle: 'نواجه الحكومة نيابة عنك',
      desc: 'عندما تواجه قراراً إدارياً جائراً أو تتعرض لظلم من جهة حكومية، فإننا نضع خبرتنا في القانون الإداري بين يديك.',
      services: ['الطعن بإلغاء القرارات الإدارية', 'دعاوى التعويض ضد الجهات الحكومية', 'قضايا الموظفين العموميين', 'منازعات العقود الإدارية', 'تنفيذ الأحكام الصادرة ضد الدولة'],
      why: 'خبرة طويلة في التعامل مع الأجهزة الحكومية ومجلس الدولة، ونعرف خبايا القانون الإداري المصري.',
      steps: ['مراجعة القرار الإداري الذي تعرضت له', 'تحليل الأسس القانونية للطعن', 'تقديم الطعن أمام مجلس الدولة', 'التمثيل والمرافعة بكل حزم']
    },
    {
      id: 'contracts',
      icon: 'fa-file-contract',
      title: 'صياغة العقود',
      subtitle: 'نحميك قبل وقوع النزاع',
      desc: 'العقد الجيد هو خط الدفاع الأول عن حقوقك. نحن نصيغ عقودك بدقة قانونية متناهية، نغلق كل الثغرات التي قد يستغلها الطرف الآخر.',
      services: ['صياغة عقود البيع والشراء', 'صياغة عقود الشراكة والاستثمار', 'مراجعة العقود وتعديلها', 'صياغة مذكرات التفاهم واتفاقيات عدم الإفصاح', 'التفاوض نيابة عنك قبل التوقيع'],
      why: 'دقتنا في الصياغة وخبرتنا في توقع الثغرات القانونية تجعل عقودك درعاً حصيناً يحمي حقوقك ومصالحك.',
      steps: ['فهم أهدافك وتوقعاتك من العقد', 'جمع المعلومات والوثائق اللازمة', 'صياغة مسودة أولية للعقد', 'مراجعة وتعديل النصوص معك']
    },
    {
      id: 'labor',
      icon: 'fa-briefcase',
      title: 'المنازعات العمالية',
      subtitle: 'نحمي حقوقك في العمل',
      desc: 'العلاقة بين العامل وصاحب العمل قد تشهد توترات ونزاعات. نحن هنا لضمان حقوقك العمالية الكاملة.',
      services: ['دعاوى الفصل التعسفي', 'المطالبة بالمستحقات العمالية', 'صياغة لوائح العمل الداخلية', 'التحقيق الإداري مع الموظفين', 'إصابات العمل والتأمين الاجتماعي'],
      why: 'نفهم قانون العمل المصري جيداً، ونمتلك خبرة في قضايا العمال والموظفين، مما يضمن لك دفاعاً قوياً وعادلاً.',
      steps: ['فهم العلاقة العمالية والنزاع', 'جمع المستندات والإثباتات', 'صياغة الدعوى أو الاتفاق الودي', 'التمثيل أمام المحاكم العمالية']
    },
    {
      id: 'arbitration',
      icon: 'fa-hand-holding-usd',
      title: 'التحكيم والوساطة',
      subtitle: 'حلول سريعة وودية',
      desc: 'ليس كل نزاع يحتاج إلى معركة قضائية طويلة. نقدم لك بدائل فعالة لحل النزاعات بسرعة وسرية، من خلال التحكيم والوساطة.',
      services: ['صياغة شرط التحكيم في العقود', 'التمثيل في هيئات التحكيم', 'تنفيذ أحكام المحكمين', 'الوساطة الودية لتسوية النزاعات', 'دعاوى بطلان حكم التحكيم'],
      why: 'خبرة واسعة في إجراءات التحكيم المحلي والدولي، نضمن لك سير العملية بسلاسة ووصولاً إلى حل عادل وسريع.',
      steps: ['تقييم إمكانية التحكيم في نزاعك', 'صياغة اتفاقية التحكيم', 'تشكيل هيئة التحكيم المناسبة', 'جلسات التحكيم والمرافعة']
    },
    {
      id: 'constitutional',
      icon: 'fa-university',
      title: 'الطعن الدستوري',
      subtitle: 'نحمي الدستورية في مصر',
      desc: 'الطعن بعدم دستورية القوانين هو أعلى درجات التقاضي، ويتطلب خبرة قانونية وفقهية عميقة. نحن نقدم لك هذه الخبرة.',
      services: ['إقامة الدعاوى بعدم دستورية القوانين', 'إعداد المذكرات القانونية للمحكمة الدستورية', 'منازعات التنفيذ أمام المحكمة الدستورية', 'تفسير النصوص التشريعية', 'فحص القوانين وبيان مدى مطابقتها للدستور'],
      why: 'خبرة استثنائية في القانون الدستوري المصري، وفهم عميق لأحكام المحكمة الدستورية العليا.',
      steps: ['تحليل النص التشريعي محل الطعن', 'دراسة مدى مطابقته للدستور', 'إعداد الطعن الدستوري بدقة', 'التمثيل أمام المحكمة الدستورية العليا']
    },
    {
      id: 'cassation',
      icon: 'fa-gavel',
      title: 'الطعن بالنقض',
      subtitle: 'الطعن أمام محكمة النقض في الأحكام القضائية',
      desc: 'الطعن بالنقض هو إجراء قانوني يهدف إلى مراجعة الأحكام الصادرة عن محاكم الاستئناف أمام محكمة النقض. نمتلك خبرة طويلة في إعداد الطعون بالنقض المدنية والجنائية، وندرك تماماً الشكلية والمادية التي تقوم عليها هذه الطعون.',
      services: ['إعداد مذكرات الطعن بالنقض', 'تمثيل العملاء أمام محكمة النقض', 'الطعن في الأحكام الجنائية والمدنية', 'متابعة إجراءات الطعن حتى الفصل', 'تقديم الدفوع القانونية المتعلقة بالنقض'],
      why: 'خبرة واسعة في أحكام محكمة النقض، وفهم دقيق للأسباب التي تؤدي إلى نقض الأحكام، مما يزيد من فرص نجاح طعنك.',
      steps: ['دراسة الحكم المراد الطعن فيه', 'تحديد أسباب الطعن القانونية', 'صياغة مذكرة الطعن وإيداعها', 'التمثيل أمام دائرة النقض']
    },
    {
      id: 'admin_appeal',
      icon: 'fa-landmark',
      title: 'الطعون الإدارية العليا',
      subtitle: 'الطعن أمام المحكمة الإدارية العليا (مجلس الدولة)',
      desc: 'الطعون الإدارية العليا هي السبيل للطعن في الأحكام الصادرة عن محاكم القضاء الإداري أمام المحكمة الإدارية العليا، وهي أعلى سلطة قضائية في مجلس الدولة. نتمتع بخبرة ممتدة في هذا المجال، ونقدم استشارات وتمثيلاً متخصصاً في هذه الطعون.',
      services: ['إعداد مذكرات الطعن الإداري العليا', 'تمثيل العملاء أمام المحكمة الإدارية العليا', 'الطعن في أحكام القضاء الإداري', 'متابعة إجراءات الطعن حتى الفصل', 'تقديم الدفوع القانونية الإدارية'],
      why: 'خبرة عميقة في قوانين مجلس الدولة وأحكام المحكمة الإدارية العليا، مما يضمن تقديم طعون قوية ومقنعة.',
      steps: ['دراسة الحكم الإداري المراد الطعن فيه', 'تحديد أسباب الطعن وفقاً للقانون', 'صياغة مذكرة الطعن وإيداعها', 'التمثيل أمام المحكمة الإدارية العليا']
    }
  ];

  const toggleSpecialty = (id) => {
    setActiveSpecialty(activeSpecialty === id ? null : id);
  };

  return (
    <Layout>
      <Head>
        <title>التخصصات القانونية | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
        <meta name="description" content="خبرة قانونية منذ 2005 في المنازعات المدنية، التجارية، العمالية، الإدارية، قضايا الأسرة، الدفاع الجنائي، والطعن الدستوري، والنقض، والطعون الإدارية." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ostazlaw.vercel.app/specialties.html" />
        <link rel="alternate" hreflang="ar-eg" href="https://ostazlaw.vercel.app/specialties.html" />
        <link rel="alternate" hreflang="en" href="https://ostazlaw.vercel.app/en/specialties.html" />
        <meta property="og:title" content="التخصصات القانونية | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" />
        <meta property="og:description" content="خدمات قانونية متكاملة في المنازعات المدنية، التجارية، العمالية، الإدارية، قضايا الأسرة، والدفاع الجنائي، والطعن الدستوري، والنقض، والطعون الإدارية." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/specialties.html" />
        <meta property="og:image" content="https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.jpg" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" />
        <meta property="og:locale" content="ar_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.jpg" />
        <meta name="twitter:image:alt" content="الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LegalService",
                  "@id": "https://ostazlaw.vercel.app/#organization",
                  "name": "مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية",
                  "alternateName": "OSTAZ LAW",
                  "description": "مؤسسة قانونية مصرية تقدم خدمات المحاماة والاستشارات القانونية للأفراد والشركات.",
                  "url": "https://ostazlaw.vercel.app/",
                  "logo": "https://ostazlaw.vercel.app/logo.png",
                  "email": "ma.law.firm@outlook.com",
                  "telephone": "+201101076000",
                  "foundingDate": "2005",
                  "areaServed": { "@type": "Country", "name": "مصر" },
                  "availableLanguage": ["Arabic", "English"],
                  "sameAs": [
                    "https://www.facebook.com/malegal",
                    "https://x.com/mahmoud_a_hamyd",
                    "https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374"
                  ],
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "القاهرة",
                    "addressCountry": "مصر"
                  }
                },
                {
                  "@type": "Person",
                  "@id": "https://ostazlaw.vercel.app/#founder",
                  "name": "محمود عبد الحميد",
                  "jobTitle": "المحامي بالنقض والدستورية العليا",
                  "worksFor": { "@id": "https://ostazlaw.vercel.app/#organization" },
                  "url": "https://ostazlaw.vercel.app/about.html",
                  "image": {
                    "@type": "ImageObject",
                    "url": "https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.jpg",
                    "caption": "الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا"
                  }
                },
                {
                  "@type": "CollectionPage",
                  "@id": "https://ostazlaw.vercel.app/specialties.html#webpage",
                  "url": "https://ostazlaw.vercel.app/specialties.html",
                  "name": "التخصصات القانونية",
                  "description": "قائمة شاملة بتخصصات مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية",
                  "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" },
                  "about": { "@id": "https://ostazlaw.vercel.app/#organization" }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://ostazlaw.vercel.app/#website",
                  "name": "مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية",
                  "url": "https://ostazlaw.vercel.app/",
                  "description": "مؤسسة قانونية مصرية تقدم خدمات المحاماة والاستشارات القانونية."
                }
              ]
            })
          }}
        />
      </Head>

      <section className="hero-specialties" aria-label="التخصصات القانونية">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">Our Legal Specialties</span>
            <h1>التخصصات <span className="gold-text">القانونية</span></h1>
            <p className="sub">خبرة قانونية تمتد منذ 2005 في حل المنازعات المدنية والتجارية والعمالية والإدارية، وقضايا الأسرة، والدفاع الجنائي، والطعن الدستوري، والنقض، والطعون الإدارية العليا.</p>
          </div>
          <div className="hero-badges">
            <span className="hero-badge">المنازعات المدنية</span>
            <span className="hero-badge">المنازعات التجارية</span>
            <span className="hero-badge">قضايا الأسرة</span>
            <span className="hero-badge">الدفاع الجنائي</span>
            <span className="hero-badge">المنازعات الإدارية</span>
            <span className="hero-badge">الطعن الدستوري</span>
            <span className="hero-badge">الطعن بالنقض</span>
            <span className="hero-badge">الطعون الإدارية العليا</span>
            <span className="hero-badge">المنازعات العمالية</span>
          </div>
          <div className="hero-cta">
            <Link href="/contact?tab=consult" className="btn-gold">احصل على استشارة فورية <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i></Link>
          </div>
        </div>
      </section>

      <section className="section section-gray" aria-label="التخصصات">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● تخصصاتنا</span>
            <h2>مجالات الممارسة القانونية</h2>
            <p>اختر تخصصك لتعرف المزيد عن الخدمات التي نقدمها.</p>
          </div>

          {specialtiesData.map((spec, index) => {
            const isActive = activeSpecialty === spec.id;
            return (
              <div key={spec.id} className={`specialty-card-wrap gold-underline-card reveal ${isActive ? 'active' : ''}`} onClick={() => toggleSpecialty(spec.id)}>
                <div className="specialty-card-header">
                  <div className="icon-wrap"><i className={`fas ${spec.icon}`}></i></div>
                  <div className="info">
                    <h3>{spec.title}</h3>
                    <p>{spec.subtitle}</p>
                  </div>
                  <span className="toggle-icon"><i className="fas fa-chevron-down"></i></span>
                </div>
                <div className="specialty-details">
                  <p className="desc">{spec.desc}</p>
                  <div className="detail-grid">
                    <div className="detail-col">
                      <h5><i className="fas fa-list-ul" style={{ marginLeft: '6px' }}></i> الخدمات التي نقدمها</h5>
                      <ul>
                        {spec.services.map((s, i) => <li key={i}><i className="fas fa-circle"></i> {s}</li>)}
                      </ul>
                    </div>
                    <div className="detail-col">
                      <h5><i className="fas fa-star" style={{ marginLeft: '6px' }}></i> لماذا تختارنا؟</h5>
                      <p>{spec.why}</p>
                      <h5 style={{ marginTop: '0.8rem' }}><i className="fas fa-clock" style={{ marginLeft: '6px' }}></i> خطوات العمل</h5>
                      <ul>
                        {spec.steps.map((s, i) => <li key={i}><i className="fas fa-circle"></i> {s}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="detail-cta">
                    <Link href={`/contact?tab=consult&specialty=${encodeURIComponent(spec.title)}`} className="btn-gold">طلب استشارة</Link>
                    <Link href={`/contact?tab=appointment&specialty=${encodeURIComponent(spec.title)}`} className="btn-outline-gold">حجز موعد</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="cta-section" aria-label="طلب استشارة">
        <div className="section-inner reveal">
          <span className="eyebrow" style={{ display: 'block', fontSize: '0.65rem', fontWeight: '800', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--matte-gold)', opacity: '0.5', marginBottom: '0.3rem' }}>● تواصل معنا</span>
          <h2>لم تجد مسألتك القانونية؟</h2>
          <p>فريقنا القانوني المتخصص يقدم استشارات دقيقة في كافة التخصصات. تواصل معنا الآن.</p>
          <Link href="/contact?tab=consult" className="btn-gold">طلب استشارة قانونية <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i></Link>
        </div>
      </section>

      <section className="section section-gray" aria-label="الأسئلة الشائعة">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● استفسارات</span>
            <h2>أسئلة شائعة</h2>
            <p>إجابات على أكثر الأسئلة التي تهم عملاءنا.</p>
          </div>

          <div className="faq-list">
            <div className="faq-item reveal reveal-d1 active">
              <button className="faq-question" aria-expanded="true">
                <span>ما هي درجات التقاضي التي تمثلون العملاء أمامها؟</span>
                <span className="icon"><i className="fas fa-chevron-down"></i></span>
              </button>
              <div className="faq-answer">
                <p>نمثل العملاء أمام جميع درجات التقاضي في مصر، بدءاً من المحاكم الجزئية والابتدائية، مروراً بمحاكم الاستئناف، وصولاً إلى محكمة النقض والمحكمة الدستورية العليا والمحكمة الإدارية العليا.</p>
              </div>
            </div>
            <div className="faq-item reveal reveal-d2">
              <button className="faq-question" aria-expanded="false">
                <span>هل تقدمون استشارات قانونية قبل رفع الدعوى؟</span>
                <span className="icon"><i className="fas fa-chevron-down"></i></span>
              </button>
              <div className="faq-answer">
                <p>نعم، نؤمن بأن الاستشارة القانونية المبكرة هي خط الدفاع الأول. نقدم تحليلاً قانونياً دقيقاً للوقائع، ونعرض البدائل المتاحة مع بيان الآثار القانونية والمالية لكل خيار.</p>
              </div>
            </div>
            <div className="faq-item reveal reveal-d3">
              <button className="faq-question" aria-expanded="false">
                <span>كيف تتعاملون مع سرية معلومات العملاء؟</span>
                <span className="icon"><i className="fas fa-chevron-down"></i></span>
              </button>
              <div className="faq-answer">
                <p>نلتزم بأعلى معايير السرية المهنية وفقاً لأخلاقيات مهنة المحاماة. جميع المعلومات والوثائق والبيانات المتعلقة بعملائنا تُحفظ بسرية تامة ولا تُكشف لأي طرف ثالث.</p>
              </div>
            </div>
            <div className="faq-item reveal reveal-d1">
              <button className="faq-question" aria-expanded="false">
                <span>كم تستغرق مدة التقاضي في القضايا التي تتبعونها؟</span>
                <span className="icon"><i className="fas fa-chevron-down"></i></span>
              </button>
              <div className="faq-answer">
                <p>تختلف مدة التقاضي حسب نوع القضية ودرجة المحكمة. نعمل على تسريع الإجراءات قدر الإمكان مع الالتزام الكامل بالأطر القانونية، ونطلع عملاءنا بانتظام على تطورات قضاياهم.</p>
              </div>
            </div>
            <div className="faq-item reveal reveal-d2">
              <button className="faq-question" aria-expanded="false">
                <span>هل تتعاملون مع قضايا التحكيم التجاري؟</span>
                <span className="icon"><i className="fas fa-chevron-down"></i></span>
              </button>
              <div className="faq-answer">
                <p>نعم، لدينا خبرة في تمثيل العملاء في إجراءات التحكيم التجاري المحلي والدولي، ونقدم استشارات متخصصة في هذا المجال.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-specialties {
          padding: 120px 2rem 4rem;
          background: var(--very-dark-navy);
          position: relative;
          overflow: hidden;
          min-height: 70vh;
          display: flex;
          align-items: center;
        }
        .hero-specialties .hero-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: radial-gradient(circle at 20% 30%, var(--matte-gold) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--matte-gold) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero-specialties .hero-glow {
          position: absolute;
          width: 60vw;
          height: 60vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(176, 141, 87, 0.04) 0%, transparent 70%);
          top: -20%;
          right: -20%;
          pointer-events: none;
          animation: orbFloat 20s ease-in-out infinite alternate;
        }
        .hero-specialties .hero-glow-2 {
          position: absolute;
          width: 40vw;
          height: 40vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(176, 141, 87, 0.02) 0%, transparent 70%);
          bottom: -20%;
          left: -10%;
          pointer-events: none;
          animation: orbFloat 25s ease-in-out infinite alternate-reverse;
        }
        @keyframes orbFloat {
          0% { transform: translate(0,0) scale(1); }
          100% { transform: translate(40px, -30px) scale(1.05); }
        }
        .hero-specialties .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          width: 100%;
        }
        .hero-specialties .hero-title-wrap {
          text-align: center;
        }
        .hero-specialties .hero-title-wrap .en-tag {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--matte-gold);
          opacity: 0.5;
          display: block;
          margin-bottom: 0.3rem;
        }
        .hero-specialties .hero-title-wrap h1 {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
        }
        .hero-specialties .hero-title-wrap h1 .gold-text {
          color: var(--matte-gold);
        }
        .hero-specialties .hero-title-wrap .sub {
          font-size: clamp(1rem, 1.3vw, 1.2rem);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
          max-width: 700px;
          margin: 0.8rem auto 0;
          line-height: 1.7;
        }
        .hero-specialties .hero-badges {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.8rem;
        }
        .hero-specialties .hero-badge {
          border: 1px solid rgba(176, 141, 87, 0.06);
          background: rgba(176, 141, 87, 0.015);
          padding: 4px 16px;
          border-radius: 50px;
          font-size: 0.55rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.25);
          letter-spacing: 0.04em;
          transition: all 0.4s var(--ease-out);
          cursor: default;
        }
        .hero-specialties .hero-badge:hover {
          border-color: rgba(176, 141, 87, 0.2);
          color: var(--matte-gold);
        }
        .hero-specialties .hero-cta {
          text-align: center;
          margin-top: 2rem;
        }

        .specialty-card-wrap {
          margin-bottom: 1.2rem;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.04);
          background: var(--pure-white);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
          overflow: hidden;
          transition: all 0.4s var(--ease-out);
          cursor: pointer;
        }
        .specialty-card-wrap:hover {
          border-color: var(--matte-gold);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
        }
        .specialty-card-wrap.active {
          border-color: var(--matte-gold);
          box-shadow: 0 8px 30px rgba(176, 141, 87, 0.04);
        }
        .specialty-card-header {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          padding: 1.2rem 1.6rem;
          transition: background 0.3s ease;
          background: var(--pure-white);
          position: relative;
        }
        .specialty-card-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 2px;
          background: var(--matte-gold);
          transition: width 0.6s var(--ease-out);
        }
        .specialty-card-wrap:hover .specialty-card-header::after,
        .specialty-card-wrap.active .specialty-card-header::after {
          width: 100%;
        }
        .specialty-card-wrap.active .specialty-card-header {
          background: rgba(176, 141, 87, 0.02);
        }
        .specialty-card-header .icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(176, 141, 87, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.4s var(--ease-out);
        }
        .specialty-card-wrap.active .specialty-card-header .icon-wrap {
          background: var(--matte-gold);
        }
        .specialty-card-wrap.active .specialty-card-header .icon-wrap i {
          color: #000;
        }
        .specialty-card-header .icon-wrap i {
          font-size: 1.2rem;
          color: var(--matte-gold);
          transition: all 0.4s ease;
        }
        .specialty-card-header .info {
          flex: 1;
        }
        .specialty-card-header .info h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 0.1rem;
        }
        .specialty-card-header .info p {
          font-size: 0.8rem;
          color: var(--charcoal);
          font-weight: 700;
          margin: 0;
        }
        .specialty-card-header .toggle-icon {
          font-size: 0.8rem;
          color: var(--matte-gold);
          opacity: 0.3;
          transition: transform 0.4s var(--ease-out);
          flex-shrink: 0;
        }
        .specialty-card-wrap.active .specialty-card-header .toggle-icon {
          transform: rotate(180deg);
          opacity: 0.8;
        }
        .specialty-details {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.8s var(--ease-in-out), padding 0.6s var(--ease-in-out);
          padding: 0 1.6rem;
        }
        .specialty-card-wrap.active .specialty-details {
          max-height: 1200px;
          padding: 0 1.6rem 1.8rem;
        }
        .specialty-details .desc {
          color: var(--charcoal);
          font-weight: 700;
          font-size: 0.95rem;
          line-height: 1.9;
          margin-bottom: 1.2rem;
        }
        .specialty-details .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }
        .specialty-details .detail-col {
          background: var(--light-gray);
          padding: 1.2rem 1.2rem;
          border-radius: 10px;
        }
        .specialty-details .detail-col h5 {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--matte-gold);
          margin-bottom: 0.4rem;
        }
        .specialty-details .detail-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .specialty-details .detail-col ul li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--charcoal);
          font-weight: 700;
          padding: 0.15rem 0;
          line-height: 1.5;
        }
        .specialty-details .detail-col ul li i {
          color: var(--matte-gold);
          font-size: 0.6rem;
          opacity: 0.4;
        }
        .specialty-details .detail-col p {
          font-size: 0.8rem;
          color: var(--charcoal);
          font-weight: 700;
          line-height: 1.7;
        }
        .specialty-details .detail-cta {
          margin-top: 1.2rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }
        .specialty-details .detail-cta .btn-outline-gold {
          padding: 8px 24px;
          font-size: 0.75rem;
        }
        .specialty-details .detail-cta .btn-gold {
          padding: 8px 28px;
          font-size: 0.75rem;
        }

        .cta-section {
          text-align: center;
          padding: 4rem 2rem;
          background: var(--warm-off-white);
          border-top: 1px solid rgba(176, 141, 87, 0.06);
          border-bottom: 1px solid rgba(176, 141, 87, 0.06);
        }
        .cta-section h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 900;
          color: var(--charcoal);
        }
        .cta-section p {
          max-width: 640px;
          margin: 0.4rem auto 1.8rem;
          color: var(--charcoal);
          font-weight: 700;
          font-size: 0.95rem;
          line-height: 1.8;
        }

        .faq-list {
          max-width: 780px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .faq-item {
          background: var(--pure-white);
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.04);
          overflow: hidden;
          transition: all 0.3s var(--ease-out);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
        }
        .faq-item:hover {
          border-color: rgba(176, 141, 87, 0.15);
        }
        .faq-item.active {
          border-color: var(--matte-gold);
        }
        .faq-question {
          width: 100%;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          border: none;
          color: var(--charcoal);
          font-size: 0.95rem;
          font-weight: 700;
          text-align: right;
          gap: 1rem;
          font-family: var(--font-ar);
          transition: color 0.3s ease;
          cursor: pointer;
          position: relative;
        }
        .faq-question::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 2px;
          background: var(--matte-gold);
          transition: width 0.4s var(--ease-out);
        }
        .faq-question:hover::after {
          width: 100%;
        }
        .faq-question:hover {
          color: var(--matte-gold);
        }
        .faq-question .icon {
          flex-shrink: 0;
          font-size: 0.7rem;
          color: var(--matte-gold);
          opacity: 0.3;
          transition: transform 0.4s var(--ease-out);
        }
        .faq-item.active .faq-question .icon {
          transform: rotate(180deg);
          opacity: 0.7;
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s var(--ease-in-out), padding 0.5s var(--ease-in-out);
          padding: 0 1.5rem;
        }
        .faq-item.active .faq-answer {
          max-height: 280px;
          padding: 0 1.5rem 1.2rem;
        }
        .faq-answer p {
          font-size: 0.85rem;
          color: var(--charcoal);
          line-height: 1.8;
          font-weight: 700;
        }

        .btn-gold {
          display: inline-block;
          background: var(--matte-gold);
          color: #000;
          font-weight: 700;
          padding: 16px 40px;
          border-radius: 8px;
          border: none;
          transition: all 0.4s var(--ease-out);
          text-align: center;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
          box-shadow: 0 2px 20px rgba(176, 141, 87, 0.15);
          position: relative;
          cursor: pointer;
          text-decoration: none;
        }
        .btn-gold:hover {
          background: #c4a06a;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(176, 141, 87, 0.25);
        }
        .btn-outline-gold {
          display: inline-block;
          border: 1px solid var(--matte-gold);
          color: var(--matte-gold);
          font-weight: 700;
          padding: 12px 28px;
          border-radius: 8px;
          transition: all 0.4s var(--ease-out);
          text-align: center;
          font-size: 0.85rem;
          background: transparent;
          cursor: pointer;
          text-decoration: none;
        }
        .btn-outline-gold:hover {
          background: var(--matte-gold);
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(176, 141, 87, 0.15);
        }

        @media (max-width: 820px) {
          .hero-specialties { padding: 100px 1rem 3rem; min-height: auto; }
          .specialty-details .detail-grid { grid-template-columns: 1fr; }
          .specialty-card-header { padding: 1rem 1.2rem; gap: 0.8rem; }
          .specialty-card-wrap.active .specialty-details { padding: 0 1.2rem 1.2rem; }
          .specialty-details .detail-cta { flex-direction: column; align-items: stretch; }
        }
        @media (max-width: 640px) {
          .hero-specialties .hero-title-wrap h1 { font-size: clamp(2rem, 8vw, 2.8rem); }
          .hero-specialties .hero-badges { gap: 0.3rem; }
          .hero-specialties .hero-badge { font-size: 0.45rem; padding: 3px 10px; }
          .specialty-card-header .info h3 { font-size: 0.9rem; }
          .specialty-card-header .info p { font-size: 0.7rem; }
          .specialty-card-header .icon-wrap { width: 40px; height: 40px; }
          .specialty-card-header .icon-wrap i { font-size: 1rem; }
          .faq-question { padding: 0.8rem 1rem; font-size: 0.85rem; }
          .faq-answer { padding: 0 1rem; }
          .faq-item.active .faq-answer { padding: 0 1rem 1rem; }
          .cta-section { padding: 2.5rem 1rem; }
        }
        @media (max-width: 400px) {
          .hero-specialties .hero-badges { gap: 0.2rem; }
          .hero-specialties .hero-badge { font-size: 0.4rem; padding: 2px 8px; }
        }
      `}</style>
    </Layout>
  );
}
