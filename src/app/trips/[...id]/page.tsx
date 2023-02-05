"use client";

import Header from "../../components/Header";

import TRIPS from "../../../data/trips";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const trip = TRIPS.find((trip) => trip.id === parseInt(id));

  console.log("trip", trip);

  if (!trip) return null;

  return (
    <>
      <Header pathname="/trips" name={trip.title} />
      <p>hovno: {trip.title}</p>
    </>
  );
};

export default Page;
