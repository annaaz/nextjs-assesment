"use client";

import { useId, useMemo, useState } from "react";
import {
    countMatches,
    searchProducts,
    type Product,
} from "@/lib/searchProducts";

const SMALL_DATA: Product[] = [
    { id: 2, name: "Pear" },
    { id: 1, name: "Apple" },
    { id: 3, name: "Apricot" },
    { id: 4, name: "banana" },
    { id: 5, name: "Blueberry" },
    { id: 6, name: "APPLE PIE" },
    { id: 7, name: "Grape" },
    { id: 8, name: "Pineapple" },
];

function generateLarge(n: number): Product[] {
    const words = ["apple", "Apricot", "BANANA", "Cherry", "grape", "Mango", "Pear", "Plum"];
    return Array.from({ length: n }, (_, i) => ({
        id: i + 1,
        name: `${words[i % words.length]} ${(i * 7919) % 100000}`,
    }));
}

export default function Challenge1Page() {
    const uid = useId();
    const [dataset, setDataset] = useState<"small" | "large">("small");
    const [query, setQuery] = useState("ap");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);

    const products = useMemo(
        () => (dataset === "small" ? SMALL_DATA : generateLarge(100_000)),
        [dataset]
    );

    const { items, total, ms } = useMemo(() => {
        const t0 = performance.now();
        const items = searchProducts(products, query, page, pageSize);
        const total = countMatches(products, query);
        return { items, total, ms: performance.now() - t0 };
    }, [products, query, page, pageSize]);

    const effectivePage = Math.max(1, Math.floor(page) || 1);
    const totalPages = pageSize >= 1 ? Math.max(1, Math.ceil(total / Math.floor(pageSize))) : 1;
    const canPrev = effectivePage > 1;
    const canNext = pageSize >= 1 && effectivePage < totalPages;

    const field =
        "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <main className="mx-auto max-w-3xl p-6">
            <h1 className="text-2xl font-bold">Challenge 1: Filter, Sort, and Paginate</h1>
            <p className="mt-1 text-sm text-gray-600">
                Uji fungsi <code>searchProducts</code>. Coba page 0 / negatif, pageSize 0, atau query
                huruf besar/kecil campur.
            </p>

            <section aria-label="Kontrol" className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor={`${uid}-q`} className="mb-1 block text-sm font-medium">
                        Query
                    </label>
                    <input
                        id={`${uid}-q`}
                        className={field}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor={`${uid}-ds`} className="mb-1 block text-sm font-medium">
                        Dataset
                    </label>
                    <select
                        id={`${uid}-ds`}
                        className={field}
                        value={dataset}
                        onChange={(e) => {
                            setDataset(e.target.value as "small" | "large");
                            setPage(1);
                        }}
                    >
                        <option value="small">Kecil (8 item)</option>
                        <option value="large">Besar (100.000 item)</option>
                    </select>
                </div>
                <div>
                    <label htmlFor={`${uid}-p`} className="mb-1 block text-sm font-medium">
                        Page
                    </label>
                    <input
                        id={`${uid}-p`}
                        type="number"
                        className={field}
                        value={page}
                        onChange={(e) => setPage(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor={`${uid}-ps`} className="mb-1 block text-sm font-medium">
                        Page size
                    </label>
                    <input
                        id={`${uid}-ps`}
                        type="number"
                        className={field}
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    />
                </div>
            </section>

            <section className="mt-6" aria-live="polite">
                <p className="text-sm text-gray-700">
                    {total} produk cocok · halaman {effectivePage} dari {totalPages} · {ms.toFixed(1)} ms
                </p>

                {items.length === 0 ? (
                    <p className="mt-3 rounded-md border border-dashed p-4 text-center text-sm text-gray-500">
                        Tidak ada produk untuk ditampilkan.
                    </p>
                ) : (
                    <ul className="mt-3 divide-y rounded-md border">
                        {items.map((p) => (
                            <li key={p.id} className="flex justify-between px-4 py-2 text-sm">
                                <span>{p.name}</span>
                                <span className="text-gray-500">#{p.id}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <nav aria-label="Paginasi" className="mt-4 flex gap-2">
                    <button
                        type="button"
                        disabled={!canPrev}
                        onClick={() => setPage(effectivePage - 1)}
                        className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Sebelumnya
                    </button>
                    <button
                        type="button"
                        disabled={!canNext}
                        onClick={() => setPage(effectivePage + 1)}
                        className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Berikutnya
                    </button>
                </nav>
            </section>
        </main>
    );
}
