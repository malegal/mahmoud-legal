'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import type { CaseData } from '@/app/types';

export default function ClientInquiryResultPage() {
  const [data, setData] = useState<CaseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('caseData');
      if (!stored) {
        setError('لا توجد بيانات في الجلسة');
        setLoading(false);
        return;
      }

      const parsed: CaseData = JSON.parse(stored);
      const now = Date.now();
      const maxAge = 5 * 60 * 1000; // 5 دقائق
      const timestamp = parsed._timestamp || now - maxAge - 1;

      if (now - timestamp > maxAge) {
        setError('انتهت صلاحية البيانات');
        setLoading(false);
        return;
      }

      setData(parsed);
      setLoading(false);
    } catch (err) {
      setError('بيانات غير صالحة');
      setLoading(false);
    }
  }, []);

  const exitSystem = () => {
    Swal.fire({
      icon: 'success',
      title: 'شكراً لك',
      text: 'شكراً لاستخدامكم نظام الاستعلام الإلكتروني لمؤسسة الأستاذ محمود عبد الحميد.',
      background: '#FAFAF8',
      color: '#222222',
      confirmButtonColor: '#B08D57',
      confirmButtonText: 'إغلاق',
      timer: 3000,
    }).then(() => {
      sessionStorage.removeItem('caseData');
      window.location.href = '/';
    });
  };

  if (loading) {
    return (
      <div className="result-main">
        <div className="inner reveal">
          <div className="result-card">
            <div className="loading-container">
              <div className="spinner" role="status" aria-label="جاري التحميل"></div>
              <p>جاري عرض بيانات القضية...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="result-main">
        <div className="inner reveal">
          <div className="result-card">
            <div className="error-container">
              <i className="fas fa-exclamation-triangle"></i>
              <h3>عذراً</h3>
              <p>
                {error === 'انتهت صلاحية البيانات'
                  ? 'انتهت صلاحية بيانات الاستعلام. يرجى إعادة البحث للحصول على أحدث البيانات.'
                  : 'حدث خطأ أثناء عرض البيانات. يرجى المحاولة مرة أخرى أو الاتصال بالدعم الفني.'}
              </p>
              <div className="error-actions">
                <a href="/client-inquiry" className="btn-gold" style={{ padding: '10px 28px', fontSize: '0.9rem' }}>
                  العودة للاستعلام
                </a>
                <button onClick={() => window.location.reload()} className="btn-outline-gold" style={{ padding: '10px 28px', fontSize: '0.9rem' }}>
                  إعادة المحاولة
                </button>
              </div>
              <p style={{ marginTop: '1.2rem', fontSize: '0.8rem', color: 'rgba(34,34,34,0.3)' }}>
                للدعم الفني: <a href="tel:+201101076000" style={{ color: 'var(--matte-gold)' }}>+20 110 107 6000</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { case: c, sessions } = data;
  const lastSession = sessions && sessions.length > 0 ? sessions[0] : null;

  return (
    <div className="result-main">
      <div className="inner reveal">
        <div className="result-card">
          {/* ===== رأس البطاقة ===== */}
          <div className="result-header">
            <h2>{c.client_name}</h2>
            <span className="badge-role">{c.client_role || 'عميل'}</span>
          </div>

          {/* ===== شبكة المعلومات ===== */}
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
              <span className="info-value">
                {c.case_number || ''} {c.case_year ? `/ ${c.case_year}` : ''}
              </span>
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
              <span className="info-value status">{lastSession?.case_status || 'جديدة'}</span>
            </div>
          </div>

          {/* ===== آخر جلسة ===== */}
          <div className="last-session-box">
            <h5>
              <i className="fas fa-clock"></i> آخر جلسة مسجلة
            </h5>
            <div className="date">
              {lastSession?.session_date
                ? new Date(lastSession.session_date).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                : 'لا توجد جلسات مسجلة'}
            </div>
            <div className="decision">{lastSession?.decision || ''}</div>
          </div>

          {/* ===== أزرار الإجراءات ===== */}
          <div className="modal-actions">
            <button className="btn-action btn-print" onClick={() => window.print()}>
              <i className="fas fa-print" style={{ marginLeft: '0.4rem' }}></i> طباعة
            </button>
            <a href="/client-inquiry" className="btn-action btn-new">
              <i className="fas fa-search" style={{ marginLeft: '0.4rem' }}></i> بحث جديد
            </a>
            <button className="btn-action btn-exit" onClick={exitSystem}>
              <i className="fas fa-sign-out-alt" style={{ marginLeft: '0.4rem' }}></i> خروج
            </button>
          </div>
        </div>
      </div>

      {/* ===== أنماط إضافية مدمجة لهذه الصفحة ===== */}
      <style>{`
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
          border: 1px solid rgba(0,0,0,0.04);
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
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
          box-shadow: 0 8px 30px rgba(0,0,0,0.04);
        }

        .result-header {
          text-align: center;
          border-bottom: 1px solid rgba(0,0,0,0.04);
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
          color: rgba(34,34,34,0.5);
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
          border: 1px solid rgba(0,0,0,0.02);
          transition: all 0.3s ease;
        }
        .info-item:hover {
          border-color: var(--matte-gold);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(176,141,87,0.04);
        }
        .info-item .info-label {
          display: block;
          font-size: 0.65rem;
          color: rgba(34,34,34,0.3);
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
          background: rgba(176,141,87,0.03);
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
          color: rgba(34,34,34,0.5);
          font-weight: 300;
          font-size: 0.85rem;
          margin-top: 0.2rem;
        }

        .modal-actions {
          display: flex;
          gap: 0.8rem;
          justify-content: center;
          border-top: 1px solid rgba(0,0,0,0.04);
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

        .loading-container, .error-container {
          padding: 2rem 0;
          text-align: center;
        }
        .spinner {
          display: inline-block;
          width: 40px;
          height: 40px;
          border: 4px solid rgba(176,141,87,0.15);
          border-radius: 50%;
          border-top-color: var(--matte-gold);
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .loading-container p {
          color: rgba(34,34,34,0.5);
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
          color: rgba(34,34,34,0.5);
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

        @media (max-width: 820px) {
          .result-main { padding: 2rem 1rem 3rem; }
          .result-card { padding: 1.8rem 1.2rem; }
          .info-grid { grid-template-columns: 1fr; }
          .modal-actions { flex-direction: column; align-items: stretch; }
          .result-header h2 { font-size: 1.6rem; }
        }
        @media (max-width: 640px) {
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
            border: 1px solid rgba(0,0,0,0.04) !important;
            padding: 1.5rem !important;
          }
          .result-card::after { display: none !important; }
          .result-main { padding-top: 1.5rem !important; background: #fff !important; }
          .info-item { background: #f5f5f5 !important; border: 1px solid #eee !important; }
        }
      `}</style>
    </div>
  );
}
