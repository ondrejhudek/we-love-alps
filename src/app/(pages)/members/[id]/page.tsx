import { Suspense } from "react";
import { notFound } from "next/navigation";

import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import DocumentsByValues from "@/app/data/DocumentsByValues";
import { Member, Resort, Trip } from "@/app/utils/types";
import { getRows, getRowsByValueInColumn } from "@/app/utils/database";

import Info from "./components/Info";
import Resorts, { ResortsLoading } from "./components/Resorts";
import Trips from "./components/Trips";

const Content = async ({ id }: { id: string }) => {
  const [membersData, tripsData] = await Promise.all([
    getRows<Member>("member"),
    getRowsByValueInColumn<Trip>("trip", "members", id),
  ]);

  console.log({ tripsData: tripsData });
  console.log({ tripsDataLength: tripsData.length });

  if (!membersData || !tripsData) {
    notFound();
  }

  const memberData = membersData.find((member) => member.alias === id);

  if (!memberData) {
    notFound();
  }

  const resortIds = [...new Set(tripsData.flatMap(({ resorts }) => resorts))];

  return (
    <>
      <Header label={memberData.name} />

      {/* Info */}
      <Info data={memberData} membersData={membersData} />

      {/* Trips */}
      <Container title="Zájezdy" count={tripsData.length}>
        <Trips data={tripsData} />
      </Container>

      {/* Resorts */}
      <Container title="Střediska" count={resortIds.length}>
        <Suspense fallback={<ResortsLoading />}>
          {/* @ts-expect-error Server Component */}
          <DocumentsByValues<Resort>
            tableName="resort"
            column="id"
            values={resortIds}
            viewComponent={Resorts}
          />
        </Suspense>
      </Container>
    </>
  );
};

const Page = async ({ params: { id } }: { params: { id: string } }) => (
  // @ts-expect-error Server Component
  <Content id={id} />
);

export default Page;
