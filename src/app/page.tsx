import React from "react";
import styles from "./page.module.css";
import { getAllPhotos, getPhoto } from "@/lib/api";
// components
import Header from "./components/Header";
import Descriptions from "./components/Descriptions";
import Navigation from "./components/Navigation";
import AllPhotos from "./components/AllPhotos";

export default async function Home() {

  const photos = await getAllPhotos();
  const sortedPhotos = photos.sort((a, b) => a.id - b.id);
  const numberOfPhotos = photos.length;
  
  const photo = await getPhoto(1);


  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.photo_content}>
          <Descriptions photos={photo} />
        </div>
        <div className={styles.photo_navigation}>
          <Navigation counts={numberOfPhotos} />
        </div>
        <AllPhotos photos={sortedPhotos} /> 
      </main>
    </div>
  );
}
