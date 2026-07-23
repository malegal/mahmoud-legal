'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('consult');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab === 'visit') setActiveTab('visit');
    else if (tab === 'representation') setActiveTab('representation');
    else setActiveTab('consult');

    const specialty = params.get('specialty');
    if (specialty && tab !== 'visit' && tab !== 'representation') {
      const consultMessage = document.getElementById('consultMessage') as HTMLTextAreaElement;
      if (consultMessage) {
        consultMessage.value = `أرغب في الحصول على استشارة قانونية بخصوص: ${specialty}`;
      }
    }

    // Auto-scroll to form if tab param exists
    if (tab) {
      setTimeout(() => {
        const formsSection = document.querySelector('.tab-container');
        if (formsSection) {
          formsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, []);

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    const consultForm = document.getElementById('consult-form');
    const visitForm = document.getElementById('visit-form');
    const repForm = document.getElementById('representation-form');
    const btnConsult = document.getElementById('btn-consult');
    const btnVisit = document.getElementById('btn-visit');
    const btnRep = document.getElementById('btn-representation');

    if (consultForm) consultForm.classList.add('hidden');
    if (visitForm) visitForm.classList.add('hidden');
    if (repForm) repForm.classList.add('hidden');
    if (btnConsult) btnConsult.classList.remove('active');
    if (btnVisit) btnVisit.classList.remove('active');
    if (btnRep) btnRep.classList.remove('active');

    if (tab === 'visit') {
      if (visitForm) visitForm.classList.remove('hidden');
      if (btnVisit) btnVisit.classList.add('active');
    } else if (tab === 'representation') {
      if (repForm) repForm.classList.remove('hidden');
      if (btnRep) btnRep.classList.add('active');
    } else {
      if (consultForm) consultForm.classList.remove('hidden');
      if (btnConsult) btnConsult.classList.add('active');
    }
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = (document.getElementById('consultName') as HTMLInputElement)?.value.trim();
    const phone = (document.getElementById('consultPhone') as HTMLInputElement)?.value.trim();
    const message = (document.getElementById('consultMessage') as HTMLTextAreaElement)?.value.trim();
    if (!name || !phone || !message) {
      alert('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }
    const msg = `*طلب استشارة قانونية*%0Aالاسم: ${name}%0Aالهاتف: ${phone}%0Aالتفاصيل: ${message}`;
    window.open(`https://wa.me/201101076000?text=${msg}`, '_blank');
  };

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = (document.getElementById('visitName') as HTMLInputElement)?.value.trim();
    const phone = (document.getElementById('visitPhone') as HTMLInputElement)?.value.trim();
    const date = (document.getElementById('visitDate') as HTMLInputElement)?.value;
    const location = (document.getElementById('visitLocation') as HTMLSelectElement)?.value;
    const reason = (document.getElementById('visitReason') as HTMLTextAreaElement)?.value.trim();
    if (!name || !phone || !date || !reason) {
      alert('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }
    const msg = `*طلب حجز موعد*%0Aالاسم: ${name}%0Aالهاتف: ${phone}%0Aالتاريخ المفضل: ${date}%0Aالموقع: ${location}%0Aسبب الزيارة: ${reason}`;
    window.open(`https://wa.me/201101076000?text=${msg}`, '_blank');
  };

  const handleRepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = (document.getElementById('repName') as HTMLInputElement)?.value.trim();
    const phone = (document.getElementById('repPhone') as HTMLInputElement)?.value.trim();
    const email = (document.getElementById('repEmail') as HTMLInputElement)?.value.trim();
    const caseType = (document.getElementById('repCaseType') as HTMLSelectElement)?.value;
    const stage = (document.getElementById('repStage') as HTMLSelectElement)?.value;
    const court = (document.getElementById('repCourt') as HTMLInputElement)?.value.trim();
    const caseNumber = (document.getElementById('repCaseNumber') as HTMLInputElement)?.value.trim();
    const description = (document.getElementById('repDescription') as HTMLTextAreaElement)?.value.trim();
    const contractFile = (document.getElementById('repContract') as HTMLInputElement)?.files?.[0];
    const sendDocs = (document.getElementById('repSendDocs') as HTMLInputElement)?.checked;

    if (!name || !phone || !email || !caseType || !stage || !court || !description) {
      alert('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }

    let msg = `*طلب تمثيل قانوني*%0Aالاسم: ${name}%0Aالهاتف: ${phone}%0Aالبريد الإلكتروني: ${email}`;
    msg += `%0Aنوع القضية: ${caseType}`;
    msg += `%0Aالمرحلة القضائية: ${stage}`;
    msg += `%0Aالجهة القضائية: ${court}`;
    if (caseNumber) msg += `%0Aرقم القضية: ${caseNumber}`;
    msg += `%0A%0A*وصف القضية:*%0A${description}`;
    if (contractFile) {
      msg += `%0A%0A*تم إرفاق عقد الخدمة:* ${contractFile.name}`;
    }
    if (sendDocs) {
      msg += `%0A%0A*سيتم إرسال صور المستندات عبر واتساب أو البريد الإلكتروني بعد إرسال الطلب.*`;
    }
    window.open(`https://wa.me/201101076000?text=${msg}`, '_blank');
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero-contact" aria-label="تواصل معنا">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>

        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">Contact Us</span>
            <h1>
              تواصل <span className="gold-text">معنا</span>
            </h1>
            <p className="sub">نحن هنا للاستماع إليك والدفاع عن حقوقك. اختر الطريقة الأنسب للتواصل معنا.</p>
          </div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="section-content" aria-label="معلومات التواصل">
        <div className="inner">
          {/* ===== BRANCHES ===== */}
          <div className="reveal text-center mb-8">
            <span
              className="eyebrow"
              style={{
                display: 'block',
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--matte-gold)',
                opacity: 0.5,
                marginBottom: '0.3rem',
              }}
            >
              ● مواقعنا
            </span>
            <h2 className="text-2xl md:text-3xl font-bold serif gold-text">المكتب الرئيسي والفروع</h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--charcoal)', fontWeight: 700 }}>
              نخدم عملاءنا في مختلف أنحاء مصر. المكتب الرئيسي في أسوان، مع مكاتب وفروع في القاهرة والإسكندرية لتلبية احتياجاتكم القانونية.
            </p>
          </div>

          <div className="branches-grid mb-8">
            <div className="branch-card reveal">
              <div className="branch-icon"><i className="fas fa-flag"></i></div>
              <h4>أسوان <span className="badge-main">المقر الرئيسي</span></h4>
              <p>شارع كسر الحجر، المتفرع من شارع كورنيش النيل، أمام مجمع المحاكم، أسوان</p>
            </div>
            <div className="branch-card reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="branch-icon"><i className="fas fa-building"></i></div>
              <h4>القاهرة <span className="badge-main" style={{ background: 'rgba(176,141,87,0.15)', color: 'var(--matte-gold)' }}>فرع</span></h4>
              <p>منطقة وسط البلد، شارع القصر العيني (خدمة الاستشارات والتمثيل القضائي)</p>
            </div>
            <div className="branch-card reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="branch-icon"><i className="fas fa-city"></i></div>
              <h4>الإسكندرية <span className="badge-main" style={{ background: 'rgba(176,141,87,0.15)', color: 'var(--matte-gold)' }}>فرع</span></h4>
              <p>منطقة محطة الرمل، شارع سعد زغلول (خدمة الاستشارات والمتابعة القضائية)</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* العمود الأيمن: معلومات الاتصال + الخريطة */}
            <div className="lg:col-span-5 space-y-6">
              <div className="reveal">
                <h2 className="text-2xl font-bold serif gold-text mb-1">بيانات التواصل</h2>
                <p className="text-sm" style={{ color: 'var(--charcoal)', fontWeight: 700 }}>تفضل بزيارة مقرنا الرئيسي في أسوان، أو اتصل بنا في فروعنا</p>
              </div>

              <div className="space-y-3">
                <div className="contact-card reveal">
                  <div className="icon-wrap"><i className="fas fa-map-marker-alt"></i></div>
                  <div className="info">
                    <h4>المقر الرئيسي (أسوان)</h4>
                    <p>شارع كسر الحجر، أمام مجمع المحاكم، أسوان</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--charcoal)', fontWeight: 700 }}>فروع القاهرة والإسكندرية حسب المواعيد المسبقة</p>
                  </div>
                </div>
                <div className="contact-card reveal" style={{ transitionDelay: '0.08s' }}>
                  <div className="icon-wrap"><i className="fas fa-phone-alt"></i></div>
                  <div className="info">
                    <h4>الهاتف والواتساب</h4>
                    <p dir="ltr">+20 110 107 6000</p>
                  </div>
                </div>
                <div className="contact-card reveal" style={{ transitionDelay: '0.16s' }}>
                  <div className="icon-wrap"><i className="fas fa-envelope"></i></div>
                  <div className="info">
                    <h4>البريد الإلكتروني</h4>
                    <p dir="ltr">ma.law.firm@outlook.com</p>
                  </div>
                </div>
                <div className="contact-card reveal" style={{ transitionDelay: '0.24s' }}>
                  <div className="icon-wrap"><i className="fas fa-clock"></i></div>
                  <div className="info">
                    <h4>ساعات العمل</h4>
                    <p>السبت - الخميس: ٩:٠٠ ص - ١٠:٠٠ م</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--charcoal)', fontWeight: 700 }}>الجمعة: مغلق</p>
                  </div>
                </div>
              </div>

              {/* الخريطة */}
              <div className="map-container reveal">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.4!2d32.9!3d24.09!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA1JzMxLjIiTiAzMsKwNTMnNDkuMiJF!5e0!3m2!1sen!2seg!4v1600000000000!5m2!1sen!2seg"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
                <div className="map-overlay">
                  <span><i className="fas fa-map-pin ml-2"></i> المقر الرئيسي في أسوان</span>
                </div>
              </div>

              {/* وسائل التواصل الاجتماعي */}
              <div className="reveal text-center pt-2">
                <p className="text-sm font-bold" style={{ color: 'var(--charcoal)', marginBottom: '0.75rem' }}>تابعنا على المنصات:</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <a href="https://www.facebook.com/malegal" target="_blank" rel="noopener noreferrer" className="social-icon-circle"><i className="fab fa-facebook-f"></i></a>
                  <a href="https://x.com/mahmoud_a_hamyd" target="_blank" rel="noopener noreferrer" className="social-icon-circle"><i className="fab fa-twitter"></i></a>
                  <a href="https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374" target="_blank" rel="noopener noreferrer" className="social-icon-circle"><i className="fab fa-linkedin-in"></i></a>
                  <a href="https://t.me/mahmoud_a_hamyd" target="_blank" rel="noopener noreferrer" className="social-icon-circle"><i className="fab fa-telegram-plane"></i></a>
                  <a href="https://wa.me/201101076000" target="_blank" rel="noopener noreferrer" className="social-icon-circle"><i className="fab fa-whatsapp"></i></a>
                </div>
              </div>
            </div>

            {/* العمود الأيسر: النماذج */}
            <div className="lg:col-span-7 reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="tab-container">
                {/* أزرار التبويب */}
                <div className="tab-buttons">
                  <button onClick={() => switchTab('consult')} id="btn-consult" className="tab-btn active">
                    <i className="fas fa-comment-dots"></i> استشارة سريعة
                  </button>
                  <button onClick={() => switchTab('visit')} id="btn-visit" className="tab-btn">
                    <i className="fas fa-calendar-check"></i> حجز موعد
                  </button>
                  <button onClick={() => switchTab('representation')} id="btn-representation" className="tab-btn">
                    <i className="fas fa-gavel"></i> طلب تمثيل
                  </button>
                </div>

                {/* نموذج الاستشارة */}
                <div id="consult-form">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold" style={{ color: 'var(--charcoal)' }}>طلب استشارة قانونية</h3>
                    <p className="text-sm" style={{ color: 'var(--charcoal)', fontWeight: 700 }}>املأ النموذج وسيتم تحويلك مباشرة للواتساب للرد الفوري</p>
                  </div>
                  <form id="consultForm" className="space-y-4" onSubmit={handleConsultSubmit}>
                    <div className="form-group">
                      <label htmlFor="consultName">الاسم بالكامل</label>
                      <input type="text" id="consultName" placeholder="الاسم ثلاثي..." required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="consultPhone">رقم الهاتف / الواتساب</label>
                      <input type="tel" id="consultPhone" placeholder="01xxxxxxxxx" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="consultMessage">تفاصيل الاستشارة</label>
                      <textarea id="consultMessage" rows={4} placeholder="يرجى كتابة ملخص للقضية أو الاستفسار..." required></textarea>
                    </div>
                    <button type="submit" className="btn-gold w-full py-3 rounded-lg flex items-center justify-center gap-3">
                      <span>إرسال الاستشارة</span>
                      <i className="fab fa-whatsapp text-xl"></i>
                    </button>
                  </form>
                </div>

                {/* نموذج الحجز */}
                <div id="visit-form" className="hidden">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold" style={{ color: 'var(--charcoal)' }}>حجز موعد في المكتب</h3>
                    <p className="text-sm" style={{ color: 'var(--charcoal)', fontWeight: 700 }}>ناقش قضيتك وجهاً لوجه مع الأستاذ محمود عبد الحميد</p>
                  </div>
                  <form id="visitForm" className="space-y-4" onSubmit={handleVisitSubmit}>
                    <div className="form-group">
                      <label htmlFor="visitName">الاسم بالكامل</label>
                      <input type="text" id="visitName" placeholder="الاسم ثلاثي..." required />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="visitPhone">رقم الهاتف</label>
                        <input type="tel" id="visitPhone" placeholder="01xxxxxxxxx" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="visitDate">تاريخ المقابلة المفضل</label>
                        <input type="date" id="visitDate" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="visitLocation">موقع المقابلة المفضل</label>
                      <select id="visitLocation">
                        <option value="أسوان">المقر الرئيسي - أسوان</option>
                        <option value="القاهرة">فرع القاهرة</option>
                        <option value="الإسكندرية">فرع الإسكندرية</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="visitReason">سبب الزيارة</label>
                      <textarea id="visitReason" rows={3} placeholder="استشارة بخصوص قضية..." required></textarea>
                    </div>
                    <button type="submit" className="btn-gold w-full py-3 rounded-lg flex items-center justify-center gap-3">
                      <span>تأكيد طلب الحجز</span>
                      <i className="fas fa-calendar-check"></i>
                    </button>
                  </form>
                </div>

                {/* نموذج طلب تمثيل قانوني */}
                <div id="representation-form" className="hidden">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold" style={{ color: 'var(--charcoal)' }}>طلب تمثيل قانوني</h3>
                    <p className="text-sm" style={{ color: 'var(--charcoal)', fontWeight: 700 }}>قدم طلباً لتولي قضيتك بالكامل من قبل الأستاذ محمود عبد الحميد</p>
                  </div>
                  <form id="representationForm" className="space-y-4" onSubmit={handleRepSubmit}>
                    <div className="form-group">
                      <label htmlFor="repName">الاسم بالكامل</label>
                      <input type="text" id="repName" placeholder="الاسم ثلاثي..." required />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="repPhone">رقم الهاتف / الواتساب</label>
                        <input type="tel" id="repPhone" placeholder="01xxxxxxxxx" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="repEmail">البريد الإلكتروني</label>
                        <input type="email" id="repEmail" placeholder="example@mail.com" required />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="repCaseType">نوع القضية</label>
                        <select id="repCaseType" required>
                          <option value="">اختر نوع القضية</option>
                          <option value="مدني">مدني</option>
                          <option value="تجاري">تجاري</option>
                          <option value="أسرة">أسرة / أحوال شخصية</option>
                          <option value="جنائي">جنائي</option>
                          <option value="إداري">إداري</option>
                          <option value="عقاري">عقاري</option>
                          <option value="عمالي">عمالي</option>
                          <option value="دستوري">دستوري</option>
                          <option value="تحكيم">تحكيم</option>
                          <option value="أخرى">أخرى</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="repStage">المرحلة القضائية</label>
                        <select id="repStage" required>
                          <option value="">اختر المرحلة</option>
                          <option value="ابتدائي">ابتدائي</option>
                          <option value="استئناف">استئناف</option>
                          <option value="نقض">نقض</option>
                          <option value="تنفيذ">تنفيذ</option>
                          <option value="دستورية">دستورية</option>
                          <option value="إدارية عليا">إدارية عليا</option>
                          <option value="أخرى">أخرى</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="repCourt">الجهة القضائية (المحكمة)</label>
                      <input type="text" id="repCourt" placeholder="مثال: محكمة النقض، المحكمة الإدارية العليا، محكمة استئناف القاهرة..." required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="repCaseNumber">رقم القضية (إن وجد)</label>
                      <input type="text" id="repCaseNumber" placeholder="رقم القضية والسنة" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="repDescription">وصف القضية</label>
                      <textarea id="repDescription" rows={5} placeholder="يرجى كتابة وصف تفصيلي للقضية، والجهات المعنية، وأي معلومات أخرى تراها مهمة..." required></textarea>
                    </div>

                    {/* إرفاق عقد الخدمة */}
                    <div className="form-group">
                      <label htmlFor="repContract">إرفاق عقد الخدمة (PDF) <span style={{ color: 'var(--charcoal)', fontWeight: 400 }}>(اختياري)</span></label>
                      <input type="file" id="repContract" accept=".pdf" />
                      <p style={{ fontSize: '0.65rem', color: 'var(--charcoal)', fontWeight: 700, marginTop: '0.2rem' }}>يمكنك إرفاق عقد الخدمة الموقع بصيغة PDF</p>
                    </div>

                    {/* طلب إرسال المستندات */}
                    <div className="form-group">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 400, color: 'var(--charcoal)', fontSize: '0.85rem' }}>
                        <input type="checkbox" id="repSendDocs" defaultChecked />
                        <span>سأقوم بإرسال صور المستندات عبر <strong>واتساب</strong> أو <strong>البريد الإلكتروني</strong> بعد إرسال الطلب</span>
                      </label>
                      <p style={{ fontSize: '0.65rem', color: 'var(--charcoal)', fontWeight: 700, marginTop: '0.2rem' }}>سيتم توفير رابط لإرسال المستندات بعد إرسال الطلب</p>
                    </div>

                    <button type="submit" className="btn-gold w-full py-3 rounded-lg flex items-center justify-center gap-3">
                      <span>إرسال طلب التمثيل</span>
                      <i className="fas fa-gavel"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== أنماط إضافية مدمجة لهذه الصفحة ===== */}
      <style>{`
        /* ===== HERO – تواصل معنا ===== */
        .hero-contact {
          padding: 120px 2rem 4rem;
          background: var(--very-dark-navy);
          position: relative;
          overflow: hidden;
          min-height: 45vh;
          display: flex;
          align-items: center;
        }
        .hero-contact .hero-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: radial-gradient(circle at 20% 30%, var(--matte-gold) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--matte-gold) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero-contact .hero-glow {
          position: absolute;
          width: 60vw;
          height: 60vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(176,141,87,0.04) 0%, transparent 70%);
          top: -20%;
          right: -20%;
          pointer-events: none;
          animation: orbFloat 20s ease-in-out infinite alternate;
        }
        .hero-contact .hero-glow-2 {
          position: absolute;
          width: 40vw;
          height: 40vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(176,141,87,0.02) 0%, transparent 70%);
          bottom: -20%;
          left: -10%;
          pointer-events: none;
          animation: orbFloat 25s ease-in-out infinite alternate-reverse;
        }
        @keyframes orbFloat {
          0% { transform: translate(0,0) scale(1); }
          100% { transform: translate(40px, -30px) scale(1.05); }
        }
        .hero-contact .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          width: 100%;
        }
        .hero-contact .hero-title-wrap {
          text-align: center;
        }
        .hero-contact .hero-title-wrap .en-tag {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--matte-gold);
          opacity: 0.5;
          display: block;
          margin-bottom: 0.3rem;
        }
        .hero-contact .hero-title-wrap h1 {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
        }
        .hero-contact .hero-title-wrap h1 .gold-text {
          color: var(--matte-gold);
        }
        .hero-contact .hero-title-wrap .sub {
          font-size: clamp(1rem, 1.3vw, 1.2rem);
          font-weight: 400;
          color: rgba(255,255,255,0.55);
          max-width: 700px;
          margin: 0.8rem auto 0;
          line-height: 1.7;
        }

        /* ===== CONTENT ===== */
        .section-content {
          flex: 1;
          padding: 5rem 2rem;
          background: var(--warm-off-white);
        }
        .section-content .inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ===== CONTACT INFO CARDS ===== */
        .contact-card {
          background: var(--pure-white);
          border-radius: 12px;
          padding: 1.5rem 1.2rem;
          border: 1px solid rgba(0,0,0,0.04);
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
          transition: all 0.4s var(--ease-out);
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
          overflow: hidden;
        }
        .contact-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 3px;
          background: var(--matte-gold);
          transition: width 0.6s var(--ease-out);
        }
        .contact-card:hover::after {
          width: 100%;
        }
        .contact-card:hover {
          border-color: var(--matte-gold);
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.04);
        }
        .contact-card .icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(176,141,87,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.4s var(--ease-out);
        }
        .contact-card:hover .icon-wrap {
          background: var(--matte-gold);
        }
        .contact-card:hover .icon-wrap i {
          color: #000;
        }
        .contact-card .icon-wrap i {
          font-size: 1.2rem;
          color: var(--matte-gold);
          transition: all 0.4s ease;
        }
        .contact-card .info h4 {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--matte-gold);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.1rem;
        }
        .contact-card .info p {
          font-size: 0.85rem;
          color: var(--charcoal);
          font-weight: 700;
          line-height: 1.5;
        }

        /* ===== SOCIAL ICONS ===== */
        .social-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0,0,0,0.04);
          transition: all 0.4s var(--ease-out);
          color: var(--charcoal);
          font-size: 1.2rem;
          background: var(--pure-white);
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
        }
        .social-icon-circle:hover {
          border-color: var(--matte-gold);
          background: var(--matte-gold);
          color: #000;
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(176,141,87,0.15);
        }

        /* ===== BRANCHES ===== */
        .branches-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
        }
        .branch-card {
          background: var(--pure-white);
          border-radius: 12px;
          padding: 1.5rem 1.2rem;
          border: 1px solid rgba(0,0,0,0.04);
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
          transition: all 0.4s var(--ease-out);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .branch-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 3px;
          background: var(--matte-gold);
          transition: width 0.6s var(--ease-out);
        }
        .branch-card:hover::after {
          width: 100%;
        }
        .branch-card:hover {
          border-color: var(--matte-gold);
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.04);
        }
        .branch-card .branch-icon {
          font-size: 1.8rem;
          color: var(--matte-gold);
          opacity: 0.3;
          margin-bottom: 0.3rem;
        }
        .branch-card h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 0.1rem;
        }
        .branch-card p {
          font-size: 0.75rem;
          color: var(--charcoal);
          font-weight: 700;
          line-height: 1.6;
        }
        .branch-card .badge-main {
          display: inline-block;
          background: var(--matte-gold);
          color: #000;
          font-size: 0.55rem;
          font-weight: 700;
          padding: 0.1rem 0.6rem;
          border-radius: 50px;
          margin-top: 0.4rem;
        }

        /* ===== MAP ===== */
        .map-container {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.04);
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
          transition: all 0.4s var(--ease-out);
          position: relative;
          height: 260px;
          width: 100%;
        }
        .map-container:hover {
          border-color: var(--matte-gold);
          box-shadow: 0 8px 30px rgba(0,0,0,0.04);
        }
        .map-container iframe {
          width: 100%;
          height: 100%;
          border: 0;
          filter: grayscale(100%) invert(90%) contrast(85%);
          transition: filter 0.4s ease;
        }
        .map-container:hover iframe {
          filter: grayscale(0%) invert(0%) contrast(100%);
        }
        .map-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .map-container:hover .map-overlay {
          opacity: 0;
        }
        .map-overlay span {
          background: var(--matte-gold);
          color: #000;
          padding: 0.5rem 1.2rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.8rem;
        }

        /* ===== TABS & FORMS ===== */
        .tab-container {
          background: var(--pure-white);
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.04);
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
          padding: 2rem;
          transition: all 0.4s var(--ease-out);
          position: relative;
          overflow: hidden;
        }
        .tab-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 3px;
          background: var(--matte-gold);
          transition: width 0.6s var(--ease-out);
        }
        .tab-container:hover::after {
          width: 100%;
        }
        .tab-buttons {
          display: flex;
          gap: 0.5rem;
          background: var(--light-gray);
          padding: 0.4rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .tab-btn {
          flex: 1;
          padding: 0.6rem 1rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--charcoal);
          transition: all 0.4s var(--ease-out);
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          min-width: 120px;
          opacity: 0.5;
        }
        .tab-btn.active {
          background: var(--matte-gold);
          color: #000;
          box-shadow: 0 2px 15px rgba(176,141,87,0.15);
          opacity: 1;
        }
        .tab-btn:hover:not(.active) {
          color: var(--charcoal);
          background: rgba(0,0,0,0.02);
          opacity: 0.8;
        }
        .form-group {
          margin-bottom: 1.2rem;
        }
        .form-group label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 0.2rem;
        }
        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 8px;
          font-size: 0.9rem;
          font-family: var(--font-ar);
          background: var(--warm-off-white);
          color: var(--charcoal);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          outline: none;
          font-weight: 700;
        }
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          border-color: var(--matte-gold);
          box-shadow: 0 0 0 3px rgba(176,141,87,0.05);
        }
        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }
        .form-group select {
          appearance: auto;
        }
        .form-group input[type="file"] {
          padding: 0.4rem;
          background: var(--pure-white);
          border: 1px dashed rgba(0,0,0,0.1);
        }
        .form-group input[type="file"]:hover {
          border-color: var(--matte-gold);
        }
        .hidden {
          display: none !important;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .branches-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 820px) {
          .hero-contact { padding: 100px 1rem 3rem; min-height: auto; }
          .section-content { padding: 2.5rem 1rem; }
          .tab-container { padding: 1.2rem; }
          .tab-btn { font-size: 0.75rem; padding: 0.4rem 0.6rem; min-width: 80px; }
          .branches-grid { grid-template-columns: 1fr; max-width: 360px; margin: 0 auto; }
          .hero-contact .hero-title-wrap h1 { font-size: clamp(2rem, 8vw, 2.8rem); }
          .contact-card { padding: 1rem; gap: 0.8rem; }
          .contact-card .icon-wrap { width: 40px; height: 40px; }
          .contact-card .icon-wrap i { font-size: 1rem; }
          .map-container { height: 200px; }
        }
        @media (max-width: 640px) {
          .branches-grid { grid-template-columns: 1fr; max-width: 320px; margin: 0 auto; }
          .tab-buttons { flex-direction: column; gap: 0.3rem; }
          .tab-btn { width: 100%; justify-content: center; min-width: unset; }
          .tab-container { padding: 1rem; }
          .form-group input,
          .form-group textarea,
          .form-group select { font-size: 0.85rem; padding: 0.5rem 0.6rem; }
        }
      `}</style>
    </>
  );
}
