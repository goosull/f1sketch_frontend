// components/TrackSelector.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Heading,
  Text,
  Button,
  Link,
  Combobox,
  Portal,
  useListCollection,
} from "@chakra-ui/react";
import axios from "axios";
import { Track } from "@/shared";

export default function TrackSelector() {
  const { collection, set } = useListCollection<{
    label: string;
    value: string;
  }>({
    initialItems: [],
  });
  const [selectedTrack, setSelectedTrack] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get<Track[]>("/api/track")
      .then((res) => {
        const formatted = res.data.map((t) => ({
          label: t.name,
          value: t.id.toString(),
        }));
        set(formatted);
      })
      .catch(console.error);
  }, []);

  const handleValueChange = (details: { value: string[] }) => {
    const [first] = details.value;
    const found = collection.items.find((item) => item.value === first) ?? null;
    setSelectedTrack(found);
  };

  const handleSelect = () => {
    if (selectedTrack) {
      router.push(`/${selectedTrack.value}`);
    }
  };

  return (
    <Box
      w="full"
      maxW="lg"
      p={{ base: 6, md: 8 }}
      borderRadius="xl"
      boxShadow="xl"
      bg="box"
    >
      <Box textAlign="center" mb={8}>
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          color="text"
        >
          Select an F1 Track
        </Heading>
        <Text mt={2} fontSize="sm" color="text_secondary">
          Choose a circuit from the list below to view its layout and details.
        </Text>
      </Box>

      <Combobox.Root
        collection={collection}
        openOnClick
        width="full"
        onValueChange={handleValueChange}
      >
        <Combobox.Label color="text">Track Selection</Combobox.Label>
        <Combobox.Control color="text_secondary" cursor="pointer">
          <Combobox.Input placeholder="Select a track..." cursor="pointer" />
          <Combobox.IndicatorGroup>
            <Combobox.ClearTrigger />
            <Combobox.Trigger cursor="pointer" />
          </Combobox.IndicatorGroup>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content bg="navbarBg" color="text">
              <Combobox.Empty>No items found</Combobox.Empty>
              {collection.items.map((item) => (
                <Combobox.Item item={item} key={item.value} cursor="pointer">
                  {item.label}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>

      <Button
        mt={6}
        w="full"
        bg="red.500"
        color="white"
        _hover={{ bg: "red.600" }}
        size="md"
        onClick={handleSelect}
        disabled={!selectedTrack}
      >
        It&apos;s Lights Out And Away We Go!
      </Button>

      <Text mt={8} fontSize="xs" textAlign="center" color="text_secondary">
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
  );
}
