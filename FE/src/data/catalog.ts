import pinkBag from "../assets/crochet-pink-bag.jpg";
import greenTote from "../assets/crochet-green-tote.jpg";
import accessories from "../assets/crochet-accessories.jpg";
import hero from "../assets/yarnoozah-hero.jpg";

export type Color = { id: string; name: string; hex: string; image?: string };
export type Product = {
  id: string;
  slug: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  categoryName: string;
  description: string;
  material: string;
  care: string;
  badge?: string;
  colors: [Color, ...Color[]];
  images: [string, ...string[]];
  stock: number;
};

export const categories = [
  {
    slug: "eleganties",
    name: "Eleganties",
    description: "Eleganties Bags",
    image: "https://res.cloudinary.com/lgvaqope/image/upload/v1791989999/IMG_0739.jpg",
  },
  {
    slug: "clutches",
    name: "Clutches",
    description: "Clutches Bags",
    image: "https://res.cloudinary.com/lgvaqope/image/upload/v1791990170/IMG_9840.jpg",
  },
  {
    slug: "rounded-bags",
    name: "Rounded Bags",
    description: "Rounded Bags",
    image: "https://res.cloudinary.com/lgvaqope/image/upload/v1791990376/IMG_5206.jpg",
  },
  {
    slug: "beach-bags",
    name: "Beach Bags",
    description: "Beach Bags",
    image: "https://res.cloudinary.com/lgvaqope/image/upload/v1791988941/IMG_4576.jpg",
  },
];

const pink = { id: "pink", name: "Bubblegum Pink", hex: "#ef72a7" };
const cream = { id: "cream", name: "Cream White", hex: "#f4eee6" };
const green = { id: "green", name: "Matcha Green", hex: "#81966b" };
const lilac = { id: "lilac", name: "Lilac Dream", hex: "#b69ad9" };
const orange = { id: "orange", name: "Tangerine", hex: "#ef8a4c" };

export const products: Product[] = [
  { id: "1", slug: "bubblegum-cloud-bag", title: "Bubblegum Cloud Bag", price: 1600, category: "bags", categoryName: "Crochet Bags", description: "A soft sculptural shoulder bag with a comfortably roomy interior. Dimensions: 30cm × 25cm. Strap drop: 45cm.", material: "100% premium cotton yarn", care: "Hand wash cold only. Lay flat to dry. Do not tumble dry.", badge: "BESTSELLER", colors: [pink, cream, lilac], images: [pinkBag, greenTote], stock: 6 },
  { id: "2", slug: "matcha-daisy-tote", title: "Matcha Daisy Tote", price: 2200, category: "bags", categoryName: "Crochet Bags", description: "Our roomy granny-square tote, finished with joyful cream daisies. Dimensions: 38cm × 34cm. Strap drop: 31cm.", material: "Cotton blend yarn", care: "Spot clean or hand wash cold. Dry flat.", badge: "NEW", colors: [green, cream, pink], images: [greenTote, pinkBag], stock: 4 },
  { id: "3", slug: "flower-power-bucket", title: "Flower Power Bucket Hat", price: 1200, category: "hats-accessories", categoryName: "Hats & Bandanas", description: "A one-size crochet bucket hat with a softly structured brim. Head circumference: approximately 56–58cm.", material: "100% cotton yarn", care: "Hand wash cold and reshape while damp.", badge: "NEW", colors: [lilac, pink, orange], images: [accessories, pinkBag], stock: 9 },
  { id: "4", slug: "cairo-sun-crop", title: "Cairo Sun Crochet Top", price: 1850, category: "tops", categoryName: "Crochet Tops", description: "A bright one-size crochet top with adjustable shoulder ties. Chest width: 42cm laid flat; length: 38cm.", material: "Breathable cotton yarn", care: "Hand wash gently in cold water. Lay flat to dry.", badge: "BESTSELLER", colors: [orange, pink, green], images: [hero, accessories], stock: 3 },
  { id: "5", slug: "petal-mini-bag", title: "Petal Mini Bag", price: 1350, category: "bags", categoryName: "Crochet Bags", description: "A compact evening bag with a flower-knit finish. Dimensions: 21cm × 17cm. Strap drop: 50cm.", material: "Cotton ribbon yarn", care: "Wipe gently and store flat.", colors: [lilac, pink, cream], images: [accessories, pinkBag], stock: 7 },
  { id: "6", slug: "daisy-hair-clips", title: "Daisy Hair Clip Set", price: 420, category: "keychains", categoryName: "Accessories & Keychains", description: "A cheerful set of three hand-crocheted flower clips. Each flower measures approximately 5cm.", material: "Cotton yarn, metal clips", care: "Spot clean only.", colors: [pink, orange, lilac], images: [accessories, greenTote], stock: 12 },
  { id: "7", slug: "garden-party-tote", title: "Garden Party Tote", price: 2100, category: "bags", categoryName: "Crochet Bags", description: "A floral everyday tote with strong stitched handles. Dimensions: 36cm × 32cm.", material: "Recycled cotton yarn", care: "Hand wash cold. Dry flat away from direct sun.", badge: "NEW", colors: [green, pink, cream], images: [greenTote, accessories], stock: 5 },
  { id: "8", slug: "soft-loop-bandana", title: "Soft Loop Bandana", price: 680, category: "hats-accessories", categoryName: "Hats & Bandanas", description: "An easy one-size triangular bandana with adjustable ties.", material: "100% soft cotton yarn", care: "Hand wash cold and air dry.", colors: [cream, pink, green], images: [accessories, hero], stock: 8 },
];

export { hero, pinkBag, greenTote, accessories };