export type Orphanage = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  contact: string;
  instructions: string;
  openOnWeekends: boolean;
  openingHours: string;
  images?: OrphanageImage[];
};

export type OrphanageImage = {
  id: string;
  path: string;
  orphanage?: Orphanage;
};
