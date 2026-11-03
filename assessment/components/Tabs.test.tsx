import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "./Tabs";

const tabs = [
    { id: "description", label: "Description", content: <p>Desc content</p> },
    { id: "reviews", label: "Reviews", content: <p>Reviews content</p> },
    { id: "shipping", label: "Shipping", content: <p>Ship content</p> },
];

test("tab aktif ditandai selected dan panelnya tampil", () => {
    render(<Tabs tabs={tabs} activeId="reviews" onChange={() => {}} />);
    const tab = screen.getByRole("tab", { name: "Reviews" });
    expect(tab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tab", { name: "Description" }).getAttribute("aria-selected")).toBe("false");
    expect(screen.getByRole("tabpanel").textContent).toContain("Reviews content");
});

test("tab dan panel saling terhubung lewat ARIA", () => {
    render(<Tabs tabs={tabs} activeId="reviews" onChange={() => {}} />);
    const tab = screen.getByRole("tab", { name: "Reviews" });
    const panel = screen.getByRole("tabpanel");
    expect(tab.getAttribute("aria-controls")).toBe(panel.id);
    expect(panel.getAttribute("aria-labelledby")).toBe(tab.id);
});

test("klik memanggil onChange dengan id", () => {
    const onChange = vi.fn();
    render(<Tabs tabs={tabs} activeId="reviews" onChange={onChange} />);
    fireEvent.click(screen.getByRole("tab", { name: "Shipping" }));
    expect(onChange).toHaveBeenCalledWith("shipping");
});

test("roving tabindex", () => {
    render(<Tabs tabs={tabs} activeId="reviews" onChange={() => {}} />);
    expect(screen.getByRole("tab", { name: "Reviews" }).getAttribute("tabindex")).toBe("0");
    expect(screen.getByRole("tab", { name: "Description" }).getAttribute("tabindex")).toBe("-1");
});

test("keyboard: ArrowRight, ArrowLeft (wrap), Home, End", () => {
    const onChange = vi.fn();
    render(<Tabs tabs={tabs} activeId="reviews" onChange={onChange} />);
    const reviews = screen.getByRole("tab", { name: "Reviews" });

    fireEvent.keyDown(reviews, { key: "ArrowRight" });
    expect(onChange).toHaveBeenLastCalledWith("shipping");

    fireEvent.keyDown(screen.getByRole("tab", { name: "Description" }), { key: "ArrowLeft" });
    expect(onChange).toHaveBeenLastCalledWith("shipping"); // wrap ke tab terakhir

    fireEvent.keyDown(reviews, { key: "Home" });
    expect(onChange).toHaveBeenLastCalledWith("description");

    fireEvent.keyDown(reviews, { key: "End" });
    expect(onChange).toHaveBeenLastCalledWith("shipping");
});
