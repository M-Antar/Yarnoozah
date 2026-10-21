import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789", 4);

export const generateOrderNumber = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `YRN-${y}${m}${d}-${nanoid()}`;
};