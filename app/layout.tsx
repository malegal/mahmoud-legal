import type { Metadata } from 'next';
import { Tajawal, Amiri, Playfair_Display, Montserrat } from 'next/font/google';
import './styles/globals.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FloatingButtons from '@/app/components/FloatingButtons';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700', '800', '900'],
  variable: '--font-ar',
});

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-serif',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ostazlaw.vercel.app'),
  title: {
    template: '%s | مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية',
    default: 'مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية | OSTAZ LAW',
  },
  description:
    'مؤسسة قانونية مصرية تقدم استشارات، تمثيلاً قضائياً، وحلولاً قانونية للشركات والأفراد. خبرة في النقض والدستورية العليا.',
  keywords: 'محامي, استشارات قانونية, محاماة, نقض, دستورية, شركات, أسوان, القاهرة, الإسكندرية',
  robots: 'index, follow',
  alternates: {
    canonical: '/',
    languages: {
      'ar-eg': '/',
      en: '/en',
    },
  },
  openGraph: {
    title: 'مؤسسة الأستاذ محمود عبد الحميد للمحاماة والاستشارات القانونية | OSTAZ LAW',
    description: 'بوابة الوصول إلى خدمات قانونية متخصصة: استشارات، تمثيل قضائي، وحلول قانونية للشركات والأفراد.',
    url: 'https://ostazlaw.vercel.app/',
    siteName: 'OSTAZ LAW',
    images: [
      {
        url: '/images/mahmoud-abdel-hamid-lawyer-portrait.jpg',
        width: 600,
        height: 800,
        alt: 'الأستاذ محمود عبد الحميد – المحامي بالنقض والدستورية العليا',
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/mahmoud-abdel-hamid-lawyer-portrait.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    google: 'Uqbjr1w7Q831Lo6JPFEe9_lK86Kp55P79Lwfp1j6EX8',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${amiri.variable} ${playfair.variable} ${montserrat.variable}`}>
      <head>
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <link rel="robots" type="text/plain" href="/robots.txt" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
