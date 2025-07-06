"use client";

import { DrawingCanvas, TrackImage } from "@/components";
import {
  Flex,
  Box,
  Heading,
  Text,
  Spinner,
  Center,
  HStack,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import { Track } from "@/shared";
import axios from "axios";
import { useTranslation } from "react-i18next";

const fadeIn = keyframes`
   from { opacity: 0; }
  to   { opacity: 1; }
`;

export default function Home() {
  const pathname = usePathname();
  const trackId = Number(pathname?.split("/")[1]) || 1;
  const [track, setTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<Track>(`/api/track/${trackId}`)
      .then((res) => {
        setTrack(res.data);
        setImageLoaded(false);
      })
      .catch((error) => {
        console.error("Error fetching track data:", error);
        setTrack(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [trackId]);

  useEffect(() => {
    if (!track?.image_url) return;
    const img = new window.Image();
    img.src = track.image_url;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, [track?.image_url]);

  useEffect(() => {
    if (imageLoaded) {
      setReveal(true);

      const timer = setTimeout(() => setReveal(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);

  return (
    <Flex
      maxH="87vh"
      justify="center"
      align="center"
      px={{ base: 4, sm: 6, lg: 8 }}
      py={10}
      bg={"bg"}
    >
      {isLoading ? (
        <Box pos="absolute" inset="0" bg="bg/80">
          <Center h="full">
            <Spinner size="xl" color="themeRed" />
          </Center>
        </Box>
      ) : (
        <Box
          pos="relative"
          w="full"
          maxW="8xl"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          boxShadow="xl"
          bg="box"
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
        >
          <Heading
            as="h2"
            fontSize={{ base: "xl", md: "2xl" }}
            color="themeRed"
          >
            {i18n.language === "ko" ? track?.region_ko : track?.region_en}
          </Heading>

          {reveal && (
            <HStack
              gap={6}
              pointerEvents="none"
              position="absolute"
              top={7}
              left="50%"
              transform="translateX(-50%)"
              bg="bg"
              boxShadow="md"
              borderWidth={1}
              p={2}
              borderRadius="full"
            >
              {[...Array(5)].map((_, i) => (
                <Box
                  key={i}
                  w={8}
                  h={8}
                  bg="themeRed"
                  borderRadius="full"
                  opacity={0}
                  animation={`${fadeIn} 0s ease-in ${i}s forwards`}
                />
              ))}
            </HStack>
          )}

          <Text fontSize="md" color="text_secondary" my={6}>
            {i18n.language === "ko"
              ? track?.description_ko
              : track?.description_en}
          </Text>
          {reveal ? (
            <TrackImage url={track?.image_url || ""} />
          ) : (
            <DrawingCanvas trackId={trackId} />
          )}
        </Box>
      )}
    </Flex>
  );
}
