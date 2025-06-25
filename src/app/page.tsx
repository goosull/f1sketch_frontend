"use client";
import { Flex } from "@chakra-ui/react";
import { TrackSelector } from "@/components";

export default function Page() {
  return (
    <Flex
      h="100vh"
      maxH="87vh"
      align="center"
      justify="center"
      px={{ base: 4, sm: 6, lg: 8 }}
      py={10}
      bg="bg"
    >
      <TrackSelector />
    </Flex>
  );
}
