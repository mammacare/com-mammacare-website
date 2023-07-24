import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import client from "../sanity/client";

function urlFor(source) {
  return imageUrlBuilder(client)
    .image(source)
    .width(320)
    .height(240)
    .fit("max")
    .auto("format")
    .toString();
}

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return <img alt={value.alt || " "} loading="lazy" src={urlFor(value)} />;
    },
  },
};

const Post = ({ post }) => {
  console.log("Post data - client side: ", post);
  if (!post) return null;

  const {
    title = "Missing title",
    name = "Missing name",
    categories = [],
    authorImage = null,
    body = [],
  } = post;

  return (
    <article>
      <h1>{title}</h1>
      <span>By {name}</span>
      {categories && (
        <ul>
          Posted in
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}
      {authorImage && (
        <div>
          <img src={urlFor(authorImage)} alt={`${name}'s picture`} />
        </div>
      )}
      <PortableText value={body} components={ptComponents} />
    </article>
  );
};

export default Post;
