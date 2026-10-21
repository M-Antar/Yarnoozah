import { Schema, model } from "mongoose";

const cartItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    colorId: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: true }
);

const cartSchema = new Schema(
  {
    cartId: { type: String, required: true, unique: true, index: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true }
);

cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    ret.items = ret.items.map((item) => {
      item.id = item._id;
      delete item._id;
      return item;
    });
  },
});

export const Cart = model("Cart", cartSchema);