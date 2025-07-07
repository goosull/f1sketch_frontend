"use client";

import { Box, Spinner, VStack, Center } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ScoreBoard, Toaster, toaster } from "@/components";
import axios from "axios";
import { useTranslation } from "react-i18next";

type Point = { x: number; y: number };

interface Props {
  trackId: number;
}

export default function DrawingCanvas({ trackId }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [path, setPath] = useState<Point[]>([]);
  const [mouseUpCount, setMouseUpCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation();

  // 캔버스 초기 설정
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    ctx.fillStyle = "#ffffff  ";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
  }, []);

  // 마우스/터치 이벤트 핸들러
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (mouseUpCount > 0) return; // 이미 펜을 뗐다면 금지
    setDrawing(true);
    const { offsetX, offsetY } = getEventPos(e);
    setPath([{ x: offsetX, y: offsetY }]);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    const { offsetX, offsetY } = getEventPos(e);
    setPath((prev) => {
      const newPath = [...prev, { x: offsetX, y: offsetY }];
      // 실제 캔버스에 선 그리기
      const canvas = canvasRef.current;
      if (!canvas) return newPath;
      const ctx = canvas.getContext("2d")!;
      ctx.beginPath();
      const last = prev[prev.length - 1];
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      return newPath;
    });
  };

  const endDrawing = () => {
    if (!drawing) return;
    setDrawing(false);
    setMouseUpCount((c) => c + 1);
    console.log(path.map(({ x, y }) => [x, y]));
    handleSubmit();
  };

  const getEventPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const yFromTop = clientY - rect.top;

    const offsetY = canvas.height - yFromTop;
    return { offsetX: x, offsetY };
  };

  const handleSubmit = async () => {
    if (submitted) return;
    setIsLoading(true);
    axios
      .post("/api/submission", {
        user_path_json: path.map(({ x, y }) => [x, y]),
        track_id: trackId,
      })
      .then((response) => {
        toaster.create({
          type: "ok",
          description: t("toast.submitok"),
          closable: true,
        });
        const simulatedScore = response.data.score;
        setScore(simulatedScore);
        setSubmissionId(response.data.id);
        setSubmitted(true);
      })
      .catch(() => {
        toaster.create({
          type: "not-ok",
          description:
            t("toast.submitnotok") ||
            "There was an error submitting your drawing. Please try again.",
          closable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleReset = () => {
    setDrawing(false);
    setPath([]);
    setMouseUpCount(0);
    setSubmitted(false);
    setScore(0);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleLeaderboard = (username: string) => {
    console.log("Submitting to leaderboard with nickname:", username);
    if (!username.trim()) return;
    if (!submissionId) {
      toaster.create({
        description:
          t("toast.submissionnotfound") ||
          "Please submit your drawing before submitting to the leaderboard.",
        type: "not-ok",
        closable: true,
      });
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/leaderboard", {
        username: username.trim(),
        submissionId: submissionId,
      })
      .then(() => {
        toaster.create({
          description:
            t("toast.leaderboardok") || "Leaderboard Submission Completed!",
          closable: true,
          type: "ok",
          action: {
            label: i18n.language === "ko" ? "리더보드" : "View Leaderboard",
            onClick: () => {
              router.push(`/leaderboard?trackId=${trackId}`);
            },
          },
        });
        setSubmitted(true);
      })
      .catch(() => {
        toaster.create({
          type: "not-ok",
          description:
            t("toast.leaderboardnotok") ||
            "There was an error submitting to the leaderboard. Please try again.",
          closable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <VStack gap={4} align="center" borderRadius="xl">
      {isLoading && (
        <Box pos="absolute" inset="0" bg="bg/80" zIndex={1000}>
          <Center h="full">
            <Spinner size="xl" color="themeRed" />
          </Center>
        </Box>
      )}
      <Box
        p={4}
        bg="bg"
        borderRadius="xl"
        onMouseDown={startDrawing}
        onTouchStart={startDrawing}
        onMouseMove={draw}
        onTouchMove={draw}
        onMouseUp={endDrawing}
        onTouchEnd={endDrawing}
      >
        <Box
          borderWidth={1}
          borderColor="border"
          borderRadius="xl"
          overflow="hidden"
          w="full" // 너비를 100%
          minW="802px" // 최소 너비
          maxW="802px" // 최대 너비
          h="600px"
          position="relative"
        >
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        {!!submitted && (
          <ScoreBoard
            score={score}
            onLeaderboard={handleLeaderboard}
            onReset={handleReset}
          />
        )}
      </Box>
      <Toaster />
    </VStack>
  );
}
