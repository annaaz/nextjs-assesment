function toSegments(path: string): string[] {
    let p = path;
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1); // hanya satu slash
    if (p.startsWith("/")) p = p.slice(1);
    return p === "" ? [] : p.split("/");
}

export function findRoute(patterns: string[], pathname: string): number {
    const pathSegs = toSegments(pathname); // dihitung sekali saja

    for (let i = 0; i < patterns.length; i++) {
        const patSegs = toSegments(patterns[i]);
        if (patSegs.length !== pathSegs.length) continue;

        let ok = true;
        for (let j = 0; j < patSegs.length; j++) {
            const pat = patSegs[j];
            const seg = pathSegs[j];
            if (pat.startsWith(":")) {
                if (seg === "") { ok = false; break; } // param harus non-empty
            } else if (pat !== seg) {
                ok = false;
                break;
            }
        }
        if (ok) return i;
    }
    return -1;
}
