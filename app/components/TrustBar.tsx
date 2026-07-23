export default function TrustBar() {
  return (
    <section className="trust-bar" aria-label="شريط الثقة">
      <div className="trust-bar-inner">
        <div className="trust-item">
          <i className="fas fa-gavel"></i>
          <span>محامون بالنقض والدستورية العليا</span>
        </div>
        <div className="trust-item">
          <i className="fas fa-briefcase"></i>
          <span>حلول قانونية للشركات والأفراد</span>
        </div>
        <div className="trust-item">
          <i className="fas fa-scale-balanced"></i>
          <span>تمثيل واستشارات في مختلف مراحل التقاضي</span>
        </div>
      </div>
    </section>
  );
}
