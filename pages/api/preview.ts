import type { NextApiRequest, NextApiResponse } from "next";

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  console.log("req: ", req?.body);
  res.setDraftMode({ enable: true });
  res.writeHead(307, { Location: "/" });
  res.end();
}
