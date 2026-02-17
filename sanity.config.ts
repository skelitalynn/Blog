import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Personal Blog Studio",
  projectId: projectId || "missing-project-id",
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema,
});
