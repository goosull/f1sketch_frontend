"use client";

import { Box, Button, Text, VStack, HStack } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { useToast } from "@chakra-ui/toast";
import { useEffect, useRef, useState } from "react";
import { submitDrawing } from "../utils/api";
import { useRouter } from "next/navigation";

type Point = { x: number; y: number };

interface Props {
  trackId: number;
}

export default function DrawingCanvas({ trackId }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [path, setPath] = useState<Point[]>([]);
  const [mouseUpCount, setMouseUpCount] = useState(0);
  const toast = useToast();
  const router = useRouter();

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

  // 제출 버튼 핸들러
  const onSubmit = async () => {
    if (mouseUpCount === 0) {
      toast({
        title: "한 붓으로 그려주세요.",
        status: "warning",
      });
      return;
    }
    if (!window.confirm("그림을 제출하시겠습니까?")) return;

    try {
      const result = await submitDrawing(trackId, path);
      // 채점 결과 화면으로 이동 (next/navigation 에서는 문자열 형태 URL만 허용)
      router.push(
        `/result/${trackId}?score=${result.score}&hausdorff=${result.hausdorffDistance}`
      );
    } catch (e) {
      console.error(e);
      toast({
        title: "제출 중 오류가 발생했습니다.",
        status: "error",
      });
    }
  };

  return (
    <VStack gap={4} align="center" borderRadius="xl">
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
          maxW="800px" // 최대 너비
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
      </Box>
    </VStack>
  );
}
