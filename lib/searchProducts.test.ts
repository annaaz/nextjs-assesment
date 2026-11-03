// lib/searchProducts.test.ts
import { test, expect } from "vitest";
import { searchProducts } from "./searchProducts";

const data = [
    { id: 2, name: "Pear" },
    { id: 1, name: "Apple" },
    { id: 3, name: "Apricot" },
];

test("example 1", () =>
    expect(searchProducts(data, "ap", 1, 1)).toEqual([{ id: 1, name: "Apple" }]));
test("example 2", () =>
    expect(searchProducts([{ id: 1, name: "Apple" }], "zz", 1, 10)).toEqual([]));
test("page < 1 is treated as 1", () =>
    expect(searchProducts(data, "ap", -5, 1)).toEqual([{ id: 1, name: "Apple" }]));
test("pageSize < 1 returns []", () =>
    expect(searchProducts(data, "ap", 1, 0)).toEqual([]));
test("does not mutate input", () => {
    const copy = [...data];
    searchProducts(data, "", 1, 10);
    expect(data).toEqual(copy);
});
