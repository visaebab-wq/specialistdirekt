import { getSpecialty } from "@/lib/specialties";
import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Specialistdirekt – specialitet";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const specialty = getSpecialty(slug);
  return ogImage({
    eyebrow: specialty?.name ?? "Specialitet",
    title: specialty ? `Hitta en ${specialty.title.toLowerCase()}` : "Specialistdirekt",
  });
}
