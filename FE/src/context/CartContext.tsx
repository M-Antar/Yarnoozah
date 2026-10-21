import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Color } from "../data/catalog";


export type CartItem = {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  selectedColor: Color;
  quantity: number;
};

// Product comes from the API now (Mongo gives _id, images, colors[].image),
// so it is typed loosely instead of using the temporary catalog type.
type CartProduct = {
  id?: string;
  _id?: string;
  title: string;
  price: number;
  images?: string[];
  image?: string;
  colors?: Color[];
};

type CartValue = {
  cartItems: CartItem[];
  addItem: (p: CartProduct, c: Color, q: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, q: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartValue | undefined>(undefined);

const STORAGE_KEY = "yarnoozah-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load the saved cart once on the client
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCartItems(JSON.parse(saved));
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  // Save only after the first load, so we never overwrite the saved cart with []
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      /* ignore quota / private mode errors */
    }
  }, [cartItems, hydrated]);

  const value = useMemo<CartValue>(() => {
    const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

    const addItem = (p: CartProduct, c: Color, q: number) => {
      const productId = String(p.id ?? p._id);
      const selectedColor = c ?? p.colors?.[0];

      // line id = product + color, so Blue and Black stay separate lines
      const id = `${productId}-${selectedColor?.id}`;

      // image of the chosen color first, then the first product image
      const image =
        (selectedColor as any)?.image || p.images?.[0] || p.image || "";

      setCartItems((items) => {
        const match = items.find((i) => i.id === id);
        if (match) {
          return items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + q } : i,
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
            quantity: q,
          },
        ];
      });

      setOpen(true);
    };

    return {
      cartItems,
      addItem,
      removeItem: (id: string) =>
        setCartItems((items) => items.filter((i) => i.id !== id)),
      updateQuantity: (id: string, q: number) =>
        setCartItems((items) =>
          q < 1
            ? items.filter((i) => i.id !== id)
            : items.map((i) => (i.id === id ? { ...i, quantity: q } : i)),
        ),
      clearCart: () => setCartItems([]),
      cartCount: cartItems.reduce((s, i) => s + i.quantity, 0),
      subtotal,
      isCartOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
    };
  }, [cartItems, isCartOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart requires CartProvider");
  return c;
}
