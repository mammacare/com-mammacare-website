import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import client from "../sanity/client";
import styles from "../styles/post-preview.module.css";

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

const PostPreview = ({ post }) => {
  const {
    title = "Missing title",
    name = "Missing name",
    categories,
    authorImage,
    body = [],
  } = post;
  return (
    <article className={styles.preview}>
      <h1>{title}</h1>
      <span>By {name}</span>
      {authorImage && (
        <div>
          <img src={urlFor(authorImage)} alt={`${name}'s picture`} />
        </div>
      )}
      {/*  
      {categories && (
        <ul>
          Posted in
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )} */}
    </article>
  );
};

export default PostPreview;
