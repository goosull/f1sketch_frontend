"use client";

import { Box, Heading, Center } from "@chakra-ui/react";
import { TrackSelector } from "@/components";

export default function Home() {
  return (
    <Center minH="100vh" bg="gray.50">
      <Box bg="white" p="8" rounded="md" shadow="md">
        <Heading mb="6" textAlign="center">
          F1 트랙 드로잉 챌린지
        </Heading>
        <TrackSelector />
      </Box>
    </Center>
  );
}
