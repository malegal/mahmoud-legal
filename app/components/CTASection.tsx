import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="cta-section" aria-label="دعوة للتواصل">
      <div className="section-inner reveal">
        <span className="eyebrow">● تواصل معنا</span>
        <h2>كيف تود أن نخدمك؟</h2>
        <p>فريقنا القانوني المتخصص ينتظرك. اختر ما يناسبك من الخيارات أدناه.</p>

        <div className="cta-actions">
          <Link href="/contact?tab=appointment" className="btn-gold">حجز موعد استشارة</Link>
          <Link href="/contact?tab=consult" className="btn-outline-gold">طلب استشارة قانونية</Link>
          <Link href="/contact?tab=representation" className="btn-outline-navy">طلب تمثيل قانوني</Link>
        </div>
      </div>
    </section>
  );
}
