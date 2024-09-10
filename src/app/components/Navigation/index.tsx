import styles from './Navigation.module.css'

type NavigationProps = {
  counts: number;
}

export default function Navigation({ counts }: NavigationProps) {
  return (
    <div className={styles.container}>
      {
        Array.from({ length: counts }, (_, index) => (
          <div 
            className={styles.indicator}
            key={index}
            style={{ transform: `rotate(${(index * (360 / counts))}deg)` }}
          >
            <div className={styles.id}>
              {(index + 1).toString().padStart(2, '0')}
            </div>
            <div className={styles.id_line}></div>
          </div>
        ))
      }
    </div>
  )
}
