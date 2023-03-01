// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string
// }

const API_KEY = "654692679597748";
const API_SECRET = "MkutsvsFPXRZqpJD81PW2xrmp20";
const CLOUD_NAME = "ddnasijv8";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json({ name: "John Doe" });
  // const response = await fetch(
  //   `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`,
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Basic " + btoa(API_KEY + ":" + API_SECRET),
  //     },
  //   }
  // );
  // const data = await response.json();
  // return res.json({ data });
}
