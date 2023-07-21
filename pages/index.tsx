import client from "../sanity/client";
import { getPages } from "../sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

export default function IndexPage({ pages }) {
  const ptComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <img
            alt={value.alt || " "}
            loading="lazy"
            src={urlFor(value).width(320).height(240).fit("max").auto("format")}
          />
        );
      },
    },
  };
  return (
    <>
      <header>
        <h1>MammaCare Corporation</h1>
      </header>
      <main>
        <h2>pages</h2>
        {pages.length > 0 && (
          <ul>
            {pages.map((pet) => (
              <li key={pet._id}>{pet?.name}</li>
            ))}
          </ul>
        )}
        {!pages.length > 0 && <p>No pages to show</p>}
        {pages.length > 0 && (
          <div>
            {/* <pre>{JSON.stringify(pages, null, 2)}</pre> */}
            <PortableText value={pages[0].content} components={ptComponents} />
          </div>
        )}
        {!pages.length > 0 && (
          <div>
            <div>¯\_(ツ)_/¯</div>
            <p>
              Your data will show up here when you've configured everything
              correctly
            </p>
          </div>
        )}
      </main>
    </>
  );
}

// export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
//   const pages = await getPages();

//   const paths = Object.keys(pages).map((key) => {
//     const page = pages[key];

//     return {
//       params: { slug: page.slug.current },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };

export async function getStaticProps() {
  const pages = await getPages();
  return {
    props: {
      pages,
    },
  };
}
