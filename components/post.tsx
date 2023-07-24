import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import client from "../sanity/client";
import styles from "../styles/post.module.css";

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
      return (
        <img
          alt={value.alt || ""}
          loading="lazy"
          src={urlFor(value)}
          className={styles.postImg}
        />
      );
    },
  },
};

const Post = ({ post }) => {
  if (!post) return null;

  const {
    title = "Missing title",
    name = "Missing name",
    authorImage = null,
    body = [],
    date = new Date().toISOString(),
  } = post;

  return (
    <article>
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.date}>{new Date(date).toLocaleString()}</span>
      <PortableText value={body} components={ptComponents} />
      <span className={styles.by}>
        <code>&#8212;</code> {name}
      </span>
    </article>
  );
};

export default Post;
