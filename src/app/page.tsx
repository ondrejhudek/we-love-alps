import { Suspense } from "react";
import { getRows, getCount } from "@/app/utils/database";
import { Member, Trip, Resort, TableWithPhoto } from "@/app/utils/types";

import AllResortsMapView, {
  AllResortsMapLoading,
} from "@/app/components/widget/AllResortsMap";
import MostMembersView from "@/app/components/widget/MostMembers";
import MostCountriesView from "@/app/components/widget/MostCountries";
import { WidgetLoading, WidgetWrapper } from "@/app/components/widget/Widget";
import CalendarView, {
  CalendarLoading,
  CalendarWrapper,
} from "@/app/components/Calendar";
import Dashboard from "@/app/components/Dashboard";
import StatView, { StatLoading } from "@/app/components/Stat";

const STATS: Record<TableWithPhoto, { title: string; color: string }> = {
  member: {
    title: "Všichni členové",
    color: "red",
  },
  trip: {
    title: "Všechny zájezdy",
    color: "yellow",
  },
  resort: {
    title: "Všechny střediska",
    color: "pink",
  },
  photo: {
    title: "Všechny fotky",
    color: "cyan",
  },
  video: {
    title: "Všechny videa",
    color: "green",
  },
};

/**
 * Statistic of given table.
 * @param {TableWithPhoto} slug Slug of table.
 */
const StatAsync = async ({ slug }: { slug: TableWithPhoto }) => {
  const stat = STATS[slug];
  const count = slug === "photo" ? 11 : await getCount(slug);
  return (
    <StatView slug={slug} title={stat.title} color={stat.color} count={count} />
  );
};

const Stat = ({ slug }: { slug: TableWithPhoto }) => (
  <Suspense fallback={<StatLoading color={STATS[slug].color} />}>
    {/* @ts-expect-error Server Component */}
    <StatAsync slug={slug} />
  </Suspense>
);

/**
 * List of most active members.
 */
const MostMembersAsync = async () => {
  const [members, trips] = await Promise.all([
    getRows<Member>("member"),
    getRows<Trip>("trip"),
  ]);
  return <MostMembersView members={members} trips={trips} />;
};

const MostMembers = () => (
  <WidgetWrapper heading="Nejčastěji jezdí">
    <Suspense fallback={<WidgetLoading />}>
      {/* @ts-expect-error Server Component */}
      <MostMembersAsync />
    </Suspense>
  </WidgetWrapper>
);

/**
 * List of most visited countries.
 */
const MostCountriesAsync = async () => {
  const trips = await getRows<Trip>("trip");
  return <MostCountriesView trips={trips} />;
};

const MostCountries = () => (
  <WidgetWrapper heading="Navštívené země">
    <Suspense fallback={<WidgetLoading />}>
      {/* @ts-expect-error Server Component */}
      <MostCountriesAsync />
    </Suspense>
  </WidgetWrapper>
);

/**
 * Map with all visited resorts.
 */

const AllResortsMapAsync = async () => {
  const resorts = await getRows<Resort>("resort");
  return <AllResortsMapView resorts={resorts} />;
};

const AllResortsMap = () => (
  <WidgetWrapper heading="Navštívená střediska">
    <Suspense fallback={<AllResortsMapLoading />}>
      {/* @ts-expect-error Server Component */}
      <AllResortsMapAsync />
    </Suspense>
  </WidgetWrapper>
);

/**
 * Calendar with all trips grouped by year.
 */
const CalendarAsync = async () => {
  const [members, trips, resorts] = await Promise.all([
    getRows<Member>("member"),
    getRows<Trip>("trip"),
    getRows<Resort>("resort"),
  ]);
  return <CalendarView members={members} trips={trips} resorts={resorts} />;
};

const Calendar = () => (
  <CalendarWrapper>
    <Suspense fallback={<CalendarLoading />}>
      {/* @ts-expect-error Server Component */}
      <CalendarAsync />
    </Suspense>
  </CalendarWrapper>
);

const Page = () => (
  <Dashboard
    statMembers={<Stat slug="member" />}
    statTrip={<Stat slug="trip" />}
    statResort={<Stat slug="resort" />}
    statPhoto={<Stat slug="photo" />}
    statVideo={<Stat slug="video" />}
    widgetMostMembers={<MostMembers />}
    widgetMostCountries={<MostCountries />}
    widgetAllResortsMap={<AllResortsMap />}
    calendar={<Calendar />}
  />
);

export default Page;
