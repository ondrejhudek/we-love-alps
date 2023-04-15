import { Suspense } from "react";
import { notFound } from "next/navigation";

import Container from "@/app/components/Container";
import DocumentsByField from "@/app/data/DocumentsByField";
import { getDocumentById } from "@/app/mongodb";
import {
  MemberProps,
  ResortProps,
  TripProps,
  VideoProps,
} from "@/app/utils/types";

import Info from "./components/Info";
import Loading from "./components/Loading";
import Members, { MembersLoading } from "./components/Members";
import Resorts, { ResortsLoading } from "./components/Resorts";
import Video from "./components/Video";

const Content = async ({ id }: { id: string }) => {
  const data = await getDocumentById<TripProps>("trips", id);

  if (!data) {
    notFound();
  }

  return (
    <>
      {/* Info */}
      <Info data={data} />

      {/* Resorts */}
      <Container title="Střediska">
        <Suspense fallback={<ResortsLoading />}>
          {/* @ts-expect-error Server Component */}
          <DocumentsByField<ResortProps>
            collectionName="resorts"
            field="id"
            values={data.resorts}
            viewComponent={Resorts}
          />
        </Suspense>
      </Container>

      {/* Members */}
      <Container title="Zúčastnili se">
        <Suspense fallback={<MembersLoading />}>
          {/* @ts-expect-error Server Component */}
          <DocumentsByField<MemberProps>
            collectionName="members"
            field="id"
            values={data.members}
            viewComponent={Members}
          />
        </Suspense>
      </Container>

      {/* Photo */}
      {/* TODO: Add Photogallery */}

      {/* Video */}
      {/* @ts-expect-error Server Component */}
      <DocumentsByField<VideoProps>
        collectionName="videos"
        field="tripId"
        values={[data.id]}
        viewComponent={Video}
      />
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
