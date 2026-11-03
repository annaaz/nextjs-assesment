export type Breadcrumb = { label: string; href: string };

function safeDecode(segment: string): string {
    try {
        return decodeURIComponent(segment);
    } catch {
        return segment;
    }
}

const hasOwn = (obj: object, key: string) =>
    Object.prototype.hasOwnProperty.call(obj, key);

export function buildBreadcrumbs(
    pathname: string,
    labels: Record<string, string>
): Breadcrumb[] {
    const crumbs: Breadcrumb[] = [];
    let href = "";

    for (const raw of pathname.split("/")) {
        if (raw === "") continue;

        const decoded = safeDecode(raw);
        href += "/" + encodeURIComponent(decoded);

        // hasOwn mencegah "constructor", "toString", dst. ikut terbaca dari prototype
        const label = hasOwn(labels, decoded)
            ? labels[decoded]
            : decoded.replace(/-/g, " ");

        crumbs.push({ label, href });
    }

    return crumbs;
}
