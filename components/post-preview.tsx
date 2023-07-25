import React from "react";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import styles from "@/styles/post-preview.module.css";
// styles / post - preview.module.css;

function urlFor(source) {
  return imageUrlBuilder(client)
    .image(source)
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
    summary,
    image,
    slug,
  } = post;

  if (!slug) return null;

  return (
    <Link
      href="/post/[slug]"
      as={`/post/${slug.current}`}
      className={styles.previewLink}
    >
      <article className={styles.preview}>
        {image && (
          <img src={urlFor(image)} alt={title} className={styles.previewImg} />
        )}
        <div className={styles.previewContent}>
          <h1 className={styles.previewTitle} ref={titleRef}>
            {title}
          </h1>
          <p className={styles.previewBody}>{summary}</p>
        </div>
      </article>
    </Link>
  );
};

export default PostPreview;
