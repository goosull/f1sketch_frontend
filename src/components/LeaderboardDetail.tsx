import React, { useRef, useEffect } from "react";
import { Box, Text, Spinner, Center } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import axios from "axios";
import { Submission, Point, Track } from "@/shared";
import { useTranslation } from "react-i18next";

interface LeaderboardDetailProps {
  id: string;
}

export function LeaderboardDetail({ id }: LeaderboardDetailProps) {
  const [submission, setSubmission] = React.useState<Submission | null>(null);
  const [track, setTrack] = React.useState<Track | null>(null);
  const [submissionLoaded, setSubmissionLoaded] = React.useState(false);
  const [trackLoaded, setTrackLoaded] = React.useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setSubmissionLoaded(false);
    axios
      .get<Submission>(`/api/submission/${id}`)
      .then((res) => setSubmission(res.data))
      .catch(console.error)
      .finally(() => setSubmissionLoaded(true));
  }, [id]);

  useEffect(() => {
    if (submission) {
      setTrackLoaded(false);
      axios
        .get<Track>(`/api/track/${submission.track_id}`)
        .then((res) => setTrack(res.data))
        .catch(console.error)
        .finally(() => setTrackLoaded(true));
    }
  }, [submission]);

  return (
    <Box p={2} bg="bg" borderRadius="xl" boxShadow="md">
      <Box bg="box" p={6} borderRadius="xl" boxShadow="lg" overflow="hidden">
        {!submissionLoaded || !trackLoaded || !submission ? (
          <Box inset="0">
            <Center height={600}>
              <Spinner size="xl" color="themeRed" />
            </Center>
          </Box>
        ) : (
          <>
            <Text fontSize="xl" fontWeight="bold" mb={4} color="text">
              {submission?.username}
              {t("leaderboard.detail")}
              {i18n.language === "ko" ? track?.name_ko : track?.name_en}
            </Text>
            <Box
              display="flex"
              justifyContent="center"
              borderRadius="xl"
              overflow="hidden"
            >
              <PathCanvas
                points={submission.user_path}
                width={800}
                height={600}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
type RawPoint = Point | { x: number; y: number } | { lat: number; lng: number };

interface PathCanvasProps {
  points: RawPoint[];
  width: number;
  height: number;
}

const PathCanvas: React.FC<PathCanvasProps> = ({ points, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colorMode } = useColorMode();

  // 다양한 Point 타입을 { x, y } 로 변환
  const toXY = (pt: RawPoint): { x: number; y: number } => {
    if (Array.isArray(pt) && pt.length >= 2) {
      return { x: pt[0], y: pt[1] };
    }
    if ("x" in pt && "y" in pt) {
      return { x: pt.x, y: pt.y };
    }
    if ("lat" in pt && "lng" in pt) {
      return { x: pt.lng, y: pt.lat };
    }
    throw new Error("Unsupported Point format");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 원본 좌표 → 캔버스 좌표로 매핑 (Y만 뒤집기)
    const mapped = points.map(toXY).map((p) => ({
      x: p.x,
      y: height - p.y,
    }));
    if (mapped.length < 2) return;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(mapped[0].x, mapped[0].y);

    // quadraticCurveTo(midpoint) 방식으로 스무스 곡선
    for (let i = 1; i < mapped.length; i++) {
      const prev = mapped[i - 1];
      const curr = mapped[i];
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
    }
    // 마지막 점으로 라인 연결
    const last = mapped[mapped.length - 1];
    ctx.lineTo(last.x, last.y);

    ctx.strokeStyle = colorMode === "dark" ? "#F87171" : "text";
    ctx.lineWidth = 3;
    ctx.stroke();
  }, [points, width, height, colorMode]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};
