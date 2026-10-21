// src/seed.js
import "dotenv/config";
import mongoose from "mongoose";
import { Category } from "./models/category/category.model.js";
import { Product } from "./models/product/product.model.js";

const categoriesData = [
  { name: "Crochet Bags", slug: "bags", description: "Colorful carryalls, stitched slowly and made to be noticed.", image: "" },
  { name: "Crochet Tops", slug: "tops", description: "Joyful handmade layers for sunny Cairo days.", image: "" },
  { name: "Hats & Bandanas", slug: "hats-accessories", description: "Playful finishing touches, from petals to bucket hats.", image: "" },
  { name: "Accessories & Keychains", slug: "keychains", description: "Tiny yarn treasures for bags, keys, and gifting.", image: "" },
];

async function seed() {
  await mongoose.connect(process.env.DB_URL);
  await Category.deleteMany({});
  await Product.deleteMany({});

  const categories = await Category.insertMany(categoriesData);
  const bags = categories.find((c) => c.slug === "bags");
  const tops = categories.find((c) => c.slug === "tops");
  const hats = categories.find((c) => c.slug === "hats-accessories");
  const keychains = categories.find((c) => c.slug === "keychains");

  const productsData = [
    { title: "Bubblegum Cloud Bag", slug: "bubblegum-cloud-bag", price: 1600, category: bags._id, description: "A soft sculptural shoulder bag with a comfortably roomy interior.", material: "100% premium cotton yarn", care: "Hand wash cold only. Lay flat to dry.", badge: "BESTSELLER", colors: [{ name: "Bubblegum Pink", hex: "#ef72a7" }, { name: "Cream White", hex: "#f4eee6" }, { name: "Lilac Dream", hex: "#b69ad9" }], images: [], stock: 6, featured: true },
    { title: "Matcha Daisy Tote", slug: "matcha-daisy-tote", price: 2200, category: bags._id, description: "Our roomy granny-square tote, finished with joyful cream daisies.", material: "Cotton blend yarn", care: "Spot clean or hand wash cold. Dry flat.", badge: "NEW", colors: [{ name: "Matcha Green", hex: "#81966b" }, { name: "Cream White", hex: "#f4eee6" }, { name: "Bubblegum Pink", hex: "#ef72a7" }], images: [], stock: 4, featured: true },
    { title: "Flower Power Bucket Hat", slug: "flower-power-bucket", price: 1200, category: hats._id, description: "A one-size crochet bucket hat with a softly structured brim.", material: "100% cotton yarn", care: "Hand wash cold and reshape while damp.", badge: "NEW", colors: [{ name: "Lilac Dream", hex: "#b69ad9" }, { name: "Bubblegum Pink", hex: "#ef72a7" }, { name: "Tangerine", hex: "#ef8a4c" }], images: [], stock: 9, featured: true },
    { title: "Cairo Sun Crochet Top", slug: "cairo-sun-crop", price: 1850, category: tops._id, description: "A bright one-size crochet top with adjustable shoulder ties.", material: "Breathable cotton yarn", care: "Hand wash gently in cold water. Lay flat to dry.", badge: "BESTSELLER", colors: [{ name: "Tangerine", hex: "#ef8a4c" }, { name: "Bubblegum Pink", hex: "#ef72a7" }, { name: "Matcha Green", hex: "#81966b" }], images: [], stock: 3, featured: true },
    { title: "Petal Mini Bag", slug: "petal-mini-bag", price: 1350, category: bags._id, description: "A compact evening bag with a flower-knit finish.", material: "Cotton ribbon yarn", care: "Wipe gently and store flat.", colors: [{ name: "Lilac Dream", hex: "#b69ad9" }, { name: "Bubblegum Pink", hex: "#ef72a7" }, { name: "Cream White", hex: "#f4eee6" }], images: [], stock: 7, featured: false },
    { title: "Daisy Hair Clip Set", slug: "daisy-hair-clips", price: 420, category: keychains._id, description: "A cheerful set of three hand-crocheted flower clips.", material: "Cotton yarn, metal clips", care: "Spot clean only.", colors: [{ name: "Bubblegum Pink", hex: "#ef72a7" }, { name: "Tangerine", hex: "#ef8a4c" }, { name: "Lilac Dream", hex: "#b69ad9" }], images: [], stock: 12, featured: false },
    { title: "Garden Party Tote", slug: "garden-party-tote", price: 2100, category: bags._id, description: "A floral everyday tote with strong stitched handles.", material: "Recycled cotton yarn", care: "Hand wash cold. Dry flat away from direct sun.", badge: "NEW", colors: [{ name: "Matcha Green", hex: "#81966b" }, { name: "Bubblegum Pink", hex: "#ef72a7" }, { name: "Cream White", hex: "#f4eee6" }], images: [], stock: 5, featured: false },
    { title: "Soft Loop Bandana", slug: "soft-loop-bandana", price: 680, category: hats._id, description: "An easy one-size triangular bandana with adjustable ties.", material: "100% soft cotton yarn", care: "Hand wash cold and air dry.", colors: [{ name: "Cream White", hex: "#f4eee6" }, { name: "Bubblegum Pink", hex: "#ef72a7" }, { name: "Matcha Green", hex: "#81966b" }], images: [], stock: 8, featured: false },
  ];

  await Product.insertMany(productsData);
  await mongoose.disconnect();
  console.log("seeded");
}

seed().catch((e) => { console.error(e); process.exit(1); });