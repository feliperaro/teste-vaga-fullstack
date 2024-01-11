import Image from "next/image";
import styles from "../../page.module.css";

const Logo = () => {
  return (
    <Image
      className={styles.logo}
      src="/logo-kronoos.png"
      alt="Kronoos Logo"
      width={180}
      height={37}
      priority
    />
  );
};

export default Logo;
