import { Suspense } from "react";
import { notFound } from "next/navigation";

import {
  getDocumentsByField,
  getDocumentById,
  CollectionName,
} from "@/app/mongodb";
import {
  MemberProps,
  ResortProps,
  TripProps,
  VideoProps,
} from "@/app/utils/types";
import Container from "@/app/components/Container";

import Info from "./components/Info";
import Loading from "./components/Loading";
import Members, { MembersLoading } from "./components/Members";
import Resorts, { ResortsLoading } from "./components/Resorts";
import Video, { VideoLoading } from "./components/Video";

const Section = async <T extends object>({
  collectionName,
  field,
  values,
  clientComponent: ClientComponent,
}: {
  collectionName: CollectionName;
  field: string;
  values: string[];
  clientComponent: React.FC<{ data: T[] }>;
}) => {
  const data = await getDocumentsByField<T>(collectionName, field, values);
  return <ClientComponent data={data} />;
};

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
          <Section<ResortProps>
            collectionName="resorts"
            field="id"
            values={data.resorts}
            clientComponent={Resorts}
          />
        </Suspense>
      </Container>

      {/* Members */}
      <Container title="Zúčastnili se">
        <Suspense fallback={<MembersLoading />}>
          {/* @ts-expect-error Server Component */}
          <Section<MemberProps>
            collectionName="members"
            field="id"
            values={data.members}
            clientComponent={Members}
          />
        </Suspense>
      </Container>

      {/* Photo */}
      {/* TODO: Add Photogallery */}

      {/* Video */}
      <Container title="Video" bodyProps={{ pt: 0, px: 0 }}>
        <Suspense fallback={<VideoLoading />}>
          {/* @ts-expect-error Server Component */}
          <Section<VideoProps>
            collectionName="videos"
            field="tripId"
            values={[data.id]}
            clientComponent={Video}
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
