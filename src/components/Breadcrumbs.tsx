import Link from "next/link";

// Visuella brödsmulor. Strukturerad data (BreadcrumbList) läggs separat
// via JsonLd på sidorna för rich results.
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Brödsmulor" className="text-sm text-ink-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="text-ink-700">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-brand-700">
                    {item.name}
                  </Link>
                  <span aria-hidden className="text-ink-300">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
