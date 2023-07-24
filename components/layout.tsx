import Header from "./header";
import styles from "../styles/global.module.css";
import Footer from "./footer";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className={styles.layout}>
    <Header />
    <div className={styles.container}>{children}</div>
    <Footer />
  </div>
);

export default Layout;
