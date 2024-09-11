import Link from "next/link";
import Image from "next/image";
// assets
import logo from '@/app/assets/logo.svg'
// styles
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo_container}>
        <Image 
          src={logo} 
          width={200} 
          height={100} 
          alt="logo"
          className={styles.logo}
          draggable="false"
        />
        <h1 className={styles.logo_title}>Belong where you are</h1>
      </div>
      <span className={styles.header_content_left}>By&nbsp;
        <Link 
          href="https://seojeongkim.com" 
          target="_blank"
        >
          @JENNYKIM
        </Link>
      </span>
      <span className={styles.header_content_right}>With Fujifilm Quicksnap</span>
    </header>
  )
}
