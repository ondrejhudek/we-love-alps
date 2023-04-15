import { Suspense } from "react";
import { notFound } from "next/navigation";

import Container from "@/app/components/Container";
import DocumentsByField from "@/app/data/DocumentsByField";
import { getDocumentsByField, getDocumentById } from "@/app/mongodb";
import { MemberProps, ResortProps, TripProps } from "@/app/utils/types";

import Info from "./components/Info";
import Loading from "./components/Loading";
import Members, { MembersLoading } from "./components/Members";

const Content = async ({ id }: { id: string }) => {
  const [resortData, tripsData] = await Promise.all([
    getDocumentById<ResortProps>("resorts", id),
    getDocumentsByField<TripProps>("trips", "resorts", [id]),
  ]);

  if (!resortData || !tripsData) {
    notFound();
  }

  const members = [...new Set(tripsData.flatMap((trip) => trip.members))];

  return (
    <>
      {/* Info */}
      <Info resortData={resortData} tripsData={tripsData} />

      {/* Members */}
      <Container title="Navšívili">
        <Suspense fallback={<MembersLoading />}>
          {/* @ts-expect-error Server Component */}
          <DocumentsByField<MemberProps>
            collectionName="members"
            field="id"
            values={members}
            viewComponent={Members}
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
