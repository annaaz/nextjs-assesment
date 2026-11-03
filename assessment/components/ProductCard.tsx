import { formatIDR } from "@/lib/formatIDR";

export type Product = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    available: boolean;
};

export type ProductCardProps = {
    product: Product;
    onAdd: (productId: string) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
    const { id, name, price, imageUrl, available } = product;
    const titleId = `product-${id}-title`;

    return (
        <article
            aria-labelledby={titleId}
            className="flex w-full max-w-xs flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
        >
            <div className="relative aspect-square bg-gray-100">
                {/* <img> biasa dipakai agar tidak perlu konfigurasi domain next/image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={imageUrl}
                    alt={name}
                    loading="lazy"
                    className={`h-full w-full object-cover ${available ? "" : "opacity-50 grayscale"}`}
                />
                {!available && (
                    <span className="absolute left-2 top-2 rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white">
            Out of stock
          </span>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-1 p-4">
                <h3 id={titleId} className="text-base font-semibold text-gray-900">
                    {name}
                </h3>
                <p className="text-lg font-bold text-blue-700">
                    <data value={price}>{formatIDR(price)}</data>
                </p>

                <button
                    type="button"
                    disabled={!available}
                    onClick={() => onAdd(id)}
                    className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
                >
                    {available ? "Add to cart" : "Out of stock"}
                </button>
            </div>
        </article>
    );
}
