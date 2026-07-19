import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function ClientInquiryResult() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('caseData');
      if (!stored) {
        throw new Error('لا توجد بيانات في الجلسة');
      }
      const parsed = JSON.parse(stored);
      const now = Date.now();
      const maxAge = 5 * 60 * 1000;
      const timestamp = parsed._timestamp || (now - maxAge - 1);
      if (now - timestamp > maxAge) {
        throw new Error('انتهت صلاحية البيانات');
      }
      setData(parsed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

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

  const formatDate = (dateString) => {
    if (!dateString) return 'غير محدد';
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return 'تاريخ غير صالح';
      return d.toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (_) {
      return 'تاريخ غير صالح';
    }
  };

  const exitSystem = () => {
    sessionStorage.removeItem('caseData');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <Layout>
        <div className="result-main">
          <div className="inner reveal">
            <div className="result-card">
              <div className="loading-container">
                <div className="spinner"></div>
                <p>جاري عرض بيانات القضية...</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout>
        <div className="result-main">
          <div className="inner reveal">
            <div className="result-card">
              <div className="error-container">
                <i className="fas fa-exclamation-triangle"></i>
                <h3>عذراً</h3>
                <p>{error === 'انتهت صلاحية البيانات' ? 'انتهت صلاحية بيانات الاستعلام. يرجى إعادة البحث للحصول على أحدث البيانات.' : 'لا توجد بيانات استعلام حالياً. يرجى إجراء بحث جديد.'}</p>
                <div className="error-actions">
                  <Link href="/client-inquiry" className="btn-gold">العودة للاستعلام</Link>
                  <button onClick={() => window.location.reload()} className="btn-outline-gold">إعادة المحاولة</button>
                </div>
                <p style={{ marginTop: '1.2rem', fontSize: '0.8rem', color: 'rgba(34,34,34,0.3)' }}>
                  للدعم الفني: <a href="tel:+201101076000" style={{ color: 'var(--matte-gold)' }}>+20 110 107 6000</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const c = data.case;
  const sessions = Array.isArray(data.sessions) ? data.sessions : [];
  const lastSession = sessions.length > 0 ? sessions[0] : null;

  return (
    <Layout>
      <Head>
        <title>نتيجة الاستعلام | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا</title>
        <meta name="description" content="نتيجة استعلام قضيتك – مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ostazlaw.vercel.app/client-inquiry-result.html" />
        <meta property="og:title" content="نتيجة الاستعلام | الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا" />
        <meta property="og:description" content="نتيجة استعلام قضيتك – مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ostazlaw.vercel.app/client-inquiry-result.html" />
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
                  "@type": "WebPage",
                  "@id": "https://ostazlaw.vercel.app/client-inquiry-result.html#webpage",
                  "url": "https://ostazlaw.vercel.app/client-inquiry-result.html",
                  "name": "نتيجة الاستعلام",
                  "description": "نتيجة استعلام قضيتك – مؤسسة الأستاذ محمود عبد الحميد للمحاماة.",
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

      <div className="result-main">
        <div className="inner reveal" style={{ transitionDelay: '0.1s' }}>
          <div className="result-card">
            <div className="result-header">
              <h2>{c.client_name || 'غير معروف'}</h2>
              <span className="badge-role">{c.client_role || 'عميل'}</span>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">اسم الخصم</span>
                <span className="info-value">{c.opponent_name || 'غير محدد'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">المحكمة</span>
                <span className="info-value">{c.court_name || 'غير محدد'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">رقم القضية</span>
                <span className="info-value">{(c.case_number || '') + (c.case_year ? ' / ' + c.case_year : '') || 'غير محدد'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">الدائرة</span>
                <span className="info-value">{c.circuit || 'غير محدد'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">موضوع الدعوى</span>
                <span className="info-value">{c.case_subject || 'غير محدد'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">حالة القضية</span>
                <span className="info-value status">{lastSession ? lastSession.case_status : 'جديدة'}</span>
              </div>
            </div>

            <div className="last-session-box">
              <h5><i className="fas fa-clock"></i> آخر جلسة مسجلة</h5>
              <div className="date">{lastSession ? formatDate(lastSession.session_date) : 'لا توجد جلسات مسجلة'}</div>
              <div className="decision">{lastSession ? lastSession.decision || 'لم يسجل قرار' : ''}</div>
            </div>

            <div className="modal-actions">
              <button className="btn-action btn-print" onClick={() => window.print()}>
                <i className="fas fa-print" style={{ marginLeft: '0.4rem' }}></i> طباعة
              </button>
              <Link href="/client-inquiry" className="btn-action btn-new">
                <i className="fas fa-search" style={{ marginLeft: '0.4rem' }}></i> بحث جديد
              </Link>
              <button className="btn-action btn-exit" onClick={exitSystem}>
                <i className="fas fa-sign-out-alt" style={{ marginLeft: '0.4rem' }}></i> خروج
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .result-main {
          flex: 1;
          padding: 3rem 2rem 5rem;
          background: var(--warm-off-white);
        }
        .result-main .inner {
          max-width: 900px;
          margin: 0 auto;
        }

        .result-card {
          background: var(--pure-white);
          border-radius: 16px;
          padding: 2.5rem 2rem;
          border: 1px solid rgba(0, 0, 0, 0.04);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
          transition: all 0.4s var(--ease-out);
          position: relative;
          overflow: hidden;
        }
        .result-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 3px;
          background: var(--matte-gold);
          transition: width 0.6s var(--ease-out);
        }
        .result-card:hover::after {
          width: 100%;
        }
        .result-card:hover {
          border-color: var(--matte-gold);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
        }

        .result-header {
          text-align: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
          padding-bottom: 1.2rem;
          margin-bottom: 1.2rem;
        }
        .result-header h2 {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 900;
          color: var(--matte-gold);
          margin-bottom: 0.1rem;
        }
        .result-header .badge-role {
          background: var(--light-gray);
          color: rgba(34, 34, 34, 0.5);
          padding: 0.2rem 1rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 500;
          display: inline-block;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem;
          margin-bottom: 1.2rem;
        }
        .info-item {
          background: var(--light-gray);
          padding: 0.8rem 1rem;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.02);
          transition: all 0.3s ease;
        }
        .info-item:hover {
          border-color: var(--matte-gold);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(176, 141, 87, 0.04);
        }
        .info-item .info-label {
          display: block;
          font-size: 0.65rem;
          color: rgba(34, 34, 34, 0.3);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .info-item .info-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--charcoal);
          margin-top: 0.1rem;
          display: block;
          word-break: break-word;
        }
        .info-item .info-value.status {
          color: var(--matte-gold);
        }

        .last-session-box {
          background: rgba(176, 141, 87, 0.03);
          border-right: 3px solid var(--matte-gold);
          padding: 1rem 1.2rem;
          border-radius: 10px;
          margin-bottom: 1.2rem;
        }
        .last-session-box h5 {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 0.3rem;
        }
        .last-session-box h5 i {
          color: var(--matte-gold);
          margin-left: 0.4rem;
        }
        .last-session-box .date {
          color: var(--matte-gold);
          font-weight: 700;
          font-size: 0.95rem;
        }
        .last-session-box .decision {
          color: rgba(34, 34, 34, 0.5);
          font-weight: 300;
          font-size: 0.85rem;
          margin-top: 0.2rem;
        }

        .modal-actions {
          display: flex;
          gap: 0.8rem;
          justify-content: center;
          border-top: 1px solid rgba(0, 0, 0, 0.04);
          padding-top: 1.2rem;
          flex-wrap: wrap;
        }
        .modal-actions .btn-action {
          flex: 1;
          padding: 0.6rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.85rem;
          transition: all 0.4s var(--ease-out);
          border: 1px solid transparent;
          cursor: pointer;
          text-align: center;
          min-width: 120px;
          text-decoration: none;
          display: inline-block;
        }
        .btn-print {
          border-color: var(--matte-gold);
          color: var(--matte-gold);
          background: transparent;
        }
        .btn-print:hover {
          background: var(--matte-gold);
          color: #000;
        }
        .btn-new {
          background: var(--charcoal);
          color: #fff;
        }
        .btn-new:hover {
          background: #333;
        }
        .btn-exit {
          background: #dc2626;
          color: #fff;
        }
        .btn-exit:hover {
          background: #b91c1c;
        }

        .loading-container,
        .error-container {
          padding: 2rem 0;
          text-align: center;
        }
        .spinner {
          display: inline-block;
          width: 40px;
          height: 40px;
          border: 4px solid rgba(176, 141, 87, 0.15);
          border-radius: 50%;
          border-top-color: var(--matte-gold);
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .loading-container p {
          color: rgba(34, 34, 34, 0.5);
          margin-top: 1rem;
        }
        .error-container i {
          font-size: 3rem;
          color: #dc2626;
          margin-bottom: 0.5rem;
        }
        .error-container h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
          color: var(--charcoal);
        }
        .error-container p {
          color: rgba(34, 34, 34, 0.5);
          max-width: 480px;
          margin: 0 auto;
        }
        .error-actions {
          display: flex;
          gap: 0.8rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }

        .btn-gold {
          display: inline-block;
          background: var(--matte-gold);
          color: #000;
          font-weight: 700;
          padding: 12px 28px;
          border-radius: 8px;
          border: none;
          transition: all 0.4s var(--ease-out);
          text-align: center;
          font-size: 0.9rem;
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
          font-size: 0.9rem;
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
          .result-main { padding: 2rem 1rem 3rem; }
          .result-card { padding: 1.8rem 1.2rem; }
          .info-grid { grid-template-columns: 1fr; }
          .modal-actions { flex-direction: column; align-items: stretch; }
          .result-header h2 { font-size: 1.6rem; }
        }
        @media (max-width: 640px) {
          .result-main { padding: 1.5rem 1rem 2rem; }
          .result-card { padding: 1.2rem 0.8rem; }
          .result-header h2 { font-size: 1.4rem; }
          .info-item .info-value { font-size: 0.85rem; }
          .last-session-box { padding: 0.8rem 1rem; }
          .modal-actions .btn-action { font-size: 0.8rem; padding: 0.5rem 0.8rem; min-width: 80px; }
        }
        @media print {
          .site-header, .site-footer, .float-whatsapp, .float-main-btn, .float-sub-buttons, .modal-actions {
            display: none !important;
          }
          .result-card {
            box-shadow: none !important;
            border: 1px solid rgba(0, 0, 0, 0.04) !important;
            padding: 1.5rem !important;
          }
          .result-card::after { display: none !important; }
          .result-main { padding-top: 1.5rem !important; background: #fff !important; }
          .info-item { background: #f5f5f5 !important; border: 1px solid #eee !important; }
        }
      `}</style>
    </Layout>
  );
}
