import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, hasSanityEnv, projectId } from "@/sanity/env";

export function getSanityClient() {
  if (!hasSanityEnv) {
    throw new Error("Sanity env missing: NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET");
  }
  return createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn: true,
  });
}
