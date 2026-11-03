import { test, expect } from "vitest";
import { buildBreadcrumbs } from "./buildBreadcrumbs";

test("example 1", () =>
    expect(buildBreadcrumbs("/products/blue%20mug", { products: "Shop" })).toEqual([
        { label: "Shop", href: "/products" },
        { label: "blue mug", href: "/products/blue%20mug" },
    ]));

test("example 2: root", () => expect(buildBreadcrumbs("/", {})).toEqual([]));

test("trailing slash diabaikan", () =>
    expect(buildBreadcrumbs("/blog/", {})).toEqual([{ label: "blog", href: "/blog" }]));

test("hyphen jadi spasi jika tidak ada label", () =>
    expect(buildBreadcrumbs("/my-first-post", {})[0].label).toBe("my first post"));

test("label dicari lewat segmen ter-decode", () =>
    expect(buildBreadcrumbs("/blue%20mug", { "blue mug": "Mug Biru" })[0].label).toBe("Mug Biru"));

test("label map menang atas penggantian hyphen", () =>
    expect(buildBreadcrumbs("/about-us", { "about-us": "About Us" })[0].label).toBe("About Us"));

test("unicode", () =>
    expect(buildBreadcrumbs("/caf%C3%A9", {})).toEqual([{ label: "café", href: "/caf%C3%A9" }]));

test("%2F tidak memecah segmen", () =>
    expect(buildBreadcrumbs("/a%2Fb", {})).toEqual([{ label: "a/b", href: "/a%2Fb" }]));

test("encoding rusak tidak melempar error", () => {
    expect(() => buildBreadcrumbs("/100%/%E0%A4%A", {})).not.toThrow();
    expect(buildBreadcrumbs("/100%", {})).toEqual([{ label: "100%", href: "/100%25" }]);
});

test("key prototype tidak dianggap label", () =>
    expect(buildBreadcrumbs("/constructor", {})[0].label).toBe("constructor"));

test("segmen kosong ('//') dilewati", () =>
    expect(buildBreadcrumbs("/a//b", {}).map((c) => c.href)).toEqual(["/a", "/a/b"]));

test("href berupa prefix berurutan", () =>
    expect(buildBreadcrumbs("/a/b/c", {}).map((c) => c.href)).toEqual(["/a", "/a/b", "/a/b/c"]));
