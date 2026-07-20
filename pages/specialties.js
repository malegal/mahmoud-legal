import Head from 'next/head';
import { useState } from 'react';

export default function Specialties() {
  const [activeSpec, setActiveSpec] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const specialties = [
    { id: 'civil', title: 'المنازعات المدنية', desc: 'حلول قانونية متكاملة لنزاعات الأراضي والملكيات والعقود والتعويضات المدنية.' },
    { id: 'commercial', title: 'المنازعات التجارية', desc: 'التمثيل القضائي للشركات، منازعات الشركاء، قضايا الإفلاس، وتأسيس الشركات.' },
    { id: 'family', title: 'قضايا الأسرة والأحوال الشخصية', desc: 'دعاوى الطلاق والخلع والنفقة وحضانة الأطفال وإعلام الوراثة بحلول ودية ورحيمة.' },
    { id: 'criminal', title: 'الدفاع الجنائي', desc: 'حماية كرامة وحقوق الموكلين في الجنايات والجنح والتحقيقات الجنائية أمام النيابة العامة.' }
  ];

  return (
    <>
    <Head>
    <title>التخصصات القانونية | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
    <meta name="description" content="قائمة بالتخصصات والخدمات القانونية التي نقدمها للأفراد والشركات في مصر." />
    <link rel="canonical" href="https://ostazlaw.vercel.app/specialties" />
    </Head>

    <style jsx>{`
      .hero-specialties { padding: 120px 2rem 4rem; background: var(--very-dark-navy); text-align: center; }
      .hero-inner { max-width: 1200px; margin: 0 auto; }
      .hero-inner h1 { font-family: var(--font-serif); font-size: clamp(2.4rem, 5vw, 4rem); color: #fff; }
      .specialty-card-wrap {
        margin-bottom: 1.2rem;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.04);
        background: var(--pure-white);
        overflow: hidden;
      }
      .specialty-card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.2rem 1.6rem;
        cursor: pointer;
      }
      .specialty-details {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s ease-out, padding 0.5s ease-out;
        padding: 0 1.6rem;
      }
      .specialty-card-wrap.active .specialty-details {
        max-height: 300px;
        padding: 0 1.6rem 1.8rem;
      }
      .faq-item {
        background: #fff;
        border-radius: 10px;
        margin-bottom: 0.6rem;
        border: 1px solid rgba(0, 0, 0, 0.04);
      }
      .faq-question {
        width: 100%;
        padding: 1rem 1.5rem;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        font-weight: bold;
      }
      .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease-out, padding 0.4s ease-out;
        padding: 0 1.5rem;
      }
      .faq-item.active .faq-answer {
        max-height: 150px;
        padding: 0 1.5rem 1.2rem;
      }
      `}</style>

      <section className="hero-specialties" aria-label="التخصصات">
      <div className="hero-inner">
      <span className="en-tag" style={{ color: 'var(--matte-gold)', fontSize: '0.7rem' }}>Our Legal Specialties</span>
      <h1>التخصصات <span className="gold-text">القانونية</span></h1>
      <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.5rem' }}>نخبة من التخصصات والخدمات القانونية التي نقدمها بخبرة عملية متكاملة.</p>
      </div>
      </section>

      <section className="section section-gray">
      <div className="section-inner">
      {specialties.map((spec) => (
        <div className={`specialty-card-wrap ${activeSpec === spec.id ? 'active' : ''}`} key={spec.id}>
        <div className="specialty-card-header" onClick={() => setActiveSpec(activeSpec === spec.id ? null : spec.id)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <i className="fas fa-gavel" style={{ color: 'var(--matte-gold)' }}></i>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{spec.title}</h3>
        </div>
        <i className={`fas fa-chevron-down ${activeSpec === spec.id ? 'fa-rotate-180' : ''}`} style={{ transition: 'transform 0.3s' }}></i>
        </div>
        <div className="specialty-details">
        <p>{spec.desc}</p>
        </div>
        </div>
      ))}
      </div>
      </section>

      {/* الأسئلة الشائعة */}
      <section className="section section-light">
      <div className="section-inner">
      <div className="section-head">
      <h2>أسئلة شائعة</h2>
      </div>
      <div className="faq-list">
      {[
        { q: 'ما هي درجات التقاضي التي تمثلون العملاء أمامها؟', a: 'نمثل العملاء أمام جميع درجات التقاضي في مصر وصولاً لنقض والدستورية.' },
        { q: 'هل تقدمون استشارات قانونية قبل رفع الدعوى؟', a: 'نعم، الاستشارات الاستباقية توفر الوقت وتحمي حقوق الموكل بالكامل.' }
      ].map((faq, idx) => (
        <div className={`faq-item ${activeFaq === idx ? 'active' : ''}`} key={idx}>
        <div className="faq-question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
        <span>{faq.q}</span>
        <i className="fas fa-chevron-down"></i>
        </div>
        <div className="faq-answer">
        <p>{faq.a}</p>
        </div>
        </div>
      ))}
      </div>
      </div>
      </section>
      </>
  );
}
