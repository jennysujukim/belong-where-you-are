import { Photo } from "@/lib/types"
// styles
import styles from './Descriptions.module.css'

type DescriptionsProps = {
  photos: Photo[];
  activeId: number | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export default function Descriptions({ photos, activeId, setOpen, open }: DescriptionsProps) {

  const activePhoto = photos.find((photo) => (photo.id === activeId))
  const formattedId = activePhoto?.id.toString().padStart(2, '0');
  
  return (
    <div className={open ? `${styles.container} ${styles.active}` : styles.container}>
      {activePhoto &&
        <div 
          className={styles.content}
          onClick={() => setOpen(true)}
        >
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
