"use client";

export default function GlobalError() {
  return (
    <html lang="sv">
      <body>
        <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
          <p className="text-5xl font-extrabold text-brand-600">Fel</p>
          <h1 className="mt-4 text-2xl font-bold text-ink-900">Något gick fel</h1>
          <p className="mt-3 text-ink-600">
            Ett oväntat fel uppstod. Gå tillbaka till startsidan och försök igen.
          </p>
          <figure className="specialty-hero-visual mt-8 w-full">
            <img
              src="/page-visuals/static-global-error.webp"
              alt="Specialistdirekt - trygg vårdbild vid tekniskt fel"
              className="h-full w-full object-cover"
            />
          </figure>
          <a
            href="/"
            className="mt-8 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Till startsidan
          </a>
        </main>
      </body>
    </html>
  );
}
