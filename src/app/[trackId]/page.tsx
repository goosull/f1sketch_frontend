"use client";

import { DrawingCanvas } from "@/components";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      maxH="87vh"
      justify="center"
      align="center"
      px={{ base: 4, sm: 6, lg: 8 }}
      py={10}
      bg={"bg"}
    >
      <Box
        w="full"
        maxW="8xl"
        p={{ base: 6, md: 8 }}
        borderRadius="xl"
        boxShadow="xl"
        bg={"box"}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <Heading
          as="h2"
          fontSize={{ base: "xl", md: "2xl" }}
          color="themeRed"
          mb={2}
        >
          Monza
        </Heading>
        <Text fontSize="md" color="text_secondary" mb={6}>
          Monza Circuit, dubbed the &quot;Temple of Speed,&quot; is
          characterized by its long straights and tight chicanes, demanding
          low-downforce setups and exceptional braking precision.
        </Text>
        <DrawingCanvas trackId={1} />
      </Box>
    </Flex>
  );
}
