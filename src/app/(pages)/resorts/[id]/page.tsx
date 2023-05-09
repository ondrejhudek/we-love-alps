import { Suspense } from "react";
import { notFound } from "next/navigation";

import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import DocumentsByValues from "@/app/data/DocumentsByValues";
import { getRowByValue, getRowsByValueInColumn } from "@/app/utils/database";
import { MemberProps, ResortProps, TripProps } from "@/app/utils/types";

import Info from "./components/Info";
import Members, { MembersLoading } from "./components/Members";

const Content = async ({ id }: { id: string }) => {
  const [resortData, tripsData] = await Promise.all([
    getRowByValue<ResortProps>("resorts", "id", id),
    getRowsByValueInColumn<TripProps>("trips", "resorts", id),
  ]);

  console.log(tripsData.length);

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
          {/* @ts-expect-error Server Component */}
          <DocumentsByValues<MemberProps>
            tableName="members"
            column="alias"
            values={members}
            viewComponent={Members}
          />
        </Suspense>
      </Container>
    </>
  );
};

const Page = async ({ params: { id } }: { params: { id: string } }) => (
  //  @ts-expect-error Server Component
  <Content id={id} />
);

export default Page;
