import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { getAllPhotos, getPhoto } from "@/lib/api";
// components
import Header from "./components/Header";
import Descriptions from "./components/Descriptions";
import Navigation from "./components/Navigation";

export default async function Home() {

  const photos = await getAllPhotos();
  const numberOfPhotos = photos.length;
  const photo = await getPhoto(2);

  const images = photo.image.url;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.photo_content}>
          <Descriptions 
            id={photo.id}
            date={photo.date}
            location={photo.location}
            description={photo.description}
          />
        </div>
        <div className={styles.photo_navigation}>
          <Navigation counts={numberOfPhotos} />
        </div>
        <div className={styles.image_container}>
          <Image 
            className={styles.image}
            src={`${images}?q=100`} 
            width={2000} 
            height={500} 
            alt="images"
          />
        </div>
      </main>
    </div>
  );
}
