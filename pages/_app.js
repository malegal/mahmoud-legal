import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // تحسين إمكانية الوصول: إضافة لغة الصفحة
  useEffect(() => {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
