import { Schema, model } from "mongoose";

const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    title: { type: String, required: true },
    colorId: { type: String, required: true },
    colorName: { type: String, required: true },
    price: { type: Number, required: true, min: 0 }, // snapshot at order time
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },

    customer: {
      email: { type: String, required: true, trim: true, lowercase: true },
      phone: { type: String, required: true, match: /^01[0-9]{9}$/ },
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
    },

    shippingAddress: {
      street: { type: String, required: true, trim: true },
      apartment: { type: String, trim: true },
      governorate: { type: String, required: true, trim: true },
      area: { type: String, required: true, trim: true },
      phone: { type: String, required: true, match: /^01[0-9]{9}$/ },
    },

    items: { type: [orderItemSchema], required: true },

    shippingMethod: { type: String, default: "standard" },
    shippingCost: { type: Number, required: true, min: 0 },

    paymentMethod: { type: String, enum: ["cod", "card", "instapay"], required: true },

    couponCode: { type: String, default: null },
    discount: { type: Number, default: 0, min: 0 },

    subtotal: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    note: { type: String, trim: true },
  },
  { timestamps: true }
);

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const Order = model("Order", orderSchema);