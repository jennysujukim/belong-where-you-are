export interface Sys {
  id: string;
}

export interface Image {
  sys: Sys;
  url: string;
}


export interface Photo {
  sys: Sys;
  id: number;
  slug: string;
  location: string;
  date: string;
  description: string;
  image: Image;
}

export interface PhotoCollection {
  items: Photo[];
}

export interface FetchResponse {
  data: {
    photoCollection: PhotoCollection;
  };
}