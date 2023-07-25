import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "6f3qzdtu",
  dataset: "production",
  apiVersion: "2023-07-21",
  useCdn: false, // `false` if you want to ensure fresh data
});
