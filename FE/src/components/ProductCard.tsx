import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import type { Product } from "../data/catalog";
import { formatPrice } from "../utils/formatPrice";
import { useCart } from "../context/CartContext";
import { Button } from "./ui";

export function ProductCard({
    product,
    color,
}: {
    product: Product;
    color?: Product["colors"][number];
}) {
    const { addItem } = useCart();

    const selectedColor = color || product.colors?.[0];
    const image = selectedColor?.image || product.images?.[0];

    // FIX: related products from the API may not include `slug`.
    // Fall back to id / _id so the link never becomes /products/undefined
    const productKey: string =
        product.slug || product.id || (product as any)._id;

    return (
        <article className="product-card">
            <Link
                to="/products/$id"
                params={{ id: productKey }}
                className="product-card__image"
            >
                <img
                    src={image}
                    alt={`${product.title} - ${selectedColor?.name || ""}`}
                    loading="lazy"
                    width="1024"
                    height="1024"
                />

                {product.badge && <span className="badge">{product.badge}</span>}
            </Link>

            <div className="product-card__body">
                <Link
                    to="/products/$id"
                    params={{ id: productKey }}
                    className="product-card__title"
                >
                    {product.title}
                </Link>

                {selectedColor && <p className="product-card__color">{selectedColor.name}</p>}

                <div className="product-card__prices">
                    {product.compareAtPrice != null && product.compareAtPrice > product.price && (
                        <span className="product-card__old-price">
                            {formatPrice(product.compareAtPrice)}
                        </span>
                    )}

                    <span className="price">
                        {formatPrice(product.price)}
                    </span>
                </div>

                {product.stock === 0 ? (
                    <Button disabled>
                        Out of stock
                    </Button>
                ) : (
                    <Button onClick={() => addItem(product, selectedColor, 1)}>
                        <ShoppingBag size={17} /> Add to cart
                    </Button>
                )}
            </div>
        </article>
    );
}

export function ProductGrid({ items }: { items: Product[] }) {
    const cards = items.flatMap((product) => {
        if (!product.colors?.length) {
            return [{ product, color: undefined }];
        }

        return product.colors.map((color) => ({
            product,
            color,
        }));
    });

    return cards.length ? (
        <div className="product-grid">
            {cards.map(({ product, color }) => (
                <ProductCard
                    key={`${product.id}-${color?.id || "default"}`}
                    product={product}
                    color={color}
                />
            ))}
        </div>
    ) : (
        <div className="empty-state">
            <span>🧶</span>
            <h3>No pieces found in this color yet!</h3>
            <p>Check back soon — something lovely is always on the hook.</p>
        </div>
    );
}
