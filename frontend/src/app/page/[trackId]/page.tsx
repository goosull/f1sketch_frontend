"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTrackDetail, TrackInfo } from "@/utils/api";
import { Spinner, Center } from "@chakra-ui/react";
import { DrawingCanvas } from "@/components";

export default function DrawPage() {
  const { trackId } = useParams<{ trackId: string }>();
  const [track, setTrack] = useState<TrackInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!trackId) return;
    (async () => {
      try {
        const data = await getTrackDetail(Number(trackId));
        setTrack(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [trackId]);

  if (loading || !track)
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );

  return (
    <Center bg="gray.100" minH="100vh" p="4">
      <DrawingCanvas trackId={track.id} />
    </Center>
  );
}
