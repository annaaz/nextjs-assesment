"use client";

import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = { id: string; label: string; content: ReactNode };

export type TabsProps = {
    tabs: TabItem[];
    activeId: string;
    onChange: (id: string) => void;
};

const safe = (id: string, index: number) =>
    `${id.replace(/[^a-zA-Z0-9_-]/g, "_")}-${index}`;

export function Tabs({ tabs, activeId, onChange }: TabsProps) {
    const baseId = useId();
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const tabDomId = (i: number) => `${baseId}-tab-${safe(tabs[i].id, i)}`;
    const panelDomId = (i: number) => `${baseId}-panel-${safe(tabs[i].id, i)}`;

    const activeIndex = Math.max(
        0,
        tabs.findIndex((t) => t.id === activeId)
    );

    const focusAndSelect = (index: number) => {
        tabRefs.current[index]?.focus();
        onChange(tabs[index].id);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const last = tabs.length - 1;
        let next: number | null = null;

        switch (e.key) {
            case "ArrowRight":
                next = index === last ? 0 : index + 1;
                break;
            case "ArrowLeft":
                next = index === 0 ? last : index - 1;
                break;
            case "Home":
                next = 0;
                break;
            case "End":
                next = last;
                break;
            default:
                return;
        }

        e.preventDefault();
        focusAndSelect(next);
    };

    return (
        <div className="w-full">
            <div
                role="tablist"
                aria-label="Product information"
                className="flex gap-1 overflow-x-auto border-b border-gray-200"
            >
                {tabs.map((tab, i) => {
                    const selected = i === activeIndex;
                    return (
                        <button
                            key={tab.id}
                            ref={(el) => {
                                tabRefs.current[i] = el;
                            }}
                            id={tabDomId(i)}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            aria-controls={panelDomId(i)}
                            tabIndex={selected ? 0 : -1}
                            onClick={() => onChange(tab.id)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            className={`-mb-px whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ${
                                selected
                                    ? "border-blue-600 text-blue-700"
                                    : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900"
                            }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div
                key={tabs[activeIndex].id}
                role="tabpanel"
                id={panelDomId(activeIndex)}
                aria-labelledby={tabDomId(activeIndex)}
                tabIndex={0}
                className="rounded-b-md p-4 text-sm text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
                {tabs[activeIndex].content}
            </div>
        </div>
    );
}
