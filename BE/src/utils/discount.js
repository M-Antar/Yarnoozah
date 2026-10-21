export const calculateDiscount = (coupon, subtotal) => {
  if (!coupon) return 0;

  const raw = coupon.type === "percent"
    ? (subtotal * coupon.value) / 100
    : coupon.value;

  return Math.min(raw, subtotal);
};