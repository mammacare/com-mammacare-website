import { defineConfig } from "sanity";
import { vercelDeployTool } from "sanity-plugin-vercel-deploy";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";
import { defaultDocumentNode } from "@/sanity/desk/defaultDocumentNode";

const config = defineConfig({
  name: "default",
  title: "MammaCare Corporation CMS",
  projectId: "6f3qzdtu",
  dataset: "production",
  apiVersion: "2023-07-21",
  basePath: "/studio",
  plugins: [deskTool({ defaultDocumentNode }), vercelDeployTool()],
  schema: {
    types: schemas,
  },
});

export default config;

// import { defineConfig } from "sanity";
// import { deskTool, type DefaultDocumentNodeResolver } from "sanity/desk";
// import Iframe from "sanity-plugin-iframe-pane";
// import { SanityDocument } from "sanity";
// import schemas from "./sanity/schemas";
// import { vercelDeployTool } from "sanity-plugin-vercel-deploy";

// // Customize this function to show the correct URL based on the current document
// function getPreviewUrl(doc: SanityDocument) {
//   // return doc?.slug?.current
//   //   ? `${window.location.protocol}//${window.location.host}/post/${doc.slug.current}`
//   //   : window.location.host;
// }

// const defaultDocumentNode: DefaultDocumentNodeResolver = (
//   S,
//   { schemaType }
// ) => {
//   // Only show preview pane on `movie` schema type documents
//   switch (schemaType) {
//     case `post`:
//       return S.document().views([
//         S.view.form(),
//         S.view
//           .component(Iframe)
//           .options({
//             URL: (doc) =>
//               doc?.slug?.current
//                 ? `http://localhost:3000/api/preview?slug=${doc.slug.current}`
//                 : `http://localhost:3000/api/preview`,
//           })
//           .title("Preview"),
//       ]);
//     default:
//       return S.document().views([S.view.form()]);
//   }
// };

// const config = defineConfig({
//   name: "default",
//   title: "MammaCare Corporation CMS",
//   projectId: "6f3qzdtu",
//   dataset: "production",
//   apiVersion: "2023-07-21",
//   basePath: "/studio",
//   plugins: [deskTool({ defaultDocumentNode }), vercelDeployTool()],
//   schema: {
//     types: schemas,
//   },
// });

// export default config;
