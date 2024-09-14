"use client"

import { useEffect, useState, useCallback } from "react";
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
  const [ currentIndex, setCurrentIndex ] = useState<number>(0);
  const [scrolling, setScrolling] = useState<boolean>(false);

  // Throttle function for smooth scrolling
  // const throttle = (func: (...args: any[]) => void, delay: number) => {
  //   let lastCall = 0;
  //   return (...args: any[]) => {
  //     const now = new Date().getTime();
  //     if (now - lastCall < delay) return;
  //     lastCall = now;
  //     func(...args);
  //   };
  // };

  const prevSlide = () => {
  setCurrentIndex((prevIndex) => {
    const newIndex = prevIndex === 0 ? photos.length - 1 : prevIndex - 1;
    
    const target = document.getElementById(`photo_${photos[newIndex].id}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return newIndex;
  });
};

const nextSlide = () => {
  setCurrentIndex((prevIndex) => {
    const newIndex = prevIndex === photos.length - 1 ? 0 : prevIndex + 1;

    const target = document.getElementById(`photo_${photos[newIndex].id}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return newIndex;
  });
};

  // const handleScroll = (event: WheelEvent) => {
  //   if (scrolling || open || navOpen) return;

  //   setScrolling(true);

  //   if (event.deltaY > 0) {
  //     nextSlide();
  //   } else {
  //     prevSlide();
  //   }

  //   setTimeout(() => setScrolling(false), 300); // shorter delay
  // };

  // const handleKeydown = (event: KeyboardEvent) => {
  //   if (open || navOpen) return;

  //   if (event.key === "ArrowRight" || event.key === "ArrowDown") {
  //     nextSlide()
  //   } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
  //     prevSlide()
  //   }
  // };

    const handleScroll = useCallback(
    (event: WheelEvent) => {
      if (scrolling || open || navOpen) return;

      setScrolling(true);

      if (event.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }

      setTimeout(() => setScrolling(false), 300); // shorter delay
    },
    [scrolling, open, navOpen, nextSlide, prevSlide]
  );

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (open || navOpen) return;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextSlide();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        prevSlide();
      }
    },
    [open, navOpen, nextSlide, prevSlide]
  );


  useEffect(() => {
    // const throttledScroll = throttle(handleScroll, 300);

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
      nextSlide()
    }
  }

  const handleNavClickToView = (id: number) => {
    const index = photos.findIndex(photo => photo.id === id);
  
    if (index !== -1) {
      const target = document.getElementById(`photo_${id}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setCurrentIndex(index);
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
          open={open}
          handleClickToNextSlide={handleClickToNextSlide}
          currentIndex={currentIndex}
        /> 
      </main>
    </>
  )
}
