import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "./ProductCard";

const base = { id: "p1", name: "Kopi", price: 12500, imageUrl: "/x.png", available: true };

test("menampilkan harga IDR dan memanggil onAdd", () => {
    const onAdd = vi.fn();
    render(<ProductCard product={base} onAdd={onAdd} />);
    expect(screen.getByText("Rp 12.500")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));
    expect(onAdd).toHaveBeenCalledWith("p1");
});

test("out of stock: tombol disabled", () => {
    const onAdd = vi.fn();
    render(<ProductCard product={{ ...base, available: false }} onAdd={onAdd} />);
    const btn = screen.getByRole("button", { name: "Out of stock" }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    fireEvent.click(btn);
    expect(onAdd).not.toHaveBeenCalled();
});
