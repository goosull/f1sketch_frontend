import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="navbarBg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="5vh"
      borderTopWidth={1}
      bottom={0}
      width="100%"
      zIndex={1000}
      fontSize="sm"
      color="text_secondary"
    >
      <Text>
        © {new Date().getFullYear()} F1 Sketch. All rights reserved. F1 track
        data is for informational purposes only.
      </Text>
    </Box>
  );
}
