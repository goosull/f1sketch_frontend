"use client";
import { useEffect, useState } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { getTrackList, TrackInfo } from "../utils/api";
import { useRouter } from "next/navigation";

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

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    if (id) router.push(`/draw/${id}`);
  };

  if (loading)
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
      </Box>
    );

  return (
    <Box maxW="md" mx="auto" mt="10">
      <Text fontSize="xl" mb="4">
        그릴 트랙을 선택하세요
      </Text>
      <Select placeholder="트랙 선택" onChange={onChange}>
        {tracks.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name} ({t.region})
          </option>
        ))}
      </Select>
    </Box>
  );
}
