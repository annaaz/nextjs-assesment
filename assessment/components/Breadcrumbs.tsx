import Link from "next/link";
import type { Breadcrumb } from "@/lib/buildBreadcrumbs";

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
    if (items.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
                <li className="flex items-center gap-1.5">
                    <Link
                        href="/"
                        className="text-blue-700 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Home
                    </Link>
                </li>
                {items.map((item, i) => {
                    const isLast = i === items.length - 1;
                    return (
                        <li key={item.href} className="flex items-center gap-1.5">
              <span aria-hidden="true" className="text-gray-400">
                /
              </span>
                            {isLast ? (
                                <span aria-current="page" className="font-semibold text-gray-900">
                  {item.label}
                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-blue-700 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
