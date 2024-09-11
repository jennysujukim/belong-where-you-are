"use client"

import { useState } from "react"
import { Photo } from "@/lib/types"
// styles
import styles from './Descriptions.module.css'

type DescriptionsProps = {
  photos: Photo[];
  activeId: number | null;
}

export default function Descriptions({ photos, activeId }: DescriptionsProps) {
  
  const [ isOpen, setIsOpen ] = useState<boolean>(false)

  const handleOpen = () => {
    setTimeout(() => (
      setIsOpen(true)
    ), 500)
  }

  const handleClose = () => { setIsOpen(false) }


  const activePhoto = photos.find((photo) => (photo.id === activeId))
  const formattedId = activePhoto?.id.toString().padStart(2, '0');
  
  return (
    <div 
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      className={styles.container}
    >
      <p className={styles.cta}>Hover to read more.</p>
      {activePhoto && isOpen &&
        <div className={styles.content}>
          <div className={styles.content_main}>
            <span className={styles.id}>{formattedId}</span>
            <p className={styles.location}>{activePhoto.location}</p>
            <p className={styles.date}>{activePhoto.date}</p>
          </div>
          <div className={styles.content_description}>
            <p>{activePhoto.description}</p>
          </div>
        </div>
      }
    </div>
  )
}
