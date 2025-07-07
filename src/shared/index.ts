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

export interface Submission {
  id: string;
  track_id: string;
  username?: string;
  user_path: Point[];
  official_path: Point[];
  score: number;
  hausdorff: number;
  normalized_user_path: Point[];
  created_at: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  accuracy: number;
  submission_id: string;
}
