import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";

const config = defineConfig({
  name: "default",
  title: "MammaCare Corporation CMS",
  projectId: "6f3qzdtu",
  dataset: "production",
  apiVersion: "2023-07-21",
  basePath: "/studio",
  plugins: [deskTool()],
  schema: {
    types: schemas,
  },
});

export default config;
