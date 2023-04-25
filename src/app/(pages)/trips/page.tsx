import groupBy from "ramda/src/groupBy";

import Header from "@/app/components/Header";
import { getDocuments } from "@/app/mongodb";
import { MemberProps, ResortProps, TripProps } from "@/app/utils/types";

import View, { TripViewProps } from "./view";

const Content = async () => {
  const [tripsData, resortsData, membersData] = await Promise.all([
    getDocuments<TripProps>("trips"),
    getDocuments<ResortProps>("resorts"),
    getDocuments<MemberProps>("members"),
  ]);

  const groupedTrips = groupBy<TripViewProps>(
    (trip) => trip.year.toString(),
    tripsData.map((trip) => ({
      ...trip,
      members: trip.members.flatMap((memberId) =>
        membersData.filter(({ id }) => id === memberId)
      ),
      resorts: trip.resorts.flatMap((resortId) =>
        resortsData.filter(({ id }) => id === resortId)
      ),
    }))
  );
  const groupedKeys = Object.keys(groupedTrips).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <>
      <Header />

      {groupedKeys.map((year) => (
        <View key={year} year={year} trips={groupedTrips[year]} />
      ))}
    </>
  );
};

const Page = async () => (
  // @ts-expect-error Server Component
  <Content />
);

export default Page;
