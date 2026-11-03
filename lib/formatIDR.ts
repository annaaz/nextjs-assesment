
export function formatIDR(amount: number): string {
    if (!Number.isFinite(amount)) return "Rp 0";

    const rounded = Math.round(Math.abs(amount));
    const grouped = String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const sign = amount < 0 && rounded !== 0 ? "-" : "";

    return `${sign}Rp ${grouped}`;
}
