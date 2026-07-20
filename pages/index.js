import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { getAllArticles, getAllNews } from '../lib/github';
import ArticleCard from '../components/ArticleCard';
import NewsCard from '../components/NewsCard';

export default function Home({ articles, news }) {
  const latestArticles = articles.slice(0, 3);
  const latestNews = news.slice(0, 3);

  return (
    <Layout>
    <Head>
    <title>مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية | OSTAZ LAW</title>
    <meta name="description" content="مؤسسة قانونية مصرية تقدم استشارات، تمثيلاً قضائياً، وحلولاً قانونية للشركات والأفراد. خبرة في النقض والدستورية العليا." />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://ostazlaw.vercel.app/" />
    <link rel="alternate" hreflang="ar-eg" href="https://ostazlaw.vercel.app/" />
    <link rel="alternate" hreflang="en" href="https://ostazlaw.vercel.app/en/" />
    <meta property="og:title" content="مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية | OSTAZ LAW" />
    <meta property="og:description" content="بوابة الوصول إلى خدمات قانونية متخصصة: استشارات، تمثيل قضائي، وحلول قانونية للشركات والأفراد." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://ostazlaw.vercel.app/" />
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
            "description": "مؤسسة قانونية مصرية تقدم استشارات وتمثيلاً قضائياً وحلولاً قانونية للشركات والأفراد.",
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
              "addressLocality": "أسوان",
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
              "caption": "الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا",
              "description": "صورة شخصية للأستاذ محمود عبد الحميد، المؤسس والمدير المسؤول عن الإشراف الكامل على جميع الملفات والقضايا."
            }
          },
          {
            "@type": "WebPage",
            "@id": "https://ostazlaw.vercel.app/#webpage",
            "url": "https://ostazlaw.vercel.app/",
            "name": "الصفحة الرئيسية – مؤسسة الأستاذ محمود عبد الحميد للمحاماة",
            "description": "بوابة الوصول إلى خدمات قانونية متخصصة: استشارات، تمثيل قضائي، وحلول قانونية.",
            "isPartOf": { "@id": "https://ostazlaw.vercel.app/#website" },
            "about": { "@id": "https://ostazlaw.vercel.app/#organization" },
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "url": "https://ostazlaw.vercel.app/mahmoud-abdel-hamid-lawyer-portrait.jpg",
              "caption": "الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا"
            }
          },
          {
            "@type": "WebSite",
            "@id": "https://ostazlaw.vercel.app/#website",
            "name": "مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية",
            "url": "https://ostazlaw.vercel.app/",
            "description": "مؤسسة قانونية مصرية تقدم استشارات وتمثيلاً قضائياً وحلولاً قانونية."
          }
        ]
      })
    }}
    />
    </Head>

    {/* Hero */}
    <section className="hero" aria-label="الصفحة الرئيسية">
    <div className="hero-bg">
    <div className="glow"></div>
    <div className="glow-2"></div>
    </div>
    <div className="hero-content">
    <div className="hero-brand-signature">OSTAZ LAW</div>
    <h1 className="hero-title">مؤسسة الأستاذ محمود عبد الحميد</h1>
    <p className="hero-subtitle">للمحاماة والاستشارات القانونية</p>
    <p className="hero-value">
    نقدم تمثيلًا قضائيًا واستشارات قانونية للشركات والأفراد، مستندين إلى خبرة راسخة أمام محكمة النقض والمحكمة الدستورية العليا، لحماية الحقوق والمصالح والاستثمارات.
    </p>
    <div className="hero-actions">
    <Link href="/contact?tab=consult" className="hero-action-item gold-underline">
    <span className="icon-wrap"><i className="fas fa-file-signature"></i></span>
    <span className="label">استشارة قانونية</span>
    </Link>
    <Link href="/contact?tab=appointment" className="hero-action-item gold-underline">
    <span className="icon-wrap"><i className="fas fa-calendar-check"></i></span>
    <span className="label">حجز موعد</span>
    </Link>
    <Link href="/contact?tab=representation" className="hero-action-item gold-underline">
    <span className="icon-wrap"><i className="fas fa-gavel"></i></span>
    <span className="label">تمثيل قضائي</span>
    </Link>
    </div>
    </div>
    </section>

    {/* Trust Bar */}
    <section className="trust-bar" aria-label="شريط الثقة">
    <div className="trust-bar-inner">
    <div className="trust-item"><i className="fas fa-gavel"></i><span>محامون بالنقض والدستورية العليا</span></div>
    <div className="trust-item"><i className="fas fa-briefcase"></i><span>حلول قانونية للشركات والأفراد</span></div>
    <div className="trust-item"><i className="fas fa-scale-balanced"></i><span>تمثيل واستشارات في مختلف مراحل التقاضي</span></div>
    </div>
    </section>

    {/* About */}
    <section className="section section-light" aria-label="عن المؤسسة">
    <div className="section-inner">
    <div className="about-why-grid">
    <div className="about-image reveal">
    <div className="frame">
    <img src="/mahmoud-abdel-hamid-lawyer-portrait.jpg" alt="الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" loading="lazy" width="600" height="800" />
    </div>
    <div className="badge">خبرة قانونية منذ 2005</div>
    </div>
    <div className="about-content reveal" style={{ transitionDelay: '0.15s' }}>
    <span className="eyebrow">● المؤسس</span>
    <h2>خبرة قانونية تُرسخ الثقة،<br /><span className="gold-text">وحلولٌ تحمي المصالح والاستثمارات</span></h2>
    <p>نؤمن بأن العمل القانوني المتميز يبدأ بفهمٍ عميق للوقائع، وصياغة استراتيجية قانونية دقيقة، ثم تقديم تمثيل قانوني مهني ونزيه يهدف إلى حماية الحقوق والمصالح وتحقيق أفضل النتائج الممكنة. ونؤمن كذلك بأن الثقة لا تُبني باستعراض ملفات العملاء و اعلان نتائج قضاياهم بل تُبنى على الكفاءة والالتزام، وعلي ما نقدمه للعملاء لا ما نعلنه عنهم ؛ لذلك نلتزم بعدم الإفصاح عن أسماء عملائنا أو أرقام قضاياهم أو تفاصيلها أو استخدامها في اغراض تسويقية احترامًا لواجب السرية المهنية وآداب مهنة المحاماة، ونحرص بدلاً من ذلك على أن نقدم ما يمكن التحقق منه من خبراتنا ومؤهلاتنا ومحتوانا العلمي، بما يعكس قيمنا المهنية دون الإخلال بحقوق عملائنا أو التزاماتنا القانونية</p>
    <p>تأسست مؤسسة الأستاذ محمود عبد الحميد للمحاماة عام <strong>2005</strong> واكتسبت منذ ذلك الحين خبرة عملية متراكمة تقوم علي :</p>
    <div className="about-why-points">
    <span className="point"><i className="fas fa-check-circle"></i> خبرة متراكمة في مختلف مجالات الممارسة القانونية و تمثيل العملاء أمام جميع درجات التقاضي وصولا الي محكمتي النقض و الدستورية العليا</span>
    <span className="point"><i className="fas fa-check-circle"></i> قدرة علي تقديم حلول قانونية متخصصة للشركات والمستثمرين</span>
    <span className="point"><i className="fas fa-check-circle"></i> قدرة علي التعامل مع جميع الملفات و العملاء بسرية تامة وشفافية كاملة</span>
    <span className="point"><i className="fas fa-check-circle"></i> استراتيجيات قانونية مبنية علي التحليل و ادارة المخاطر</span>
    <span className="point"><i className="fas fa-check-circle"></i> قدرة علمية و خبرة عملية علي حماية مصالح العملاء</span>
    <span className="point"><i className="fas fa-check-circle"></i> فهم عميق لاحتياجات العملاء</span>
    </div>
    <div className="signature">
    <div>
    <div className="name">الأستاذ محمود عبد الحميد</div>
    <div className="title">المؤسس – المحامي بالنقض والدستورية العليا</div>
    </div>
    <Link href="/about" className="btn-outline-gold">تعرف على المؤسسة</Link>
    </div>
    </div>
    </div>
    </div>
    </section>

    {/* Practice Areas */}
    <section className="section section-gray" aria-label="مجالات الممارسة القانونية">
    <div className="section-inner">
    <div className="section-head reveal">
    <span className="eyebrow">● الممارسة</span>
    <h2>مجالات الممارسة القانونية</h2>
    <p>نقدم حلولاً قانونية متكاملة في التخصصات التالية، بدءاً من الاستشارة وصولاً إلى التمثيل القضائي.</p>
    </div>
    <div className="practice-grid">
    <Link href="/specialties" className="practice-link">
    <div className="practice-card reveal">
    <div className="icon-wrap"><i className="fas fa-gavel"></i></div>
    <h3>المنازعات المدنية</h3>
    <p>قضايا العقود، التعويضات، الملكية والإيجارات.</p>
    </div>
    </Link>
    <Link href="/specialties" className="practice-link">
    <div className="practice-card reveal">
    <div className="icon-wrap"><i className="fas fa-chart-pie"></i></div>
    <h3>القانون التجاري</h3>
    <p>الشركات، العقود التجارية، والأوراق المالية.</p>
    </div>
    </Link>
    <Link href="/specialties" className="practice-link">
    <div className="practice-card reveal">
    <div className="icon-wrap"><i className="fas fa-building"></i></div>
    <h3>الخدمات القانونية للشركات</h3>
    <p>هيكلة الشركات، الحوكمة، وصياغة العقود.</p>
    </div>
    </Link>
    <Link href="/specialties" className="practice-link">
    <div className="practice-card reveal">
    <div className="icon-wrap"><i className="fas fa-landmark"></i></div>
    <h3>القضاء الإداري</h3>
    <p>الطعن في القرارات الإدارية والمنازعات الحكومية.</p>
    </div>
    </Link>
    <Link href="/specialties" className="practice-link">
    <div className="practice-card reveal">
    <div className="icon-wrap"><i className="fas fa-scale-balanced"></i></div>
    <h3>الطعن الدستوري</h3>
    <p>الدفع بعدم دستورية القوانين أمام المحكمة الدستورية العليا.</p>
    </div>
    </Link>
    </div>
    <div className="section-cta">
    <Link href="/specialties" className="btn-outline-gold">استعراض جميع التخصصات</Link>
    </div>
    </div>
    </section>

    {/* Process */}
    <section className="section section-light" aria-label="سير العمل القانوني">
    <div className="section-inner">
    <div className="section-head reveal">
    <span className="eyebrow">● سير العمل</span>
    <h2>مراحل التعاون القانوني</h2>
    <p>رحلة قانونية واضحة ومنظمة، من الاستشارة الأولى إلى الحكم النهائي.</p>
    </div>
    <div className="process-timeline">
    <div className="process-step reveal">
    <span className="num">01</span>
    <div className="step-content">
    <h4>الاستشارة الأولية</h4>
    <p>مناقشة وقائع القضية وتحليل الموقف القانوني وتحديد المسار الأمثل.</p>
    </div>
    </div>
    <div className="process-step reveal">
    <span className="num">02</span>
    <div className="step-content">
    <h4>تحليل الملف وإعداد الاستراتيجية</h4>
    <p>جمع المستندات، تحليل الأدلة، وصياغة الدفوع القانونية المناسبة.</p>
    </div>
    </div>
    <div className="process-step reveal">
    <span className="num">03</span>
    <div className="step-content">
    <h4>التمثيل القضائي والمتابعة</h4>
    <p>الترافع أمام المحاكم بكفاءة مع متابعة دقيقة لكل جلسة.</p>
    </div>
    </div>
    <div className="process-step reveal">
    <span className="num">04</span>
    <div className="step-content">
    <h4>المتابعة حتى الحكم النهائي</h4>
    <p>متابعة القضية حتى صدور الحكم والاستشارة بشأن الطعن عليه إن لزم.</p>
    </div>
    </div>
    </div>
    </div>
    </section>

    {/* Sectors */}
    <section className="section section-gray" aria-label="القطاعات التي نخدمها">
    <div className="section-inner">
    <div className="section-head reveal">
    <span className="eyebrow">● القطاعات</span>
    <h2>القطاعات التي نخدمها</h2>
    <p>نفهم الطبيعة القانونية والعملية للقطاعات التي نعمل معها، ونقدم حلولًا قانونية تتناسب مع احتياجات كل قطاع.</p>
    </div>
    <div className="experience-grid">
    <Link href="/sectors" className="sector-link">
    <div className="experience-card reveal">
    <span className="icon"><i className="fas fa-building"></i></span>
    <h4>قطاع الشركات</h4>
    <p>هيكلة الشركات، الحوكمة، وصياغة العقود التجارية.</p>
    </div>
    </Link>
    <Link href="/sectors" className="sector-link">
    <div className="experience-card reveal">
    <span className="icon"><i className="fas fa-handshake"></i></span>
    <h4>القطاع التجاري</h4>
    <p>صياغة ومراجعة العقود التجارية والمدنية.</p>
    </div>
    </Link>
    <Link href="/sectors" className="sector-link">
    <div className="experience-card reveal">
    <span className="icon"><i className="fas fa-gavel"></i></span>
    <h4>قطاع التعويضات</h4>
    <p>المطالبة بالتعويضات المادية والأدبية عن الأضرار.</p>
    </div>
    </Link>
    </div>
    </div>
    </section>

    {/* News */}
    <section className="section section-gray" aria-label="أخبار وإنجازات المؤسسة">
    <div className="section-inner">
    <div className="section-head reveal">
    <span className="eyebrow">● أخبار المؤسسة</span>
    <h2>آخر الأخبار والمستجدات</h2>
    <p>نوافيكم بأحدث ما توصلنا إليه من أحكام، مشاركات مجتمعية، وتطورات مكتبنا القانوني.</p>
    </div>
    <div className="experience-grid">
    {latestNews.map((item) => (
      <NewsCard key={item.slug} news={item} />
    ))}
    </div>
    <div className="section-cta">
    <Link href="/news-archive" className="btn-outline-gold">أرشيف الأخبار والإنجازات</Link>
    </div>
    </div>
    </section>

    {/* Articles */}
    <section className="section section-light" aria-label="المكتبة القانونية">
    <div className="section-inner">
    <div className="section-head reveal">
    <span className="eyebrow">● المكتبة القانونية</span>
    <h2>أحدث المقالات القانونية</h2>
    <p>اطلع على أحدث ما ننشره في مجال القانون المصري.</p>
    </div>
    <div className="blog-grid">
    {latestArticles.map((article) => (
      <ArticleCard key={article.slug} article={article} />
    ))}
    </div>
    <div className="section-cta">
    <Link href="/blog" className="btn-outline-gold">اطلع على المدونة القانونية</Link>
    </div>
    </div>
    </section>

    {/* Map */}
    <section className="map-section" aria-label="موقع المكتب">
    <div className="map-container">
    <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1819.3414902100868!2d32.8988582!3d24.0886561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA1JzE5LjIiTiAzMsKwNTMnNTUuOSJF!5e0!3m2!1sar!2seg!4v1700000000000!5m2!1sar!2seg"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-cross-origin"
    title="موقع مؤسسة الأستاذ محمود عبد الحميد للمحاماة في أسوان"
    ></iframe>
    </div>
    <div className="map-address">
    <i className="fas fa-map-marker-alt"></i>
    شارع كسر الحجر، المتفرع من شارع كورنيش النيل، أمام مجمع المحاكم – أسوان، مصر
    </div>
    </section>

    {/* CTA */}
    <section className="cta-section" aria-label="دعوة للتواصل">
    <div className="section-inner reveal">
    <span className="eyebrow">● تواصل معنا</span>
    <h2>كيف تود أن نخدمك؟</h2>
    <p>فريقنا القانوني المتخصص ينتظرك. اختر ما يناسبك من الخيارات أدناه.</p>
    <div className="cta-actions">
    <Link href="/contact?tab=appointment" className="btn-gold">حجز موعد استشارة</Link>
    <Link href="/contact?tab=consult" className="btn-outline-gold">طلب استشارة قانونية</Link>
    <Link href="/contact?tab=representation" className="btn-outline-navy">طلب تمثيل قانوني</Link>
    </div>
    </div>
    </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const articles = await getAllArticles();
  const news = await getAllNews();
  return {
    props: { articles, news },
    revalidate: 60,
  };
}
