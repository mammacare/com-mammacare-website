import React from "react";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
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

const PostPreview = ({ index, post }) => {
  const titleRef = React.useRef(null);
  console.log(post);
  const {
    title = "Missing title",
    author = "Missing name",
    categories,
    authorImage,
    body,
    image,
    slug,
  } = post;

  React.useEffect(() => {
    console.log(titleRef.current.clientHeight);
  }, [titleRef]);

  if (!slug) return null;

  return (
    <article
      className={styles.preview}
      style={{ height: index === 0 ? "12rem" : "6rem" }}
    >
      {image && (
        <img src={urlFor(image)} alt={title} className={styles.previewImg} />
      )}
      <div className={styles.previewContent}>
        <Link href="/post/[slug]" as={`/post/${slug.current}`}>
          <h1 className={styles.previewTitle} ref={titleRef}>
            {title}
          </h1>
        </Link>{" "}
        <p className={styles.previewBody}>{body}</p>
      </div>

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
