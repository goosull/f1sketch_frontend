"use client";

import { Track } from "@/shared";
import {
  Box,
  Flex,
  Text,
  Badge,
  Pagination,
  ButtonGroup,
  IconButton,
  HStack,
  useListCollection,
  Combobox,
  Portal,
  Spinner,
  Center,
  Dialog,
  CloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { LeaderboardEntry } from "@/shared";
import { LeaderboardDetail } from "./LeaderboardDetail";

type TrackOption = {
  label: string;
  value: string;
};

const getAccuracyColor = (index: number, length: number) => {
  if (index / length <= 0.1) return "green.500";
  if (index / length <= 0.2) return "yellow.500";
  if (index / length <= 0.3) return "orange.500";
  return "red.500";
};

const PAGE_SIZE = 10;

export function Leaderboard() {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isTrackLoading, setIsTrackLoading] = useState(false);
  const [isLeaderboardLoaded, setIsLeaderboardLoaded] = useState(false);
  const { collection, set } = useListCollection<TrackOption>({
    initialItems: [],
  });
  const [selectedTrack, setSelectedTrack] = useState<TrackOption | null>(null);
  const { i18n } = useTranslation();
  const searchParams = useSearchParams();
  const trackId = searchParams.get("trackId");

  useEffect(() => {
    setIsTrackLoading(true);
    axios
      .get<Track[]>("/api/track")
      .then((res) => setTracks(res.data))
      .catch(console.error)
      .finally(() => setIsTrackLoading(false));
  }, []);

  useEffect(() => {
    const lang = i18n.language === "ko" ? "ko" : "en";
    const options = tracks.map((t) => ({
      label: lang === "ko" ? t.region_ko : t.region_en,
      value: t.id.toString(),
    }));
    set(options);

    if (options.length > 0 && selectedTrack === null) {
      if (trackId) {
        const found = options.find((item) => item.value === trackId);
        setSelectedTrack(found ?? options[0]);
      }
    }
  }, [i18n.language, tracks, set, selectedTrack, trackId]);

  useEffect(() => {
    if (!selectedTrack) return;
    setPage(1);
    setIsLeaderboardLoaded(false);
    axios
      .get<
        {
          id: number;
          username: string | null;
          score: number;
          submission_id: string;
        }[]
      >(`/api/leaderboard/track/${selectedTrack.value}`)
      .then((res) => {
        const sorted = [...res.data].sort((a, b) => b.score - a.score);
        const mapped: LeaderboardEntry[] = sorted.map((item, idx) => ({
          rank: idx + 1,
          name: item.username ?? "Anonymous",
          accuracy: item.score,
          submission_id: item.submission_id,
        }));
        setEntries(mapped);
      })
      .catch(console.error)
      .finally(() => setIsLeaderboardLoaded(true));
  }, [selectedTrack]);

  const handleValueChange = (details: { value: string[] }) => {
    const val = details.value[0];
    const opt = collection.items.find((item) => item.value === val) ?? null;
    setSelectedTrack(opt);
  };

  const start = (page - 1) * PAGE_SIZE;
  const visibleItems = entries.slice(start, start + PAGE_SIZE);

  return (
    <Flex w="full" h="full" maxW="8xl" px={[4, 8, 40]} py={10}>
      {isTrackLoading || tracks.length === 0 ? (
        <Box pos="absolute" inset="0" bg="bg/80">
          <Center h="full">
            <Spinner size="xl" color="themeRed" />
          </Center>
        </Box>
      ) : (
        <Box w="full">
          <HStack justify="space-between" align="center" mb={6}>
            <Text fontSize="3xl" fontWeight="bold" color="themeRed">
              Leaderboard
            </Text>

            <Combobox.Root
              collection={collection}
              openOnClick
              onValueChange={handleValueChange}
              maxWidth="3xs"
              value={selectedTrack ? [selectedTrack.value] : []}
              bg="navbarBg"
            >
              <Combobox.Control color="text_secondary" cursor="pointer">
                <Combobox.Input
                  placeholder="Select a track..."
                  cursor="pointer"
                />
                <Combobox.IndicatorGroup>
                  <Combobox.Trigger cursor="pointer" />
                </Combobox.IndicatorGroup>
              </Combobox.Control>
              <Portal>
                <Combobox.Positioner>
                  <Combobox.Content bg="navbarBg" color="text">
                    <Combobox.Empty>No items found</Combobox.Empty>
                    {collection.items.map((item) => (
                      <Combobox.Item
                        item={item}
                        key={item.value}
                        cursor="pointer"
                      >
                        {item.label}
                        <Combobox.ItemIndicator />
                      </Combobox.Item>
                    ))}
                  </Combobox.Content>
                </Combobox.Positioner>
              </Portal>
            </Combobox.Root>
          </HStack>

          <Flex
            direction="column"
            flex="1"
            bg="box"
            borderRadius="lg"
            border="1px solid"
            borderColor="border"
            boxShadow="md"
            color="text"
            overflow="hidden"
          >
            <Flex
              h="48px"
              bg="boxHeader"
              align="center"
              px={6}
              borderBottom="1px solid"
              borderColor="border"
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              <Box w="80px">Rank</Box>
              <Box flex="1">User</Box>
              <Box w="120px" textAlign="right">
                Accuracy
              </Box>
            </Flex>

            {!!isLeaderboardLoaded && (
              <>
                <Box flex="1" minH="0" overflowY="auto">
                  {visibleItems.map(
                    ({ rank, name, accuracy, submission_id }, i) => (
                      <Dialog.Root
                        key={submission_id}
                        placement="center"
                        motionPreset="slide-in-bottom"
                        size="xl"
                      >
                        <Dialog.Trigger asChild>
                          <Flex
                            key={rank}
                            py={4}
                            px={6}
                            borderTop={i === 0 ? undefined : "1px solid"}
                            borderColor="border"
                            align="center"
                            cursor="pointer"
                            _hover={{ bg: "navbarHover" }}
                          >
                            <Box w="80px">
                              <Badge
                                borderRadius="full"
                                px={3}
                                py={1}
                                bg={rank === 1 ? "themeRed" : "transparent"}
                                color={rank === 1 ? "white" : "text"}
                                borderWidth={rank === 1 ? 0 : 2}
                                variant={rank === 1 ? "solid" : "outline"}
                                textAlign="center"
                              >
                                {rank}
                              </Badge>
                            </Box>
                            <Box flex="1">
                              <Text>{name}</Text>
                            </Box>
                            <Box w="120px" textAlign="right">
                              <Text
                                color={getAccuracyColor(
                                  rank - 1,
                                  entries.length
                                )}
                                fontWeight="bold"
                              >
                                {accuracy}%
                              </Text>
                            </Box>
                          </Flex>
                        </Dialog.Trigger>
                        <Portal>
                          <Dialog.Backdrop />
                          <Dialog.Positioner>
                            <Dialog.Content>
                              <LeaderboardDetail id={submission_id} />
                              <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                              </Dialog.CloseTrigger>
                            </Dialog.Content>
                          </Dialog.Positioner>
                        </Portal>
                      </Dialog.Root>
                    )
                  )}
                </Box>
                <Pagination.Root
                  count={entries.length}
                  defaultPage={1}
                  pageSize={PAGE_SIZE}
                  onPageChange={(e) => setPage(e.page)}
                  page={page}
                  mb={2}
                >
                  <ButtonGroup
                    variant="ghost"
                    size="sm"
                    display="flex"
                    justifyContent="center"
                    mt={4}
                  >
                    <Pagination.PrevTrigger asChild>
                      <IconButton color="text">
                        <HiChevronLeft />
                      </IconButton>
                    </Pagination.PrevTrigger>

                    <Pagination.Items
                      render={(page) => (
                        <IconButton
                          variant={{
                            base: "ghost",
                            _selected: "outline",
                          }}
                          color="text"
                          bg="transparent"
                        >
                          {page.value}
                        </IconButton>
                      )}
                    />

                    <Pagination.NextTrigger asChild>
                      <IconButton color="text">
                        <HiChevronRight />
                      </IconButton>
                    </Pagination.NextTrigger>
                  </ButtonGroup>
                </Pagination.Root>
              </>
            )}
          </Flex>
        </Box>
      )}
    </Flex>
  );
}

export default Leaderboard;
