import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />

        {/* Preload critical font (Tajawal & Amiri) */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&family=Amiri:wght@400;700;900&family=Playfair+Display:wght@400;700;900&family=Montserrat:wght@300;400;700&display=swap"
          as="style"
          fetchPriority="high"
        />

        {/* Google Fonts with display=swap */}
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

        {/* Font Awesome - Load non-blocking */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          />
        </noscript>

        {/* Theme color & icons */}
        <meta name="theme-color" content="#0B111B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />

        {/* Basic SEO (global) */}
        <meta name="description" content="مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية – محامون بالنقض والدستورية العليا" />
        <meta name="keywords" content="محامي, محاماة, استشارات قانونية, نقض, دستورية عليا, شركات, عقود, تعويضات, مصر" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="مؤسسة الأستاذ محمود عبد الحميد" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
