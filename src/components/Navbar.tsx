"use client";

import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  Popover,
  Image,
} from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import { usePathname } from "next/navigation";
import { BsQuestionCircle } from "react-icons/bs";

export default function Navbar() {
  const path = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "Leaderboard", href: "/leaderboard" },
  ];

  return (
    <Box
      borderBottomWidth={1}
      w="full"
      h="8vh"
      as="nav"
      bg={"navbarBg"}
      shadow="sm"
      borderColor={"border"}
      top={0}
      zIndex={1000}
    >
      <Flex
        maxW="7xl"
        mx="auto"
        h="full"
        px={{ base: 4, md: 8 }}
        align="center"
        justify="space-between"
      >
        <Link _hover={{ textDecoration: "none" }} href="/">
          <Image src="/Icon.svg" alt="F1 Sketch Logo" height="24px" />
          <Text fontSize="xl" fontWeight="bold" color="text">
            F1 Sketch
          </Text>
        </Link>

        <HStack align="center">
          <HStack as="nav" display={{ base: "none", md: "flex" }} gap={4}>
            {links.map((link) => (
              <Link
                px={2}
                py={1}
                fontWeight={path === link.href ? "bold" : "medium"}
                color={path === link.href ? "red.500" : "text"}
                _hover={{ color: "red.500" }}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
            <ColorModeButton
              size="md"
              color="text"
              bg="box"
              borderRadius="full"
              _hover={{ color: "red.500" }}
            />
            <Popover.Root>
              <Popover.Trigger color="text" _hover={{ color: "red.500" }}>
                <BsQuestionCircle size={24} />
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.CloseTrigger />
                  <Popover.Arrow>
                    <Popover.ArrowTip />
                  </Popover.Arrow>
                  <Popover.Body>
                    <Popover.Title />
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
}
