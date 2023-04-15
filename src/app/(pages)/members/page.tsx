import { Suspense } from "react";

import Data from "@/app/data/Documents";

import Loading from "./components/Loading";
import View from "./view";

const Page = async () => (
  <Suspense fallback={<Loading />}>
    {/* @ts-expect-error Server Component */}
    <Data collectionName="members" viewComponent={View} />
  </Suspense>
);

export default Page;
