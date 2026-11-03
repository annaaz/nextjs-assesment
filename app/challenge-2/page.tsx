"use client";

import { useId, useMemo, useState } from "react";
import { findRoute } from "@/lib/findRoute";

const EXAMPLES = [
    { label: "Contoh 1", patterns: "/products/:id\n/about", path: "/products/42" },
    { label: "Contoh 2", patterns: "/products/:id", path: "/products/42/reviews" },
    { label: "Contoh 3", patterns: "/about", path: "/about/" },
    { label: "First match", patterns: "/blog/:slug\n/blog/new", path: "/blog/new" },
    { label: "Param kosong", patterns: "/products/:id", path: "/products//" },
];

export default function Challenge2Page() {
    const uid = useId();
    const [patternText, setPatternText] = useState(EXAMPLES[0].patterns);
    const [pathname, setPathname] = useState(EXAMPLES[0].path);

    const patterns = useMemo(
        () => patternText.split("\n").map((s) => s.trim()).filter(Boolean),
        [patternText]
    );
    const result = useMemo(() => findRoute(patterns, pathname), [patterns, pathname]);

    const field =
        "w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <main className="mx-auto max-w-3xl p-6">
            <h1 className="text-2xl font-bold">Challenge 2: Resolve the Best Matching Route</h1>
            <p className="mt-1 text-sm text-gray-600">
                Satu pattern per baris. Segmen berawalan <code>:</code> cocok dengan satu segmen non-kosong.
            </p>

            <section aria-label="Contoh" className="mt-4 flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                    <button
                        key={ex.label}
                        type="button"
                        onClick={() => {
                            setPatternText(ex.patterns);
                            setPathname(ex.path);
                        }}
                        className="rounded-full border px-3 py-1 text-xs hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {ex.label}
                    </button>
                ))}
            </section>

            <section className="mt-6 grid gap-4">
                <div>
                    <label htmlFor={`${uid}-pat`} className="mb-1 block text-sm font-medium">
                        Patterns
                    </label>
                    <textarea
                        id={`${uid}-pat`}
                        rows={5}
                        className={field}
                        value={patternText}
                        onChange={(e) => setPatternText(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor={`${uid}-path`} className="mb-1 block text-sm font-medium">
                        Pathname
                    </label>
                    <input
                        id={`${uid}-path`}
                        className={field}
                        value={pathname}
                        onChange={(e) => setPathname(e.target.value)}
                    />
                </div>
            </section>

            <section className="mt-6" aria-live="polite">
                <p className="text-sm">
                    Hasil <code>findRoute</code>:{" "}
                    <strong
                        className={result === -1 ? "text-red-600" : "text-green-700"}
                        data-testid="result"
                    >
                        {result}
                    </strong>
                </p>

                <ol className="mt-3 divide-y rounded-md border">
                    {patterns.length === 0 && (
                        <li className="p-3 text-sm text-gray-500">Belum ada pattern.</li>
                    )}
                    {patterns.map((p, i) => (
                        <li
                            key={`${p}-${i}`}
                            className={`flex items-center justify-between px-4 py-2 font-mono text-sm ${
                                i === result ? "bg-green-50 font-semibold" : ""
                            }`}
                            aria-current={i === result ? "true" : undefined}
                        >
              <span>
                <span className="mr-3 text-gray-400">{i}</span>
                  {p}
              </span>
                            {i === result && (
                                <span className="rounded bg-green-600 px-2 py-0.5 text-xs text-white">match</span>
                            )}
                        </li>
                    ))}
                </ol>
            </section>
        </main>
    );
}
