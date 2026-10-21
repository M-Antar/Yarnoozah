import {api} from "./api";
/** GET /cart. Guest cart identified by x-cart-id header (no login). Returns {items: CartItem[], subtotal}. Restore server cart. */
export const getCart=()=>api.get("/cart");
/** POST /cart/items. Body: {productId,colorId,quantity}. Returns updated cart. Add one-color variant. */
export const addToCart=(productId:string,colorId:string,quantity:number)=>api.post("/cart/items",{productId,colorId,quantity});
/** PUT /cart/items/:id. Body: {quantity}. Returns updated CartItem. Change quantity. */
export const updateCartItem=(id:string,quantity:number)=>api.put(`/cart/items/${id}`,{quantity});
/** DELETE /cart/items/:id. No body. Returns updated cart. Remove line. */
export const removeFromCart=(id:string)=>api.delete(`/cart/items/${id}`);
/** DELETE /cart. No body. Returns {success:true}. Clear all lines. */
export const clearCart=()=>api.delete("/cart");
