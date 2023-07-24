import Link from "next/link";
import groq from "groq";
import client from "../sanity/client";
import PostPreview from "../components/post-preview";

const Index = ({ posts }) => {
  console.log(posts);
  return (
    <div>
      {posts.length > 0 &&
        posts.map((post) => <PostPreview key={post._id} post={post} />)}
    </div>
  );
};

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    `);
  return {
    props: {
      posts,
    },
    revalidate: 3,
  };
}

export default Index;
