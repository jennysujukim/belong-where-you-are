import Image from "next/image";
import styles from "./page.module.css";
import { getAllPhotos } from "@/lib/api";

export default async function Home() {

  const photos = await getAllPhotos();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {photos.map((photo, index) => (
          <div key={index}>
            <p>{photo.date}</p>
            <Image src={photo.image.url} width={500} height={500} alt="image test" />
          </div>
        ))
        }
      </main>
    </div>
  );
}
