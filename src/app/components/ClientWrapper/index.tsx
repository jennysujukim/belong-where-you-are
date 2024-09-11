"use client"
import { useState } from "react";
import { Photo } from "@/lib/types";
// components
import Descriptions from "../Descriptions";
import Navigation from "../Navigation";
import AllPhotos from "../AllPhotos";
// styles 
import styles from './ClientWrapper.module.css';

type ClientWrapperProps = {
  photos: Photo[];
}

export default function ClientWrapper({ photos }: ClientWrapperProps) {

  const [ activeId, setActiveId ] = useState<number | null>(null)

  const handleClick = (id: number) => {
    const target = document.getElementById(`photo_${id}`)

    if(target){
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <>
      <div className={styles.photo_content}>
        <Descriptions photos={photos} activeId={activeId} />
      </div>
      <div className={styles.photo_navigation}>
        <Navigation 
          photos={photos} 
          counts={photos.length} 
          activeId={activeId} 
          handleClick={handleClick}
        />
      </div>
      <AllPhotos photos={photos} setActiveId={setActiveId} /> 
    </>
  )
}
