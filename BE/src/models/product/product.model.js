
import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";

const colorSchema = new Schema(
  {
    id: { type: String, default: () => randomUUID() },
    name: { type: String, required: true, trim: true },
    hex: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, default: null, min: 0 },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    description: { type: String, trim: true },
    material: { type: String, trim: true },
    care: { type: String, trim: true },
    badge: { type: String, default: null },
    colors: { type: [colorSchema], default: [] },
    images: { type: [String], default: [] },
    stock: { type: Number, required: true, min: 0, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.virtual("onSale").get(function () {
  return this.compareAtPrice != null && this.compareAtPrice > this.price;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;

    if (ret.category && typeof ret.category === "object" && ret.category.slug) {
      ret.categoryName = ret.category.name;
      ret.category = ret.category.slug;
    }
  },
});

export const Product = model("Product", productSchema);
