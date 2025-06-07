"use client";

import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Link,
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";

const tracks = [
  { value: "monaco", label: "Monaco" },
  { value: "suzuka", label: "Suzuka" },
  { value: "silverstone", label: "Silverstone" },
  { value: "monza", label: "Monza" },
  { value: "spa", label: "Spa-Francorchamps" },
  { value: "interlagos", label: "Interlagos" },
  { value: "yas_marina", label: "Yas Marina" },
  { value: "cota", label: "Circuit of the Americas" },
  { value: "bahrain", label: "Bahrain International Circuit" },
  { value: "hermanos_rodriguez", label: "Autodromo Hermanos Rodriguez" },
];

export default function Home() {
  const { contains } = useFilter({ sensitivity: "base" });
  const { collection, filter } = useListCollection({
    initialItems: tracks,
    filter: contains,
  });

  return (
    <Flex
      h="100vh"
      maxH="87vh"
      align="center"
      justify="center"
      px={{ base: 4, sm: 6, lg: 8 }}
      py={10}
      bg={"bg"}
    >
      {/* 카드 컨테이너 */}
      <Box
        w="full"
        maxW="lg"
        p={{ base: 6, md: 8 }}
        borderRadius="xl"
        boxShadow="xl"
        bg={"box"}
      >
        {/* 헤더 영역 */}
        <Box textAlign="center" mb={8}>
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            color={"text"}
          >
            Select an F1 Track
          </Heading>
          <Text mt={2} fontSize="sm" color={"text_secondary"}>
            Choose a circuit from the list below to view its layout and details.
          </Text>
        </Box>

        {/* 트랙 선택 폼 */}
        <Combobox.Root
          collection={collection}
          openOnClick
          onInputValueChange={(e) => filter(e.inputValue)}
          width="full"
        >
          <Combobox.Label color="text">Track Selection</Combobox.Label>
          <Combobox.Control color="text_secondary">
            <Combobox.Input placeholder="Select a track..." />
            <Combobox.IndicatorGroup>
              <Combobox.ClearTrigger />
              <Combobox.Trigger />
            </Combobox.IndicatorGroup>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content bg="navbarBg" color="text">
                <Combobox.Empty>No items found</Combobox.Empty>
                {collection.items.map((item) => (
                  <Combobox.Item item={item} key={item.value}>
                    {item.label}
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                ))}
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>

        {/* Track Draw 버튼 */}
        <Button
          mt={6}
          w="full"
          bg="red.500"
          color="white"
          _hover={{ bg: "red.600" }}
          size="md"
        >
          {/* 버튼 클릭 시 트랙 그리기 페이지로 이동 */}
          <Link
            href="/draw"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            It&apos;s Lights Out And Away We Go!
          </Link>
        </Button>

        {/* 하단 푸터 문구 */}
        <Text mt={8} fontSize="xs" textAlign="center" color={"text_secondary"}>
          Can&apos;t find a track?{" "}
          <Link
            href="#"
            fontWeight="medium"
            color="red"
            _hover={{ color: "red_hover" }}
          >
            Suggest it here
          </Link>
          .
        </Text>
      </Box>
    </Flex>
  );
}
