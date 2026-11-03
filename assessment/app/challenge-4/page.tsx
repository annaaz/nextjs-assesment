"use client";

import { useState } from "react";
import { ProductCard, type Product } from "@/components/ProductCard";

// Gambar SVG inline (data URI), jadi tidak butuh jaringan atau konfigurasi next/image
const img = (bg: string, label: string) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="${bg}"/><text x="50%" y="50%" font-family="sans-serif" font-size="32" fill="white" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`
    )}`;

const PRODUCTS: Product[] = [
    { id: "p1", name: "Kopi Arabika 250g", price: 12500, imageUrl: img("#7c4a21", "Kopi"), available: true },
    { id: "p2", name: "Teh Hijau Premium", price: 1250000, imageUrl: img("#2f7d4f", "Teh"), available: true },
    { id: "p3", name: "Gula Aren Organik", price: 999, imageUrl: img("#a35a1a", "Gula"), available: true },
    { id: "p4", name: "Cokelat Batang (Habis)", price: 45000, imageUrl: img("#4b2e2b", "Cokelat"), available: false },
];

export default function Challenge4Page() {
    const [log, setLog] = useState<string[]>([]);

    const handleAdd = (productId: string) => {
        setLog((prev) => [`onAdd("${productId}")`, ...prev].slice(0, 8));
    };

    return (
        <main className="mx-auto max-w-5xl p-6">
            <h1 className="text-2xl font-bold">Challenge 4: Product Card</h1>
            <p className="mt-1 text-sm text-gray-600">
                Klik &quot;Add to cart&quot; dan lihat log di bawah. Produk terakhir tidak tersedia.
            </p>

            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {PRODUCTS.map((p) => (
                    <li key={p.id} className="flex justify-center">
                        <ProductCard product={p} onAdd={handleAdd} />
                    </li>
                ))}
            </ul>

            <section className="mt-8" aria-live="polite">
                <h2 className="mb-2 text-sm font-medium">Log pemanggilan onAdd</h2>
                {log.length === 0 ? (
                    <p className="text-sm text-gray-500">Belum ada klik.</p>
                ) : (
                    <ul className="rounded-md border bg-gray-50 p-3 font-mono text-xs" data-testid="log">
                        {log.map((entry, i) => (
                            <li key={`${entry}-${i}`}>{entry}</li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
