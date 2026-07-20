import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function About() {
  const [hasHeroImage, setHasHeroImage] = useState(false); // اجعلها true عند رفع الصورة
  const [hasFirmImages, setHasFirmImages] = useState(false);

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

  return (
    <Layout>
      <Head>
        <title>عن المؤسسة | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
        <meta name="description" content="مؤسسة قانونية متخصصة في القانون المدني والتجاري، تأسست عام 2005 لتقديم حلول قانونية نوعية للشركات والأفراد المميزين." />
      </Head>

      <section className="hero-about" aria-label="عن المؤسسة">
        <div className="hero-inner">
          <div className={`hero-content-wrap ${!hasHeroImage ? 'full-width' : ''}`}>
            <div className="hero-title-wrap reveal">
              <span className="en-tag">About Our Firm</span>
              <h1>مؤسسة الأستاذ<br /><span className="gold-text">محمود عبد الحميد</span></h1>
              <p className="sub">للمحاماة والاستشارات القانونية</p>
              <p className="sub sub-gold">نبني الثقة بالخبرة، ونحمي المصالح باستراتيجية قانونية مدروسة.</p>
            </div>
            
            <div className="hero-text-content reveal">
               <p>تُعد مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية <strong>(OSTAZ LAW)</strong> صرحاً قانونياً يقدم خدمات متخصصة في <strong>القانون المدني، القانون التجاري، وتأسيس الشركات</strong>.</p>
               <p>منذ تأسيسنا في عام <strong>2005</strong>، وضعنا نصب أعيننا هدفاً واحداً: تقديم تمثيل قانوني نوعي يحمي استثمارات عملائنا ومصالحهم أمام كافة درجات التقاضي، وصولاً إلى محكمتي النقض والدستورية العليا.</p>
               <div className="cta-wrap">
                  <Link href="/specialties" className="btn-gold">استعراض التخصصات النوعية</Link>
               </div>
            </div>
          </div>

          {hasHeroImage && (
            <div className="hero-image-wrap reveal">
              <Image src="/about-hero.webp" alt="مقر المؤسسة" width={600} height={400} priority />
            </div>
          )}
        </div>
      </section>

      <section className="section section-white" aria-label="فلسفتنا">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● فلسفتنا</span>
            <h2>لماذا يختارنا العملاء المميزون؟</h2>
          </div>
          <div className="philosophy-grid">
             <div className="p-card reveal">
                <h3>الدقة التحليلية</h3> {/* تم تغيير h4 إلى h3 */}
                <p>كل قضية هي ملف مستقل يخضع لمجهر التحليل القانوني الدقيق قبل اتخاذ أي إجراء.</p>
             </div>
             <div className="p-card reveal">
                <h3>الاستراتيجية الاستباقية</h3> {/* تم تغيير h4 إلى h3 */}
                <p>في تأسيس الشركات والقانون التجاري، نحن لا نحل المشاكل فقط، بل نمنع وقوعها من الأساس.</p>
             </div>
             <div className="p-card reveal">
                <h3>السرية المطلقة</h3> {/* تم تغيير h4 إلى h3 */}
                <p>نؤمن بأن حماية خصوصية العميل هي جزء لا يتجزأ من نجاح القضية، وهي التزام مهني مقدس.</p>
             </div>
          </div>
        </div>
      </section>

      {hasFirmImages && (
        <section className="section section-gray" aria-label="معرض المؤسسة">
          <div className="section-inner">
            <div className="firm-gallery reveal">
               {/* معرض الصور هنا */}
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        .hero-inner {
          display: flex;
          gap: 4rem;
          align-items: center;
          padding: 6rem 0;
        }
        .hero-content-wrap.full-width {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .hero-content-wrap.full-width .cta-wrap {
          justify-content: center;
        }
        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        .p-card {
          padding: 2.5rem;
          background: #fcfcfc;
          border-right: 4px solid var(--matte-gold-light);
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }
        .p-card h3 {
          color: var(--charcoal);
          margin-bottom: 1rem;
          font-size: 1.4rem;
          font-weight: 700;
        }
        .p-card p {
          color: var(--text-secondary);
          line-height: 1.8;
        }
        .gold-text {
          color: var(--matte-gold-light);
        }
        @media (max-width: 768px) {
          .hero-inner {
            flex-direction: column;
            padding: 3rem 1rem;
          }
        }
      `}</style>
    </Layout>
  );
}
