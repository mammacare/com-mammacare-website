import Link from "next/link";
import styles from "../styles/footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        Universities and breast health clinics interested in training with
        MammaCare<sup>&reg;</sup>, please visit
      </p>
      <Link href="https://mammacare.org/" className={styles.footerLink}>
        mammacare.org
      </Link>
      <p className={styles.rights}>
        All rights reserved, MammaCare<sup>&copy;</sup> 2023
      </p>
    </footer>
  );
};

export default Footer;
