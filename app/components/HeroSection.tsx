import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero" aria-label="الصفحة الرئيسية">
      <div className="hero-bg">
        <div className="glow"></div>
        <div className="glow-2"></div>
      </div>

      <div className="hero-content">
        <div className="hero-brand-signature">OSTAZ LAW</div>
        <h1 className="hero-title">مؤسسة الأستاذ محمود عبد الحميد</h1>
        <p className="hero-subtitle">للمحاماة والاستشارات القانونية</p>
        <p className="hero-value">
          نقدم تمثيلًا قضائيًا واستشارات قانونية للشركات والأفراد، مستندين إلى خبرة راسخة أمام محكمة النقض والمحكمة الدستورية العليا، لحماية الحقوق والمصالح والاستثمارات.
        </p>

        <div className="hero-actions">
          <Link href="/contact?tab=consult" className="hero-action-item gold-underline">
            <span className="icon-wrap">
              <i className="fas fa-file-signature"></i>
            </span>
            <span className="label">استشارة قانونية</span>
          </Link>
          <Link href="/contact?tab=appointment" className="hero-action-item gold-underline">
            <span className="icon-wrap">
              <i className="fas fa-calendar-check"></i>
            </span>
            <span className="label">حجز موعد</span>
          </Link>
          <Link href="/contact?tab=representation" className="hero-action-item gold-underline">
            <span className="icon-wrap">
              <i className="fas fa-gavel"></i>
            </span>
            <span className="label">تمثيل قضائي</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
