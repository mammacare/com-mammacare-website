import Link from "next/link";
import groq from "groq";
import client from "../sanity/client";
import PostPreview from "../components/post-preview";

const Index = ({ posts }) => {
  console.log(posts);
  return (
    <div>
      {posts.length > 0 &&
        posts.map((post, index) => (
          <PostPreview key={post._id} index={index} post={post} />
        ))}
    </div>
  );
};

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()]{
        _id,
        title,
        "author": author->name,
        "categories": categories[]->title,
        "image": mainImage.asset -> url,
        "body": body[0].children[0].text
      } | order(publishedAt asc)
    `);
  console.log(posts);
  return {
    props: {
      posts,
    },
    revalidate: 3,
  };
}

export default Index;
