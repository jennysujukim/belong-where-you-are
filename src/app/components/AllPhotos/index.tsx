"use client"

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Photo } from "@/lib/types"
// styles 
import styles from './AllPhotos.module.css'

type AllPhotosProp = {
  photos: Photo[];
  setActiveId: (id: number | null) => void;
}

export default function AllPhotos({ photos, setActiveId }: AllPhotosProp) {

  const targetRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (targetRefs.current.length === 0) return;

    const options = {
      root: null,
      threshold: 0.5,
      rootMargin: "0px"
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) { setActiveId(parseInt(id.replace("photo_", ""), 10)) }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, options)
  
    targetRefs.current.forEach((ref) => {
      if (ref) { observer.observe(ref) }
    })

    return () => {
      targetRefs.current.forEach((ref) => {
        if (ref) { observer.unobserve(ref) }
      })
    }

  }, [photos])

  return (
    <div className={styles.images}>
      {photos.map((photo, index) => (
        <div
          key={index} 
          className={styles.image_container}
          id={`photo_${photo.id}`}
          ref={(el) => {targetRefs.current[index] = el}}
        >
          <Image
            className={styles.image}
            src={`${photo.image.url}?q=100`} 
            width={2000} 
            height={500} 
            alt="images"
            draggable="false"
          />
        </div>
      ))}
    </div>
  )
}
