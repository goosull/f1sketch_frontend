"use client";

import { Box, Button, Text, VStack, HStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useEffect, useRef, useState } from "react";
import { submitDrawing } from "../utils/api";
import { useRouter } from "next/navigation";

type Point = { x: number; y: number };

interface Props {
  trackId: number;
  officialPath: Point[]; // 서버에서 받은 원본 트랙 궤적 (정규화 이전)
}

export default function DrawingCanvas({ trackId, officialPath }: Props) {
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
    // 캔버스 전체 검은 배경
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#fff";
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
  };

  // 이벤트 좌표 추출 함수 (마우스, 터치 공용)
  const getEventPos = (e: any) => {
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
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;
    return { offsetX, offsetY };
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

  const onReset = () => {
    // 캔버스 리셋
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 상태 초기화
    setPath([]);
    setMouseUpCount(0);
  };

  return (
    <VStack gap={4} align="center" mt="6">
      <Text fontSize="lg">
        한 붓 모드: 화면 어디든 클릭 후 마우스를 떼면 그리기는 종료됩니다.
      </Text>
      <Box
        border="2px solid #444"
        w="800px"
        h="600px"
        position="relative"
        onMouseDown={startDrawing}
        onTouchStart={startDrawing}
        onMouseMove={draw}
        onTouchMove={draw}
        onMouseUp={endDrawing}
        onTouchEnd={endDrawing}
      >
        <canvas ref={canvasRef} width={800} height={600} />
      </Box>
      <HStack gap={4}>
        <Button colorScheme="teal" onClick={onSubmit}>
          제출하기
        </Button>
        <Button onClick={onReset}>다시 그리기</Button>
      </HStack>
    </VStack>
  );
}
