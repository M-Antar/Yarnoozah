import { api } from "./api";

export type CreateOrderPayload = {
  customer: { email: string; phone: string; firstName: string; lastName: string };
  shippingAddress: {
    street: string;
    apartment: string;
    governorate: string;
    area: string;
    phone: string;
  };
  items: { productId: string; colorId: string; quantity: number }[];
  paymentMethod: "cod" | "card" | "instapay";
  shippingMethod?: string;
  couponCode?: string;
  note?: string;
};

export type CreateOrderResponse = {
  orderId: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
};

/**
 * POST /orders
 * Prices, shipping and discount are recomputed by the server, so none are sent.
 * Pass cartId (if you have one) so the BE can clear the server cart.
 */
export const createOrder = (data: CreateOrderPayload, cartId?: string) =>
  api.post<CreateOrderResponse>("/orders", data, {
    headers: cartId ? { "x-cart-id": cartId } : undefined,
  });

/** GET /orders/:id (Mongo id or orderNumber) */
export const getOrderById = (id: string) => api.get(`/orders/${id}`);