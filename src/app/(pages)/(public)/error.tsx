"use client";

import Alert from "@/app/components/Alert";

const ErrorComponent = () => (
  <Alert
    title="Něco se pokazilo!"
    button={{
      path: "/",
      label: "Zpět na Úvod",
    }}
  />
);

export default ErrorComponent;
