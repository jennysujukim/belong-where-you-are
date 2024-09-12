import { Photo } from '@/lib/types';
// styles
import styles from './Indicator.module.css'

type IndicatorProps = {
  photos: Photo[];
  counts: number;
  activeId: number | null;
  handleOpen: () => void;
}

export default function Indicator({ photos, counts, activeId, handleOpen }: IndicatorProps) {

  const activeIndex = photos.findIndex((photo) => photo.id === activeId);
  const rotationDegree = activeIndex !== -1 ? -(activeIndex * (360 / counts)) : 0; 

  return (
    <div 
      className={styles.container} 
      onClick={handleOpen}
      style={{ transform: `rotate(${rotationDegree}deg)`}}
    >
      {photos.map((photo, index) => (
        <div 
          className={`${styles.indicator} ${activeId === photo.id ? styles.active : ''}`}
          key={index}
          style={{ transform: `rotate(${(index * (360 / counts))}deg)` }}
        >
          <div className={styles.id}>
            {photo.id.toString().padStart(2, '0')}
          </div>
        </div>
      ))}
    </div>
  )
}
