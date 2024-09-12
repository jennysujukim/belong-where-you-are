"use client"

import { useEffect, useState } from "react";
import { Photo } from "@/lib/types";
// components
import Descriptions from "../Descriptions";
import Indicator from "../Indicator";
import AllPhotos from "../AllPhotos";
// styles 
import styles from './ClientWrapper.module.css';

type ClientWrapperProps = {
  photos: Photo[];
}

export default function ClientWrapper({ photos }: ClientWrapperProps) {

  const [ activeId, setActiveId ] = useState<number | null>(null)
  const [ open, setOpen ] = useState<boolean>(false)

  // GO BACK TO THE TOP WHEN REFRESHING //
  useEffect(() => {
    const target = document.getElementById("photo_1")

    if(target){
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <div className={styles.photo_indicator}>
        <Descriptions 
          photos={photos} 
          activeId={activeId}
          setOpen={setOpen}
          open={open}
        />
        <Indicator 
          photos={photos} 
          counts={photos.length} 
          activeId={activeId} 
          handleOpen={handleOpen}
        />
      </div>
      <AllPhotos 
        photos={photos} 
        setActiveId={setActiveId} 
        setOpen={setOpen}
        open={open}
      /> 
    </>
  )
}
