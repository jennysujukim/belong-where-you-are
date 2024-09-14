import Link from "next/link";
import Image from "next/image";
import { Photo } from "@/lib/types";
// assets
import logo from '@/app/assets/logo.svg'
import { IoIosMenu } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

// styles
import styles from './Header.module.css'

type HeaderProps = {
  photos: Photo[];
  handleNavOpen: () => void;
  navOpen: boolean;
  handleNavClickToView: (id: number) => void;
}

export default function Header({ photos, handleNavOpen, navOpen, handleNavClickToView }: HeaderProps) {

  return (
    <header className={navOpen ? `${styles.header} ${styles.open}` : styles.header}>
      {navOpen &&
        <div className={styles.photos_container}>
          {photos.map((photo, index) => (
            <div 
              key={index}
              className={styles.photo_container}
            >
              <Image 
                className={styles.photo}
                src={photo.image.url}
                width={100}
                height={100}
                alt={`image of ${photo.slug}`}
                onClick={() => handleNavClickToView(photo.id)}
              />
            </div>
          ))}
        </div>
      }
      <div className={styles.icons_container}>
        {navOpen ?
          <IoIosArrowUp 
            size={20}
            className={`${styles.header_icon} ${styles.open}`}
            onClick={handleNavOpen}
          /> 
          :
          <IoIosMenu  
            size={20}
            className={styles.header_icon}
            onClick={handleNavOpen}
          />
        }
      </div>
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
      <span className={navOpen ?`${styles.header_content_left} ${styles.open}` : styles.header_content_left}>By&nbsp;
        <Link 
          href="https://seojeongkim.com" 
          target="_blank"
        >
          @JENNYKIM
        </Link>
      </span>
      <span className={navOpen ? `${styles.header_content_right} ${styles.open}` : styles.header_content_right}>With Fuji Quicksnap</span>
    </header>
  )
}
