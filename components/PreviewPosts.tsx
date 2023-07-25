import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import { postsQuery } from "../pages";
import Posts from "./Posts";

export default function PreviewPosts({
  posts = [],
}: {
  posts: SanityDocument[];
}) {
  const [data] = useLiveQuery(posts, postsQuery);
  // console.log("data: ", data);

  return <Posts posts={data} />;
}
