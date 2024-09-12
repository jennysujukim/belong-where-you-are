import React from "react";
import { getAllPhotos } from "@/lib/api";
// components
import Header from "./components/Header";
import ClientWrapper from "./components/ClientWrapper";
// styles
import styles from "./page.module.css";

export default async function Home() {

  const photos = await getAllPhotos();
  const sortedPhotos = photos.sort((a, b) => a.id - b.id);

  return (
    <div className={styles.page}>
      <Header />
      <main>
        <ClientWrapper photos={sortedPhotos} />
      </main>
    </div>
  );
}
