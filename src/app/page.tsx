import { Suspense } from "react";

import { getRows, getCount } from "@/app/utils/database";
import { Table, Member, Resort, Trip } from "@/app/utils/types";

import TimelineView from "./components/Timeline";
import StatView, {
  Stats as StatsView,
  StatLoading,
  StatProps,
} from "./components/Stat";

const STATS: StatProps[] = [
  {
    slug: "member",
    title: "Členové",
    pathLabel: "Všichni členové",
    color: "orange",
  },
  {
    slug: "trip",
    title: "Zájezdy",
    pathLabel: "Všechny zájezdy",
    color: "purple",
  },
  {
    slug: "resort",
    title: "Střediska",
    pathLabel: "Všechny střediska",
    color: "pink",
  },
];

const Stat = async ({ slug }: { slug: Table }) => {
  const count = await getCount(slug);
  return <>{count}</>;
};

const Timeline = async () => {
  const [tripsData, resortsData, membersData] = await Promise.all([
    getRows<Trip>("trip", [
      {
        column: "year",
        direction: "asc",
      },
      {
        column: "month",
        direction: "asc",
      },
    ]),
    getRows<Resort>("resort"),
    getRows<Member>("member"),
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
