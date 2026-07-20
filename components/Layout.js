import Header from './Header';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';

export default function Layout({ children }) {
  return (
    <>
    <Header />
    <main>{children}</main>
    <Footer />
    <FloatingButtons />
    </>
  );
}
