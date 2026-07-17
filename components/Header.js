import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('siteHeader');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <>
    <header className="site-header" id="siteHeader">
    <div className="header-brand">
    <Link href="/" className="brand-wordmark">
    <span className="brand-primary">OSTAZ</span>
    <span className="brand-secondary">LAW FIRM</span>
    </Link>
    <div className="header-brand-text">
    <span className="name">محمود عبد الحميد</span>
    <span className="sub">المحامي بالنقض والدستورية العليا</span>
    </div>
    </div>
    <nav className="header-nav">
    <Link href="/">الرئيسية</Link>
    <Link href="/about">عن المؤسسة</Link>
    <Link href="/specialties">التخصصات</Link>
    <Link href="/sectors">قطاعات نخدمها</Link>
    <Link href="/news-archive">الأخبار</Link>
    <Link href="/blog">المكتبة</Link>
    <Link href="/client-inquiry">تابع قضيتك</Link>
    <Link href="/contact">اتصل بنا</Link>
    </nav>
    <div className="header-actions">
    <button className="menu-toggle" onClick={toggleMenu} aria-label="فتح القائمة">
    <i className="fas fa-bars-staggered"></i>
    </button>
    </div>
    </header>

    <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
    <button className="mobile-menu-close" onClick={closeMenu} aria-label="إغلاق القائمة">
    <i className="fas fa-times"></i>
    </button>
    <nav>
    <Link href="/" onClick={closeMenu}>الرئيسية</Link>
    <Link href="/about" onClick={closeMenu}>عن المؤسسة</Link>
    <Link href="/specialties" onClick={closeMenu}>التخصصات</Link>
    <Link href="/sectors" onClick={closeMenu}>قطاعات نخدمها</Link>
    <Link href="/news-archive" onClick={closeMenu}>الأخبار</Link>
    <Link href="/blog" onClick={closeMenu}>المكتبة</Link>
    <Link href="/client-inquiry" onClick={closeMenu}>تابع قضيتك</Link>
    <Link href="/contact" onClick={closeMenu}>اتصل بنا</Link>
    </nav>
    </div>
    </>
  );
}
