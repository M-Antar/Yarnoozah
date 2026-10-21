
import { AbstractRepository } from "../abstractRepository.js";
import { Product } from "./product.model.js";
import { Category } from "../category/category.model.js";

class ProductRepository extends AbstractRepository {
  constructor() {
    super(Product);
  }

  async findWithFilters(opts = {}) {
    const filter = {};

    if (opts.category) {
      const category = await Category.findOne({
        slug: opts.category,
      }).select("_id");

      if (!category) {
        return {
          products: [],
          total: 0,
          page: Number(opts.page) || 1,
          pages: 0,
        };
      }

      filter.category = category._id;
    }

    if (opts.color) {
      filter["colors.id"] = opts.color;
    }

    if (opts.inStock) {
      filter.stock = { $gt: 0 };
    }

    if (opts.minPrice || opts.maxPrice) {
      filter.price = {};

      if (opts.minPrice) {
        filter.price.$gte = Number(opts.minPrice);
      }

      if (opts.maxPrice) {
        filter.price.$lte = Number(opts.maxPrice);
      }
    }

    const sortMap = {
      low: { price: 1 },
      high: { price: -1 },
      new: { createdAt: -1 },
    };

    const sort = sortMap[opts.sort] ?? sortMap.new;

    const page = Number(opts.page) || 1;
    const limit = Number(opts.limit) || 12;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.model
        .find(filter)
        .populate("category")
        .sort(sort)
        .skip(skip)
        .limit(limit),
      this.model.countDocuments(filter),
    ]);

    return {
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async findFeatured(limit = 8) {
    return this.model
      .find({ featured: true })
      .populate("category")
      .limit(limit);
  }

  async findByIdOrSlug(idOrSlug) {
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);

    const filter = isObjectId
      ? { _id: idOrSlug }
      : { slug: idOrSlug };

    return this.model
      .findOne(filter)
      .populate("category");
  }

  async findRelated(product, limit = 4) {
    return this.model
      .find({
        category: product.category,
        _id: { $ne: product._id },
      })
      .populate("category")
      .limit(limit);
  }

  async decrementStock(productId, quantity) {
    return this.model.updateOne(
      {
        _id: productId,
        stock: { $gte: quantity },
      },
      {
        $inc: { stock: -quantity },
      }
    );
  }

  async incrementStock(productId, quantity) {
  return Product.updateOne({ _id: productId }, { $inc: { stock: quantity } });
}
}

export const productRepository = new ProductRepository();
