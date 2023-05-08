import { Suspense } from "react";
import { notFound } from "next/navigation";

import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import DocumentsByValues from "@/app/data/DocumentsByValues";
import { getRowByValue } from "@/app/utils/kysely";
import {
  MemberProps,
  ResortProps,
  TripProps,
  VideoProps,
} from "@/app/utils/types";

import Info from "./components/Info";
import Members, { MembersLoading } from "./components/Members";
import Resorts, { ResortsLoading } from "./components/Resorts";
import Video from "./components/Video";

const Content = async ({ id }: { id: string }) => {
  const data = await getRowByValue<TripProps>("trips", "id", id);

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
          <DocumentsByValues<ResortProps>
            tableName="resorts"
            column="id"
            values={data.resorts}
            viewComponent={Resorts}
          />
        </Suspense>
      </Container>

      {/* Members */}
      <Container title="Zúčastnili se">
        <Suspense fallback={<MembersLoading />}>
          {/* @ts-expect-error Server Component */}
          <DocumentsByValues<MemberProps>
            tableName="members"
            column="alias"
            values={data.members}
            viewComponent={Members}
          />
        </Suspense>
      </Container>

      {/* Photo */}
      {/* TODO: Add Photogallery */}

      {/* Video */}
      {/* @ts-expect-error Server Component */}
      <DocumentsByValues<VideoProps>
        tableName="videos"
        column="trip_id"
        values={[data.id]}
        viewComponent={Video}
      />
    </>
  );
};

const Page = async ({ params: { id } }: { params: { id: string } }) => (
  // @ts-expect-error Server Component
  <Content id={id} />
);

export default Page;
