"use client";

import { Box, VStack, Image } from "@chakra-ui/react";

import { Toaster } from "@/components";

interface Props {
  url: string;
}

export default function TrackImage({ url }: Props) {
  return (
    <VStack gap={4} align="center" borderRadius="xl">
      <Box p={4} bg="bg" borderRadius="xl">
        <Box
          borderWidth={1}
          borderColor="border"
          borderRadius="xl"
          overflow="hidden"
          w="full" // 너비를 100%
          minW="800px" // 최소 너비
          maxW="800px" // 최대 너비
          h="600px"
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="white"
        >
          <Image src={url} alt="Track Image" h="full" objectFit="cover" />
        </Box>
      </Box>
      <Toaster />
    </VStack>
  );
}
