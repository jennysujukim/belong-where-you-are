import Link from "next/link";
// styles
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <p>By <Link href="https://seojeongkim.com" target="_blank">@JENNYKIM</Link></p>
      <div className={styles.logo_container}>
        <span className={styles.logo}>BWUR</span>
        <h1 className={styles.logo_title}>Belong where you are</h1>
      </div>
      <p>With Fujifilm Quicksnap</p>
    </header>
  )
}
