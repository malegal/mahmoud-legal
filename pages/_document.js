import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />

        {/* Preload للخطوط الأساسية */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&family=Amiri:wght@400;700;900&display=swap"
          as="style"
          fetchPriority="high"
        />

        {/* Google Fonts مع display=swap */}
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&family=Amiri:wght@400;700;900&family=Playfair+Display:wght@400;700;900&family=Montserrat:wght@300;400;700&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&family=Amiri:wght@400;700;900&family=Playfair+Display:wght@400;700;900&family=Montserrat:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
        </noscript>

        {/* Font Awesome – تحميل غير متزامن */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          media="print"
          onLoad="this.media='all'"
          fetchPriority="low"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </noscript>

        {/* أيقونة الموقع */}
        <link rel="icon" href="/favicon.ico" />

        {/* بيانات التعريف الأساسية */}
        <meta name="theme-color" content="#0B111B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta
          name="description"
          content="مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية – محامون بالنقض والدستورية العليا"
        />
        <meta
          name="keywords"
          content="محامي, محاماة, استشارات قانونية, نقض, دستورية عليا, شركات, عقود, تعويضات, مصر"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="مؤسسة الأستاذ محمود عبد الحميد" />
        <meta name="google-site-verification" content="Uqbjr1w7Q831Lo6JPFEe9_lK86Kp55P79Lwfp1j6EX8" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية" />
        <meta
          property="og:description"
          content="نقدم تمثيلاً قضائياً واستشارات قانونية للشركات والأفراد أمام محكمة النقض والمحكمة الدستورية العليا."
        />
        <meta property="og:url" content="https://ostazlaw.vercel.app/" />
        <meta property="og:site_name" content="OSTAZ LAW" />
        <meta property="og:image" content="https://ostazlaw.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية" />
        <meta
          name="twitter:description"
          content="نقدم تمثيلاً قضائياً واستشارات قانونية للشركات والأفراد أمام محكمة النقض والمحكمة الدستورية العليا."
        />
        <meta name="twitter:image" content="https://ostazlaw.vercel.app/og-image.jpg" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              name: 'مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية',
              description:
                'نقدم تمثيلاً قضائياً واستشارات قانونية للشركات والأفراد أمام محكمة النقض والمحكمة الدستورية العليا.',
              url: 'https://ostazlaw.vercel.app/',
              logo: 'https://ostazlaw.vercel.app/logo.png',
              sameAs: [
                'https://www.facebook.com/malegal',
                'https://x.com/mahmoud_a_hamyd',
                'https://www.linkedin.com/in/mahmoud-abdel-hamid-0a4664374',
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'أسوان',
                addressCountry: 'مصر',
              },
              founder: {
                '@type': 'Person',
                name: 'محمود عبد الحميد',
                jobTitle: 'المحامي بالنقض والدستورية العليا',
              },
              areaServed: 'مصر',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'الخدمات القانونية',
                itemListElement: [
                  { '@type': 'Offer', name: 'المنازعات المدنية' },
                  { '@type': 'Offer', name: 'القانون التجاري' },
                  { '@type': 'Offer', name: 'الخدمات القانونية للشركات' },
                  { '@type': 'Offer', name: 'القضاء الإداري' },
                  { '@type': 'Offer', name: 'الطعن الدستوري' },
                  { '@type': 'Offer', name: 'الطعن بالنقض' },
                  { '@type': 'Offer', name: 'الطعون الإدارية العليا' },
                ],
              },
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
