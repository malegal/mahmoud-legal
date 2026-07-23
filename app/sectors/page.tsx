import Link from 'next/link';

export const metadata = {
  title: 'القطاعات التي نخدمها',
  description:
    'نقدم خدمات قانونية متخصصة للشركات، المستثمرين، المطورين العقاريين، الجمعيات الأهلية، الأفراد، والورثة. فهم عميق لطبيعة كل قطاع.',
};

export default function SectorsPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero-sectors" aria-label="القطاعات التي نخدمها">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>

        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">Industries We Serve</span>
            <h1>
              القطاعات <span className="gold-text">التي نخدمها</span>
            </h1>
            <p className="sub">
              لكل قطاع تحدياته القانونية الخاصة، ولذلك نعتمد على فهم طبيعة النشاط والبيئة القانونية المحيطة به قبل تقديم الاستشارة أو بناء الاستراتيجية القانونية، بما يضمن حلولاً أكثر دقة وفاعلية.
            </p>
          </div>
          <div className="hero-cta reveal" style={{ transitionDelay: '0.15s' }}>
            <Link href="/contact?tab=consult" className="btn-gold">
              اطلب استشارة متخصصة <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== INTRODUCTION ===== */}
      <section className="section section-light" aria-label="مقدمة">
        <div className="section-inner">
          <div className="intro-text reveal">
            <p>
              لا يمكن أن تكون الاستشارة القانونية واحدة لجميع العملاء، فلكل قطاع خصوصيته التشغيلية، ولكل نشاط بيئته القانونية التي تختلف عن غيره.
            </p>
            <p style={{ marginTop: '0.8rem' }}>
              ولذلك يبدأ نهجنا بفهم عميق لطبيعة عملك، وقطاعك، وتحدياتك، قبل أن نبدأ في صياغة الحلول القانونية. هذا الفهم هو ما يضمن أن تكون استراتيجيتنا القانونية دقيقة، واقعية، وفاعلة.
            </p>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES GRID ===== */}
      <section className="section section-gray" aria-label="القطاعات">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● قطاعاتنا</span>
            <h2>نفهم خصوصية كل قطاع</h2>
            <p>نقدم حلولاً قانونية تتناسب مع طبيعة كل نشاط، وتلبي احتياجات كل عميل.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            {/* 1. الشركات التجارية */}
            <div className="industry-card gold-underline-card reveal reveal-d1" id="sector-companies">
              <div className="icon-wrap"><i className="fas fa-building"></i></div>
              <h3>الشركات التجارية</h3>
              <p className="desc">
                نقدم الدعم القانوني الشامل للشركات في مختلف مراحل دورة حياتها – من التأسيس إلى التوسع، إعادة الهيكلة، الاندماجات، الاستحواذ، والتصفية – مع ضمان الامتثال القانوني وحماية مصالح العملاء.
              </p>
              <ul className="services-list">
                <li>تأسيس الشركات</li>
                <li>اختيار الكيان القانوني</li>
                <li>النظام الأساسي</li>
                <li>عقد التأسيس</li>
                <li>حوكمة الشركات</li>
                <li>قرارات مجالس الإدارة</li>
                <li>اتفاقيات المساهمين</li>
                <li>زيادة وخفض رأس المال</li>
                <li>إعادة الهيكلة</li>
                <li>الاندماجات</li>
                <li>الاستحواذ</li>
                <li>تصفية الشركات</li>
                <li>العقود التجارية</li>
                <li>الامتثال القانوني</li>
                <li>المنازعات التجارية</li>
                <li>الاستشارات المستمرة</li>
              </ul>
              <Link href="/contact?tab=consult&sector=الشركات%20التجارية" className="btn-sm">اطلب استشارة</Link>
            </div>

            {/* 2. الجمعيات والمؤسسات الأهلية */}
            <div className="industry-card gold-underline-card reveal reveal-d2" id="sector-ngos">
              <div className="icon-wrap"><i className="fas fa-hand-holding-heart"></i></div>
              <h3>الجمعيات والمؤسسات الأهلية</h3>
              <p className="desc">
                نقدم الإرشاد القانوني للجمعيات والمؤسسات الأهلية لضمان الامتثال للوائح المصرية، ودعم الحوكمة المؤسسية المستدامة، وحماية أهدافها المجتمعية.
              </p>
              <ul className="services-list">
                <li>التأسيس</li>
                <li>التسجيل</li>
                <li>النظام الأساسي</li>
                <li>اللوائح الداخلية</li>
                <li>إعادة هيكلة مجلس الإدارة</li>
                <li>الامتثال</li>
                <li>الرأي القانوني</li>
                <li>العقود</li>
                <li>المنازعات الإدارية</li>
                <li>إجراءات التصفية</li>
              </ul>
              <Link href="/contact?tab=consult&sector=الجمعيات%20الأهلية" className="btn-sm">اطلب استشارة</Link>
            </div>

            {/* 3. المستثمرون */}
            <div className="industry-card gold-underline-card reveal reveal-d3" id="sector-investors">
              <div className="icon-wrap"><i className="fas fa-chart-line"></i></div>
              <h3>المستثمرون</h3>
              <p className="desc">
                ندعم المستثمرين من خلال العناية القانونية الواجبة، مراجعة العقود، هيكلة الاستثمارات، تقييم المخاطر، منع النزاعات، والحماية القانونية للاستثمارات.
              </p>
              <ul className="services-list">
                <li>الاستشارات الاستثمارية</li>
                <li>العناية القانونية الواجبة</li>
                <li>مراجعة العقود</li>
                <li>المشاريع المشتركة</li>
                <li>تحليل المخاطر</li>
                <li>المنازعات الاستثمارية</li>
              </ul>
              <Link href="/contact?tab=consult&sector=المستثمرون" className="btn-sm">اطلب استشارة</Link>
            </div>

            {/* 4. المطورون العقاريون */}
            <div className="industry-card gold-underline-card reveal reveal-d1" id="sector-developers">
              <div className="icon-wrap"><i className="fas fa-city"></i></div>
              <h3>المطورون العقاريون</h3>
              <p className="desc">
                نقدم خدمات قانونية متخصصة طوال دورة حياة مشاريع التطوير العقاري – من مراجعة الأراضي إلى تسوية المنازعات – لضمان سير العمل بسلاسة وحماية استثماراتك.
              </p>
              <ul className="services-list">
                <li>اتفاقيات التطوير</li>
                <li>عقود البيع</li>
                <li>المراجعة القانونية للأراضي</li>
                <li>التحقق من الملكية</li>
                <li>منازعات المشاريع</li>
                <li>إدارة العقود</li>
              </ul>
              <Link href="/contact?tab=consult&sector=المطورون%20العقاريون" className="btn-sm">اطلب استشارة</Link>
            </div>

            {/* 5. المقاولون */}
            <div className="industry-card gold-underline-card reveal reveal-d2" id="sector-contractors">
              <div className="icon-wrap"><i className="fas fa-hard-hat"></i></div>
              <h3>المقاولون</h3>
              <p className="desc">
                ندعم المقاولين في صياغة العقود، إدارة المطالبات، منازعات المشاريع، استرداد المدفوعات، وتخفيف المخاطر القانونية.
              </p>
              <ul className="services-list">
                <li>صياغة العقود</li>
                <li>المطالبات المالية</li>
                <li>منازعات المشاريع</li>
                <li>استرداد المدفوعات</li>
                <li>تخفيف المخاطر</li>
                <li>الاستشارات المستمرة</li>
              </ul>
              <Link href="/contact?tab=consult&sector=المقاولون" className="btn-sm">اطلب استشارة</Link>
            </div>

            {/* 6. الأفراد */}
            <div className="industry-card gold-underline-card reveal reveal-d3" id="sector-individuals">
              <div className="icon-wrap"><i className="fas fa-user"></i></div>
              <h3>الأفراد</h3>
              <p className="desc">
                نمثل الأفراد في القضايا المدنية ونقدم استشارات قانونية مخصصة تلبي احتياجاتهم الشخصية باحترافية، سرية، وتخطيط استراتيجي.
              </p>
              <ul className="services-list">
                <li>القضايا المدنية</li>
                <li>مطالبات التعويض</li>
                <li>منازعات العقود</li>
                <li>منازعات الملكية</li>
                <li>استرداد الديون</li>
                <li>التنفيذ المدني</li>
                <li>الاستشارات القانونية</li>
                <li>صياغة العقود</li>
                <li>تسوية المنازعات</li>
              </ul>
              <Link href="/contact?tab=consult&sector=الأفراد" className="btn-sm">اطلب استشارة</Link>
            </div>

            {/* 7. الشركاء */}
            <div className="industry-card gold-underline-card reveal reveal-d1" id="sector-partners">
              <div className="icon-wrap"><i className="fas fa-handshake"></i></div>
              <h3>الشركاء</h3>
              <p className="desc">
                نقدم حلولاً قانونية للنزاعات التي تنشأ بين الشركاء قبل وبعد التأسيس، مع التركيز على حماية الاستثمارات والحفاظ على استمرارية الأعمال كلما أمكن.
              </p>
              <ul className="services-list">
                <li>اتفاقيات الشراكة</li>
                <li>منازعات المساهمين</li>
                <li>انسحاب الشريك</li>
                <li>طرد الشركاء</li>
                <li>منازعات توزيع الأرباح</li>
                <li>منازعات إدارة الشركة</li>
                <li>حل الشراكة</li>
                <li>التصفية القضائية</li>
                <li>الوساطة والتسوية</li>
                <li>المنازعات التجارية</li>
              </ul>
              <Link href="/contact?tab=consult&sector=الشركاء" className="btn-sm">اطلب استشارة</Link>
            </div>

            {/* 8. الورثة */}
            <div className="industry-card gold-underline-card reveal reveal-d2" id="sector-heirs">
              <div className="icon-wrap"><i className="fas fa-tree"></i></div>
              <h3>الورثة</h3>
              <p className="desc">
                نقدم تمثيلاً قانونياً في قضايا الإرث مع حماية حقوق الأسرة وتقليل النزاعات من خلال إجراءات قانونية دقيقة ومنهجية.
              </p>
              <ul className="services-list">
                <li>تقسيم التركة</li>
                <li>إدارة التركة</li>
                <li>منازعات الميراث</li>
                <li>إجراءات الإثبات</li>
                <li>اتفاقيات التسوية</li>
                <li>نقل ملكية العقارات</li>
                <li>المنازعات المدنية</li>
                <li>تنفيذ أحكام الميراث</li>
              </ul>
              <Link href="/contact?tab=consult&sector=الورثة" className="btn-sm">اطلب استشارة</Link>
            </div>

            {/* 9. قضايا التعويضات */}
            <div className="industry-card gold-underline-card reveal reveal-d3" id="sector-compensation">
              <div className="icon-wrap"><i className="fas fa-hand-holding-usd"></i></div>
              <h3>قضايا التعويضات</h3>
              <p className="desc">
                نمثل العملاء الذين يطالبون بتعويضات مادية وأدبية ناتجة عن مسؤولية تعاقدية أو تقصيرية، مع العمل على تحقيق أفضل النتائج الممكنة.
              </p>
              <ul className="services-list">
                <li>إصابات شخصية</li>
                <li>الأخطاء الطبية</li>
                <li>حوادث المرور</li>
                <li>الأضرار التعاقدية</li>
                <li>المسؤولية التقصيرية</li>
                <li>منازعات التأمين</li>
                <li>الأضرار المالية</li>
                <li>التقاضي</li>
                <li>التسوية الودية</li>
                <li>تنفيذ الأحكام</li>
              </ul>
              <Link href="/contact?tab=consult&sector=قضايا%20التعويضات" className="btn-sm">اطلب استشارة</Link>
            </div>

            {/* 10. العمال وأصحاب الأعمال */}
            <div className="industry-card gold-underline-card reveal reveal-d1" id="sector-labor">
              <div className="icon-wrap"><i className="fas fa-briefcase"></i></div>
              <h3>العمال وأصحاب الأعمال</h3>
              <p className="desc">
                نقدم تمثيلاً قانونياً متوازناً لكل من أصحاب العمل والعمال في العلاقات العمالية، مع ضمان الامتثال للتشريعات العمالية وحماية الحقوق التعاقدية.
              </p>
              <ul className="services-list">
                <li>عقود العمل</li>
                <li>الفصل التعسفي</li>
                <li>مكافآت نهاية الخدمة</li>
                <li>منازعات الأجور</li>
                <li>الإجراءات التأديبية</li>
                <li>اللوائح الداخلية</li>
                <li>المنازعات العمالية</li>
                <li>التسوية الودية</li>
                <li>الامتثال القانوني</li>
                <li>الاستشارات العمالية</li>
              </ul>
              <Link href="/contact?tab=consult&sector=العمال%20وأصحاب%20الأعمال" className="btn-sm">اطلب استشارة</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== APPROACH ===== */}
      <section className="section section-light" aria-label="منهج العمل">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● منهج العمل</span>
            <h2>نهجنا في التعامل مع كل قطاع</h2>
            <p>خمس مراحل تضمن فهماً عميقاً وحلولاً قانونية دقيقة.</p>
          </div>

          <div className="approach-timeline">
            <div className="approach-step reveal reveal-d1">
              <span className="num">01</span>
              <h4>نفهم</h4>
              <p>ندرس طبيعة نشاطك وقطاعك وتحدياتك القانونية.</p>
            </div>
            <div className="approach-step reveal reveal-d2">
              <span className="num">02</span>
              <h4>نحلل</h4>
              <p>نقيم المخاطر والفرص والمراكز القانونية بدقة.</p>
            </div>
            <div className="approach-step reveal reveal-d3">
              <span className="num">03</span>
              <h4>نخطط</h4>
              <p>نضع استراتيجية قانونية تتناسب مع أهدافك.</p>
            </div>
            <div className="approach-step reveal reveal-d1">
              <span className="num">04</span>
              <h4>نمثل</h4>
              <p>ننفذ الخطة باحترافية ونتابع الإجراءات بدقة.</p>
            </div>
            <div className="approach-step reveal reveal-d2">
              <span className="num">05</span>
              <h4>نواصل</h4>
              <p>نبقى على تواصل ونساندك حتى تحقيق النتيجة.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="section section-gray" aria-label="لماذا يثق بنا عملاؤنا">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● لماذا نثق بنا</span>
            <h2>لماذا يختار عملاؤنا مؤسستنا؟</h2>
            <p>مزايا تجعلنا الشريك القانوني الموثوق في مختلف القطاعات.</p>
          </div>

          <div className="why-grid">
            <div className="why-card gold-underline-card reveal reveal-d1">
              <span className="icon"><i className="fas fa-industry"></i></span>
              <h4>فهم متخصص لكل قطاع</h4>
              <p>نفهم خصوصية كل نشاط قبل تقديم أي حل قانوني.</p>
            </div>
            <div className="why-card gold-underline-card reveal reveal-d2">
              <span className="icon"><i className="fas fa-chess"></i></span>
              <h4>تخطيط استراتيجي</h4>
              <p>نضع خططاً قانونية مدروسة تسبق أي إجراء.</p>
            </div>
            <div className="why-card gold-underline-card reveal reveal-d3">
              <span className="icon"><i className="fas fa-scroll"></i></span>
              <h4>حلول قانونية مخصصة</h4>
              <p>نصمم حلولاً تتناسب مع احتياجات كل عميل وحالته.</p>
            </div>
            <div className="why-card gold-underline-card reveal reveal-d1">
              <span className="icon"><i className="fas fa-comments"></i></span>
              <h4>تواصل شفاف</h4>
              <p>نبقيك على اطلاع بكل تطور في قضيتك.</p>
            </div>
            <div className="why-card gold-underline-card reveal reveal-d2">
              <span className="icon"><i className="fas fa-gavel"></i></span>
              <h4>تمثيل احترافي</h4>
              <p>نمثل عملاءنا بأعلى معايير المهنة والالتزام.</p>
            </div>
            <div className="why-card gold-underline-card reveal reveal-d3">
              <span className="icon"><i className="fas fa-handshake"></i></span>
              <h4>شراكة قانونية طويلة الأمد</h4>
              <p>نبني علاقات مستدامة تقوم على الثقة والجودة.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="cta-final" aria-label="دعوة للتواصل">
        <div className="section-inner reveal">
          <h2>هل تحتاج إلى استشارة قانونية تتناسب مع طبيعة نشاطك؟</h2>
          <p>
            ندرس طبيعة نشاطك أولاً، ثم نبني الحل القانوني المناسب لاحتياجاتك، سواء كنت فرداً، شركة، مستثمراً، أو تمثل جهة مؤسسية.
          </p>
          <div className="cta-actions">
            <Link href="/contact?tab=consult" className="btn-gold">طلب استشارة</Link>
            <a href="https://wa.me/201101076000" target="_blank" rel="noopener noreferrer" className="btn-outline-white">تواصل عبر واتساب</a>
          </div>
        </div>
      </section>
    </>
  );
}
