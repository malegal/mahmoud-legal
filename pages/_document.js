import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        <meta name="google-site-verification" content="Uqbjr1w7Q831Lo6JPFEe9_lK86Kp55P79Lwfp1j6EX8" />

        {/* ===== Preconnect لتحسين تحميل الخطوط ===== */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ===== Preload للخطوط الأساسية ===== */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700;900&family=Tajawal:wght@300;400;500;700;800;900&family=Playfair+Display:wght@400;700;900&family=Montserrat:wght@300;400;700&display=swap"
          as="style"
        />

        {/* ===== تحميل الخطوط مع display=swap ===== */}
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700;900&family=Tajawal:wght@300;400;500;700;800;900&family=Playfair+Display:wght@400;700;900&family=Montserrat:wght@300;400;700&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700;900&family=Tajawal:wght@300;400;500;700;800;900&family=Playfair+Display:wght@400;700;900&family=Montserrat:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
        </noscript>

        {/* ===== Font Awesome مع تحميل غير متزامن ===== */}
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
            integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </noscript>

        {/* ===== أيقونة الموقع ===== */}
        <link rel="icon" href="/favicon.ico" />

        {/* ===== CSS الأساسي المضمن (Critical CSS) ===== */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* الأنماط الأساسية للشاشة الأولى */
              * { margin:0; padding:0; box-sizing:border-box; }
              body {
                font-family: 'Tajawal', sans-serif;
                background-color: #FAFAF8;
                color: #1A1A1A;
                line-height: 1.8;
                direction: rtl;
                -webkit-font-smoothing: antialiased;
              }
              .site-header {
                position: fixed;
                top: 0;
                right: 0;
                left: 0;
                z-index: 1000;
                padding: 0 2rem;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #0B111B;
                border-bottom: 1px solid rgba(176,141,87,0.08);
                transition: all 0.5s cubic-bezier(0.22,1,0.36,1);
              }
              .header-brand { display:flex; align-items:center; gap:1.2rem; }
              .brand-wordmark { display:flex; flex-direction:column; line-height:1.1; text-decoration:none; font-family:'Playfair Display',serif; flex-shrink:0; }
              .brand-primary { font-size:38px; font-weight:900; color:#D4AF37; letter-spacing:2px; }
              .brand-secondary { font-size:14px; font-weight:400; color:#F0F0F0; letter-spacing:6px; margin-top:2px; font-family:'Montserrat',sans-serif; }
              .header-brand-text .name { font-size:1.7rem; font-weight:900; color:#fff; font-family:'Amiri',serif; }
              .header-brand-text .sub { font-size:0.7rem; font-weight:400; color:#F0F0F0; letter-spacing:0.04em; font-family:'Montserrat',sans-serif; }
              .hero { position:relative; min-height:100vh; display:flex; align-items:center; justify-content:center; text-align:center; padding:160px 24px 80px; background-color:#0B111B; overflow:hidden; }
              .hero-content { position:relative; z-index:2; max-width:1000px; }
              .hero-title { font-family:'Amiri',serif; font-size:clamp(2.4rem,6vw,4.4rem); font-weight:900; line-height:1.1; color:#fff; }
              .gold-text { color:#B08D57; }
              .container { max-width:1200px; margin:0 auto; padding:0 20px; }
              .float-whatsapp { position:fixed; bottom:2rem; left:2rem; z-index:9999; width:56px; height:56px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 30px rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.15); background:#25D366; text-decoration:none; color:#fff; }
              .float-whatsapp i { font-size:2rem; color:#fff; }
              .hero-subtitle, .hero-value, .hero-brand-signature { color:#fff !important; }
              .hero-value { opacity:0.9; }
            `,
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
