import groupBy from "ramda/src/groupBy";

import Header from "@/app/components/Header";
import { getRows } from "@/app/utils/database";
import { Member, Resort, Trip } from "@/app/utils/types";

import View, { TripViewProps } from "./view";

const Content = async () => {
  const [tripsData, resortsData, membersData] = await Promise.all([
    getRows<Trip>("trip"),
    getRows<Resort>("resort"),
    getRows<Member>("member"),
  ]);

  const groupedTrips = groupBy<TripViewProps>(
    (trip) => trip.year.toString(),
    tripsData.map((trip) => ({
      ...trip,
      members: trip.members.flatMap((memberAlias) =>
        membersData.filter(({ id }) => id === memberAlias)
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

      {groupedKeys.map((year) => {
        const trips = groupedTrips[year];
        if (!trips) return null;
        return <View key={year} year={year} trips={trips} />;
      })}
    </>
  );
};

const Page = async () => <Content />;

export default Page;
