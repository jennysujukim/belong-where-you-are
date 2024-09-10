"use client";

import Image from "next/image";

interface ContentfulImageProps {
  src: string;
  quality?: number;
}

const contentfulLoader = ({ src, quality }: ContentfulImageProps) => {
  return `${src}?&q=${quality || 75}`;
};

export default function ContentfulImage(props: ContentfulImageProps) {
  return <Image 
      alt={props.src} 
      height={1000}
      width={1000}
      loader={contentfulLoader} 
      {...props}
      style={{ height: "auto", width: '100vw' }}
    />;
}