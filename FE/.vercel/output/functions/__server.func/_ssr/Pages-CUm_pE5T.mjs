import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as axios } from "../_libs/axios.mjs";
import { b as ButtonLink, C as CartContent, u as useCart, f as formatPrice, B as Button, Q as Quantity } from "./router-DRF4lb9G.mjs";
import { C as ChevronRight, a as Sparkles, L as LockKeyhole, b as ChevronDown, S as ShoppingBag, H as Heart, P as Plus } from "../_libs/lucide-react.mjs";
const api = axios.create({
  baseURL: "https://yarnoozah3-pudtu1gu.b4a.run/api"
});
api.interceptors.request.use((config) => config);
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
const getAllProducts = (params) => api.get("/products", { params });
const getProductById = (id) => api.get(`/products/${id}`);
const getFeaturedProducts = () => api.get("/products/featured");
const getRelatedProducts = (id) => api.get(`/products/${id}/related`);
const getAllCategories = () => api.get("/categories");
const getCategoryBySlug = (slug) => api.get(`/categories/${slug}`);
const createOrder = (data, cartId) => api.post("/orders", data, {
  headers: void 0
});
function ProductCard({
  product,
  color
}) {
  const { addItem } = useCart();
  const selectedColor = color || product.colors?.[0];
  const image = selectedColor?.image || product.images?.[0];
  const productKey = product.slug || product.id || product._id;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "product-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/products/$id",
        params: { id: productKey },
        className: "product-card__image",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: image,
              alt: `${product.title} - ${selectedColor?.name || ""}`,
              loading: "lazy",
              width: "1024",
              height: "1024"
            }
          ),
          product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge", children: product.badge })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "product-card__body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/products/$id",
          params: { id: productKey },
          className: "product-card__title",
          children: product.title
        }
      ),
      selectedColor && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "product-card__color", children: selectedColor.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "product-card__prices", children: [
        product.compareAtPrice != null && product.compareAtPrice > product.price && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "product-card__old-price", children: formatPrice(product.compareAtPrice) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price", children: formatPrice(product.price) })
      ] }),
      product.stock === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: true, children: "Out of stock" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => addItem(product, selectedColor, 1), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 17 }),
        " Add to cart"
      ] })
    ] })
  ] });
}
function ProductGrid({ items }) {
  const cards = items.flatMap((product) => {
    if (!product.colors?.length) {
      return [{ product, color: void 0 }];
    }
    return product.colors.map((color) => ({
      product,
      color
    }));
  });
  return cards.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "product-grid", children: cards.map(({ product, color }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    ProductCard,
    {
      product,
      color
    },
    `${product.id}-${color?.id || "default"}`
  )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🧶" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "No pieces found in this color yet!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Check back soon — something lovely is always on the hook." })
  ] });
}
const governorates = ["Cairo", "Giza", "Alexandria", "Dakahlia", "Red Sea", "Beheira", "Fayoum", "Gharbia", "Ismailia", "Menofia", "Minya", "Qaliubiya", "New Valley", "Suez", "Aswan", "Assiut", "Beni Suef", "Port Said", "Damietta", "Sharkia", "South Sinai", "Kafr El Sheikh", "Matrouh", "Luxor", "Qena", "North Sinai", "Sohag"];
const WHATSAPP_DISPLAY = "01017287399";
const WHATSAPP_LINK = "https://wa.me/201017287399";
function HomePage() {
  const { data: categoriesRes } = useQuery({ queryKey: ["categories"], queryFn: getAllCategories });
  const { data: featuredRes } = useQuery({ queryKey: ["products", "featured"], queryFn: getFeaturedProducts });
  const categories = categoriesRes?.data ?? [];
  const products = featuredRes?.data ?? [];
  const heroImages = [
    "https://res.cloudinary.com/lgvaqope/image/upload/c_fill,g_auto,w_1200,h_1000,f_auto,q_auto/v1791989999/IMG_0739.jpg",
    "https://res.cloudinary.com/lgvaqope/image/upload/c_fill,g_auto,w_1200,h_1000,f_auto,q_auto/v1791990170/IMG_9840.jpg",
    "https://res.cloudinary.com/lgvaqope/image/upload/c_fill,g_auto,w_1200,h_1000,f_auto,q_auto/v1791990376/IMG_5206.jpg"
  ];
  const [heroIndex, setHeroIndex] = reactExports.useState(0);
  const nextHero = () => setHeroIndex((current) => (current + 1) % heroImages.length);
  const previousHero = () => setHeroIndex((current) => (current - 1 + heroImages.length) % heroImages.length);
  const touchStartX = reactExports.useRef(null);
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? nextHero : previousHero)();
    touchStartX.current = null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "hero", onTouchStart, onTouchEnd, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: heroImages[heroIndex],
          alt: "yarnoozah colorful crochet fashion in Cairo",
          width: "1600",
          height: "1008"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "hero-arrow hero-arrow--left", onClick: previousHero, "aria-label": "Previous image", children: "‹" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "hero-arrow hero-arrow--right", onClick: nextHero, "aria-label": "Next image", children: "›" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-copy", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "100% HANDMADE · MADE IN EGYPT" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { children: [
          "Handmade. Playful.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Uniquely yours." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Discover our latest drop of handcrafted crochet bags, tops, and tiny joyful things." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(ButtonLink, { to: "/products", children: [
          "Shop the collection ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-dots", children: heroImages.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: heroIndex === index ? "is-active" : "",
          onClick: () => setHeroIndex(index),
          "aria-label": `Go to image ${index + 1}`
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-heading", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "PICK YOUR MOOD" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Made for colorful days" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonLink, { to: "/products", variant: "outline", children: "Shop all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "category-grid", children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/collections/$category",
          params: { category: c.slug },
          className: "category-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.image, alt: "", loading: "lazy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.name })
          ]
        },
        c.slug
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "section section--pink", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-heading", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "FRESH OFF THE HOOK" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Trending now" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Small-batch favorites. Once they're gone, they're gone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGrid, { items: products.slice(0, 4) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "story-band", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImages[1], alt: "Handmade crochet in progress", loading: "lazy" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "OUR CRAFT" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Made by hand, one loop at a time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Every piece is crocheted in small batches by women artisans in Egypt." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "craft-points", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "🧶",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "100% handmade" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "No machines, no shortcuts." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "🇪🇬",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Made in Egypt" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "Designed and packed in Cairo." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "💙",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Limited drops" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "Small batches, once they're gone, they're gone." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonLink, { to: "/about", variant: "outline", children: "Our story" })
      ] })
    ] })
  ] });
}
function ProductsPage() {
  const { data } = useQuery({ queryKey: ["categories"], queryFn: getAllCategories });
  const categories = data?.data ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageIntro, { eyebrow: "THE WHOLE YARNIVERSE", title: "Shop by collection", text: "Find the color, texture, and tiny detail that feels most like you." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "catalog-categories", children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.image, alt: c.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "HANDMADE COLLECTION" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: c.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collections/$category", params: { category: c.slug }, className: "button button--outline hack", children: "View products" })
      ] })
    ] }, c.slug)) }) })
  ] });
}
function CategoryPage({ slug }) {
  const [color, setColor] = reactExports.useState("all");
  const [sort, setSort] = reactExports.useState("featured");
  const [stock, setStock] = reactExports.useState(false);
  const { data: categoryRes } = useQuery({ queryKey: ["category", slug], queryFn: () => getCategoryBySlug(slug) });
  const category = categoryRes?.data;
  const { data: productsRes } = useQuery({
    queryKey: ["products", { category: slug, color, sort, stock }],
    queryFn: () => getAllProducts({
      category: slug,
      color: color === "all" ? void 0 : color,
      sort: sort === "featured" ? void 0 : sort,
      inStock: stock || void 0
    })
  });
  const products = productsRes?.data?.products ?? [];
  const colors = Array.from(new Map(products.flatMap((p) => p.colors).map((c) => [c.id, c])).values());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    category ? /* @__PURE__ */ jsxRuntimeExports.jsx(PageIntro, { eyebrow: "HANDMADE COLLECTION", title: category.name, text: `${category.description} ${products.length} pieces.` }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PageIntro, { title: "Collection", text: "This collection is taking shape." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-bar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            "Color",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: color, onChange: (e) => setColor(e.target.value), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All colors" }),
              colors.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: c.name }, c.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: stock, onChange: (e) => setStock(e.target.checked) }),
            " In stock"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Sort by",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sort, onChange: (e) => setSort(e.target.value), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "featured", children: "Featured" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Price: Low to High" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "Price: High to Low" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new", children: "Newest" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGrid, { items: products })
    ] })
  ] });
}
function ProductPage({ id }) {
  const { data, isLoading } = useQuery({ queryKey: ["product", id], queryFn: () => getProductById(id) });
  if (isLoading) return null;
  if (!data?.data) return /* @__PURE__ */ jsxRuntimeExports.jsx(NotFoundPage, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductDetails, { product: data.data });
}
function ProductDetails({ product }) {
  const productId = product.id ?? product._id;
  const [image, setImage] = reactExports.useState(
    product.colors?.[0]?.image || product.images?.[0]
  );
  const [color, setColor] = reactExports.useState(product.colors?.[0]);
  const [qty, setQty] = reactExports.useState(1);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { data: relatedRes } = useQuery({
    queryKey: ["related", productId],
    queryFn: () => getRelatedProducts(productId),
    enabled: !!productId
  });
  const related = relatedRes?.data ?? [];
  const isOutOfStock = product.stock <= 0;
  const categorySlug = product.categorySlug ?? product.category?.slug ?? null;
  const categoryName = product.categoryName ?? product.category?.name ?? "Shop";
  const colorForImage = (img) => {
    const images = product.images ?? [];
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "product-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "breadcrumbs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, {}),
        categorySlug ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/collections/$category",
            params: { category: categorySlug },
            children: categoryName
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: categoryName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: product.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "product-layout", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gallery", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gallery-main", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: image,
                alt: `${product.title} - ${color?.name || ""}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Save product", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, {}) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "thumbnails", children: product.images?.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: image === img ? "active" : "",
              onClick: () => {
                setImage(img);
                setColor(colorForImage(img));
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: img,
                  alt: `${product.title} view ${i + 1}`,
                  loading: "lazy"
                }
              )
            },
            `${img}-${i}`
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "product-info", children: [
          product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge badge--inline", children: product.badge }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: product.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "product-page__prices", children: [
            product.compareAtPrice != null && product.compareAtPrice > product.price && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "product-page__old-price", children: formatPrice(product.compareAtPrice) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "product-price", children: formatPrice(product.price) })
          ] }),
          isOutOfStock ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "product-page__stock product-page__stock--out", children: "Out of stock" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "product-page__stock", children: "In stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fine-print", children: "Taxes included. Shipping calculated at checkout." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "selector", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              "Color: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: color?.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "swatches swatches--large", children: product.colors?.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: `swatch ${color?.id === c.id ? "is-active" : ""}`,
                style: { "--swatch": c.hex },
                onClick: () => {
                  setColor(c);
                  setImage(c.image || product.images?.[0]);
                },
                title: c.name,
                "aria-label": c.name
              },
              c.id
            )) })
          ] }),
          !isOutOfStock && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "qty-label", children: [
              "Quantity",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Quantity,
                {
                  value: qty,
                  onChange: (n) => setQty(Math.max(1, n))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "full product-cta",
                onClick: () => addItem(product, color, qty),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, {}),
                  "Add to cart"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "full",
                onClick: () => {
                  addItem(product, color, qty);
                  navigate({ to: "/checkout" });
                },
                children: "Buy it now"
              }
            )
          ] }),
          isOutOfStock && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "full product-cta", disabled: true, children: "Out of stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "handmade-note", children: "🧶 Handmade to order · allow 7-15 business days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "accordions", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { open: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { children: [
                "Description ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, {})
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: product.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Material:" }),
                " ",
                product.material
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { children: [
                "Care instructions ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, {})
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: product.care })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { children: [
                "Shipping & delivery ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, {})
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "3–5 business days in Cairo and Giza; 5–7 days across the rest of Egypt. Cash on Delivery available." })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "section section--pink", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-heading", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "You may also like" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGrid, { items: related })
    ] })
  ] });
}
function CartPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageIntro, { eyebrow: "YOUR PICKS", title: "Shopping bag", text: "A little bundle of handmade joy." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "section cart-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cart-page__main", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CartContent, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "cart-aside", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Made just for you" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Each piece is packed by hand in Cairo with a little extra love." })
      ] })
    ] })
  ] });
}
const emptyForm = {
  email: "",
  firstName: "",
  lastName: "",
  street: "",
  apartment: "",
  governorate: "",
  area: "",
  phone: "",
  note: ""
};
function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const [form, setForm] = reactExports.useState(emptyForm);
  const [payment, setPayment] = reactExports.useState("cod");
  const [coupon, setCoupon] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isCairoGiza = ["Cairo", "Giza"].includes(form.governorate);
  const shipping = !form.governorate ? null : isCairoGiza ? 60 : 80;
  const total = subtotal + (shipping ?? 0);
  const onSubmit = async (e) => {
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
          phone
        },
        shippingAddress: {
          street: form.street.trim(),
          apartment: form.apartment.trim(),
          governorate: form.governorate,
          area: form.area.trim(),
          phone
        },
        items: cartItems.map((i) => ({
          productId: i.productId,
          colorId: i.selectedColor.id,
          quantity: i.quantity
        })),
        paymentMethod: payment,
        shippingMethod: "standard",
        couponCode: coupon.trim() || void 0,
        note: form.note.trim() || void 0
      });
      setSuccess({
        orderNumber: res.data.orderNumber,
        total: res.data.total
      });
      clearCart();
      setForm(emptyForm);
      setPayment("cod");
      setCoupon("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err?.response?.data?.message ?? "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };
  if (!cartItems.length && !success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "checkout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "wordmark", children: "yarnoozah" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "not-found", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Your bag is empty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonLink, { to: "/products", children: "Start shopping" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "checkout", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "wordmark", children: "yarnoozah" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", children: "Return to cart" })
    ] }),
    !success && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "note", className: "deposit-banner", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "To confirm your order, send 50% via InstaPay 💸" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Deposit to send: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: formatPrice(total / 2, true) }),
        ". After placing your order, send a screenshot of the transaction on WhatsApp ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: WHATSAPP_DISPLAY }),
        " with your order ID."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "checkout-layout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "checkout-form", onSubmit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Checkout" }),
        success && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "status", className: "form-success", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Order placed successfully! 🎉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Your order number is ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: success.orderNumber }),
            " · ",
            "Total ",
            formatPrice(success.total, true),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Last step to confirm:" }),
            " send",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
              "50% (",
              formatPrice(success.total / 2, true),
              ")"
            ] }),
            " ",
            "via InstaPay, then send the screenshot of the transaction on WhatsApp ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: WHATSAPP_DISPLAY }),
            " ",
            "with your order ID",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: success.orderNumber }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              className: "button",
              target: "_blank",
              rel: "noreferrer",
              href: `${WHATSAPP_LINK}?text=${encodeURIComponent(
                `Hi! Here is my InstaPay transfer screenshot for order ${success.orderNumber}.`
              )}`,
              children: "Send screenshot on WhatsApp"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonLink, { to: "/products", variant: "outline", children: "Keep shopping" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { children: "Contact information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              type: "email",
              placeholder: "Email address",
              value: form.email,
              onChange: set("email")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { children: "Shipping address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { defaultValue: "Egypt", disabled: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Egypt" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                required: true,
                placeholder: "First name",
                value: form.firstName,
                onChange: set("firstName")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                required: true,
                placeholder: "Last name",
                value: form.lastName,
                onChange: set("lastName")
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              placeholder: "Street address and building number",
              value: form.street,
              onChange: set("street")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              placeholder: "Apartment / floor (optional)",
              value: form.apartment,
              onChange: set("apartment")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                required: true,
                value: form.governorate,
                onChange: set("governorate"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "City / Governorate" }),
                  governorates.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: g, children: g }, g))
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                required: true,
                placeholder: "Area / District",
                value: form.area,
                onChange: set("area")
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              type: "tel",
              pattern: "01[0-9]{9}",
              placeholder: "Phone number · 01xxxxxxxxx",
              value: form.phone,
              onChange: set("phone")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "In case we need to reach you regarding delivery." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              placeholder: "Order notes (optional)",
              value: form.note,
              onChange: set("note")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { children: "Shipping method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Radio,
            {
              checked: true,
              label: "Standard Delivery",
              detail: shipping === null ? "Choose your governorate to see the cost" : `${isCairoGiza ? "3–5" : "7-15"} business days · ${formatPrice(shipping)}`,
              value: "standard",
              onChange: () => {
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { children: "Payment method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Radio,
            {
              checked: payment === "cod",
              label: "Cash on Delivery (COD)",
              detail: "Pay with cash upon delivery.",
              value: "cod",
              name: "payment",
              onChange: () => setPayment("cod")
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "form-error", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "full",
            type: "submit",
            disabled: submitting || !cartItems.length,
            children: submitting ? "Placing order…" : "Complete order"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "secure", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, {}),
          " 256-bit encrypted checkout. Your information is safe."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "order-summary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Your order" }),
        cartItems.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: i.image, alt: "" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: i.quantity })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: i.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: i.selectedColor.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: formatPrice(i.price * i.quantity, true) })
        ] }, i.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "promo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            placeholder: "Promo code",
            value: coupon,
            onChange: (e) => setCoupon(e.target.value)
          }
        ) }),
        coupon.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "Code is checked and applied when you place the order." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: formatPrice(subtotal, true) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Shipping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: shipping === null ? "—" : formatPrice(shipping, true) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Estimated taxes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: "Included" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grand", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
              formatPrice(total, true),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "EGP" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "50% deposit (InstaPay)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: formatPrice(total / 2, true) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Radio({ checked, label, detail, value, name = "shipping", onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `radio-card ${checked ? "active" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name, value, checked, onChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: detail })
    ] })
  ] });
}
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageIntro, { eyebrow: "OUR STORY", title: "Joy, one loop at a time", text: "yarnoozah began with a hook, a handful of bright yarn, and a belief that everyday pieces should feel personal." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "editorial", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://res.cloudinary.com/dvq8x0qja/image/upload/v1791038520/IMG_0760_gete8i.jpg", alt: "Handmade crochet bag by yarnoozah" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "SLOWLY MADE IN EGYPT" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Hands, heart, and really good yarn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We work in small batches with women artisans in Egypt. Every bag, top, and tiny flower carries the gentle irregularities that make handwork special." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Our palette is joyful, our materials are chosen for comfort, and our drops stay intentionally limited." })
      ] })
    ] })
  ] });
}
function FAQPage() {
  const faqs = [
    ["How long does delivery take?", "Cairo and Giza orders arrive in 7–14 business days. Other governorates take 14–20 business days."],
    ["Are all pieces one size?", "No diffrent sizes. Exact measurements are written in its description."],
    ["How do I care for my piece?", "Hand wash only and make sure to dry it on towel."],
    ["Can I exchange my order?", "No. Custom pieces cannot be exchanged."],
    ["Do you offer Cash on Delivery?", "Yes, But deposit is mendatory."]
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageIntro, { eyebrow: "NEED A HAND?", title: "Frequently asked questions", text: "Everything you need to know about our pieces, delivery, and care." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "faq-list", children: faqs.map(([q, a]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { children: [
        q,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: a })
    ] }, q)) })
  ] });
}
function NotFoundPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "not-found", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🧶" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "404 · LOST LOOP" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Oops! This stitch unravelled..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The page you're looking for wandered out of the yarn basket." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonLink, { to: "/", children: "Back to home" })
  ] });
}
function PageIntro({ eyebrow, title, text }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "page-intro", children: [
    eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: eyebrow }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: text })
  ] });
}
export {
  AboutPage as A,
  CartPage as C,
  FAQPage as F,
  HomePage as H,
  NotFoundPage as N,
  ProductsPage as P,
  CheckoutPage as a,
  CategoryPage as b,
  ProductPage as c
};
