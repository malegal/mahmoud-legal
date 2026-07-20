import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ClientInquiryResult() {
  const router = useRouter();
  const [caseData, setCaseData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('caseData');
      if (!stored) {
        throw new Error('لا توجد جلسة نشطة للاستعلام حالياً.');
      }

      const payload = JSON.parse(stored);
      const now = Date.now();
      const maxAge = 5 * 60 * 1000; // صلاحية الجلسة في المتصفح 5 دقائق فقط للحماية والسرية

      if (now - payload._timestamp > maxAge) {
        sessionStorage.removeItem('caseData');
        throw new Error('انتهت صلاحية جلسة الاستعلام الآمنة. يرجى العودة وإجراء الاستعلام مرة أخرى لتحديث البيانات.');
      }

      setCaseData(payload);
    } catch (err) {
      console.warn('❌ فشل قراءة الجلسة:', err.message);
      setErrorMsg(err.message);
    }
  }, [router]);

  const handlePrint = () => {
    window.print();
  };

  const handleExit = () => {
    sessionStorage.removeItem('caseData');
    router.push('/');
  };

  return (
    <>
    <Head>
    <title>تفاصيل ومستجدات القضية | مؤسسة الأستاذ محمود عبد الحميد</title>
    <meta name="robots" content="noindex, nofollow" />
    </Head>

    <style jsx>{`
      .result-wrapper { padding: 120px 2rem 5rem; background: var(--warm-off-white); min-height: 100vh; }
      .inner { max-width: 900px; margin: 0 auto; }
      .result-card {
        background: #fff;
        border-radius: 16px;
        padding: 2.5rem 2rem;
        border: 1px solid rgba(0,0,0,0.04);
        box-shadow: 0 4px 20px rgba(0,0,0,0.04);
      }
      .result-header { text-align: center; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 1.5rem; margin-bottom: 1.5rem; }
      .result-header h2 { font-family: var(--font-serif); font-size: 2rem; color: var(--matte-gold); font-weight: 900; }
      .badge-role { background: var(--light-gray); color: var(--charcoal); padding: 0.3rem 1.2rem; border-radius: 50px; font-size: 0.85rem; font-weight: 700; display: inline-block; margin-top: 0.5rem; }
      .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
      .info-item { background: var(--light-gray); padding: 1rem; border-radius: 10px; }
      .info-label { display: block; font-size: 0.75rem; color: rgba(34,34,34,0.4); font-weight: bold; }
      .info-value { font-size: 1rem; font-weight: bold; color: var(--charcoal); margin-top: 0.2rem; display: block; }
      .last-session { background: rgba(176,141,87,0.04); border-right: 4px solid var(--matte-gold); padding: 1.2rem; border-radius: 10px; margin-bottom: 2rem; }
      .last-session h5 { font-weight: bold; margin-bottom: 0.5rem; }
      .actions { display: flex; gap: 1rem; justify-content: center; }
      .btn-action { flex: 1; padding: 0.8rem; border-radius: 10px; font-weight: bold; text-align: center; cursor: pointer; }
      .btn-print { border: 1px solid var(--matte-gold); color: var(--matte-gold); }
      .btn-exit { background: #dc2626; color: #fff; }
      .error-card { text-align: center; padding: 3rem 1rem; background: #fff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.04); }
      @media (max-width: 768px) {
        .info-grid { grid-template-columns: 1fr; }
        .actions { flex-direction: column; }
      }
      @media print {
        .site-header, .site-footer, .actions, .float-whatsapp, #floatMainBtn, #floatSubBtns { display: none !important; }
        .result-wrapper { padding: 1rem !important; }
      }
      `}</style>

      <div className="result-wrapper">
      <div className="inner">
      {errorMsg ? (
        <div className="error-card">
        <i className="fas fa-exclamation-triangle" style={{ fontSize: '3rem', color: '#dc2626', marginBottom: '1rem' }}></i>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>فشل عرض بيانات الاستعلام</h3>
        <p style={{ fontWeight: 'bold', color: 'rgba(34,34,34,0.6)', marginBottom: '1.5rem' }}>{errorMsg}</p>
        <Link href="/client-inquiry" className="btn-gold">العودة لبوابة الاستعلام</Link>
        </div>
      ) : caseData ? (
        <div className="result-card">
        <div className="result-header">
        <h2>{caseData.case.client_name}</h2>
        <span className="badge-role">{caseData.case.client_role || 'موكل'}</span>
        </div>

        <div className="info-grid">
        <div className="info-item">
        <span className="info-label">خصم الدعوى</span>
        <span className="info-value">{caseData.case.opponent_name || 'غير محدد'}</span>
        </div>
        <div className="info-item">
        <span className="info-label">المحكمة</span>
        <span className="info-value">{caseData.case.court_name}</span>
        </div>
        <div className="info-item">
        <span className="info-label">رقم القضية</span>
        <span className="info-value">{`${caseData.case.case_number} لسنة ${caseData.case.case_year}`}</span>
        </div>
        <div className="info-item">
        <span className="info-label">الدائرة القضائية</span>
        <span className="info-value">{caseData.case.circuit || 'غير محدد'}</span>
        </div>
        <div className="info-item" style={{ gridColumn: 'span 2' }}>
        <span className="info-label">موضوع الدعوى بالتفصيل</span>
        <span className="info-value">{caseData.case.case_subject}</span>
        </div>
        </div>

        {caseData.sessions && caseData.sessions.length > 0 && (
          <div className="last-session">
          <h5><i className="fas fa-clock" style={{ color: 'var(--matte-gold)', marginLeft: '6px' }}></i> آخر جلسة وقرار مسجل</h5>
          <div style={{ fontWeight: 'bold', color: 'var(--matte-gold)' }}>
          تاريخ الجلسة: {caseData.sessions[0].session_date}
          </div>
          <div style={{ fontWeight: 'bold', marginTop: '0.3rem' }}>
          قرار المحكمة: {caseData.sessions[0].decision || 'لم يصدر قرار بعد'}
          </div>
          </div>
        )}

        <div className="actions">
        <button className="btn-action btn-print" onClick={handlePrint}><i className="fas fa-print" style={{ marginLeft: '6px' }}></i> طباعة التقرير</button>
        <button className="btn-action btn-exit" onClick={handleExit}><i className="fas fa-sign-out-alt" style={{ marginLeft: '6px' }}></i> خروج آمن</button>
        </div>
        </div>
      ) : null}
      </div>
      </div>
      </>
  );
}
