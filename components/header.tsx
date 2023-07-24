import Image from "next/image";
import Logo from "../assets/logo_no_text.svg";
import styles from "../styles/header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <div className={styles.logo}>
          <Image
            src={Logo}
            alt="MammaCare Logo"
            height={48}
            className={styles.logoImg}
          />
          <h1 className={styles.logoText}>
            MammaCare<sup className={styles.reg}>&reg;</sup>
          </h1>
        </div>
        <h2 className={styles.tagline}>
          Advancing breast exam standards worldwide since 1974
        </h2>
      </Link>
    </header>
  );
};

export default Header;
