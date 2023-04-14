import { Suspense } from "react";
import groupBy from "ramda/src/groupBy";

import { getDocuments } from "@/app/mongodb";
import { TripProps } from "@/app/utils/types";

import Loading from "./components/Loading";
import Year from "./components/Year";

const Content = async () => {
  const data = await getDocuments<TripProps>("trips");
  const groupedTrips = groupBy<TripProps>((trip) => trip.year.toString(), data);
  const groupedKeys = Object.keys(groupedTrips).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <>
      {groupedKeys.map((year) => (
        <Year key={year} year={year} trips={groupedTrips[year]} />
      ))}
    </>
  );
};

const Page = async () => (
  <Suspense fallback={<Loading />}>
    {/* @ts-expect-error Server Component */}
    <Content />
  </Suspense>
);
export default Page;
