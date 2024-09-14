"use client"

import { useEffect, useState, useCallback, useRef } from "react";
import { Photo } from "@/lib/types";
// components
import Descriptions from "../Descriptions";
import Indicator from "../Indicator";
import AllPhotos from "../AllPhotos";
import Header from "../Header";
// styles 
import styles from './ClientWrapper.module.css';

type ClientWrapperProps = {
  photos: Photo[];
}

export default function ClientWrapper({ photos }: ClientWrapperProps) {

  const [ activeId, setActiveId ] = useState<number | null>(null)
  const [ open, setOpen ] = useState<boolean>(false)
  const [ navOpen, setNavOpen ] = useState<boolean>(false) 

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleNavOpen = () => {
    setNavOpen(!navOpen)
  }

  // SCROLL INTERACTION //
  const currentIndexRef = useRef<number>(0); 
  const [scrolling, setScrolling] = useState<boolean>(false);

  const handleScroll = useCallback((e: WheelEvent) => {

    const prevSlide = () => {
      const newIndex = currentIndexRef.current === 0 ? photos.length - 1 : currentIndexRef.current - 1;
      currentIndexRef.current = newIndex;
      
      const target = document.getElementById(`photo_${photos[newIndex].id}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const nextSlide = () => {
      const newIndex = currentIndexRef.current === photos.length - 1 ? 0 : currentIndexRef.current + 1;
      currentIndexRef.current = newIndex;

      const target = document.getElementById(`photo_${photos[newIndex].id}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (scrolling || open || navOpen) return;

    setScrolling(true);

    if (e.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    setTimeout(() => setScrolling(false), 300);

  }, [scrolling, open, navOpen, photos]);
  

  const handleKeydown = useCallback((e: KeyboardEvent) => {

    const prevSlide = () => {
      const newIndex = currentIndexRef.current === 0 ? photos.length - 1 : currentIndexRef.current - 1;
      currentIndexRef.current = newIndex;
      
      const target = document.getElementById(`photo_${photos[newIndex].id}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const nextSlide = () => {
      const newIndex = currentIndexRef.current === photos.length - 1 ? 0 : currentIndexRef.current + 1;
      currentIndexRef.current = newIndex;

      const target = document.getElementById(`photo_${photos[newIndex].id}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (open || navOpen) return;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextSlide();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      prevSlide();
    }

  },[open, navOpen, photos]);


  useEffect(() => {
    if (!open || !navOpen) {
      window.addEventListener('wheel', handleScroll);
      window.addEventListener('keydown', handleKeydown);
    } else {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeydown);
    }

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [scrolling, open, navOpen, handleKeydown, handleScroll]);


  const handleClickToNextSlide = () => {
    if(open || navOpen) {
      return;
    } else {
      const newIndex = currentIndexRef.current === photos.length - 1 ? 0 : currentIndexRef.current + 1;
      currentIndexRef.current = newIndex;

      const target = document.getElementById(`photo_${photos[newIndex].id}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  const handleNavClickToView = (id: number) => {
    const index = photos.findIndex(photo => photo.id === id);
  
    if (index !== -1) {
      currentIndexRef.current = index;
      const target = document.getElementById(`photo_${id}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  return (
    <>
      <Header 
        photos={photos}
        handleNavOpen={handleNavOpen}
        navOpen={navOpen}
        handleNavClickToView={handleNavClickToView}
      />
      <main>
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
          setNavOpen={setNavOpen}
          handleClickToNextSlide={handleClickToNextSlide}
        /> 
      </main>
    </>
  )
}
