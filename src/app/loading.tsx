"use client";
import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex h="100vh" maxH="87vh" align="center" justify="center">
      <Spinner size="xl" color="themeRed" />
    </Flex>
  );
}
