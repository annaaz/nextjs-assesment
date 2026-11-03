import { test, expect } from "vitest";
import { findRoute } from "./findRoute";

test("example 1", () =>
    expect(findRoute(["/products/:id", "/about"], "/products/42")).toBe(0));
test("example 2: segmen berlebih", () =>
    expect(findRoute(["/products/:id"], "/products/42/reviews")).toBe(-1));
test("example 3: trailing slash di path", () =>
    expect(findRoute(["/about"], "/about/")).toBe(0));
test("trailing slash di pattern", () =>
    expect(findRoute(["/about/"], "/about")).toBe(0));
test("first match wins", () =>
    expect(findRoute(["/blog/:slug", "/blog/new"], "/blog/new")).toBe(0));
test("tidak ada partial match", () =>
    expect(findRoute(["/products"], "/prod")).toBe(-1));
test("param tidak boleh kosong", () =>
    expect(findRoute(["/products/:id"], "/products//")).toBe(-1));
test("param kurang segmen", () =>
    expect(findRoute(["/products/:id"], "/products")).toBe(-1));
test("root", () => expect(findRoute(["/"], "/")).toBe(0));
test("list kosong", () => expect(findRoute([], "/a")).toBe(-1));
test("case-sensitive", () => expect(findRoute(["/About"], "/about")).toBe(-1));
