import { Photo } from '@/lib/types';
// styles
import styles from './Navigation.module.css'

type NavigationProps = {
  photos: Photo[];
  counts: number;
  activeId: number | null;
  handleClick: (id: number) => void;
}

export default function Navigation({ photos, counts, activeId, handleClick }: NavigationProps) {

  return (
    <div className={styles.container}>
      {photos.map((photo, index) => (
        <div 
          onClick={() => handleClick(photo.id)}
          className={`${styles.indicator} ${activeId === photo.id ? styles.active : ''}`}
          key={index}
          style={{ transform: `rotate(${(index * (360 / counts))}deg)` }}
        >
          <div className={styles.id}>
            {photo.id.toString().padStart(2, '0')}
          </div>
          <div className={styles.id_line}></div>
        </div>
      ))}
    </div>
  )
}
