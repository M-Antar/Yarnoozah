import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { c as createRouter, a as createRootRouteWithContext, b as createFileRoute, l as lazyRouteComponent, L as Link, H as HeadContent, S as Scripts, O as Outlet, u as useRouter, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Trash2, M as Menu, S as Search, a as ShoppingBag, I as Instagram, X, A as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "util";
import "crypto";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-DskOIXQ0.css";
const CartContext = reactExports.createContext(void 0);
const STORAGE_KEY = "yarnoozah-cart";
function CartProvider({ children }) {
  const [cartItems, setCartItems] = reactExports.useState([]);
  const [isCartOpen, setOpen] = reactExports.useState(false);
  const [hydrated, setHydrated] = reactExports.useState(false);
  reactExports.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCartItems(JSON.parse(saved));
    } catch {
    }
    setHydrated(true);
  }, []);
  reactExports.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
    }
  }, [cartItems, hydrated]);
  const value = reactExports.useMemo(() => {
    const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
    const addItem = (p, c, q) => {
      const productId = String(p.id ?? p._id);
      const selectedColor = c ?? p.colors?.[0];
      const id = `${productId}-${selectedColor?.id}`;
      const image = selectedColor?.image || p.images?.[0] || p.image || "";
      setCartItems((items) => {
        const match = items.find((i) => i.id === id);
        if (match) {
          return items.map(
            (i) => i.id === id ? { ...i, quantity: i.quantity + q } : i
          );
        }
        return [
          ...items,
          {
            id,
            productId,
            title: p.title,
            price: p.price,
            image,
            selectedColor,
            quantity: q
          }
        ];
      });
      setOpen(true);
    };
    return {
      cartItems,
      addItem,
      removeItem: (id) => setCartItems((items) => items.filter((i) => i.id !== id)),
      updateQuantity: (id, q) => setCartItems(
        (items) => q < 1 ? items.filter((i) => i.id !== id) : items.map((i) => i.id === id ? { ...i, quantity: q } : i)
      ),
      clearCart: () => setCartItems([]),
      cartCount: cartItems.reduce((s, i) => s + i.quantity, 0),
      subtotal,
      isCartOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false)
    };
  }, [cartItems, isCartOpen]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CartContext.Provider, { value, children });
}
function useCart() {
  const c = reactExports.useContext(CartContext);
  if (!c) throw new Error("useCart requires CartProvider");
  return c;
}
const UIContext = reactExports.createContext(void 0);
function UIProvider({ children }) {
  const [isSlideMenuOpen, setMenu] = reactExports.useState(false);
  const [isSearchOpen, setSearch] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(UIContext.Provider, { value: { isSlideMenuOpen, isSearchOpen, openSlideMenu: () => setMenu(true), closeSlideMenu: () => setMenu(false), openSearch: () => setSearch(true), closeSearch: () => setSearch(false) }, children });
}
function useUI() {
  const c = reactExports.useContext(UIContext);
  if (!c) throw new Error("useUI requires UIProvider");
  return c;
}
const pinkBag = "/assets/crochet-pink-bag-DnIYXhyA.jpg";
const greenTote = "/assets/crochet-green-tote-mC0CTiOd.jpg";
const accessories = "/assets/crochet-accessories-C_9nzHGX.jpg";
const hero = "/assets/yarnoozah-hero-BLnp3oKB.jpg";
const categories = [
  {
    slug: "eleganties",
    name: "Eleganties",
    description: "Eleganties Bags",
    image: "https://res.cloudinary.com/lgvaqope/image/upload/v1791989999/IMG_0739.jpg"
  },
  {
    slug: "clutches",
    name: "Clutches",
    description: "Clutches Bags",
    image: "https://res.cloudinary.com/lgvaqope/image/upload/v1791990170/IMG_9840.jpg"
  },
  {
    slug: "rounded-bags",
    name: "Rounded Bags",
    description: "Rounded Bags",
    image: "https://res.cloudinary.com/lgvaqope/image/upload/v1791990376/IMG_5206.jpg"
  },
  {
    slug: "beach-bags",
    name: "Beach Bags",
    description: "Beach Bags",
    image: "https://res.cloudinary.com/lgvaqope/image/upload/v1791988941/IMG_4576.jpg"
  }
];
const pink = { id: "pink", name: "Bubblegum Pink", hex: "#ef72a7" };
const cream = { id: "cream", name: "Cream White", hex: "#f4eee6" };
const green = { id: "green", name: "Matcha Green", hex: "#81966b" };
const lilac = { id: "lilac", name: "Lilac Dream", hex: "#b69ad9" };
const orange = { id: "orange", name: "Tangerine", hex: "#ef8a4c" };
const products = [
  { id: "1", slug: "bubblegum-cloud-bag", title: "Bubblegum Cloud Bag", price: 1600, category: "bags", categoryName: "Crochet Bags", description: "A soft sculptural shoulder bag with a comfortably roomy interior. Dimensions: 30cm × 25cm. Strap drop: 45cm.", material: "100% premium cotton yarn", care: "Hand wash cold only. Lay flat to dry. Do not tumble dry.", badge: "BESTSELLER", colors: [pink, cream, lilac], images: [pinkBag, greenTote], stock: 6 },
  { id: "2", slug: "matcha-daisy-tote", title: "Matcha Daisy Tote", price: 2200, category: "bags", categoryName: "Crochet Bags", description: "Our roomy granny-square tote, finished with joyful cream daisies. Dimensions: 38cm × 34cm. Strap drop: 31cm.", material: "Cotton blend yarn", care: "Spot clean or hand wash cold. Dry flat.", badge: "NEW", colors: [green, cream, pink], images: [greenTote, pinkBag], stock: 4 },
  { id: "3", slug: "flower-power-bucket", title: "Flower Power Bucket Hat", price: 1200, category: "hats-accessories", categoryName: "Hats & Bandanas", description: "A one-size crochet bucket hat with a softly structured brim. Head circumference: approximately 56–58cm.", material: "100% cotton yarn", care: "Hand wash cold and reshape while damp.", badge: "NEW", colors: [lilac, pink, orange], images: [accessories, pinkBag], stock: 9 },
  { id: "4", slug: "cairo-sun-crop", title: "Cairo Sun Crochet Top", price: 1850, category: "tops", categoryName: "Crochet Tops", description: "A bright one-size crochet top with adjustable shoulder ties. Chest width: 42cm laid flat; length: 38cm.", material: "Breathable cotton yarn", care: "Hand wash gently in cold water. Lay flat to dry.", badge: "BESTSELLER", colors: [orange, pink, green], images: [hero, accessories], stock: 3 },
  { id: "5", slug: "petal-mini-bag", title: "Petal Mini Bag", price: 1350, category: "bags", categoryName: "Crochet Bags", description: "A compact evening bag with a flower-knit finish. Dimensions: 21cm × 17cm. Strap drop: 50cm.", material: "Cotton ribbon yarn", care: "Wipe gently and store flat.", colors: [lilac, pink, cream], images: [accessories, pinkBag], stock: 7 },
  { id: "6", slug: "daisy-hair-clips", title: "Daisy Hair Clip Set", price: 420, category: "keychains", categoryName: "Accessories & Keychains", description: "A cheerful set of three hand-crocheted flower clips. Each flower measures approximately 5cm.", material: "Cotton yarn, metal clips", care: "Spot clean only.", colors: [pink, orange, lilac], images: [accessories, greenTote], stock: 12 },
  { id: "7", slug: "garden-party-tote", title: "Garden Party Tote", price: 2100, category: "bags", categoryName: "Crochet Bags", description: "A floral everyday tote with strong stitched handles. Dimensions: 36cm × 32cm.", material: "Recycled cotton yarn", care: "Hand wash cold. Dry flat away from direct sun.", badge: "NEW", colors: [green, pink, cream], images: [greenTote, accessories], stock: 5 },
  { id: "8", slug: "soft-loop-bandana", title: "Soft Loop Bandana", price: 680, category: "hats-accessories", categoryName: "Hats & Bandanas", description: "An easy one-size triangular bandana with adjustable ties.", material: "100% soft cotton yarn", care: "Hand wash cold and air dry.", colors: [cream, pink, green], images: [accessories, hero], stock: 8 }
];
function Button({ variant = "primary", className = "", ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `button button--${variant} ${className}`, ...props });
}
function ButtonLink({ to, children, variant = "primary", className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: `button button--${variant} ${className}`, children });
}
function IconButton({ label, children, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-button", "aria-label": label, title: label, ...props, children });
}
function Quantity({ value, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quantity", "aria-label": "Quantity", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "soft", "aria-label": "Decrease quantity", onClick: () => onChange(value - 1), children: "−" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "soft", "aria-label": "Increase quantity", onClick: () => onChange(value + 1), children: "+" })
  ] });
}
function formatPrice(amount, compact = false) {
  const value = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  return compact ? `E£${value}` : `LE ${value} EGP`;
}
function CartContent({ drawer = false }) {
  const {
    cartItems,
    subtotal,
    updateQuantity,
    removeItem,
    closeCart,
    note,
    setNote
  } = useCart();
  if (!cartItems.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state cart-empty", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🧺" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Your bag is empty!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Your next favorite handmade piece is waiting." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonLink, { to: "/products", className: "full", children: "Start shopping" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cart-lines", children: cartItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cart-line", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: "", width: "96", height: "96" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/products/$id",
            params: { id: item.productId },
            onClick: closeCart,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: item.title })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
          "Color: ",
          item.selectedColor.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Quantity,
          {
            value: item.quantity,
            onChange: (q) => updateQuantity(item.id, q)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cart-line__end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          IconButton,
          {
            label: `Remove ${item.title}`,
            onClick: () => removeItem(item.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 17 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(item.price * item.quantity, true) })
      ] })
    ] }, item.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "order-note", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { children: "Order special instructions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          placeholder: "Add a gift note or special instructions...",
          value: note,
          onChange: (e) => setNote(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cart-total", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatPrice(subtotal, true) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fine-print", children: "Shipping and taxes calculated at checkout." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonLink, { to: "/checkout", className: "full", children: "Checkout" }),
    drawer && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", className: "text-link", onClick: closeCart, children: "View full cart" })
  ] });
}
function Drawer({
  open,
  side,
  title,
  onClose,
  children
}) {
  reactExports.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `drawer-layer ${open ? "is-open" : ""}`,
      "aria-hidden": !open,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "drawer-backdrop",
            onClick: onClose,
            "aria-label": "Close"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "aside",
          {
            className: `drawer drawer--${side}`,
            role: "dialog",
            "aria-modal": "true",
            "aria-label": title,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wordmark wordmark--small", children: "yarnoozah" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { label: `Close ${title}`, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) })
              ] }),
              children
            ]
          }
        )
      ]
    }
  );
}
function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUI();
  const [q, setQ] = reactExports.useState("");
  const matches = q ? products.filter(
    (p) => p.title.toLowerCase().includes(q.toLowerCase())
  ) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `search-overlay ${isSearchOpen ? "is-open" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "search-box", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { label: "Close search", onClick: closeSearch, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "What are you looking for?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          autoFocus: isSearchOpen,
          value: q,
          onChange: (e) => setQ(e.target.value),
          placeholder: "Search crochet pieces..."
        }
      )
    ] }),
    q && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "search-results", children: matches.length ? matches.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/products/$id",
        params: { id: p.slug },
        onClick: closeSearch,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.images[0], alt: "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {})
        ]
      },
      p.id
    )) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No stitches match that search yet." }) })
  ] }) });
}
function Header() {
  const {
    openSlideMenu,
    isSlideMenuOpen,
    closeSlideMenu,
    openSearch
  } = useUI();
  const { cartCount, openCart, isCartOpen, closeCart } = useCart();
  useRouterState({
    select: (s) => s.location.pathname
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "navbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { label: "Open menu", onClick: openSlideMenu, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "wordmark", children: "yarnoozah" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "nav-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { label: "Search", onClick: openSearch, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          IconButton,
          {
            label: `Cart with ${cartCount} items`,
            onClick: openCart,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "cart-badge", children: cartCount })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Drawer,
      {
        open: isSlideMenuOpen,
        side: "left",
        title: "menu",
        onClose: closeSlideMenu,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "menu-links", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", onClick: closeSlideMenu, children: "Home" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", onClick: closeSlideMenu, children: "Shop all" }),
            categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/collections/$category",
                params: { category: c.slug },
                onClick: closeSlideMenu,
                children: c.name
              },
              c.slug
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", onClick: closeSlideMenu, children: "About us" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/faq", onClick: closeSlideMenu, children: "FAQs" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "drawer-foot", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "All prices in EGP (Egyptian Pound)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.instagram.com/yarnoozah/", "aria-label": "Instagram", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, {}) }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Drawer,
      {
        open: isCartOpen,
        side: "right",
        title: "cart",
        onClose: closeCart,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "drawer-title", children: [
            "Your Cart (",
            cartCount,
            " items)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartContent, { drawer: true })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchOverlay, {})
  ] });
}
function Footer() {
  const [sent, setSent] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer-band", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wordmark", children: "yarnoozah" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Handmade crochet pieces made with care and love. Unique, cozy, and vibrant." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "socials", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "https://www.instagram.com/yarnoozah/",
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": "Visit Yarnoozah on Instagram",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, {})
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Quick links" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Shop all" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", children: "About us" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Customer care" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/faq", children: "FAQs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "We accept" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Cash on Delivery (+ Deposit)" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "footer-bottom", children: "© 2026 yarnoozah. All rights reserved. Prices in EGP." })
  ] }) });
}
function Layout({
  children
}) {
  const path = useRouterState({
    select: (s) => s.location.pathname
  });
  if (path === "/checkout") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({
  error,
  reset
}) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$a = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      { name: "author", content: "yarnoozah" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&family=Quicksand:wght@500;600;700&display=swap"
      },
      {
        rel: "icon",
        href: "/favicon.ico",
        type: "image/x-icon"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$a.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(UIProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CartProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) }) }) });
}
const $$splitComponentImporter$9 = () => import("./index-B6zo9nx9.mjs");
const Route$9 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "yarnoozah — Handmade Crochet in Egypt"
    }, {
      name: "description",
      content: "Playful handmade crochet bags, tops, hats, and accessories, made with love in Egypt."
    }, {
      property: "og:title",
      content: "yarnoozah — Handmade Crochet in Egypt"
    }, {
      property: "og:description",
      content: "Playful handmade crochet pieces, made with love in Egypt."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("../_-D2NsQPat.mjs");
const Route$8 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Page Not Found — yarnoozah"
    }, {
      name: "description",
      content: "This yarnoozah stitch unravelled."
    }, {
      property: "og:title",
      content: "Page Not Found — yarnoozah"
    }, {
      property: "og:description",
      content: "This yarnoozah stitch unravelled."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./about-NmnOCyCN.mjs");
const Route$7 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Our Story — yarnoozah"
    }, {
      name: "description",
      content: "Meet the Egyptian hands and heart behind yarnoozah crochet."
    }, {
      property: "og:title",
      content: "Our Story — yarnoozah"
    }, {
      property: "og:description",
      content: "Joyful crochet, slowly made in Egypt."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./cart-D1IcHNRx.mjs");
const Route$6 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Your Cart — yarnoozah"
    }, {
      name: "description",
      content: "Review your handmade yarnoozah picks."
    }, {
      property: "og:title",
      content: "Your Cart — yarnoozah"
    }, {
      property: "og:description",
      content: "Review your handmade yarnoozah picks."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./checkout-Co2mQS_c.mjs");
const Route$5 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Checkout — yarnoozah"
    }, {
      name: "description",
      content: "Complete your yarnoozah order securely."
    }, {
      property: "og:title",
      content: "Checkout — yarnoozah"
    }, {
      property: "og:description",
      content: "Complete your handmade order."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./faq-BMot5GZk.mjs");
const Route$4 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "FAQs — yarnoozah"
    }, {
      name: "description",
      content: "Answers about yarnoozah ordering, delivery, fit, and crochet care."
    }, {
      property: "og:title",
      content: "FAQs — yarnoozah"
    }, {
      property: "og:description",
      content: "Everything to know about ordering and caring for yarnoozah pieces."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./products-BFsOu0JM.mjs");
const Route$3 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./collections._category-r8t_jXhB.mjs");
const Route$2 = createFileRoute()({
  head: ({
    params
  }) => {
    const c = categories.find((x) => x.slug === params.category);
    const title = `${c?.name || "Collection"} — yarnoozah`;
    const description = c?.description || "Explore handmade crochet from yarnoozah.";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: description
      }, {
        property: "og:type",
        content: "website"
      }, {
        name: "twitter:card",
        content: "summary_large_image"
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./products.index-Cgmro5kF.mjs");
const Route$1 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Shop All — yarnoozah"
    }, {
      name: "description",
      content: "Shop all yarnoozah handmade crochet collections."
    }, {
      property: "og:title",
      content: "Shop All — yarnoozah"
    }, {
      property: "og:description",
      content: "Find your next colorful handmade crochet piece."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./products._id-DEFUns3k.mjs");
const Route = createFileRoute()({
  head: ({
    params
  }) => {
    const p = products.find((x) => x.id === params.id || x.slug === params.id);
    const title = p ? `${p.title} — yarnoozah` : "Product — yarnoozah";
    const description = p?.description || "A handmade yarnoozah crochet piece.";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: description
      }, {
        property: "og:type",
        content: "website"
      }, {
        name: "twitter:card",
        content: "summary_large_image"
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const SplatRoute = Route$8.update({
  id: "/$",
  path: "/$",
  getParentRoute: () => Route$a
});
const AboutRoute = Route$7.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$a
});
const CartRoute = Route$6.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$a
});
const CheckoutRoute = Route$5.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$a
});
const FaqRoute = Route$4.update({
  id: "/faq",
  path: "/faq",
  getParentRoute: () => Route$a
});
const ProductsRoute = Route$3.update({
  id: "/products",
  path: "/products",
  getParentRoute: () => Route$a
});
const CollectionsCategoryRoute = Route$2.update({
  id: "/collections/$category",
  path: "/collections/$category",
  getParentRoute: () => Route$a
});
const ProductsIndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => ProductsRoute
});
const ProductsIdRoute = Route.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ProductsRoute
});
const ProductsRouteChildren = {
  ProductsIdRoute,
  ProductsIndexRoute
};
const ProductsRouteWithChildren = ProductsRoute._addFileChildren(
  ProductsRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  SplatRoute,
  AboutRoute,
  CartRoute,
  CheckoutRoute,
  FaqRoute,
  ProductsRoute: ProductsRouteWithChildren,
  CollectionsCategoryRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  CartContent as C,
  Quantity as Q,
  Route$2 as R,
  Route as a,
  ButtonLink as b,
  formatPrice as f,
  router as r,
  useCart as u
};
