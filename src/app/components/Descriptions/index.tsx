"use client"

import { useState } from "react"
// styles
import styles from './Descriptions.module.css'

type DescriptionsProps = {
  id: number;
  date: string;
  location: string;
  description: string;
}

export default function Descriptions({ id, date, location, description }: DescriptionsProps) {
  
  const [ isOpen, setIsOpen ] = useState<boolean>(false)

  const handleOpen = () => {
    setTimeout(() => (
      setIsOpen(true)
    ), 500)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const formattedId = id.toString().padStart(2, '0');
  
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
            <p className={styles.location}>{location}</p>
            <p className={styles.date}>{date}</p>
          </div>
          <div className={styles.content_description}>
            <p>{description}</p>
          </div>
        </div>
      }
    </div>
  )
}
