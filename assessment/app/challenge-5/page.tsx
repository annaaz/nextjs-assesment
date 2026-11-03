"use client";

import { useState } from "react";
import { Tabs, type TabItem } from "@/components/Tabs";

const TABS: TabItem[] = [
    {
        id: "description",
        label: "Description",
        content: (
            <p>
                Kopi arabika single origin dengan aroma floral dan rasa manis alami. Disangrai medium
                untuk menjaga karakter asli biji.
            </p>
        ),
    },
    {
        id: "reviews",
        label: "Reviews",
        content: (
            <ul className="list-disc space-y-1 pl-5">
                <li>&quot;Aromanya enak sekali.&quot; (5/5)</li>
                <li>&quot;Pengiriman cepat, kemasan rapi.&quot; (4/5)</li>
                <li>&quot;Sedikit asam, tapi saya suka.&quot; (4/5)</li>
            </ul>
        ),
    },
    {
        id: "shipping",
        label: "Shipping",
        content: (
            <div className="space-y-2">
                <p>Dikirim dalam 1-2 hari kerja ke seluruh Indonesia.</p>
                <button
                    type="button"
                    className="rounded-md border px-3 py-1 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                    Cek ongkir
                </button>
            </div>
        ),
    },
];

export default function Challenge5Page() {
    const [activeId, setActiveId] = useState("reviews");

    return (
        <main className="mx-auto max-w-2xl p-6">
            <h1 className="text-2xl font-bold">Challenge 5: Accessible Tabs</h1>
            <p className="mt-1 text-sm text-gray-600">
                Coba klik, atau fokus ke tab lalu tekan panah kiri/kanan, Home, dan End.
            </p>

            <div className="mt-6 rounded-md border bg-white">
                <Tabs tabs={TABS} activeId={activeId} onChange={setActiveId} />
            </div>

            <p className="mt-4 text-sm" aria-live="polite">
                activeId saat ini:{" "}
                <code className="rounded bg-gray-100 px-1.5 py-0.5" data-testid="active-id">
                    {activeId}
                </code>
            </p>
        </main>
    );
}
