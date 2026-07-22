import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>مؤسسة الأستاذ محمود عبد الحميد</h3>
          <p>للمحاماة والاستشارات القانونية</p>
          <div className="social">
            <a href="https://www.facebook.com/malegal" target="_blank" rel="noopener noreferrer" aria-label="فيسبوك">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://x.com/mahmoud_a_hamyd" target="_blank" rel="noopener noreferrer" aria-label="تويتر">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://t.me/mahmoud_a_hamyd" target="_blank" rel="noopener noreferrer" aria-label="تليجرام">
              <i className="fab fa-telegram-plane"></i>
            </a>
            <a href="https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374" target="_blank" rel="noopener noreferrer" aria-label="لينكد إن">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="mailto:ma.law.firm@outlook.com" aria-label="البريد الإلكتروني">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>روابط</h4>
          <Link href="/">الرئيسية</Link>
          <Link href="/about">عن المؤسسة</Link>
          <Link href="/specialties">التخصصات</Link>
          <Link href="/sectors">قطاعات نخدمها</Link>
          <Link href="/news-archive">الأخبار</Link>
          <Link href="/blog">المكتبة</Link>
          <Link href="/client-inquiry">تابع قضيتك</Link>
          <Link href="/contact">اتصل بنا</Link>
        </div>

        <div className="footer-col">
          <h4>خدمات</h4>
          <Link href="/contact?tab=consult">استشارة قانونية</Link>
          <Link href="/contact?tab=appointment">حجز موعد</Link>
          <Link href="/contact?tab=representation">تمثيل قانوني</Link>
          <Link href="/client-inquiry">متابعة قضية</Link>
        </div>

        <div className="footer-col">
          <h4>اتصال</h4>
          <a href="tel:+201101076000">
            <i className="fas fa-phone" style={{ marginLeft: '6px', opacity: 0.3 }}></i> +20 110 107 6000
          </a>
          <a href="mailto:ma.law.firm@outlook.com">
            <i className="fas fa-envelope" style={{ marginLeft: '6px', opacity: 0.3 }}></i> ma.law.firm@outlook.com
          </a>
          <a href="https://maps.app.goo.gl/inYTfr9Js78JwXqx5" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-map-marker-alt" style={{ marginLeft: '6px', opacity: 0.3 }}></i> الموقع الجغرافي
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>جميع الحقوق محفوظة © ٢٠٢٦ – مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية</p>
        <p>OSTAZ LAW – هوية مؤسسية فاخرة</p>
      </div>
    </footer>
  );
}
