export interface Point {
  x: number;
  y: number;
}

export interface Track {
  id: string;
  name_ko: string;
  name_en: string;
  description_ko: string;
  description_en: string;
  path_json: Point[];
  region_ko: string;
  region_en: string;
  image_url: string;
}
