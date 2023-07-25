import { DefaultDocumentNodeResolver } from "sanity/desk";
import Iframe from "sanity-plugin-iframe-pane";
import { SanityDocument } from "sanity";

function getPreviewUrl(doc: SanityDocument) {
  console.log("defaultDocumentNode: ", doc);

  // const homeUrl = `${window.location.protocol}//${window.location.host}/api/preview`;

  // const postUrl = `${window.location.protocol}//${window.location.host}/api/preview?slug=${doc.slug.current}`;

  const homeUrl = `${window.location.protocol}//${window.location.host}/`;
  //@ts-ignore
  const postUrl = `${window.location.protocol}//${window.location.host}/post/${doc.slug.current}`;
  //@ts-ignore
  return doc?.slug?.current ? postUrl : homeUrl;
  // return postUrl;
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  switch (schemaType) {
    case `post`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => getPreviewUrl(doc),
          })
          .title("Preview"),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
