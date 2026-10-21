import { model, Schema } from "mongoose";


const categorySchema = new Schema({

    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, trim: true },
    image: { type: String },
    
},
{timestamps:true});

categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const Category = model("Category",categorySchema) 
