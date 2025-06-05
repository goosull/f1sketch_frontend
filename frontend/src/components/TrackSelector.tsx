"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Text,
  Portal,
  Select as ChakraSelect,
  createListCollection,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { getTrackList, TrackInfo } from "../utils/api";

export default function TrackSelector() {
  const [tracks, setTracks] = useState<TrackInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const data = await getTrackList();
        setTracks(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // const exampleTracks: TrackInfo[] = [
  //   { id: 1, name: "Monaco", region: "Europe", path: [] },
  //   { id: 2, name: "Suzuka", region: "Asia", path: [] },
  //   { id: 3, name: "Silverstone", region: "Europe", path: [] },
  //   { id: 4, name: "Monza", region: "Europe", path: [] },
  //   { id: 5, name: "Spa-Francorchamps", region: "Europe", path: [] },
  //   { id: 6, name: "Interlagos", region: "South America", path: [] },
  //   { id: 7, name: "Yas Marina", region: "Middle East", path: [] },
  //   {
  //     id: 8,
  //     name: "Circuit of the Americas",
  //     region: "North America",
  //     path: [],
  //   },
  //   {
  //     id: 9,
  //     name: "Bahrain International Circuit",
  //     region: "Middle East",
  //     path: [],
  //   },
  //   {
  //     id: 10,
  //     name: "Autodromo Hermanos Rodriguez",
  //     region: "North America",
  //     path: [],
  //   },
  // ];

  if (loading) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
      </Box>
    );
  }

  const trackCollection = createListCollection({
    items: tracks.map((t) => ({
      label: `${t.name} (${t.region})`,
      value: t.id.toString(),
    })),
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    if (!isNaN(id) && id > 0) {
      router.push(`/draw/${id}`);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10">
      <Text fontSize="xl" mb="4">
        그릴 트랙을 선택하세요
      </Text>

      <ChakraSelect.Root collection={trackCollection}>
        <ChakraSelect.HiddenSelect onChange={handleSelectChange} />
        <ChakraSelect.Control>
          <ChakraSelect.Trigger>
            {/* 선택된 값이 없으면 placeholder가 보임 */}
            <ChakraSelect.ValueText placeholder="트랙을 선택하세요" />
          </ChakraSelect.Trigger>
          <ChakraSelect.IndicatorGroup>
            <ChakraSelect.Indicator />
          </ChakraSelect.IndicatorGroup>
        </ChakraSelect.Control>
        <Portal>
          <ChakraSelect.Positioner>
            <ChakraSelect.Content
              bg="white"
              boxShadow="md"
              borderRadius="md"
              maxH="240px"
              overflow={"hidden"}
            >
              {trackCollection.items.map((item) => (
                <ChakraSelect.Item item={item} key={item.value}>
                  {item.label}
                  <ChakraSelect.ItemIndicator></ChakraSelect.ItemIndicator>
                </ChakraSelect.Item>
              ))}
            </ChakraSelect.Content>
          </ChakraSelect.Positioner>
        </Portal>
      </ChakraSelect.Root>
    </Box>
  );
}
