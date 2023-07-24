import Image from "next/image";
import Logo from "../assets/logo_no_text.svg";
import styles from "../styles/header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={Logo} alt="MammaCare Logo" height={40} />
        <h1 className={styles.logoText}>
          Mammacare<sup className={styles.reg}>&reg;</sup>
        </h1>
      </div>
      <h2 className={styles.tagline}>
        Advancing breast exam standards worldwide since 1974
      </h2>
    </header>
  );
};

export default Header;
