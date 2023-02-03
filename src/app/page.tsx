"use client";

import { Box, Divider, SimpleGrid } from "@chakra-ui/react";
import { HiOutlineUsers, HiOutlineMapPin, HiOutlineMap } from "react-icons/hi2";

import Stat, { StatProps } from "./components/Stat";
import Timeline from "./components/Timeline";

import MEMBERS from "../data/members";
import RESORTS from "../data/resorts";
import TRIPS from "../data/trips";

const STATS: StatProps[] = [
  {
    title: "Členové",
    value: MEMBERS.length,
    icon: HiOutlineUsers,
    path: "/members",
    pathLabel: "Všichni členové",
    color: "orange",
  },
  {
    title: "Zájezdy",
    value: TRIPS.length,
    icon: HiOutlineMap,
    path: "/trips",
    pathLabel: "Všechny zájezdy",
    color: "purple",
  },
  {
    title: "Střediska",
    value: RESORTS.length,
    icon: HiOutlineMapPin,
    path: "/resorts",
    pathLabel: "Všechny střediska",
    color: "pink",
  },
];

const Page = () => (
  <Box>
    <SimpleGrid
      columns={{ base: 1, md: 3 }}
      spacing={{ base: 3, sm: 4, md: 6 }}
    >
      {STATS.map((stat) => (
        <Stat key={stat.path} {...stat} />
      ))}
    </SimpleGrid>

    <Divider my={{ base: 6, md: 10 }} />

    <Timeline />
  </Box>
);

export default Page;
