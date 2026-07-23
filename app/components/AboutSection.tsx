import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="section section-light" aria-label="عن المؤسسة">
      <div className="section-inner">
        <div className="about-why-grid">
          <div className="about-image reveal">
            <div className="frame">
              <Image
                src="/images/mahmoud-abdel-hamid-lawyer-portrait.webp"
                alt="الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا"
                width={600}
                height={800}
                priority
                className="auto-colorize"
              />
            </div>
            <div className="badge">خبرة قانونية منذ 2005</div>
          </div>

          <div className="about-content reveal" style={{ transitionDelay: '0.15s' }}>
            <span className="eyebrow">● المؤسس</span>
            <h2>
              خبرة قانونية تُرسخ الثقة،<br />
              <span className="gold-text">وحلولٌ تحمي المصالح والاستثمارات</span>
            </h2>
            <p>
              نؤمن بأن العمل القانوني المتميز يبدأ بفهمٍ عميق للوقائع، وصياغة استراتيجية قانونية دقيقة، ثم تقديم تمثيل قانوني مهني ونزيه يهدف إلى حماية الحقوق والمصالح وتحقيق أفضل النتائج الممكنة. ونؤمن كذلك بأن الثقة لا تُبني باستعراض ملفات العملاء و اعلان نتائج قضاياهم بل تُبنى على الكفاءة والالتزام، وعلي ما نقدمه للعملاء لا ما نعلنه عنهم ؛ لذلك نلتزم بعدم الإفصاح عن أسماء عملائنا أو أرقام قضاياهم أو تفاصيلها أو استخدامها في اغراض تسويقية احترامًا لواجب السرية المهنية وآداب مهنة المحاماة، ونحرص بدلاً من ذلك على أن نقدم ما يمكن التحقق منه من خبراتنا ومؤهلاتنا ومحتوانا العلمي، بما يعكس قيمنا المهنية دون الإخلال بحقوق عملائنا أو التزاماتنا القانونية
            </p>
            <p>
              تأسست مؤسسة الأستاذ محمود عبد الحميد للمحاماة عام <strong>2005</strong> واكتسبت منذ ذلك الحين خبرة عملية متراكمة تقوم علي :
            </p>

            <div className="about-why-points">
              <span className="point">
                <i className="fas fa-check-circle"></i> خبرة متراكمة في مختلف مجالات الممارسة القانونية و تمثيل العملاء أمام جميع درجات التقاضي وصولا الي محكمتي النقض و الدستورية العليا
              </span>
              <span className="point">
                <i className="fas fa-check-circle"></i> قدرة علي تقديم حلول قانونية متخصصة للشركات والمستثمرين
              </span>
              <span className="point">
                <i className="fas fa-check-circle"></i> قدرة علي التعامل مع جميع الملفات و العملاء بسرية تامة وشفافية كاملة
              </span>
              <span className="point">
                <i className="fas fa-check-circle"></i> استراتيجيات قانونية مبنية علي التحليل و ادارة المخاطر
              </span>
              <span className="point">
                <i className="fas fa-check-circle"></i> قدرة علمية و خبرة عملية علي حماية مصالح العملاء
              </span>
              <span className="point">
                <i className="fas fa-check-circle"></i> فهم عميق لاحتياجات العملاء
              </span>
            </div>

            <div className="signature">
              <div>
                <div className="name">الأستاذ محمود عبد الحميد</div>
                <div className="title">المؤسس – المحامي بالنقض والدستورية العليا</div>
              </div>
              <Link href="/about" className="btn-outline-gold" style={{ padding: '8px 24px', fontSize: '0.75rem' }}>
                تعرف على المؤسسة
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
