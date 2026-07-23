import Link from 'next/link';

export const metadata = {
  title: 'التخصصات القانونية',
  description:
    'خبرة قانونية منذ 2005 في المنازعات المدنية، التجارية، العمالية، الإدارية، قضايا الأسرة، الدفاع الجنائي، والطعن الدستوري، والنقض، والطعون الإدارية.',
};

export default function SpecialtiesPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero-specialties" aria-label="التخصصات القانونية">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>

        <div className="hero-inner">
          <div className="hero-title-wrap reveal">
            <span className="en-tag">Our Legal Specialties</span>
            <h1>
              التخصصات <span className="gold-text">القانونية</span>
            </h1>
            <p className="sub">
              خبرة قانونية تمتد منذ 2005 في حل المنازعات المدنية والتجارية والعمالية والإدارية، وقضايا الأسرة، والدفاع الجنائي، والطعن الدستوري، والنقض، والطعون الإدارية العليا.
            </p>
          </div>

          <div className="hero-badges">
            <span className="hero-badge">المنازعات المدنية</span>
            <span className="hero-badge">المنازعات التجارية</span>
            <span className="hero-badge">قضايا الأسرة</span>
            <span className="hero-badge">الدفاع الجنائي</span>
            <span className="hero-badge">المنازعات الإدارية</span>
            <span className="hero-badge">الطعن الدستوري</span>
            <span className="hero-badge">الطعن بالنقض</span>
            <span className="hero-badge">الطعون الإدارية العليا</span>
            <span className="hero-badge">المنازعات العمالية</span>
          </div>

          <div className="hero-cta">
            <Link href="/contact?tab=consult" className="btn-gold">
              احصل على استشارة فورية <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SPECIALTIES LIST ===== */}
      <section className="section section-gray" aria-label="التخصصات">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● تخصصاتنا</span>
            <h2>مجالات الممارسة القانونية</h2>
            <p>اختر تخصصك لتعرف المزيد عن الخدمات التي نقدمها.</p>
          </div>

          {/* 1. المنازعات المدنية */}
          <div className="specialty-card-wrap gold-underline-card reveal reveal-d1" data-specialty="civil">
            <div className="specialty-card-header">
              <div className="icon-wrap"><i className="fas fa-gavel"></i></div>
              <div className="info">
                <h3>المنازعات المدنية</h3>
                <p>حلول قانونية للنزاعات المالية والعقارية</p>
              </div>
              <span className="toggle-icon"><i className="fas fa-chevron-down"></i></span>
            </div>
            <div className="specialty-details">
              <p className="desc">نحن نتفهم أن المنازعات المدنية قد تستنزف وقتك وجهدك ومالك. لهذا نضع خبرتنا التي تمتد منذ 2005 بين يديك، لنقدم دفاعاً قانونياً قوياً وحلولاً مبتكرة.</p>
              <div className="detail-grid">
                <div className="detail-col">
                  <h5><i className="fas fa-list-ul" style={{ marginLeft: '6px' }}></i> الخدمات التي نقدمها</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> دعاوى التعويض بجميع أنواعها</li>
                    <li><i className="fas fa-circle"></i> نزاعات الملكية العقارية والأراضي</li>
                    <li><i className="fas fa-circle"></i> دعاوى صحة ونفاذ العقود</li>
                    <li><i className="fas fa-circle"></i> دعاوى الطرد والإيجارات</li>
                    <li><i className="fas fa-circle"></i> المطالبات المالية والمديونيات</li>
                  </ul>
                </div>
                <div className="detail-col">
                  <h5><i className="fas fa-star" style={{ marginLeft: '6px' }}></i> لماذا تختارنا؟</h5>
                  <p>نضع استراتيجيات تقاضي مدروسة، ونمتلك خبرة واسعة في إدارة الأدلة وتقديم المرافعات القوية.</p>
                  <h5 style={{ marginTop: '0.8rem' }}><i className="fas fa-clock" style={{ marginLeft: '6px' }}></i> خطوات العمل</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> مراجعة قضيتك وفهم التفاصيل</li>
                    <li><i className="fas fa-circle"></i> تحليل قانوني شامل ودراسة الأدلة</li>
                    <li><i className="fas fa-circle"></i> وضع خطة قانونية مخصصة</li>
                    <li><i className="fas fa-circle"></i> التمثيل أمام المحكمة بثقة</li>
                  </ul>
                </div>
              </div>
              <div className="detail-cta">
                <Link href="/contact?tab=consult&specialty=المنازعات%20المدنية" className="btn-gold">طلب استشارة</Link>
                <Link href="/contact?tab=appointment&specialty=المنازعات%20المدنية" className="btn-outline-gold">حجز موعد</Link>
              </div>
            </div>
          </div>

          {/* 2. المنازعات التجارية */}
          <div className="specialty-card-wrap gold-underline-card reveal reveal-d2" data-specialty="commercial">
            <div className="specialty-card-header">
              <div className="icon-wrap"><i className="fas fa-balance-scale"></i></div>
              <div className="info">
                <h3>المنازعات التجارية</h3>
                <p>حماية مصالحك التجارية والشركات</p>
              </div>
              <span className="toggle-icon"><i className="fas fa-chevron-down"></i></span>
            </div>
            <div className="specialty-details">
              <p className="desc">العالم التجاري مليء بالفرص، لكنه أيضاً مليء بالتحديات القانونية. نحن هنا لحماية عملك واستثماراتك من أي نزاعات.</p>
              <div className="detail-grid">
                <div className="detail-col">
                  <h5><i className="fas fa-list-ul" style={{ marginLeft: '6px' }}></i> الخدمات التي نقدمها</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> تأسيس الشركات بجميع أنواعها</li>
                    <li><i className="fas fa-circle"></i> قضايا الإفلاس والإعسار</li>
                    <li><i className="fas fa-circle"></i> منازعات الأوراق التجارية</li>
                    <li><i className="fas fa-circle"></i> قضايا العلامات التجارية</li>
                    <li><i className="fas fa-circle"></i> التمثيل القانوني للشركات</li>
                  </ul>
                </div>
                <div className="detail-col">
                  <h5><i className="fas fa-star" style={{ marginLeft: '6px' }}></i> لماذا تختارنا؟</h5>
                  <p>نفهم تعقيدات القوانين التجارية ونمتلك شبكة علاقات واسعة تمكننا من حل النزاعات بسرعة وحكمة.</p>
                  <h5 style={{ marginTop: '0.8rem' }}><i className="fas fa-clock" style={{ marginLeft: '6px' }}></i> خطوات العمل</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> تقييم وضعك التجاري والقانوني</li>
                    <li><i className="fas fa-circle"></i> تحليل المخاطر والبدائل المتاحة</li>
                    <li><i className="fas fa-circle"></i> وضع خطة قانونية تحمي عملك</li>
                    <li><i className="fas fa-circle"></i> التفاوض أو التمثيل أمام المحاكم</li>
                  </ul>
                </div>
              </div>
              <div className="detail-cta">
                <Link href="/contact?tab=consult&specialty=المنازعات%20التجارية" className="btn-gold">طلب استشارة</Link>
                <Link href="/contact?tab=appointment&specialty=المنازعات%20التجارية" className="btn-outline-gold">حجز موعد</Link>
              </div>
            </div>
          </div>

          {/* 3. قضايا الأسرة */}
          <div className="specialty-card-wrap gold-underline-card reveal reveal-d3" data-specialty="family">
            <div className="specialty-card-header">
              <div className="icon-wrap"><i className="fas fa-users"></i></div>
              <div className="info">
                <h3>قضايا الأسرة والأحوال الشخصية</h3>
                <p>حلول رحيمة وخصوصية تامة</p>
              </div>
              <span className="toggle-icon"><i className="fas fa-chevron-down"></i></span>
            </div>
            <div className="specialty-details">
              <p className="desc">قضايا الأسرة هي الأكثر حساسية في حياتنا. نتعامل معها بكل رحمة وحكمة، ونقدم لك الدعم القانوني والنفسي الذي تحتاجه.</p>
              <div className="detail-grid">
                <div className="detail-col">
                  <h5><i className="fas fa-list-ul" style={{ marginLeft: '6px' }}></i> الخدمات التي نقدمها</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> دعاوى الطلاق والخلع والفسخ</li>
                    <li><i className="fas fa-circle"></i> قضايا النفقة بأنواعها</li>
                    <li><i className="fas fa-circle"></i> دعاوى الرؤية والحضانة</li>
                    <li><i className="fas fa-circle"></i> إعلام الوراثة وتقسيم التركات</li>
                    <li><i className="fas fa-circle"></i> تصحيح أسماء ووثائق الزواج</li>
                  </ul>
                </div>
                <div className="detail-col">
                  <h5><i className="fas fa-star" style={{ marginLeft: '6px' }}></i> لماذا تختارنا؟</h5>
                  <p>نهجنا حساس ويحترم خصوصيتك. لدينا خبرة عميقة في قضايا الأسرة وفقاً للشريعة والقانون المصري.</p>
                  <h5 style={{ marginTop: '0.8rem' }}><i className="fas fa-clock" style={{ marginLeft: '6px' }}></i> خطوات العمل</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> فهم قضيتك واحتياجات أسرتك</li>
                    <li><i className="fas fa-circle"></i> جمع الوثائق والمستندات اللازمة</li>
                    <li><i className="fas fa-circle"></i> صياغة الدعوى أو الاتفاق الودي</li>
                    <li><i className="fas fa-circle"></i> التمثيل أمام محاكم الأسرة</li>
                  </ul>
                </div>
              </div>
              <div className="detail-cta">
                <Link href="/contact?tab=consult&specialty=قضايا%20الأسرة" className="btn-gold">طلب استشارة</Link>
                <Link href="/contact?tab=appointment&specialty=قضايا%20الأسرة" className="btn-outline-gold">حجز موعد</Link>
              </div>
            </div>
          </div>

          {/* 4. الدفاع الجنائي */}
          <div className="specialty-card-wrap gold-underline-card reveal reveal-d1" data-specialty="criminal">
            <div className="specialty-card-header">
              <div className="icon-wrap"><i className="fas fa-shield-alt"></i></div>
              <div className="info">
                <h3>الدفاع الجنائي</h3>
                <p>نحمي حقوقك وكرامتك</p>
              </div>
              <span className="toggle-icon"><i className="fas fa-chevron-down"></i></span>
            </div>
            <div className="specialty-details">
              <p className="desc">الاتهام الجنائي هو من أصعب اللحظات التي قد تمر بها. نحن هنا للدفاع عنك بكل قوة، نستمع لك، ندرس أدلة الاتهام بدقة، ونضع استراتيجية دفاع قوية.</p>
              <div className="detail-grid">
                <div className="detail-col">
                  <h5><i className="fas fa-list-ul" style={{ marginLeft: '6px' }}></i> الخدمات التي نقدمها</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> الدفاع في قضايا الجنايات الكبرى</li>
                    <li><i className="fas fa-circle"></i> الدفاع في الجنح والمخالفات</li>
                    <li><i className="fas fa-circle"></i> إعداد مذكرات الطعن بالنقض الجنائي</li>
                    <li><i className="fas fa-circle"></i> قضايا الأموال العامة والرشوة</li>
                    <li><i className="fas fa-circle"></i> حضور التحقيقات أمام النيابة العامة</li>
                  </ul>
                </div>
                <div className="detail-col">
                  <h5><i className="fas fa-star" style={{ marginLeft: '6px' }}></i> لماذا تختارنا؟</h5>
                  <p>لدينا فهم دقيق لآليات النظام الجنائي المصري، ونعرف كيف نفنّد الأدلة ونكشف نقاط الضعف في الاتهام.</p>
                  <h5 style={{ marginTop: '0.8rem' }}><i className="fas fa-clock" style={{ marginLeft: '6px' }}></i> خطوات العمل</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> مراجعة ملف قضيتك والأدلة</li>
                    <li><i className="fas fa-circle"></i> تحليل التهم ونقاط القوة والضعف</li>
                    <li><i className="fas fa-circle"></i> وضع خطة دفاع قوية ومخصصة</li>
                    <li><i className="fas fa-circle"></i> التمثيل أمام المحكمة بثقة</li>
                  </ul>
                </div>
              </div>
              <div className="detail-cta">
                <Link href="/contact?tab=consult&specialty=الدفاع%20الجنائي" className="btn-gold">طلب استشارة</Link>
                <Link href="/contact?tab=appointment&specialty=الدفاع%20الجنائي" className="btn-outline-gold">حجز موعد</Link>
              </div>
            </div>
          </div>

          {/* 5. المنازعات الإدارية */}
          <div className="specialty-card-wrap gold-underline-card reveal reveal-d2" data-specialty="admin">
            <div className="specialty-card-header">
              <div className="icon-wrap"><i className="fas fa-building"></i></div>
              <div className="info">
                <h3>المنازعات الإدارية</h3>
                <p>نواجه الحكومة نيابة عنك</p>
              </div>
              <span className="toggle-icon"><i className="fas fa-chevron-down"></i></span>
            </div>
            <div className="specialty-details">
              <p className="desc">عندما تواجه قراراً إدارياً جائراً أو تتعرض لظلم من جهة حكومية، فإننا نضع خبرتنا في القانون الإداري بين يديك.</p>
              <div className="detail-grid">
                <div className="detail-col">
                  <h5><i className="fas fa-list-ul" style={{ marginLeft: '6px' }}></i> الخدمات التي نقدمها</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> الطعن بإلغاء القرارات الإدارية</li>
                    <li><i className="fas fa-circle"></i> دعاوى التعويض ضد الجهات الحكومية</li>
                    <li><i className="fas fa-circle"></i> قضايا الموظفين العموميين</li>
                    <li><i className="fas fa-circle"></i> منازعات العقود الإدارية</li>
                    <li><i className="fas fa-circle"></i> تنفيذ الأحكام الصادرة ضد الدولة</li>
                  </ul>
                </div>
                <div className="detail-col">
                  <h5><i className="fas fa-star" style={{ marginLeft: '6px' }}></i> لماذا تختارنا؟</h5>
                  <p>خبرة طويلة في التعامل مع الأجهزة الحكومية ومجلس الدولة، ونعرف خبايا القانون الإداري المصري.</p>
                  <h5 style={{ marginTop: '0.8rem' }}><i className="fas fa-clock" style={{ marginLeft: '6px' }}></i> خطوات العمل</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> مراجعة القرار الإداري الذي تعرضت له</li>
                    <li><i className="fas fa-circle"></i> تحليل الأسس القانونية للطعن</li>
                    <li><i className="fas fa-circle"></i> تقديم الطعن أمام مجلس الدولة</li>
                    <li><i className="fas fa-circle"></i> التمثيل والمرافعة بكل حزم</li>
                  </ul>
                </div>
              </div>
              <div className="detail-cta">
                <Link href="/contact?tab=consult&specialty=المنازعات%20الإدارية" className="btn-gold">طلب استشارة</Link>
                <Link href="/contact?tab=appointment&specialty=المنازعات%20الإدارية" className="btn-outline-gold">حجز موعد</Link>
              </div>
            </div>
          </div>

          {/* 6. صياغة العقود */}
          <div className="specialty-card-wrap gold-underline-card reveal reveal-d3" data-specialty="contracts">
            <div className="specialty-card-header">
              <div className="icon-wrap"><i className="fas fa-file-contract"></i></div>
              <div className="info">
                <h3>صياغة العقود</h3>
                <p>نحميك قبل وقوع النزاع</p>
              </div>
              <span className="toggle-icon"><i className="fas fa-chevron-down"></i></span>
            </div>
            <div className="specialty-details">
              <p className="desc">العقد الجيد هو خط الدفاع الأول عن حقوقك. نحن نصيغ عقودك بدقة قانونية متناهية، نغلق كل الثغرات التي قد يستغلها الطرف الآخر.</p>
              <div className="detail-grid">
                <div className="detail-col">
                  <h5><i className="fas fa-list-ul" style={{ marginLeft: '6px' }}></i> الخدمات التي نقدمها</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> صياغة عقود البيع والشراء</li>
                    <li><i className="fas fa-circle"></i> صياغة عقود الشراكة والاستثمار</li>
                    <li><i className="fas fa-circle"></i> مراجعة العقود وتعديلها</li>
                    <li><i className="fas fa-circle"></i> صياغة مذكرات التفاهم واتفاقيات عدم الإفصاح</li>
                    <li><i className="fas fa-circle"></i> التفاوض نيابة عنك قبل التوقيع</li>
                  </ul>
                </div>
                <div className="detail-col">
                  <h5><i className="fas fa-star" style={{ marginLeft: '6px' }}></i> لماذا تختارنا؟</h5>
                  <p>دقتنا في الصياغة وخبرتنا في توقع الثغرات القانونية تجعل عقودك درعاً حصيناً يحمي حقوقك ومصالحك.</p>
                  <h5 style={{ marginTop: '0.8rem' }}><i className="fas fa-clock" style={{ marginLeft: '6px' }}></i> خطوات العمل</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> فهم أهدافك وتوقعاتك من العقد</li>
                    <li><i className="fas fa-circle"></i> جمع المعلومات والوثائق اللازمة</li>
                    <li><i className="fas fa-circle"></i> صياغة مسودة أولية للعقد</li>
                    <li><i className="fas fa-circle"></i> مراجعة وتعديل النصوص معك</li>
                  </ul>
                </div>
              </div>
              <div className="detail-cta">
                <Link href="/contact?tab=consult&specialty=صياغة%20العقود" className="btn-gold">طلب استشارة</Link>
                <Link href="/contact?tab=appointment&specialty=صياغة%20العقود" className="btn-outline-gold">حجز موعد</Link>
              </div>
            </div>
          </div>

          {/* 7. المنازعات العمالية */}
          <div className="specialty-card-wrap gold-underline-card reveal reveal-d1" data-specialty="labor">
            <div className="specialty-card-header">
              <div className="icon-wrap"><i className="fas fa-briefcase"></i></div>
              <div className="info">
                <h3>المنازعات العمالية</h3>
                <p>نحمي حقوقك في العمل</p>
              </div>
              <span className="toggle-icon"><i className="fas fa-chevron-down"></i></span>
            </div>
            <div className="specialty-details">
              <p className="desc">العلاقة بين العامل وصاحب العمل قد تشهد توترات ونزاعات. نحن هنا لضمان حقوقك العمالية الكاملة.</p>
              <div className="detail-grid">
                <div className="detail-col">
                  <h5><i className="fas fa-list-ul" style={{ marginLeft: '6px' }}></i> الخدمات التي نقدمها</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> دعاوى الفصل التعسفي</li>
                    <li><i className="fas fa-circle"></i> المطالبة بالمستحقات العمالية</li>
                    <li><i className="fas fa-circle"></i> صياغة لوائح العمل الداخلية</li>
                    <li><i className="fas fa-circle"></i> التحقيق الإداري مع الموظفين</li>
                    <li><i className="fas fa-circle"></i> إصابات العمل والتأمين الاجتماعي</li>
                  </ul>
                </div>
                <div className="detail-col">
                  <h5><i className="fas fa-star" style={{ marginLeft: '6px' }}></i> لماذا تختارنا؟</h5>
                  <p>نفهم قانون العمل المصري جيداً، ونمتلك خبرة في قضايا العمال والموظفين، مما يضمن لك دفاعاً قوياً وعادلاً.</p>
                  <h5 style={{ marginTop: '0.8rem' }}><i className="fas fa-clock" style={{ marginLeft: '6px' }}></i> خطوات العمل</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> فهم العلاقة العمالية والنزاع</li>
                    <li><i className="fas fa-circle"></i> جمع المستندات والإثباتات</li>
                    <li><i className="fas fa-circle"></i> صياغة الدعوى أو الاتفاق الودي</li>
                    <li><i className="fas fa-circle"></i> التمثيل أمام المحاكم العمالية</li>
                  </ul>
                </div>
              </div>
              <div className="detail-cta">
                <Link href="/contact?tab=consult&specialty=المنازعات%20العمالية" className="btn-gold">طلب استشارة</Link>
                <Link href="/contact?tab=appointment&specialty=المنازعات%20العمالية" className="btn-outline-gold">حجز موعد</Link>
              </div>
            </div>
          </div>

          {/* 8. التحكيم والوساطة */}
          <div className="specialty-card-wrap gold-underline-card reveal reveal-d2" data-specialty="arbitration">
            <div className="specialty-card-header">
              <div className="icon-wrap"><i className="fas fa-hand-holding-usd"></i></div>
              <div className="info">
                <h3>التحكيم والوساطة</h3>
                <p>حلول سريعة وودية</p>
              </div>
              <span className="toggle-icon"><i className="fas fa-chevron-down"></i></span>
            </div>
            <div className="specialty-details">
              <p className="desc">ليس كل نزاع يحتاج إلى معركة قضائية طويلة. نقدم لك بدائل فعالة لحل النزاعات بسرعة وسرية، من خلال التحكيم والوساطة.</p>
              <div className="detail-grid">
                <div className="detail-col">
                  <h5><i className="fas fa-list-ul" style={{ marginLeft: '6px' }}></i> الخدمات التي نقدمها</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> صياغة شرط التحكيم في العقود</li>
                    <li><i className="fas fa-circle"></i> التمثيل في هيئات التحكيم</li>
                    <li><i className="fas fa-circle"></i> تنفيذ أحكام المحكمين</li>
                    <li><i className="fas fa-circle"></i> الوساطة الودية لتسوية النزاعات</li>
                    <li><i className="fas fa-circle"></i> دعاوى بطلان حكم التحكيم</li>
                  </ul>
                </div>
                <div className="detail-col">
                  <h5><i className="fas fa-star" style={{ marginLeft: '6px' }}></i> لماذا تختارنا؟</h5>
                  <p>خبرة واسعة في إجراءات التحكيم المحلي والدولي، نضمن لك سير العملية بسلاسة ووصولاً إلى حل عادل وسريع.</p>
                  <h5 style={{ marginTop: '0.8rem' }}><i className="fas fa-clock" style={{ marginLeft: '6px' }}></i> خطوات العمل</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> تقييم إمكانية التحكيم في نزاعك</li>
                    <li><i className="fas fa-circle"></i> صياغة اتفاقية التحكيم</li>
                    <li><i className="fas fa-circle"></i> تشكيل هيئة التحكيم المناسبة</li>
                    <li><i className="fas fa-circle"></i> جلسات التحكيم والمرافعة</li>
                  </ul>
                </div>
              </div>
              <div className="detail-cta">
                <Link href="/contact?tab=consult&specialty=التحكيم%20والوساطة" className="btn-gold">طلب استشارة</Link>
                <Link href="/contact?tab=appointment&specialty=التحكيم%20والوساطة" className="btn-outline-gold">حجز موعد</Link>
              </div>
            </div>
          </div>

          {/* 9. الطعن الدستوري */}
          <div className="specialty-card-wrap gold-underline-card reveal reveal-d3" data-specialty="constitutional">
            <div className="specialty-card-header">
              <div className="icon-wrap"><i className="fas fa-university"></i></div>
              <div className="info">
                <h3>الطعن الدستوري</h3>
                <p>نحمي الدستورية في مصر</p>
              </div>
              <span className="toggle-icon"><i className="fas fa-chevron-down"></i></span>
            </div>
            <div className="specialty-details">
              <p className="desc">الطعن بعدم دستورية القوانين هو أعلى درجات التقاضي، ويتطلب خبرة قانونية وفقهية عميقة. نحن نقدم لك هذه الخبرة.</p>
              <div className="detail-grid">
                <div className="detail-col">
                  <h5><i className="fas fa-list-ul" style={{ marginLeft: '6px' }}></i> الخدمات التي نقدمها</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> إقامة الدعاوى بعدم دستورية القوانين</li>
                    <li><i className="fas fa-circle"></i> إعداد المذكرات القانونية للمحكمة الدستورية</li>
                    <li><i className="fas fa-circle"></i> منازعات التنفيذ أمام المحكمة الدستورية</li>
                    <li><i className="fas fa-circle"></i> تفسير النصوص التشريعية</li>
                    <li><i className="fas fa-circle"></i> فحص القوانين وبيان مدى مطابقتها للدستور</li>
                  </ul>
                </div>
                <div className="detail-col">
                  <h5><i className="fas fa-star" style={{ marginLeft: '6px' }}></i> لماذا تختارنا؟</h5>
                  <p>خبرة استثنائية في القانون الدستوري المصري، وفهم عميق لأحكام المحكمة الدستورية العليا.</p>
                  <h5 style={{ marginTop: '0.8rem' }}><i className="fas fa-clock" style={{ marginLeft: '6px' }}></i> خطوات العمل</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> تحليل النص التشريعي محل الطعن</li>
                    <li><i className="fas fa-circle"></i> دراسة مدى مطابقته للدستور</li>
                    <li><i className="fas fa-circle"></i> إعداد الطعن الدستوري بدقة</li>
                    <li><i className="fas fa-circle"></i> التمثيل أمام المحكمة الدستورية العليا</li>
                  </ul>
                </div>
              </div>
              <div className="detail-cta">
                <Link href="/contact?tab=consult&specialty=الطعن%20الدستوري" className="btn-gold">طلب استشارة</Link>
                <Link href="/contact?tab=appointment&specialty=الطعن%20الدستوري" className="btn-outline-gold">حجز موعد</Link>
              </div>
            </div>
          </div>

          {/* 10. الطعن بالنقض */}
          <div className="specialty-card-wrap gold-underline-card reveal reveal-d1" data-specialty="cassation">
            <div className="specialty-card-header">
              <div className="icon-wrap"><i className="fas fa-gavel"></i></div>
              <div className="info">
                <h3>الطعن بالنقض</h3>
                <p>الطعن أمام محكمة النقض في الأحكام القضائية</p>
              </div>
              <span className="toggle-icon"><i className="fas fa-chevron-down"></i></span>
            </div>
            <div className="specialty-details">
              <p className="desc">الطعن بالنقض هو إجراء قانوني يهدف إلى مراجعة الأحكام الصادرة عن محاكم الاستئناف أمام محكمة النقض. نمتلك خبرة طويلة في إعداد الطعون بالنقض المدنية والجنائية، وندرك تماماً الشكلية والمادية التي تقوم عليها هذه الطعون.</p>
              <div className="detail-grid">
                <div className="detail-col">
                  <h5><i className="fas fa-list-ul" style={{ marginLeft: '6px' }}></i> الخدمات التي نقدمها</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> إعداد مذكرات الطعن بالنقض</li>
                    <li><i className="fas fa-circle"></i> تمثيل العملاء أمام محكمة النقض</li>
                    <li><i className="fas fa-circle"></i> الطعن في الأحكام الجنائية والمدنية</li>
                    <li><i className="fas fa-circle"></i> متابعة إجراءات الطعن حتى الفصل</li>
                    <li><i className="fas fa-circle"></i> تقديم الدفوع القانونية المتعلقة بالنقض</li>
                  </ul>
                </div>
                <div className="detail-col">
                  <h5><i className="fas fa-star" style={{ marginLeft: '6px' }}></i> لماذا تختارنا؟</h5>
                  <p>خبرة واسعة في أحكام محكمة النقض، وفهم دقيق للأسباب التي تؤدي إلى نقض الأحكام، مما يزيد من فرص نجاح طعنك.</p>
                  <h5 style={{ marginTop: '0.8rem' }}><i className="fas fa-clock" style={{ marginLeft: '6px' }}></i> خطوات العمل</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> دراسة الحكم المراد الطعن فيه</li>
                    <li><i className="fas fa-circle"></i> تحديد أسباب الطعن القانونية</li>
                    <li><i className="fas fa-circle"></i> صياغة مذكرة الطعن وإيداعها</li>
                    <li><i className="fas fa-circle"></i> التمثيل أمام دائرة النقض</li>
                  </ul>
                </div>
              </div>
              <div className="detail-cta">
                <Link href="/contact?tab=consult&specialty=الطعن%20بالنقض" className="btn-gold">طلب استشارة</Link>
                <Link href="/contact?tab=appointment&specialty=الطعن%20بالنقض" className="btn-outline-gold">حجز موعد</Link>
              </div>
            </div>
          </div>

          {/* 11. الطعون الإدارية العليا */}
          <div className="specialty-card-wrap gold-underline-card reveal reveal-d2" data-specialty="admin_appeal">
            <div className="specialty-card-header">
              <div className="icon-wrap"><i className="fas fa-landmark"></i></div>
              <div className="info">
                <h3>الطعون الإدارية العليا</h3>
                <p>الطعن أمام المحكمة الإدارية العليا (مجلس الدولة)</p>
              </div>
              <span className="toggle-icon"><i className="fas fa-chevron-down"></i></span>
            </div>
            <div className="specialty-details">
              <p className="desc">الطعون الإدارية العليا هي السبيل للطعن في الأحكام الصادرة عن محاكم القضاء الإداري أمام المحكمة الإدارية العليا، وهي أعلى سلطة قضائية في مجلس الدولة. نتمتع بخبرة ممتدة في هذا المجال، ونقدم استشارات وتمثيلاً متخصصاً في هذه الطعون.</p>
              <div className="detail-grid">
                <div className="detail-col">
                  <h5><i className="fas fa-list-ul" style={{ marginLeft: '6px' }}></i> الخدمات التي نقدمها</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> إعداد مذكرات الطعن الإداري العليا</li>
                    <li><i className="fas fa-circle"></i> تمثيل العملاء أمام المحكمة الإدارية العليا</li>
                    <li><i className="fas fa-circle"></i> الطعن في أحكام القضاء الإداري</li>
                    <li><i className="fas fa-circle"></i> متابعة إجراءات الطعن حتى الفصل</li>
                    <li><i className="fas fa-circle"></i> تقديم الدفوع القانونية الإدارية</li>
                  </ul>
                </div>
                <div className="detail-col">
                  <h5><i className="fas fa-star" style={{ marginLeft: '6px' }}></i> لماذا تختارنا؟</h5>
                  <p>خبرة عميقة في قوانين مجلس الدولة وأحكام المحكمة الإدارية العليا، مما يضمن تقديم طعون قوية ومقنعة.</p>
                  <h5 style={{ marginTop: '0.8rem' }}><i className="fas fa-clock" style={{ marginLeft: '6px' }}></i> خطوات العمل</h5>
                  <ul>
                    <li><i className="fas fa-circle"></i> دراسة الحكم الإداري المراد الطعن فيه</li>
                    <li><i className="fas fa-circle"></i> تحديد أسباب الطعن وفقاً للقانون</li>
                    <li><i className="fas fa-circle"></i> صياغة مذكرة الطعن وإيداعها</li>
                    <li><i className="fas fa-circle"></i> التمثيل أمام المحكمة الإدارية العليا</li>
                  </ul>
                </div>
              </div>
              <div className="detail-cta">
                <Link href="/contact?tab=consult&specialty=الطعون%20الإدارية%20العليا" className="btn-gold">طلب استشارة</Link>
                <Link href="/contact?tab=appointment&specialty=الطعون%20الإدارية%20العليا" className="btn-outline-gold">حجز موعد</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section" aria-label="طلب استشارة">
        <div className="section-inner reveal">
          <span
            className="eyebrow"
            style={{
              display: 'block',
              fontSize: '0.65rem',
              fontWeight: 800,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--matte-gold)',
              opacity: 0.5,
              marginBottom: '0.3rem',
            }}
          >
            ● تواصل معنا
          </span>
          <h2>لم تجد مسألتك القانونية؟</h2>
          <p>فريقنا القانوني المتخصص يقدم استشارات دقيقة في كافة التخصصات. تواصل معنا الآن.</p>
          <Link href="/contact?tab=consult" className="btn-gold">
            طلب استشارة قانونية <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
          </Link>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section section-gray" aria-label="الأسئلة الشائعة">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="eyebrow">● استفسارات</span>
            <h2>أسئلة شائعة</h2>
            <p>إجابات على أكثر الأسئلة التي تهم عملاءنا.</p>
          </div>

          <div className="faq-list">
            <div className="faq-item reveal reveal-d1 active">
              <button className="faq-question" aria-expanded="true">
                <span>ما هي درجات التقاضي التي تمثلون العملاء أمامها؟</span>
                <span className="icon"><i className="fas fa-chevron-down"></i></span>
              </button>
              <div className="faq-answer">
                <p>نمثل العملاء أمام جميع درجات التقاضي في مصر، بدءاً من المحاكم الجزئية والابتدائية، مروراً بمحاكم الاستئناف، وصولاً إلى محكمة النقض والمحكمة الدستورية العليا والمحكمة الإدارية العليا.</p>
              </div>
            </div>
            <div className="faq-item reveal reveal-d2">
              <button className="faq-question" aria-expanded="false">
                <span>هل تقدمون استشارات قانونية قبل رفع الدعوى؟</span>
                <span className="icon"><i className="fas fa-chevron-down"></i></span>
              </button>
              <div className="faq-answer">
                <p>نعم، نؤمن بأن الاستشارة القانونية المبكرة هي خط الدفاع الأول. نقدم تحليلاً قانونياً دقيقاً للوقائع، ونعرض البدائل المتاحة مع بيان الآثار القانونية والمالية لكل خيار.</p>
              </div>
            </div>
            <div className="faq-item reveal reveal-d3">
              <button className="faq-question" aria-expanded="false">
                <span>كيف تتعاملون مع سرية معلومات العملاء؟</span>
                <span className="icon"><i className="fas fa-chevron-down"></i></span>
              </button>
              <div className="faq-answer">
                <p>نلتزم بأعلى معايير السرية المهنية وفقاً لأخلاقيات مهنة المحاماة. جميع المعلومات والوثائق والبيانات المتعلقة بعملائنا تُحفظ بسرية تامة ولا تُكشف لأي طرف ثالث.</p>
              </div>
            </div>
            <div className="faq-item reveal reveal-d1">
              <button className="faq-question" aria-expanded="false">
                <span>كم تستغرق مدة التقاضي في القضايا التي تتبعونها؟</span>
                <span className="icon"><i className="fas fa-chevron-down"></i></span>
              </button>
              <div className="faq-answer">
                <p>تختلف مدة التقاضي حسب نوع القضية ودرجة المحكمة. نعمل على تسريع الإجراءات قدر الإمكان مع الالتزام الكامل بالأطر القانونية، ونطلع عملاءنا بانتظام على تطورات قضاياهم.</p>
              </div>
            </div>
            <div className="faq-item reveal reveal-d2">
              <button className="faq-question" aria-expanded="false">
                <span>هل تتعاملون مع قضايا التحكيم التجاري؟</span>
                <span className="icon"><i className="fas fa-chevron-down"></i></span>
              </button>
              <div className="faq-answer">
                <p>نعم، لدينا خبرة في تمثيل العملاء في إجراءات التحكيم التجاري المحلي والدولي، ونقدم استشارات متخصصة في هذا المجال.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
