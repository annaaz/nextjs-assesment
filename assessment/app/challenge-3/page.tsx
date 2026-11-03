"use client";

import { useId, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildBreadcrumbs } from "@/lib/buildBreadcrumbs";

const EXAMPLES = [
    {
        label: "Contoh 1",
        path: "/products/blue%20mug",
        labels: '{ "products": "Shop" }',
    },
    { label: "Contoh 2 (root)", path: "/", labels: "{}" },
    { label: "Trailing slash", path: "/blog/my-first-post/", labels: "{}" },
    { label: "Unicode", path: "/menu/caf%C3%A9-au-lait", labels: '{ "menu": "Menu" }' },
    { label: "Encoding rusak", path: "/files/100%25/%E0%A4%A", labels: "{}" },
    { label: "Key prototype", path: "/constructor/toString", labels: "{}" },
    { label: "Label dengan hyphen", path: "/about-us/our-team", labels: '{ "about-us": "About Us" }' },
];

function parseLabels(text: string): { value: Record<string, string>; error: string | null } {
    try {
        const parsed: unknown = JSON.parse(text);
        if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
            return { value: {}, error: "Labels harus berupa objek JSON, contoh: { \"products\": \"Shop\" }" };
        }
        const value: Record<string, string> = {};
        for (const [k, v] of Object.entries(parsed)) {
            if (typeof v === "string") value[k] = v;
        }
        return { value, error: null };
    } catch {
        return { value: {}, error: "JSON tidak valid." };
    }
}

export default function Challenge3Page() {
    const uid = useId();
    const [pathname, setPathname] = useState(EXAMPLES[0].path);
    const [labelsText, setLabelsText] = useState(EXAMPLES[0].labels);

    const { value: labels, error } = useMemo(() => parseLabels(labelsText), [labelsText]);
    const crumbs = useMemo(() => buildBreadcrumbs(pathname, labels), [pathname, labels]);

    const field =
        "w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <main className="mx-auto max-w-3xl p-6">
            <h1 className="text-2xl font-bold">Challenge 3: Safe Breadcrumb Trail</h1>
            <p className="mt-1 text-sm text-gray-600">
                Label dicari berdasarkan segmen yang sudah di-decode. Href selalu di-encode ulang.
            </p>

            <section aria-label="Contoh" className="mt-4 flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                    <button
                        key={ex.label}
                        type="button"
                        onClick={() => {
                            setPathname(ex.path);
                            setLabelsText(ex.labels);
                        }}
                        className="rounded-full border px-3 py-1 text-xs hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {ex.label}
                    </button>
                ))}
            </section>

            <section className="mt-6 grid gap-4">
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
                <div>
                    <label htmlFor={`${uid}-labels`} className="mb-1 block text-sm font-medium">
                        Labels (JSON)
                    </label>
                    <textarea
                        id={`${uid}-labels`}
                        rows={3}
                        className={field}
                        value={labelsText}
                        onChange={(e) => setLabelsText(e.target.value)}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={error ? `${uid}-err` : undefined}
                    />
                    {error && (
                        <p id={`${uid}-err`} role="alert" className="mt-1 text-sm text-red-600">
                            {error}
                        </p>
                    )}
                </div>
            </section>

            <section className="mt-6 space-y-4" aria-live="polite">
                <div className="rounded-md border bg-gray-50 p-4">
                    {crumbs.length === 0 ? (
                        <p className="text-sm text-gray-500">Tidak ada breadcrumb (path kosong / root).</p>
                    ) : (
                        <Breadcrumbs items={crumbs} />
                    )}
                </div>

                <div>
                    <h2 className="mb-1 text-sm font-medium">Output fungsi</h2>
                    <pre
                        className="overflow-x-auto rounded-md border bg-white p-3 text-xs"
                        data-testid="output"
                    >
            {JSON.stringify(crumbs, null, 2)}
          </pre>
                </div>
            </section>
        </main>
    );
}
