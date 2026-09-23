export type WhatsOnItem = {
  id: string;
  title: string;
  detail: string;
};

export type Ale = {
  id: string;
  name: string;
  brewery: string;
  note: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
};

export type SiteContent = {
  whatsOn: WhatsOnItem[];
  ales: Ale[];
  quiz: {
    intro: string;
    nextDate: string;
    time: string;
    notes: string;
  };
  food: {
    fridayPizza: string;
    roasts: string;
  };
  hours: { day: string; hours: string }[];
  contact: {
    addressLines: string[];
    email: string;
    phone: string;
    website: string;
    location: string;
    mapQuery: string;
  };
  gallery: GalleryItem[];
};
