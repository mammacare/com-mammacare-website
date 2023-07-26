import type { NextApiRequest, NextApiResponse } from "next";
type Data = { message: string };

//@ts-ignore
const secret: string =
  //@ts-ignore
  process.env.NEXT_PUBLIC_SANITY_REVALIDATE_WEBHOOK_SECRET ||
  "Error there is no secret";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    console.error("Must be a POST request");
    return res.status(401).json({ message: "Must be a POST request" });
  }
  if (req.headers.authorization !== secret) {
    console.error("Invalid secret");
    return res.status(401).json({ message: "Invalid secret" });
  }
  try {
    // take 1 second to revalidate
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await res.revalidate(`/post/${req.body.slug}`); // THIS IS THE PATH  OR PAGE THAT SHOULD REFRESH WHEN A NEW POST COMES IN FROM SANITY
    console.log("Revalidated");
    return res.json({
      message: `Revalidated "/"`,
    });
  } catch (err) {
    return res.status(500).send({ message: "Error revalidating" });
  }
}
