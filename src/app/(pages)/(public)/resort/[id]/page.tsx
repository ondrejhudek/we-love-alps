import { Suspense } from "react";
import { notFound } from "next/navigation";

import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import Info from "@/app/components/InfoResort";
import Members, { MembersLoading } from "@/app/components/Members";
import DocumentsByValues from "@/app/components/data/DocumentsByValues";
import { getRowByValue, getRowsByValueInColumn } from "@/app/utils/database";
import { Member, Resort, Trip } from "@/app/utils/types";

const Content = async ({ id }: { id: string }) => {
  const [resortData, tripsData] = await Promise.all([
    getRowByValue<Resort>("resort", "id", id),
    getRowsByValueInColumn<Trip>("trip", "resorts", id),
  ]);

  if (!resortData || !tripsData) {
    notFound();
  }

  const members = [...new Set(tripsData.flatMap((trip) => trip.members))];

  return (
    <>
      <Header label={resortData.name} />

      {/* Info */}
      <Info resortData={resortData} tripsData={tripsData} />

      {/* Members */}
      <Container title="Navšívili">
        <Suspense fallback={<MembersLoading />}>
          <DocumentsByValues<Member>
            tableName="member"
            column="id"
            values={members}
            viewComponent={Members}
          />
        </Suspense>
      </Container>
    </>
  );
};

const Page = async ({ params: { id } }: { params: { id: string } }) => (
  <Content id={id} />
);

export default Page;
