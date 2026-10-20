const ENGLISH_NOT_FOUND = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="robots" content="noindex,nofollow,noarchive">
    <meta name="googlebot" content="noindex,nofollow,noarchive">
    <meta name="description" content="The page you are looking for does not exist or has moved.">
    <meta property="og:title" content="Page not found – Specialistdirekt">
    <meta property="og:description" content="The page you are looking for does not exist or has moved.">
    <meta property="og:site_name" content="Specialistdirekt">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="Page not found – Specialistdirekt">
    <meta name="twitter:description" content="The page you are looking for does not exist or has moved.">
    <title>404 – Specialistdirekt</title>
    <style>
      *{box-sizing:border-box}body{margin:0;background:#fff;color:#334155;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}header{border-bottom:1px solid #e2e8f0;background:#fff}header a{display:flex;align-items:center;gap:.6rem;max-width:72rem;margin:auto;padding:1rem;color:#18324e;font-size:1.15rem;font-weight:750;text-decoration:none}.mark{display:grid;width:2rem;height:2rem;place-items:center;border-radius:999px;background:#0f766e;color:#fff}.brand{color:#0f766e}main{max-width:42rem;margin:auto;padding:4rem 1rem 5rem;text-align:center}.code{margin:0;color:#0f766e;font-size:4rem;font-weight:800;line-height:1}h1{margin:1rem 0 0;color:#0f172a;font-size:1.6rem}p{margin:1rem auto 0;max-width:36rem;line-height:1.65}.visual{display:block;width:100%;max-height:19rem;margin:2rem auto 0;border-radius:1.25rem;object-fit:cover}.actions{display:flex;flex-wrap:wrap;justify-content:center;gap:.75rem;margin-top:2rem}.actions a{border:1px solid #cbd5e1;border-radius:999px;padding:.75rem 1.35rem;color:#334155;font-size:.9rem;font-weight:700;text-decoration:none}.actions .primary{border-color:#0f766e;background:#0f766e;color:#fff}.actions a:focus-visible{outline:3px solid #99f6e4;outline-offset:3px}footer{border-top:1px solid #e2e8f0;padding:1.5rem 1rem;text-align:center;color:#64748b;font-size:.85rem}@media(max-width:420px){main{padding-top:3rem}.code{font-size:3.5rem}.actions{flex-direction:column}.actions a{width:100%}}
    </style>
  </head>
  <body>
    <header>
      <a href="/en" aria-label="Specialistdirekt – English home page">
        <span class="mark" aria-hidden="true">+</span>
        <span>Specialist<span class="brand">direkt</span></span>
      </a>
    </header>
    <main>
      <p class="code">404</p>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or has moved. Let us help you find the right place.</p>
      <img class="visual" src="/page-visuals/static-not-found.webp" alt="Specialistdirekt – help finding the right page and specialist care">
      <nav class="actions" aria-label="Continue browsing">
        <a class="primary" href="/en">Go to homepage</a>
        <a href="/en/private-orthopedist-gothenburg">Orthopedist in Gothenburg</a>
      </nav>
    </main>
    <footer>Specialistdirekt is not an emergency service. Call 112 in an emergency.</footer>
  </body>
</html>`;

export function GET() {
  return new Response(ENGLISH_NOT_FOUND, {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
      "Content-Language": "en",
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
