import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

export type TrackInfo = {
  id: number;
  name: string;
  region: string;
  /** 실제 트랙의 궤적 데이터 (예: GeoJSON 또는 점 배열) */
  path: { x: number; y: number }[];
};

export type SubmissionResult = {
  score: number;
  normalizedUserPath: { x: number; y: number }[]; // 채점 후 정규화된 사용자 궤적
  normalizedOfficialPath: { x: number; y: number }[];
  hausdorffDistance: number;
  /** 채점 후 비교 이미지를 프론트에서 렌더링하기 위한 데이터(옵션) */
};

export const getTrackList = async (): Promise<TrackInfo[]> => {
  const res = await api.get("/tracks");
  return res.data;
};

export const getTrackDetail = async (trackId: number): Promise<TrackInfo> => {
  const res = await api.get(`/tracks/${trackId}`);
  return res.data;
};

/** 사용자가 그린 궤적을 서버로 전송하여 채점 → 결과 반환 */
export const submitDrawing = async (
  trackId: number,
  userPath: { x: number; y: number }[]
): Promise<SubmissionResult> => {
  const res = await api.post(`/tracks/${trackId}/submit`, { userPath });
  return res.data;
};

/** 리더보드 조회 */
export type LeaderboardEntry = {
  username: string;
  score: number;
  recordedAt: string;
};
export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const res = await api.get("/leaderboard");
  return res.data;
};
