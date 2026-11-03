import { test, expect } from "vitest";
import { formatIDR } from "./formatIDR";

test("contoh soal", () => expect(formatIDR(12500)).toBe("Rp 12.500"));
test("nol", () => expect(formatIDR(0)).toBe("Rp 0"));
test("di bawah seribu", () => expect(formatIDR(999)).toBe("Rp 999"));
test("jutaan", () => expect(formatIDR(1250000)).toBe("Rp 1.250.000"));
test("desimal dibulatkan", () => expect(formatIDR(12500.6)).toBe("Rp 12.501"));
test("negatif", () => expect(formatIDR(-1000)).toBe("-Rp 1.000"));
test("NaN dan Infinity", () => {
    expect(formatIDR(NaN)).toBe("Rp 0");
    expect(formatIDR(Infinity)).toBe("Rp 0");
});
