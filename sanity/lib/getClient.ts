// ./nextjs-pages/sanity/lib/getClient.ts

import { createClient } from "@sanity/client";
import type { SanityClient } from "@sanity/client";

export function getClient(previewToken?: string): SanityClient {
  const client = createClient({
    projectId: "6f3qzdtu",
    dataset: "production",
    apiVersion: "2023-07-21",
    useCdn: false,
  });

  return previewToken
    ? client.withConfig({
        token: previewToken,
        useCdn: false,
        ignoreBrowserTokenWarning: true,
        perspective: "previewDrafts",
      })
    : client;
}
