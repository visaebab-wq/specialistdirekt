import { getSpecialty } from "@/lib/specialties";
import { getCity } from "@/lib/cities";
import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Specialistdirekt – specialist i din stad";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; stad: string }>;
}) {
  const { slug, stad } = await params;
  const specialty = getSpecialty(slug);
  const city = getCity(stad);
  return ogImage({
    eyebrow: city ? `${specialty?.name ?? ""} · ${city.region}` : "Specialistvård",
    title:
      specialty && city
        ? `${specialty.title} i ${city.name}`
        : "Specialistdirekt",
  });
}
