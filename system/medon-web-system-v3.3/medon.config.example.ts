export type MedonContentProvider = "local" | "pages" | "sanity";
export type MedonRuntime = "static" | "hybrid" | "app";

export interface MedonWebConfig {
  workflowProfile?: "FAST" | "STANDARD" | "ADVANCED" | "EXISTING_SITE";
  siteOwnership?: "MEDON_OWNED" | "CLIENT_OWNED";
  site: {
    name: string;
    domain: string;
    locale: "nb-NO" | "nn-NO" | "en-NO" | string;
  };
  content: {
    provider: MedonContentProvider;
  };
  runtime: MedonRuntime;
  forms: {
    provider: "medon-leads" | "project-backend";
  };
  seo: {
    sitemap: boolean;
    structuredData: boolean;
  };
  analytics: {
    enabled: boolean;
    consentRequired: boolean;
  };
}

/**
 * Example only.
 * Do not add abstractions solely to satisfy this file.
 * A tiny site may not need a central config at all.
 */
const config: MedonWebConfig = {
  workflowProfile: "STANDARD",
  siteOwnership: "CLIENT_OWNED",
  site: {
    name: "Example",
    domain: "example.no",
    locale: "nb-NO",
  },
  content: {
    provider: "local",
  },
  runtime: "static",
  forms: {
    provider: "medon-leads",
  },
  seo: {
    sitemap: true,
    structuredData: true,
  },
  analytics: {
    enabled: true,
    consentRequired: true,
  },
};

export default config;
