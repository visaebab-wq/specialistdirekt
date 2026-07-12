import { getArticle } from "@/lib/articles";
import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Specialistdirekt – artikel";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  return ogImage({
    eyebrow: article?.category ?? "Artikel",
    title: article?.title ?? "Specialistdirekt",
  });
}
