import type { Metadata } from "next";
import { AnatomyHeroVisual } from "@/components/AnatomyHeroVisual";

export const metadata: Metadata = {
  title: "Interaktiv kroppsguide – förhandsvisning",
  description: "Förhandsvisning av Specialistdirekts interaktiva kroppsguide.",
  robots: { index: false, follow: false },
};

export default function KroppsguidePage() {
  return (
    <main className="min-h-screen bg-sky-50">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="text-center">
          <p className="internal-hero-kicker">Interaktiv kroppsguide</p>
          <h1 className="mt-3 text-4xl font-extrabold text-ink-900 sm:text-5xl">
            Var i kroppen har du besvär?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-ink-600">
            Välj kvinna eller man. Växla mellan organ framifrån och skelett bakifrån.
          </p>
        </div>

        <div className="home-anatomy-explorer mx-auto mt-8">
          <AnatomyHeroVisual />
        </div>
      </section>
    </main>
  );
}
