const CAIRO_GIZA_RATE = 60;
const OTHER_RATE = 80;

const CAIRO_GIZA = ["cairo", "giza"];

export const calculateShipping = (subtotal, governorate = "") => {
  const normalized = governorate.trim().toLowerCase();
  return CAIRO_GIZA.includes(normalized) ? CAIRO_GIZA_RATE : OTHER_RATE;
};