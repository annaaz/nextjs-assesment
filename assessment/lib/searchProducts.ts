export type Product = { id: number; name: string };
const normalize = (s: string) => s.toLowerCase();

export function countMatches(products: Product[], query: string): number {
    const q = normalize(query);
    let count = 0;
    for (const p of products) {
        if (normalize(p.name).includes(q)) count++;
    }
    return count;
}

export function searchProducts(
    products: Product[],
    query: string,
    page: number,
    pageSize: number
): Product[] {
    const size = Math.floor(pageSize);
    if (!Number.isFinite(size) || size < 1) return [];

    const safePage = Number.isFinite(page) ? Math.max(1, Math.floor(page)) : 1;
    const q = normalize(query);

    const matched: { key: string; product: Product }[] = [];
    for (const product of products) {
        const key = normalize(product.name);
        if (key.includes(q)) matched.push({ key, product });
    }

    matched.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));

    const start = (safePage - 1) * size;
    return matched.slice(start, start + size).map((m) => m.product);
}
