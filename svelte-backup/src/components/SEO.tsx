import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

const BASE_TITLE = "My Doggles";
const BASE_URL = "https://mydoggles.com";

export const SEO = ({ title, description, canonical }: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title === BASE_TITLE ? title : `${title} | ${BASE_TITLE}`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl && canonical) {
      ogUrl.setAttribute("content", `${BASE_URL}${canonical}`);
    }

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", `${BASE_URL}${canonical}`);
    }

    // Cleanup on unmount - restore defaults
    return () => {
      document.title = `${BASE_TITLE} - See Through Your Dog's Eyes`;
    };
  }, [title, description, canonical]);

  return null;
};
