"use client";

import { useEffect } from "react";

import Alert from "@/app/components/Alert";

const Error = ({ error }: { error: Error }) => {
  useEffect(() => {
    // TODO: Log it to Vercel.
    console.error(error);
  }, [error]);

  return (
    <Alert
      title="Něco se pokazilo!"
      button={{
        path: "/",
        label: "Zpět na Úvod",
      }}
    />
  );
};

export default Error;
