
import { useEffect, useState, type FormEvent } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
    Menu,
    Search,
    ShoppingBag,
    X,
    Instagram,
    Music2,
    ArrowRight,
} from "lucide-react";
import { categories, products } from "../data/catalog";
import { useCart } from "../context/CartContext";
import { useUI } from "../context/UIContext";
import { IconButton } from "./ui";
import { CartContent } from "./CartContent";

function Drawer({
    open,
    side,
    title,
    onClose,
    children,
}: {
    open: boolean;
    side: "left" | "right";
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}) {
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <div
            className={`drawer-layer ${open ? "is-open" : ""}`}
            aria-hidden={!open}
        >
            <button
                className="drawer-backdrop"
                onClick={onClose}
                aria-label="Close"
            />
            <aside
                className={`drawer drawer--${side}`}
                role="dialog"
                aria-modal="true"
                aria-label={title}
            >
                <header>
                    <span className="wordmark wordmark--small">yarnoozah</span>
                    <IconButton label={`Close ${title}`} onClick={onClose}>
                        <X />
                    </IconButton>
                </header>
                {children}
            </aside>
        </div>
    );
}



function Header() {
    const {
        openSlideMenu,
        isSlideMenuOpen,
        closeSlideMenu,
        openSearch,
    } = useUI();

    const { cartCount, openCart, isCartOpen, closeCart } = useCart();

    const path = useRouterState({
        select: (s) => s.location.pathname,
    });

    const isHomePage = path === "/";

    return (
        <>
            <nav className="navbar">
                <IconButton label="Open menu" onClick={openSlideMenu}>
                    <Menu />
                </IconButton>

                <Link to="/" className="wordmark">
                    yarnoozah
                </Link>

                <div className="nav-actions">

                    <IconButton
                        label={`Cart with ${cartCount} items`}
                        onClick={openCart}
                    >
                        <ShoppingBag />
                        <span className="cart-badge">{cartCount}</span>
                    </IconButton>
                </div>
            </nav>

            <Drawer
                open={isSlideMenuOpen}
                side="left"
                title="menu"
                onClose={closeSlideMenu}
            >
                <nav className="menu-links">
                    <Link to="/" onClick={closeSlideMenu}>Home</Link>
                    <Link to="/products" onClick={closeSlideMenu}>Shop all</Link>
                    {categories.map((c) => (
                        <Link
                            key={c.slug}
                            to="/collections/$category"
                            params={{ category: c.slug }}
                            onClick={closeSlideMenu}
                        >
                            {c.name}
                        </Link>
                    ))}
                    <Link to="/about" onClick={closeSlideMenu}>About us</Link>
                    <Link to="/faq" onClick={closeSlideMenu}>FAQs</Link>
                </nav>

                <div className="drawer-foot">
                    <p>All prices in EGP (Egyptian Pound)</p>
                    <div>
                        <a href="https://www.instagram.com/yarnoozah/" aria-label="Instagram">
                            <Instagram />
                        </a>
                    </div>
                </div>
            </Drawer>

            <Drawer
                open={isCartOpen}
                side="right"
                title="cart"
                onClose={closeCart}
            >
                <div className="drawer-title">
                    Your Cart ({cartCount} items)
                </div>
                <CartContent drawer />
            </Drawer>

           
        </>
    );
}

function Footer() {
    const [sent, setSent] = useState(false);

    function submit(e: FormEvent) {
        e.preventDefault();
        setSent(true);
    }

    return (
        <footer>

            <div className="footer-band">
                <div className="footer-grid">
                    <div>
                        <span className="wordmark">yarnoozah</span>
                        <p>
                            Handmade crochet pieces made with care and love.
                            Unique, cozy, and vibrant.
                        </p>
                        <div className="socials">
                            <a
                                href="https://www.instagram.com/yarnoozah/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit Yarnoozah on Instagram"
                            >
                                <Instagram />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3>Quick links</h3>
                        <Link to="/products">Shop all</Link>
                        <Link to="/about">About us</Link>
                    </div>

                    <div>
                        <h3>Customer care</h3>
                        <Link to="/faq">FAQs</Link>
                    </div>

                    <div>
                        <h3>We accept</h3>
                        <p>
                            Cash on Delivery (+ Deposit)
                        </p>
                    </div>
                </div>

                <div className="footer-bottom">
                    © 2026 yarnoozah. All rights reserved. Prices in EGP.
                </div>
            </div>
        </footer>
    );
}

export function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const path = useRouterState({
        select: (s) => s.location.pathname,
    });

    if (path === "/checkout") {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
