import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight, Heart, LockKeyhole, Plus, ShoppingBag, Sparkles } from "lucide-react";
import { getAllProducts, getFeaturedProducts, getProductById, getRelatedProducts } from "../services/productService";
import { getAllCategories, getCategoryBySlug } from "../services/categoryService";
import { createOrder } from "../services/orderService";
import { ProductGrid } from "./ProductCard";
import { Button, ButtonLink, Quantity } from "./ui";
import { useCart } from "../context/CartContext";
import { CartContent } from "./CartContent";
import { formatPrice } from "../utils/formatPrice";
import { governorates } from "../utils/constants";

// TODO: replace these with three DIFFERENT images so the slider actually changes
import heroImage1 from "../assets/yarnoozah-hero.jpg"
import heroImage2 from "../assets/image.png"
import heroImage3 from "../assets/crochet-pink-bag.jpg"

const WHATSAPP_DISPLAY = "01017287399";
const WHATSAPP_LINK = "https://wa.me/201017287399"; // Egypt code 20, without the leading 0

export function HomePage() {
    const { data: categoriesRes } = useQuery({ queryKey: ["categories"], queryFn: getAllCategories });
    const { data: featuredRes } = useQuery({ queryKey: ["products", "featured"], queryFn: getFeaturedProducts });

    const categories = categoriesRes?.data ?? [];
    const products = featuredRes?.data ?? [];

    const heroImages = [
        "https://res.cloudinary.com/lgvaqope/image/upload/c_fill,g_auto,w_1200,h_1000,f_auto,q_auto/v1791989999/IMG_0739.jpg",
        "https://res.cloudinary.com/lgvaqope/image/upload/c_fill,g_auto,w_1200,h_1000,f_auto,q_auto/v1791990170/IMG_9840.jpg",
        "https://res.cloudinary.com/lgvaqope/image/upload/c_fill,g_auto,w_1200,h_1000,f_auto,q_auto/v1791990376/IMG_5206.jpg",
    ];
    const [heroIndex, setHeroIndex] = useState(0);

    const nextHero = () => setHeroIndex((current) => (current + 1) % heroImages.length);
    const previousHero = () => setHeroIndex((current) => (current - 1 + heroImages.length) % heroImages.length);

    // Swipe left/right on the hero (phones)
    const touchStartX = useRef<number | null>(null);

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? nextHero : previousHero)();
        touchStartX.current = null;
    };

    return <>
        <section className="hero" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <img
                src={heroImages[heroIndex]}
                alt="yarnoozah colorful crochet fashion in Cairo"
                width="1600"
                height="1008"
            />

            <button className="hero-arrow hero-arrow--left" onClick={previousHero} aria-label="Previous image">‹</button>
            <button className="hero-arrow hero-arrow--right" onClick={nextHero} aria-label="Next image">›</button>

            <div className="hero-copy">
                <p className="eyebrow">100% HANDMADE · MADE IN EGYPT</p>
                <h1>Handmade. Playful.<br /><em>Uniquely yours.</em></h1>
                <p>Discover our latest drop of handcrafted crochet bags, tops, and tiny joyful things.</p>
                <ButtonLink to="/products">Shop the collection <ChevronRight size={18} /></ButtonLink>
            </div>

            <div className="hero-dots">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        className={heroIndex === index ? "is-active" : ""}
                        onClick={() => setHeroIndex(index)}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>
        </section>

        <section className="section">
            <div className="section-heading">
                <div><p className="eyebrow">PICK YOUR MOOD</p><h2>Made for colorful days</h2></div>
                <ButtonLink to="/products" variant="outline">Shop all</ButtonLink>
            </div>

            <div className="category-grid">
                {categories.map((c: any) => (
                    <Link
                        to="/collections/$category"
                        params={{ category: c.slug }}
                        key={c.slug}
                        className="category-card"
                    >
                        <img src={c.image} alt="" loading="lazy" />
                        <span>{c.name}</span>
                    </Link>
                ))}
            </div>
        </section>

        <section className="section section--pink">
            <div className="section-heading">
                <div><p className="eyebrow">FRESH OFF THE HOOK</p><h2>Trending now</h2></div>
                <p>Small-batch favorites. Once they're gone, they're gone.</p>
            </div>

            <ProductGrid items={products.slice(0, 4)} />
        </section>

        <section className="story-band">
            <div><img src={heroImages[1]} alt="Handmade crochet in progress" loading="lazy" /></div>
            <div>
                <p className="eyebrow">OUR CRAFT</p>
                <h2>Made by hand, one loop at a time</h2>
                <p>Every piece is crocheted in small batches by women artisans in Egypt.</p>
                <div className="craft-points">
                    <span>🧶<b>100% handmade</b><small>No machines, no shortcuts.</small></span>
                    <span>🇪🇬<b>Made in Egypt</b><small>Designed and packed in Cairo.</small></span>
                    <span>💙<b>Limited drops</b><small>Small batches, once they're gone, they're gone.</small></span>
                </div>
                <ButtonLink to="/about" variant="outline">Our story</ButtonLink>
            </div>
        </section>
    </>;
}

export function ProductsPage() {
    const { data } = useQuery({ queryKey: ["categories"], queryFn: getAllCategories });
    const categories = data?.data ?? [];

    return <>
        <PageIntro eyebrow="THE WHOLE YARNIVERSE" title="Shop by collection" text="Find the color, texture, and tiny detail that feels most like you." />
        <section className="section">
            <div className="catalog-categories">
                {categories.map((c: any) => (
                    <article key={c.slug}>
                        <img src={c.image} alt={c.name} />
                        <div>
                            <p className="eyebrow">HANDMADE COLLECTION</p>
                            <h2>{c.name}</h2>
                            <p>{c.description}</p>
                            <Link to="/collections/$category" params={{ category: c.slug }} className="button button--outline hack">View products</Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    </>;
}

export function CategoryPage({ slug }: { slug: string }) {
    const [color, setColor] = useState("all");
    const [sort, setSort] = useState("featured");
    const [stock, setStock] = useState(false);

    const { data: categoryRes } = useQuery({ queryKey: ["category", slug], queryFn: () => getCategoryBySlug(slug) });
    const category = categoryRes?.data;

    const { data: productsRes } = useQuery({
        queryKey: ["products", { category: slug, color, sort, stock }],
        queryFn: () => getAllProducts({
            category: slug,
            color: color === "all" ? undefined : color,
            sort: sort === "featured" ? undefined : sort,
            inStock: stock || undefined,
        }),
    });

    const products = productsRes?.data?.products ?? [];
    const colors = Array.from(new Map(products.flatMap((p: any) => p.colors).map((c: any) => [c.id, c])).values());

    return <>
        {category
            ? <PageIntro eyebrow="HANDMADE COLLECTION" title={category.name} text={`${category.description} ${products.length} pieces.`} />
            : <PageIntro title="Collection" text="This collection is taking shape." />}
        <section className="section">
            <div className="filter-bar">
                <div>
                    <label>Color
                        <select value={color} onChange={e => setColor(e.target.value)}>
                            <option value="all">All colors</option>
                            {colors.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </label>
                    <label className="toggle"><input type="checkbox" checked={stock} onChange={e => setStock(e.target.checked)} /> In stock</label>
                </div>
                <label>Sort by
                    <select value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="featured">Featured</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                        <option value="new">Newest</option>
                    </select>
                </label>
            </div>
            <ProductGrid items={products} />
        </section>
    </>;
}

export function ProductPage({ id }: { id: string }) {
    const { data, isLoading } = useQuery({ queryKey: ["product", id], queryFn: () => getProductById(id) });

    if (isLoading) return null; // or a spinner
    if (!data?.data) return <NotFoundPage />;

    return <ProductDetails product={data.data} />;
}
function ProductDetails({ product }: { product: any }) {
    const productId = product.id ?? product._id;

    const [image, setImage] = useState<string>(
        product.colors?.[0]?.image || product.images?.[0]
    );
    const [color, setColor] = useState(product.colors?.[0]);
    const [qty, setQty] = useState(1);

    const { addItem } = useCart();
    const navigate = useNavigate();

    const { data: relatedRes } = useQuery({
        queryKey: ["related", productId],
        queryFn: () => getRelatedProducts(productId),
        enabled: !!productId,
    });

    const related = relatedRes?.data ?? [];
    const isOutOfStock = product.stock <= 0;

    // category can be a populated object, a slug string, or an ObjectId string
    const categorySlug =
        product.categorySlug ?? product.category?.slug ?? null;
    const categoryName =
        product.categoryName ?? product.category?.name ?? "Shop";

    // Which color does a thumbnail belong to?
    // Colors are ordered like the images: each color owns the photos from its
    // own first image up to the next color's first image.
    const colorForImage = (img: string) => {
        const images: string[] = product.images ?? [];
        const index = images.indexOf(img);
        if (index === -1 || !product.colors?.length) return color;

        let match = product.colors[0];
        let bestStart = -1;

        for (const c of product.colors) {
            const start = images.indexOf(c.image);
            if (start !== -1 && start <= index && start > bestStart) {
                match = c;
                bestStart = start;
            }
        }
        return match;
    };

    return (
        <>
            <section className="product-page">
                <div className="breadcrumbs">
                    <Link to="/">Home</Link>
                    <ChevronRight />
                    {categorySlug ? (
                        <Link
                            to="/collections/$category"
                            params={{ category: categorySlug }}
                        >
                            {categoryName}
                        </Link>
                    ) : (
                        <Link to="/products">{categoryName}</Link>
                    )}
                    <ChevronRight />
                    <span>{product.title}</span>
                </div>

                <div className="product-layout">
                    <div className="gallery">
                        <div className="gallery-main">
                            <img
                                src={image}
                                alt={`${product.title} - ${color?.name || ""}`}
                            />
                            <button aria-label="Save product">
                                <Heart />
                            </button>
                        </div>

                        <div className="thumbnails">
                            {product.images?.map((img: string, i: number) => (
                                <button
                                    key={`${img}-${i}`}
                                    type="button"
                                    className={image === img ? "active" : ""}
                                    onClick={() => {
                                        setImage(img);
                                        setColor(colorForImage(img));
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.title} view ${i + 1}`}
                                        loading="lazy"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="product-info">
                        {product.badge && (
                            <span className="badge badge--inline">{product.badge}</span>
                        )}

                        <h1>{product.title}</h1>

                        <div className="product-page__prices">
                            {product.compareAtPrice != null &&
                                product.compareAtPrice > product.price && (
                                    <span className="product-page__old-price">
                                        {formatPrice(product.compareAtPrice)}
                                    </span>
                                )}
                            <span className="product-price">
                                {formatPrice(product.price)}
                            </span>
                        </div>

                        {isOutOfStock ? (
                            <p className="product-page__stock product-page__stock--out">
                                Out of stock
                            </p>
                        ) : (
                            <p className="product-page__stock">In stock</p>
                        )}

                        <p className="fine-print">
                            Taxes included. Shipping calculated at checkout.
                        </p>

                        <div className="selector">
                            <strong>
                                Color: <span>{color?.name}</span>
                            </strong>

                            <div className="swatches swatches--large">
                                {product.colors?.map((c: any) => (
                                    <button
                                        key={c.id}
                                        type="button"
                                        className={`swatch ${color?.id === c.id ? "is-active" : ""}`}
                                        style={{ "--swatch": c.hex } as React.CSSProperties}
                                        onClick={() => {
                                            setColor(c);
                                            setImage(c.image || product.images?.[0]);
                                        }}
                                        title={c.name}
                                        aria-label={c.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {!isOutOfStock && (
                            <>
                                <label className="qty-label">
                                    Quantity
                                    <Quantity
                                        value={qty}
                                        onChange={(n) => setQty(Math.max(1, n))}
                                    />
                                </label>

                                <Button
                                    className="full product-cta"
                                    onClick={() => addItem(product, color, qty)}
                                >
                                    <ShoppingBag />
                                    Add to cart
                                </Button>

                                <Button
                                    variant="outline"
                                    className="full"
                                    onClick={() => {
                                        addItem(product, color, qty);
                                        navigate({ to: "/checkout" });
                                    }}
                                >
                                    Buy it now
                                </Button>
                            </>
                        )}

                        {isOutOfStock && (
                            <Button className="full product-cta" disabled>
                                Out of stock
                            </Button>
                        )}

                        <p className="handmade-note">
                            🧶 Handmade to order · allow 7-15 business days
                        </p>

                        <div className="accordions">
                            <details open>
                                <summary>Description <Plus /></summary>
                                <p>{product.description}</p>
                                <p><b>Material:</b> {product.material}</p>
                            </details>

                            <details>
                                <summary>Care instructions <Plus /></summary>
                                <p>{product.care}</p>
                            </details>

                            <details>
                                <summary>Shipping &amp; delivery <Plus /></summary>
                                <p>
                                    3–5 business days in Cairo and Giza; 5–7 days across
                                    the rest of Egypt. Cash on Delivery available.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section--pink">
                <div className="section-heading">
                    <h2>You may also like</h2>
                </div>
                <ProductGrid items={related} />
            </section>
        </>
    );
}

export function CartPage() {
    return <>
        <PageIntro eyebrow="YOUR PICKS" title="Shopping bag" text="A little bundle of handmade joy." />
        <section className="section cart-page">
            <div className="cart-page__main"><CartContent /></div>
            <aside className="cart-aside"><Sparkles /><h3>Made just for you</h3><p>Each piece is packed by hand in Cairo with a little extra love.</p></aside>
        </section>
    </>;
}

const emptyForm = {
    email: "", firstName: "", lastName: "", street: "",
    apartment: "", governorate: "", area: "", phone: "", note: "",
};

export function CheckoutPage() {
    const { cartItems, subtotal, clearCart } = useCart();

    const [form, setForm] = useState(emptyForm);
    const [payment, setPayment] = useState<"cod" | "card" | "instapay">("cod");
    const [coupon, setCoupon] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState<{ orderNumber: string; total: number } | null>(null);

    const set = (k: keyof typeof form) =>
        (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
            setForm(f => ({ ...f, [k]: e.target.value }));

    // Fixed shipping fees based on governorate
    const isCairoGiza = ["Cairo", "Giza"].includes(form.governorate);
    const shipping: number | null = !form.governorate
        ? null
        : isCairoGiza ? 60 : 80;

    const total = subtotal + (shipping ?? 0);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (submitting || !cartItems.length) return;

        setError("");
        setSuccess(null);
        setSubmitting(true);

        try {
            const phone = form.phone.trim();

            const res = await createOrder({
                customer: {
                    email: form.email.trim(),
                    firstName: form.firstName.trim(),
                    lastName: form.lastName.trim(),
                    phone,
                },
                shippingAddress: {
                    street: form.street.trim(),
                    apartment: form.apartment.trim(),
                    governorate: form.governorate,
                    area: form.area.trim(),
                    phone,
                },
                items: cartItems.map(i => ({
                    productId: i.productId,
                    colorId: i.selectedColor.id,
                    quantity: i.quantity,
                })),
                paymentMethod: payment,
                shippingMethod: "standard",
                couponCode: coupon.trim() || undefined,
                note: form.note.trim() || undefined,
            });

            setSuccess({
                orderNumber: res.data.orderNumber,
                total: res.data.total,
            });

            clearCart();
            setForm(emptyForm);
            setPayment("cod");
            setCoupon("");

            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err: any) {
            setError(
                err?.response?.data?.message ??
                "Something went wrong. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (!cartItems.length && !success) {
        return (
            <div className="checkout">
                <header>
                    <Link to="/" className="wordmark">yarnoozah</Link>
                </header>
                <section className="not-found">
                    <h1>Your bag is empty</h1>
                    <ButtonLink to="/products">Start shopping</ButtonLink>
                </section>
            </div>
        );
    }

    return (
        <div className="checkout">
            <header>
                <Link to="/" className="wordmark">yarnoozah</Link>
                <Link to="/cart">Return to cart</Link>
            </header>

            {!success && (
                <div role="note" className="deposit-banner">
                    <strong>To confirm your order, send 50% via InstaPay 💸</strong>
                    <p>
                        Deposit to send: <b>{formatPrice(total / 2, true)}</b>.
                        After placing your order, send a screenshot of the
                        transaction on WhatsApp <b>{WHATSAPP_DISPLAY}</b> with
                        your order ID.
                    </p>
                </div>
            )}

            <div className="checkout-layout">
                <form className="checkout-form" onSubmit={onSubmit}>
                    <h1>Checkout</h1>

                    {success && (
                        <div role="status" className="form-success">
                            <strong>Order placed successfully! 🎉</strong>
                            <p>
                                Your order number is <b>{success.orderNumber}</b>
                                {" · "}Total {formatPrice(success.total, true)}.
                            </p>
                            <p>
                                <b>Last step to confirm:</b> send{" "}
                                <b>
                                    50% ({formatPrice(success.total / 2, true)})
                                </b>{" "}
                                via InstaPay, then send the screenshot of the
                                transaction on WhatsApp <b>{WHATSAPP_DISPLAY}</b>
                                {" "}with your order ID{" "}
                                <b>{success.orderNumber}</b>.
                            </p>
                            <a
                                className="button"
                                target="_blank"
                                rel="noreferrer"
                                href={`${WHATSAPP_LINK}?text=${encodeURIComponent(
                                    `Hi! Here is my InstaPay transfer screenshot for order ${success.orderNumber}.`
                                )}`}
                            >
                                Send screenshot on WhatsApp
                            </a>
                            <ButtonLink to="/products" variant="outline">
                                Keep shopping
                            </ButtonLink>
                        </div>
                    )}

                    <fieldset>
                        <legend>Contact information</legend>
                        <input
                            required
                            type="email"
                            placeholder="Email address"
                            value={form.email}
                            onChange={set("email")}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Shipping address</legend>
                        <select defaultValue="Egypt" disabled>
                            <option>Egypt</option>
                        </select>

                        <div className="form-row">
                            <input
                                required
                                placeholder="First name"
                                value={form.firstName}
                                onChange={set("firstName")}
                            />
                            <input
                                required
                                placeholder="Last name"
                                value={form.lastName}
                                onChange={set("lastName")}
                            />
                        </div>

                        <input
                            required
                            placeholder="Street address and building number"
                            value={form.street}
                            onChange={set("street")}
                        />

                        <input
                            placeholder="Apartment / floor (optional)"
                            value={form.apartment}
                            onChange={set("apartment")}
                        />

                        <div className="form-row">
                            <select
                                required
                                value={form.governorate}
                                onChange={set("governorate")}
                            >
                                <option value="" disabled>
                                    City / Governorate
                                </option>
                                {governorates.map(g => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>

                            <input
                                required
                                placeholder="Area / District"
                                value={form.area}
                                onChange={set("area")}
                            />
                        </div>

                        <input
                            required
                            type="tel"
                            pattern="01[0-9]{9}"
                            placeholder="Phone number · 01xxxxxxxxx"
                            value={form.phone}
                            onChange={set("phone")}
                        />

                        <small>
                            In case we need to reach you regarding delivery.
                        </small>

                        <textarea
                            placeholder="Order notes (optional)"
                            value={form.note}
                            onChange={set("note")}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Shipping method</legend>
                        <Radio
                            checked
                            label="Standard Delivery"
                            detail={
                                shipping === null
                                    ? "Choose your governorate to see the cost"
                                    : `${isCairoGiza ? "3–5" : "7-15"} business days · ${formatPrice(shipping)}`
                            }
                            value="standard"
                            onChange={() => { }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Payment method</legend>
                        <Radio
                            checked={payment === "cod"}
                            label="Cash on Delivery (COD)"
                            detail="Pay with cash upon delivery."
                            value="cod"
                            name="payment"
                            onChange={() => setPayment("cod")}
                        />
                    </fieldset>

                    {error && (
                        <p role="alert" className="form-error">{error}</p>
                    )}

                    <Button
                        className="full"
                        type="submit"
                        disabled={submitting || !cartItems.length}
                    >
                        {submitting ? "Placing order…" : "Complete order"}
                    </Button>

                    <p className="secure">
                        <LockKeyhole /> 256-bit encrypted checkout.
                        Your information is safe.
                    </p>
                </form>

                <aside className="order-summary">
                    <h2>Your order</h2>

                    {cartItems.map(i => (
                        <div className="summary-item" key={i.id}>
                            <div>
                                <img src={i.image} alt="" />
                                <b>{i.quantity}</b>
                            </div>
                            <span>
                                <strong>{i.title}</strong>
                                <small>{i.selectedColor.name}</small>
                            </span>
                            <em>
                                {formatPrice(i.price * i.quantity, true)}
                            </em>
                        </div>
                    ))}

                    <div className="promo">
                        <input
                            placeholder="Promo code"
                            value={coupon}
                            onChange={e => setCoupon(e.target.value)}
                        />
                    </div>

                    {coupon.trim() && (
                        <small>
                            Code is checked and applied when you place the order.
                        </small>
                    )}

                    <dl>
                        <div>
                            <dt>Subtotal</dt>
                            <dd>{formatPrice(subtotal, true)}</dd>
                        </div>
                        <div>
                            <dt>Shipping</dt>
                            <dd>
                                {shipping === null
                                    ? "—"
                                    : formatPrice(shipping, true)}
                            </dd>
                        </div>
                        <div>
                            <dt>Estimated taxes</dt>
                            <dd>Included</dd>
                        </div>
                        <div className="grand">
                            <dt>Total</dt>
                            <dd>
                                {formatPrice(total, true)} <small>EGP</small>
                            </dd>
                        </div>
                        <div>
                            <dt>50% deposit (InstaPay)</dt>
                            <dd>{formatPrice(total / 2, true)}</dd>
                        </div>
                    </dl>
                </aside>
            </div>
        </div>
    );
}

function Radio({ checked, label, detail, value, name = "shipping", onChange }: { checked: boolean; label: string; detail: string; value: string; name?: string; onChange: () => void }) {
    return <label className={`radio-card ${checked ? "active" : ""}`}><input type="radio" name={name} value={value} checked={checked} onChange={onChange} /><span><b>{label}</b><small>{detail}</small></span></label>;
}

export function AboutPage() {
    return <>
        <PageIntro eyebrow="OUR STORY" title="Joy, one loop at a time" text="yarnoozah began with a hook, a handful of bright yarn, and a belief that everyday pieces should feel personal." />
        <section className="editorial">
            <img src="https://res.cloudinary.com/dvq8x0qja/image/upload/v1791038520/IMG_0760_gete8i.jpg" alt="Handmade crochet bag by yarnoozah" />
            <div>
                <p className="eyebrow">SLOWLY MADE IN EGYPT</p>
                <h2>Hands, heart, and really good yarn</h2>
                <p>We work in small batches with women artisans in Egypt. Every bag, top, and tiny flower carries the gentle irregularities that make handwork special.</p>
                <p>Our palette is joyful, our materials are chosen for comfort, and our drops stay intentionally limited.</p>
            </div>
        </section>
    </>;
}



export function FAQPage() {
    const faqs = [
        ["How long does delivery take?", "Cairo and Giza orders arrive in 7–14 business days. Other governorates take 14–20 business days."],
        ["Are all pieces one size?", "No diffrent sizes. Exact measurements are written in its description."],
        ["How do I care for my piece?", "Hand wash only and make sure to dry it on towel."],
        ["Can I exchange my order?", "No. Custom pieces cannot be exchanged."],
        ["Do you offer Cash on Delivery?", "Yes, But deposit is mendatory."],
    ];
    return <>
        <PageIntro eyebrow="NEED A HAND?" title="Frequently asked questions" text="Everything you need to know about our pieces, delivery, and care." />
        <section className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}<ChevronDown /></summary><p>{a}</p></details>)}</section>
    </>;
}

export function NotFoundPage() {
    return <section className="not-found"><span>🧶</span><p className="eyebrow">404 · LOST LOOP</p><h1>Oops! This stitch unravelled...</h1><p>The page you're looking for wandered out of the yarn basket.</p><ButtonLink to="/">Back to home</ButtonLink></section>;
}

function PageIntro({ eyebrow, title, text }: { eyebrow?: string; title: string; text: string }) {
    return <header className="page-intro">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1><p>{text}</p></header>;
}
