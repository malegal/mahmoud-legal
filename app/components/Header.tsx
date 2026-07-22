'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/about', label: 'عن المؤسسة' },
    { href: '/specialties', label: 'التخصصات' },
    { href: '/sectors', label: 'قطاعات نخدمها' },
    { href: '/news-archive', label: 'الأخبار' },
    { href: '/blog', label: 'المكتبة' },
    { href: '/client-inquiry', label: 'تابع قضيتك' },
    { href: '/contact', label: 'اتصل بنا' },
  ];

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="siteHeader">
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
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? 'active' : ''}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <button className="menu-toggle" onClick={toggleMenu} aria-label="فتح القائمة">
          <i className="fas fa-bars-staggered"></i>
        </button>
      </div>

      {/* القائمة المتنقلة */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        <button className="mobile-menu-close" onClick={closeMenu} aria-label="إغلاق القائمة">
          <i className="fas fa-times"></i>
        </button>
        <nav>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
