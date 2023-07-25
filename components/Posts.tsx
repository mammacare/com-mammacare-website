import type { SanityDocument } from "@sanity/client";
import Head from "next/head";
import PostPreview from "./post-preview";

export default function Posts({ posts = [] }: { posts: SanityDocument[] }) {
  const title = posts.length === 1 ? `1 Post` : `${posts.length} Posts`;

  return (
    <>
      {posts.map((post, index) => (
        <PostPreview key={index} index={index} post={post} />
      ))}
    </>
  );
}
