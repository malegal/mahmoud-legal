import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';

export default function App({ Component, pageProps }) {
  return (
    <>
    <Header />
    <Component {...pageProps} />
    <FloatingButtons />
    <Footer />
    </>
  );
}
