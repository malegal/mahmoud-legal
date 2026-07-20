import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FloatingButtons() {
  const [subOpen, setSubOpen] = useState(false);

  const toggleSub = () => setSubOpen(!subOpen);
  const closeSub = () => setSubOpen(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && subOpen) closeSub();
    };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
  }, [subOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.float-main-btn') && !e.target.closest('.float-sub-buttons')) {
        if (subOpen) closeSub();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [subOpen]);

  return (
    <>
    <a href="https://wa.me/201101076000" target="_blank" rel="noopener noreferrer" className="float-whatsapp" aria-label="تواصل عبر واتساب">
    <i className="fab fa-whatsapp"></i>
    </a>
    <button className={`float-main-btn ${subOpen ? 'active' : ''}`} onClick={toggleSub} aria-label="خيارات التواصل">
    <i className="fas fa-plus"></i>
    </button>
    <div className={`float-sub-buttons ${subOpen ? 'open' : ''}`}>
    <a href="tel:+201101076000" className="float-sub-btn phone" title="اتصال هاتفي">
    <i className="fas fa-phone-alt"></i>
    <span className="label">اتصال</span>
    </a>
    <Link href="/contact?tab=consult" className="float-sub-btn consult" title="طلب استشارة">
    <i className="fas fa-file-signature"></i>
    <span className="label">استشارة</span>
    </Link>
    <Link href="/contact?tab=appointment" className="float-sub-btn appointment" title="حجز موعد">
    <i className="fas fa-calendar-check"></i>
    <span className="label">حجز موعد</span>
    </Link>
    </div>
    </>
  );
}
