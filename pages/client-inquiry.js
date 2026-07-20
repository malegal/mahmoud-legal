import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ClientInquiry() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consentChecked) {
      setErrorMsg('يرجى تأكيد وقبول الشروط القانونية والتنظيمية قبل المتابعة.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    // معالجة وتنظيف المدخلات لمنع أي هجمات خبيثة
    let cleanPhone = phone.replace(/[^0-9]/g, '').trim();
    let cleanCode = code.replace(/[^a-zA-Z0-9\-]/g, '').trim().toUpperCase();

    // إزالة السابقة المحلية في حال إدخالها بالخطأ
    if (cleanPhone.startsWith('20')) {
      cleanPhone = cleanPhone.substring(2);
    }
    if (cleanCode.startsWith('MA-')) {
      cleanCode = cleanCode.substring(3);
    }

    const fullPhone = '20' + cleanPhone;
    const fullCode = 'MA-' + cleanCode;

    try {
      const { getCaseData } = await import('../lib/supabase');
      const { data, error } = await getCaseData(fullPhone, fullCode);

      if (error || !data || !data.case) {
        throw new Error('NOT_FOUND');
      }

      // حفظ النتيجة المؤقتة في الـ Session لضمان الأمان والاطلاع السريع لمرة واحدة
      const sessionPayload = {
        ...data,
        _timestamp: Date.now()
      };
      sessionStorage.setItem('caseData', JSON.stringify(sessionPayload));

      // التوجيه السريع لصفحة النتيجة
      router.push('/client-inquiry-result');
    } catch (err) {
      console.warn('❌ فشل التحقق من القضية:', err);
      setErrorMsg('بيانات الاستعلام غير صحيحة. يرجى مراجعة رقم الهاتف المسجل لدينا وكود القضية والمحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Head>
    <title>نظام الاستعلام الإلكتروني عن القضايا | مؤسسة الأستاذ محمود عبد الحميد</title>
    <meta name="description" content="نظام متابعة سير القضايا والطلبات القانونية لموكلي وعملاء مكتب الأستاذ محمود عبد الحميد للمحاماة." />
    <link rel="canonical" href="https://ostazlaw.vercel.app/client-inquiry" />
    </Head>

    <style jsx>{`
      .hero-inquiry {
        padding: 160px 24px 80px;
        text-align: center;
        background-color: var(--very-dark-navy);
      }
      .hero-title { font-family: var(--font-serif); font-size: clamp(2rem, 10vw, 2.8rem); color: #fff; margin-bottom: 2.8rem; }
      .hero-subtitle { color: rgba(255,255,255,0.8); }
      .search-card {
        max-width: 600px;
        margin: 0 auto;
        background: #fff;
        border-radius: 16px;
        padding: 2.5rem 2rem;
        border: 1px solid rgba(0,0,0,0.04);
        box-shadow: 0 4px 20px rgba(0,0,0,0.05);
      }
      .legal-disclaimer {
        background: rgba(176, 141, 87, 0.03);
        border-right: 3px solid var(--matte-gold);
        padding: 1rem 1.2rem;
        border-radius: 10px;
        margin-bottom: 1.5rem;
        text-align: right;
      }
      .disclaimer-title { font-weight: 700; font-size: 0.85rem; margin-bottom: 0.3rem; }
      .disclaimer-text { font-size: 0.8rem; line-height: 1.8; font-weight: 700; }
      .input-group-custom {
        display: flex;
        align-items: center;
        background: #FFFFFF;
        border: 1px solid #D1D1D1;
        border-radius: 10px;
        margin-bottom: 1rem;
        overflow: hidden;
      }
      .form-control-custom {
        border: none;
        padding: 0.7rem 0.8rem;
        width: 100%;
        font-size: 1rem;
        outline: none;
        font-weight: 700;
      }
      .fixed-prefix {
        background: #F5F5F5;
        padding: 0.7rem 0.8rem;
        font-weight: 700;
        font-size: 0.85rem;
        border-left: 1px solid #E5E5E5;
      }
      .consent-wrapper {
        display: flex;
        gap: 0.6rem;
        margin-bottom: 1.2rem;
        padding: 0.8rem 1rem;
        background: var(--light-gray);
        border-radius: 10px;
        text-align: right;
      }
      .consent-label { font-size: 0.8rem; font-weight: 700; line-height: 1.6; }
      .error-message {
        color: #dc2626;
        font-size: 0.85rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-align: center;
      }
      .btn-search {
        width: 100%;
        padding: 0.8rem;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 700;
        margin-top: 0.5rem;
        background-color: var(--matte-gold);
        color: #000;
        cursor: pointer;
      }
      .btn-search:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      <section className="hero-inquiry" aria-label="بوابة المتابعة">
      <div className="hero-inner">
      <span style={{ color: 'var(--matte-gold)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Client Portal</span>
      <h1 className="hero-title">تابع <span className="gold-text">قضيتك</span></h1>
      <p className="hero-subtitle">نظام الاستعلام الإلكتروني لموكلي المؤسسة</p>
      </div>
      </section>

      <section className="section section-light">
      <div className="section-inner">
      <div className="search-card">

      {/* التنبيه الأمني والسرية */}
      <div className="legal-disclaimer">
      <div className="disclaimer-title">
      <i className="fas fa-shield-alt" style={{ color: 'var(--matte-gold)', marginLeft: '6px' }}></i> تنبيه قانوني هام
      </div>
      <div className="disclaimer-text">
      نظام الاستعلام الإلكتروني مخصص حصراً للعملاء المسجلين بمكتبنا للاطلاع على قضاياهم الشخصية.
      <strong> لا يجوز</strong> استخدام النظام للاستعلام عن قضايا الآخرين دون تفويض رسمي.
      </div>
      </div>

      <form onSubmit={handleSubmit}>

      <div className="input-group-custom">
      <input
      type="tel"
      className="form-control-custom"
      placeholder="رقم الهاتف المسجل لدينا"
      value={phone}
      onChange={e => setPhone(e.target.value)}
      required
      />
      <span className="fixed-prefix">20</span>
      </div>

      <div className="input-group-custom">
      <input
      type="text"
      className="form-control-custom"
      placeholder="كود القضية"
      value={code}
      onChange={e => setCode(e.target.value)}
      style={{ textTransform: 'uppercase' }}
      required
      />
      <span className="fixed-prefix">MA-</span>
      </div>

      <div className="consent-wrapper">
      <input
      type="checkbox"
      id="consentCheck"
      checked={consentChecked}
      onChange={e => setConsentChecked(e.target.checked)}
      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
      />
      <label htmlFor="consentCheck" className="consent-label">
      أقر بأنني <strong>صاحب القضية</strong> أو <strong>مفوض قانونياً</strong> بالاستعلام عنها، وأتحمل كامل المسؤولية القانونية عن أي استخدام غير مصرح به للمعلومات.
      </label>
      </div>

      {errorMsg && <div className="error-message">{errorMsg}</div>}

      <button type="submit" className="btn-search" disabled={loading || !consentChecked}>
      {loading ? 'جاري التحقق وقراءة البيانات...' : 'استعلام واطلاع'}
      </button>

      </form>
      </div>
      </div>
      </section>
      </>
  );
}
