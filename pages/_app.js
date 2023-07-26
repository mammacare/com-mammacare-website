import React from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import "../styles/styles.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  React.useEffect(() => {
    document.addEventListener(
      "keydown",
      ({ repeat, metaKey, ctrlKey, altKey, key }) => {
        if (repeat) return;
        if ((metaKey || ctrlKey) && altKey && key === "s") {
          router.push(`${router.basePath}/api/preview`);
        }
      }
    );
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
