import { Suspense } from "react";

import { ResortProps } from "@/app/utils/types";

import Data from "@/app/data/Documents";

import Loading from "./components/Loading";
import View from "./view";

const Page = async () => (
  <Suspense fallback={<Loading />}>
    {/* @ts-expect-error Server Component */}
    <Data<ResortProps> collectionName="resorts" viewComponent={View} />
  </Suspense>
);

export default Page;
