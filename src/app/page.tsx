import { Suspense } from "react";

import { getDocumentsCount, getDocuments, CollectionName } from "@/app/mongodb";
import { MemberProps, ResortProps, TripProps } from "@/app/utils/types";

import Hero from "./components/Hero";
import TimelineView from "./components/Timeline";
import StatView, {
  Stats as StatsView,
  StatLoading,
  StatProps,
} from "./components/Stat";

const STATS: StatProps[] = [
  {
    slug: "members",
    title: "Členové",
    pathLabel: "Všichni členové",
    color: "orange",
  },
  {
    slug: "trips",
    title: "Zájezdy",
    pathLabel: "Všechny zájezdy",
    color: "purple",
  },
  {
    slug: "resorts",
    title: "Střediska",
    pathLabel: "Všechny střediska",
    color: "pink",
  },
];

const Stat = async ({ slug }: { slug: CollectionName }) => {
  const count = await getDocumentsCount(slug);
  return <>{count}</>;
};

const Timeline = async () => {
  const [tripsData, resortsData, membersData] = await Promise.all([
    getDocuments<TripProps>("trips", { year: 1 }),
    getDocuments<ResortProps>("resorts"),
    getDocuments<MemberProps>("members"),
  ]);

  return (
    <TimelineView
      tripsData={tripsData}
      membersData={membersData}
      resortsData={resortsData}
    />
  );
};

const Page = () => (
  <>
    <Hero />

    {/* Stats */}
    <StatsView>
      {STATS.map((stat) => (
        <StatView key={stat.slug} {...stat}>
          <Suspense fallback={<StatLoading color={stat.color} />}>
            {/* @ts-expect-error Server Component */}
            <Stat slug={stat.slug} />
          </Suspense>
        </StatView>
      ))}
    </StatsView>

    {/* Timeline */}
    {/* @ts-expect-error Server Component */}
    <Timeline />
  </>
);

export default Page;
