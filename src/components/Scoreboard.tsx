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
  Clipboard,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FiShare2 } from "react-icons/fi";
import { Track } from "@/shared";

interface ScoreBoardProps {
  track?: Track; // Optional track prop for sharing
  score: number;
  onLeaderboard?: (nickname: string) => void;
  onReset?: () => void;
}

export default function ScoreBoard({
  track,
  score,
  onLeaderboard,
  onReset,
}: ScoreBoardProps) {
  const [nickname, setNickname] = useState("");
  const [leaderboardSubmitted, setLeaderboardSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation();

  return (
    <Center
      position="absolute"
      minWidth="360px"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      borderRadius="xl"
      shadow="xs"
      zIndex={50}
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
            {t("scoreboard.title")}
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
              color="text_secondary"
            >
              <Text>{score}%</Text>
              <Clipboard.Root
                value={t("scoreboard.sharetext", {
                  track:
                    i18n.language === "ko" ? track?.name_ko : track?.name_en,
                  score: score,
                  trackId: track?.id,
                })}
              >
                <Clipboard.Trigger
                  textStyle="label"
                  display={"flex"}
                  alignItems="center"
                  gap={1}
                  color="text_secondary"
                  _hover={{ color: "themeRed" }}
                  transition="color 0.15s"
                  cursor={"pointer"}
                  onClick={() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 5000);
                  }}
                >
                  {copied ? t("scoreboard.copied") : t("scoreboard.copy")}
                  <FiShare2 />
                </Clipboard.Trigger>
              </Clipboard.Root>
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
              placeholder={t("scoreboard.nickname")}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              marginTop="6"
              borderColor="text_secondary"
              _placeholder={{ color: "text_secondary" }}
              color="text"
              _focus={{ outline: "none", borderColor: "themeRed" }}
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
              {t("scoreboard.submit")}
            </Button>
            <HStack justifyContent="space-between" w="100%">
              <Button
                variant="outline"
                flex={1}
                onClick={() => router.push("/")}
                color="text_secondary"
                _hover={{
                  color: "themeRed",
                  backgroundColor: "transparent",
                  borderColor: "themeRed",
                }}
              >
                {t("scoreboard.main")}
              </Button>
              <Button
                variant="outline"
                flex={1}
                color="text_secondary"
                _hover={{
                  color: "themeRed",
                  backgroundColor: "transparent",
                  borderColor: "themeRed",
                }}
                onClick={onReset}
              >
                {t("scoreboard.retry")}
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
}
