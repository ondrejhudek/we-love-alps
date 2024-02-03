import { Suspense } from "react";
import { notFound } from "next/navigation";
import uniq from "ramda/src/uniq";

import ActivitiesComponent from "@/app/components/Activities";
import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import Info from "@/app/components/InfoTrip";
import Members, { MembersLoading } from "@/app/components/Members";
import Photos from "@/app/components/Photos";
import Resorts, { ResortsLoading } from "@/app/components/Resorts";
import VideoComponent from "@/app/components/Video";
import DocumentsByValues from "@/app/components/data/DocumentsByValues";
import { getImages } from "@/app/cloudinary/service";
import { getRowByValue, getRowsByValues } from "@/app/utils/database";
import { Activity, Member, Resort, Trip, Video } from "@/app/utils/types";

const Content = async ({ id }: { id: string }) => {
  const [tripData, activitiesData] = await Promise.all([
    getRowByValue<Trip>("trip", "id", id),
    getRowsByValues<Activity>(
      "activity",
      "trip_id",
      [id],
      [{ column: "date", direction: "desc" }]
    ),
  ]);

  const activityMembersData =
    activitiesData.length > 0
      ? await getRowsByValues<Member>(
          "member",
          "id",
          uniq(activitiesData.map((activity) => activity.member_id))
        )
      : [];

  if (!tripData) {
    notFound();
  }

  const photos = await getImages(id);

  return (
    <>
      <Header label={tripData.title} />

      {/* Info */}
      <Info data={tripData} />

      {/* Resorts */}
      <Container title="Střediska" count={tripData.resorts.length}>
        <Suspense fallback={<ResortsLoading />}>
          <DocumentsByValues<Resort>
            tableName="resort"
            column="id"
            values={tripData.resorts}
            orderBy={[{ column: "name" }]}
            viewComponent={Resorts}
          />
        </Suspense>
      </Container>

      {/* Members */}
      <Container
        title="Zúčastnili se"
        count={tripData.members.length + (tripData.non_members || 0)}
      >
        <Suspense fallback={<MembersLoading />}>
          <DocumentsByValues<Member>
            tableName="member"
            column="id"
            values={tripData.members}
            extraValues={{
              nonMembers: tripData.non_members || undefined,
            }}
            viewComponent={Members}
          />
        </Suspense>
      </Container>

      {/* Activities */}
      {activitiesData.length > 0 && (
        <ActivitiesComponent
          data={activitiesData}
          members={activityMembersData}
        />
      )}

      {/* Photo */}
      <Photos id={id} images={photos} />

      {/* Video */}
      <DocumentsByValues<Video>
        tableName="video"
        column="trip_id"
        values={[tripData.id]}
        viewComponent={VideoComponent}
      />
    </>
  );
};

const Page = async ({ params: { id } }: { params: { id: string } }) => (
  <Content id={id} />
);

export default Page;
