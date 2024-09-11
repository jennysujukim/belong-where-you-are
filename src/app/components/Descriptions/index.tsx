"use client"

import { useState } from "react"
import { Photo } from "@/lib/types"
// styles
import styles from './Descriptions.module.css'

type DescriptionsProps = {
  photos: Photo;
}

export default function Descriptions({ photos }: DescriptionsProps) {
  
  const [ isOpen, setIsOpen ] = useState<boolean>(false)

  const handleOpen = () => {
    setTimeout(() => (
      setIsOpen(true)
    ), 500)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const formattedId = photos.id.toString().padStart(2, '0');
  
  return (
    <div 
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      className={styles.container}
    >
      <p className={styles.cta}>Hover to read more.</p>
      {isOpen &&
        <div className={styles.content}>
          <div className={styles.content_main}>
            <span className={styles.id}>{formattedId}</span>
            <p className={styles.location}>{photos.location}</p>
            <p className={styles.date}>{photos.date}</p>
          </div>
          <div className={styles.content_description}>
            <p>{photos.description}</p>
          </div>
        </div>
      }
    </div>
  )
}
