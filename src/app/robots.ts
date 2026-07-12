import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Vi VILL bli hittade och citerade av både sökmotorer och AI-assistenter.
// Därför välkomnas AI-crawlers uttryckligen (många sajter blockerar dem –
// vi gör tvärtom, eftersom AI-svar är en växande trafikkälla).
const aiCrawlers = [
  "GPTBot", // OpenAI – ChatGPT-träning/index
  "OAI-SearchBot", // OpenAI – ChatGPT Search
  "ChatGPT-User", // OpenAI – live-hämtning vid svar
  "ClaudeBot", // Anthropic – Claude
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot", // Perplexity
  "Google-Extended", // Google Gemini/Vertex
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl (matar många AI-modeller)
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Uttryckligt "allow" till AI-crawlers (positiv, avsiktlig signal).
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
