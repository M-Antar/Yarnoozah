
import { Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import { ButtonLink, IconButton, Quantity } from "./ui";

export function CartContent({ drawer = false }: { drawer?: boolean }) {
  const {
    cartItems,
    subtotal,
    updateQuantity,
    removeItem,
    closeCart,
    note,
    setNote,
  } = useCart();

  if (!cartItems.length) {
    return (
      <div className="empty-state cart-empty">
        <span>🧺</span>
        <h3>Your bag is empty!</h3>
        <p>Your next favorite handmade piece is waiting.</p>
        <ButtonLink to="/products" className="full">
          Start shopping
        </ButtonLink>
      </div>
    );
  }

  return (
    <>
      <div className="cart-lines">
        {cartItems.map((item) => (
          <div className="cart-line" key={item.id}>
            <img src={item.image} alt="" width="96" height="96" />

            <div>
              <Link
                to="/products/$id"
                params={{ id: item.productId }}
                onClick={closeCart}
              >
                <strong>{item.title}</strong>
              </Link>

              <small>Color: {item.selectedColor.name}</small>

              <Quantity
                value={item.quantity}
                onChange={(q) => updateQuantity(item.id, q)}
              />
            </div>

            <div className="cart-line__end">
              <IconButton
                label={`Remove ${item.title}`}
                onClick={() => removeItem(item.id)}
              >
                <Trash2 size={17} />
              </IconButton>

              <span>{formatPrice(item.price * item.quantity, true)}</span>
            </div>
          </div>
        ))}
      </div>

      <details className="order-note">
        <summary>Order special instructions</summary>
        <textarea
          placeholder="Add a gift note or special instructions..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </details>

      <div className="cart-total">
        <span>Subtotal</span>
        <strong>{formatPrice(subtotal, true)}</strong>
      </div>

      <p className="fine-print">
        Shipping and taxes calculated at checkout.
      </p>

      <ButtonLink to="/checkout" className="full">
        Checkout
      </ButtonLink>

      {drawer && (
        <Link to="/cart" className="text-link" onClick={closeCart}>
          View full cart
        </Link>
      )}
    </>
  );
}