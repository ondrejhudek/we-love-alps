import { Suspense } from "react";
import { notFound } from "next/navigation";

import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import Info from "@/app/components/InfoTrip";
import Members, { MembersLoading } from "@/app/components/Members";
import Resorts, { ResortsLoading } from "@/app/components/Resorts";
import VideoComponent from "@/app/components/Video";
import DocumentsByValues from "@/app/data/DocumentsByValues";
import { getRowByValue } from "@/app/utils/database";
import { Member, Resort, Trip, Video } from "@/app/utils/types";

const Content = async ({ id }: { id: string }) => {
  const data = await getRowByValue<Trip>("trip", "id", id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <Header label={data.title} />

      {/* Info */}
      <Info data={data} />

      {/* Resorts */}
      <Container title="Střediska">
        <Suspense fallback={<ResortsLoading />}>
          {/* @ts-expect-error Server Component */}
          <DocumentsByValues<Resort>
            tableName="resort"
            column="id"
            values={data.resorts}
            orderBy={[{ column: "name" }]}
            viewComponent={Resorts}
          />
        </Suspense>
      </Container>

      {/* Members */}
      <Container title="Zúčastnili se">
        <Suspense fallback={<MembersLoading />}>
          {/* @ts-expect-error Server Component */}
          <DocumentsByValues<Member>
            tableName="member"
            column="id"
            values={data.members}
            viewComponent={Members}
          />
        </Suspense>
      </Container>

      {/* Photo */}
      {/* TODO: Add Photogallery */}

      {/* Video */}
      {/* @ts-expect-error Server Component */}
      <DocumentsByValues<Video>
        tableName="video"
        column="trip_id"
        values={[data.id]}
        viewComponent={VideoComponent}
      />
    </>
  );
};

const Page = async ({ params: { id } }: { params: { id: string } }) => (
  // @ts-expect-error Server Component
  <Content id={id} />
);

export default Page;
