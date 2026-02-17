import type { SchemaTypeDefinition } from "sanity";

import { postType } from "./postType";
import { siteSettingsType } from "./siteSettingsType";
import { tagType } from "./tagType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, tagType, siteSettingsType],
};
