import { Suspense } from "react";
import { notFound } from "next/navigation";

import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import DocumentsByField from "@/app/data/DocumentsByField";
import { getDocuments, getDocumentsByField } from "@/app/mongodb";
import { MemberProps, ResortProps, TripProps } from "@/app/utils/types";

import Info from "./components/Info";
import Loading from "./components/Loading";
import Resorts, { ResortsLoading } from "./components/Resorts";
import Trips from "./components/Trips";

const Content = async ({ id }: { id: string }) => {
  const [membersData, tripsData] = await Promise.all([
    getDocuments<MemberProps>("members"),
    getDocumentsByField<TripProps>("trips", "members", [id]),
  ]);

  if (!membersData || !tripsData) {
    notFound();
  }

  const memberData = membersData.find((member) => member.id === id);

  if (!memberData) {
    notFound();
  }

  const resortIds = tripsData.flatMap(({ resorts }) => resorts);

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
          <DocumentsByField<ResortProps>
            collectionName="resorts"
            field="id"
            values={resortIds}
            viewComponent={Resorts}
          />
        </Suspense>
      </Container>
    </>
  );
};

const Page = async ({ params: { id } }: { params: { id: string } }) => (
  <Suspense fallback={<Loading />}>
    {/* @ts-expect-error Server Component */}
    <Content id={id} />
  </Suspense>
);

export default Page;
