import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Contact() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('consult');

  // البيانات الخاصة بنماذج الإدخال
  const [consultName, setConsultName] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultMessage, setConsultMessage] = useState('');

  const [visitName, setVisitName] = useState('');
  const [visitPhone, setVisitPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitLocation, setVisitLocation] = useState('أسوان');
  const [visitReason, setVisitReason] = useState('');

  const [repName, setRepName] = useState('');
  const [repPhone, setRepPhone] = useState('');
  const [repEmail, setRepEmail] = useState('');
  const [repCaseType, setRepCaseType] = useState('');
  const [repStage, setRepStage] = useState('');
  const [repCourt, setRepCourt] = useState('');
  const [repCaseNumber, setRepCaseNumber] = useState('');
  const [repDescription, setRepDescription] = useState('');

  useEffect(() => {
    // التقاط البارامترات الممررة بالرابط لتفعيل تبويب مخصص مباشرة
    const { tab, specialty } = router.query;
    if (tab === 'visit' || tab === 'appointment') {
      setActiveTab('visit');
    } else if (tab === 'representation') {
      setActiveTab('representation');
    } else if (tab === 'consult') {
      setActiveTab('consult');
    }

    if (specialty) {
      setConsultMessage(`أرغب في الحصول على استشارة قانونية بخصوص: ${specialty}`);
    }
  }, [router.query]);

  // إرسال البيانات للواتساب
  const handleConsultSubmit = (e) => {
    e.preventDefault();
    if (!consultName || !consultPhone || !consultMessage) return;
    const text = `*طلب استشارة قانونية*%0Aالاسم: ${consultName}%0Aالهاتف: ${consultPhone}%0Aالتفاصيل: ${consultMessage}`;
    window.open(`https://wa.me/201101076000?text=${text}`, '_blank');
  };

  const handleVisitSubmit = (e) => {
    e.preventDefault();
    if (!visitName || !visitPhone || !visitDate || !visitReason) return;
    const text = `*طلب حجز موعد مقابلة*%0Aالاسم: ${visitName}%0Aالهاتف: ${visitPhone}%0Aالتاريخ المفضل: ${visitDate}%0Aالموقع: ${visitLocation}%0Aالسبب: ${visitReason}`;
    window.open(`https://wa.me/201101076000?text=${text}`, '_blank');
  };

  const handleRepSubmit = (e) => {
    e.preventDefault();
    if (!repName || !repPhone || !repEmail || !repCaseType || !repStage || !repCourt || !repDescription) return;
    const text = `*طلب تمثيل قانوني*%0Aالاسم: ${repName}%0Aالهاتف: ${repPhone}%0Aالبريد: ${repEmail}%0Aالنوع: ${repCaseType}%0Aالمرحلة: ${repStage}%0Aالمحكمة: ${repCourt}%0Aرقم القضية: ${repCaseNumber || 'غير محدد'}%0Aالوصف: ${repDescription}`;
    window.open(`https://wa.me/201101076000?text=${text}`, '_blank');
  };

  return (
    <>
    <Head>
    <title>تواصل معنا | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
    <meta name="description" content="تواصل مع مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية. المكتب الرئيسي في أسوان، وفروع في القاهرة والإسكندرية." />
    <link rel="canonical" href="https://ostazlaw.vercel.app/contact" />
    </Head>

    <style jsx>{`
      .hero-contact {
        padding: 120px 2rem 4rem;
        background: var(--very-dark-navy);
        position: relative;
        text-align: center;
      }
      .hero-contact h1 { font-family: var(--font-serif); font-size: clamp(2.4rem, 5vw, 4rem); color: #fff; }
      .section-content { padding: 5rem 2rem; background: var(--warm-off-white); }
      .inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 5fr 7fr; gap: 3rem; }
      .contact-info { display: flex; flex-direction: column; gap: 1.2rem; }
      .contact-card {
        background: var(--pure-white);
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid rgba(0, 0, 0, 0.04);
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .contact-card i { font-size: 1.5rem; color: var(--matte-gold); }
      .form-container { background: #fff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.04); padding: 2rem; }
      .tab-buttons { display: flex; gap: 0.5rem; background: var(--light-gray); padding: 0.4rem; border-radius: 12px; margin-bottom: 2rem; }
      .tab-btn { flex: 1; padding: 0.6rem 1rem; border-radius: 10px; font-weight: 700; cursor: pointer; transition: all 0.3s; opacity: 0.6; }
      .tab-btn.active { background: var(--matte-gold); color: #000; opacity: 1; }
      .form-group { margin-bottom: 1.2rem; display: flex; flex-direction: column; gap: 0.3rem; }
      .form-group label { font-size: 0.8rem; font-weight: bold; }
      .form-group input, .form-group textarea, .form-group select {
        padding: 0.6rem 0.8rem; border: 1px solid rgba(0,0,0,0.06); border-radius: 8px; font-family: inherit; font-weight: bold; outline: none;
      }
      .form-group input:focus, .form-group textarea:focus { border-color: var(--matte-gold); }
      @media (max-width: 1024px) {
        .inner { grid-template-columns: 1fr; }
      }
      @media (max-width: 640px) {
        .tab-buttons { flex-direction: column; }
      }
      `}</style>

      <section className="hero-contact" aria-label="تواصل معنا">
      <div className="hero-inner">
      <span className="en-tag" style={{ color: 'var(--matte-gold)', fontSize: '0.7rem' }}>Contact Us</span>
      <h1>تواصل <span className="gold-text">معنا</span></h1>
      <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.5rem' }}>نحن هنا للاستماع إليك وحفظ حقوقك والرد الفوري على طلباتك.</p>
      </div>
      </section>

      <section className="section-content">
      <div className="inner">

      {/* معلومات الاتصال الجانبية */}
      <div className="contact-info">
      <h2 className="serif" style={{ color: 'var(--matte-gold)', fontSize: '1.8rem', fontWeight: 'bold' }}>بيانات التواصل</h2>
      <div className="contact-card">
      <i className="fas fa-map-marker-alt"></i>
      <div>
      <h4 style={{ color: 'var(--matte-gold)', fontWeight: 'bold' }}>المقر الرئيسي (أسوان)</h4>
      <p style={{ fontWeight: 'bold' }}>شارع كسر الحجر، أمام مجمع المحاكم، أسوان</p>
      </div>
      </div>
      <div className="contact-card">
      <i className="fas fa-phone-alt"></i>
      <div>
      <h4 style={{ color: 'var(--matte-gold)', fontWeight: 'bold' }}>الهاتف والواتساب</h4>
      <p style={{ fontWeight: 'bold' }}>+20 110 107 6000</p>
      </div>
      </div>
      <div className="contact-card">
      <i className="fas fa-envelope"></i>
      <div>
      <h4 style={{ color: 'var(--matte-gold)', fontWeight: 'bold' }}>البريد الإلكتروني</h4>
      <p style={{ fontWeight: 'bold' }}>ma.law.firm@outlook.com</p>
      </div>
      </div>
      </div>

      {/* التبويبات الفعالة */}
      <div className="form-container">
      <div className="tab-buttons">
      <button className={`tab-btn ${activeTab === 'consult' ? 'active' : ''}`} onClick={() => setActiveTab('consult')}>استشارة سريعة</button>
      <button className={`tab-btn ${activeTab === 'visit' ? 'active' : ''}`} onClick={() => setActiveTab('visit')}>حجز موعد</button>
      <button className={`tab-btn ${activeTab === 'representation' ? 'active' : ''}`} onClick={() => setActiveTab('representation')}>طلب تمثيل</button>
      </div>

      {/* 1. نموذج استشارة سريعة */}
      {activeTab === 'consult' && (
        <form onSubmit={handleConsultSubmit}>
        <div className="form-group">
        <label>الاسم بالكامل</label>
        <input type="text" value={consultName} onChange={e => setConsultName(e.target.value)} required placeholder="الاسم ثلاثي..." />
        </div>
        <div className="form-group">
        <label>رقم الهاتف / الواتساب</label>
        <input type="tel" value={consultPhone} onChange={e => setConsultPhone(e.target.value)} required placeholder="01xxxxxxxxx" />
        </div>
        <div className="form-group">
        <label>تفاصيل الاستشارة</label>
        <textarea rows="4" value={consultMessage} onChange={e => setConsultMessage(e.target.value)} required placeholder="يرجى كتابة تفاصيل استشارتك هنا..."></textarea>
        </div>
        <button type="submit" className="btn-gold" style={{ width: '100%', marginTop: '1rem' }}>إرسال الاستشارة للواتساب</button>
        </form>
      )}

      {/* 2. نموذج حجز موعد */}
      {activeTab === 'visit' && (
        <form onSubmit={handleVisitSubmit}>
        <div className="form-group">
        <label>الاسم بالكامل</label>
        <input type="text" value={visitName} onChange={e => setVisitName(e.target.value)} required placeholder="الاسم ثلاثي..." />
        </div>
        <div className="form-group">
        <label>رقم الهاتف</label>
        <input type="tel" value={visitPhone} onChange={e => setVisitPhone(e.target.value)} required placeholder="01xxxxxxxxx" />
        </div>
        <div className="form-group">
        <label>التاريخ المقترح للزيارة</label>
        <input type="date" value={visitDate} onChange={e => setVisitDate(e.target.value)} required min={new Date().toISOString().split('T')[0]} />
        </div>
        <div className="form-group">
        <label>موقع المقابلة المفضل</label>
        <select value={visitLocation} onChange={e => setVisitLocation(e.target.value)}>
        <option value="أسوان">المقر الرئيسي - أسوان</option>
        <option value="القاهرة">فرع القاهرة</option>
        <option value="الإسكندرية">فرع الإسكندرية</option>
        </select>
        </div>
        <div className="form-group">
        <label>سبب الزيارة</label>
        <textarea rows="3" value={visitReason} onChange={e => setVisitReason(e.target.value)} required placeholder="اكتب تفاصيل الزيارة..."></textarea>
        </div>
        <button type="submit" className="btn-gold" style={{ width: '100%', marginTop: '1rem' }}>تأكيد طلب حجز الموعد</button>
        </form>
      )}

      {/* 3. نموذج طلب تمثيل قانوني */}
      {activeTab === 'representation' && (
        <form onSubmit={handleRepSubmit}>
        <div className="form-group">
        <label>الاسم بالكامل</label>
        <input type="text" value={repName} onChange={e => setRepName(e.target.value)} required placeholder="الاسم ثلاثي..." />
        </div>
        <div className="form-group">
        <label>رقم الهاتف / الواتساب</label>
        <input type="tel" value={repPhone} onChange={e => setRepPhone(e.target.value)} required placeholder="01xxxxxxxxx" />
        </div>
        <div className="form-group">
        <label>البريد الإلكتروني</label>
        <input type="email" value={repEmail} onChange={e => setRepEmail(e.target.value)} required placeholder="example@mail.com" />
        </div>
        <div className="form-group">
        <label>نوع القضية</label>
        <select value={repCaseType} onChange={e => setRepCaseType(e.target.value)} required>
        <option value="">اختر نوع القضية</option>
        <option value="مدني">مدني</option>
        <option value="تجاري">تجاري</option>
        <option value="أحوال شخصية">أسرة / أحوال شخصية</option>
        <option value="جنائي">جنائي</option>
        <option value="إداري">إداري</option>
        </select>
        </div>
        <div className="form-group">
        <label>المرحلة القضائية</label>
        <select value={repStage} onChange={e => setRepStage(e.target.value)} required>
        <option value="">اختر المرحلة</option>
        <option value="ابتدائي">ابتدائي</option>
        <option value="استئناف">استئناف</option>
        <option value="نقض">نقض</option>
        <option value="دستورية">دستورية عليا</option>
        </select>
        </div>
        <div className="form-group">
        <label>الجهة القضائية (المحكمة)</label>
        <input type="text" value={repCourt} onChange={e => setRepCourt(e.target.value)} required placeholder="اسم المحكمة بالكامل..." />
        </div>
        <div className="form-group">
        <label>رقم القضية (إن وجد)</label>
        <input type="text" value={repCaseNumber} onChange={e => setRepCaseNumber(e.target.value)} placeholder="رقم القضية والسنة" />
        </div>
        <div className="form-group">
        <label>وصف وتفاصيل القضية</label>
        <textarea rows="4" value={repDescription} onChange={e => setRepDescription(e.target.value)} required placeholder="يرجى كتابة وصف تفصيلي للقضية..."></textarea>
        </div>
        <button type="submit" className="btn-gold" style={{ width: '100%', marginTop: '1rem' }}>إرسال طلب التمثيل للواتساب</button>
        </form>
      )}

      </div>

      </div>
      </section>
      </>
  );
}
