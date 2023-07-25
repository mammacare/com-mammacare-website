// import groq from "groq";
// import Post from "../../components/post";
// import client from "../../sanity/client";

// const query = groq`*[_type == "post" && slug.current == $slug][0]{
//   title,
//   "name": author->name,
//   "categories": categories[]->title,
//   "authorImage": author->image,
//   body
// }`;
// export async function getStaticPaths() {
//   const paths = await client.fetch(
//     groq`*[_type == "post" && defined(slug.current)][].slug.current`
//   );

//   return {
//     paths: paths.map((slug) => ({ params: { slug } })),
//     fallback: true,
//   };
// }

// export async function getStaticProps(context) {
//   // It's important to default the slug so that it doesn't return "undefined"
//   const { slug = "" } = context.params;
//   const post = await client.fetch(query, { slug });
//   return {
//     props: {
//       post,
//     },
//     revalidate: 3,
//   };
// }
// export default Post;

// ./nextjs-pages/src/pages/[slug].tsx

// ./nextjs-pages/src/pages/[slug].tsx

import { SanityDocument } from "@sanity/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Post from "@/components/Post";
import dynamic from "next/dynamic";
import PreviewPost from "@/components/PreviewPost";
import { getClient } from "@/sanity/lib/getClient";

const PreviewProvider = dynamic(() => import("@/components/PreviewProvider"));
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{ 
  title, mainImage, body
}`;

// Prepare Next.js to know which routes already exist
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][]{
      "params": { "slug": slug.current }
    }`
  );

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const preview = context.draftMode || false;
  const previewToken = preview ? process.env.SANITY_READ_TOKEN : ``;
  const client = getClient(previewToken);

  const data = await client.fetch(postQuery, context.params);

  return { props: { data, preview, previewToken } };
};

export default function Page({
  data,
  preview,
  previewToken,
}: {
  data: SanityDocument;
  preview: boolean;
  previewToken?: string;
}) {
  if (preview && previewToken) {
    return (
      <PreviewProvider previewToken={previewToken}>
        <PreviewPost post={data} />
        <div className="prose prose-lg px-4 prose-blue clear-both py-16 mx-auto">
          <a href="/api/exit-preview">Exit preview</a>
        </div>
      </PreviewProvider>
    );
  }

  return <Post post={data} />;
}
