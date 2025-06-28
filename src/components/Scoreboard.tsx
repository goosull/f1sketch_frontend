"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  VStack,
  Heading,
  Text,
  Progress,
  Button,
  Center,
  Input,
  HStack,
} from "@chakra-ui/react";

interface ScoreBoardProps {
  score: number;
  onLeaderboard?: (nickname: string) => void;
  onReset?: () => void;
}

export default function ScoreBoard({
  score,
  onLeaderboard,
  onReset,
}: ScoreBoardProps) {
  const [nickname, setNickname] = useState("");
  const [leaderboardSubmitted, setLeaderboardSubmitted] = useState(false);
  const router = useRouter();

  return (
    <Center
      position="absolute"
      minWidth="360px"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      borderRadius="xl"
      shadow="xs"
      zIndex={1000}
    >
      <Box
        maxW="sm"
        w="100%"
        p={6}
        textAlign="center"
        borderRadius="xl"
        bg="box"
        shadow="md"
      >
        <VStack gap={6} align="center">
          <Heading size="2xl" color="text">
            Your Score
          </Heading>
          <Heading size="6xl" color="themeRed">
            {score}
            <span style={{ fontSize: "2xl" }}>%</span>
          </Heading>

          <Box w="100%" display="flex" flexDirection="column" gap={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              fontSize="sm"
              fontWeight="medium"
            >
              <Text>Accuracy</Text>
              <Text>{score}%</Text>
            </Box>
            <Progress.Root
              value={score}
              size="lg"
              colorScheme="red"
              borderRadius="md"
              mt={2}
            >
              <Progress.Track flex="1" borderRadius={"xl"} bg="gray.200">
                <Progress.Range bg="themeRed" borderRadius="xl" />
              </Progress.Track>
            </Progress.Root>

            <Input
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              marginTop="6"
            />
            <Button
              bg="themeRed"
              _hover={{ bg: "red.600" }}
              w="100%"
              disabled={!nickname.trim() || leaderboardSubmitted}
              onClick={() => {
                if (onLeaderboard) {
                  onLeaderboard(nickname.trim());
                }
                setLeaderboardSubmitted(true);
              }}
            >
              Submit to Leaderboard
            </Button>
            <HStack justifyContent="space-between" w="100%">
              <Button
                variant="outline"
                colorPalette="gray"
                flex={1}
                onClick={() => router.push("/")}
              >
                Main Menu
              </Button>
              <Button
                variant="outline"
                colorPalette="gray"
                flex={1}
                onClick={onReset}
              >
                Draw Again
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
}
