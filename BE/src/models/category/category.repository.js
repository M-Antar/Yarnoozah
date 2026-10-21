import { AbstractRepository } from "../abstractRepository.js";
import { Category } from "./category.model.js";
import { Product } from "../product/product.model.js";

class CategoryRepository extends AbstractRepository {
  constructor() {
    super(Category);
  }

  async findBySlug(slug) {
    return this.getOne({ slug });
  }

  // GET /api/categories — all categories + productCount
  async findAllWithCount() {
    const categories = await this.model.find().lean();

    const counts = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const countMap = new Map(counts.map((c) => [String(c._id), c.count]));

    return categories.map((cat) => ({
      ...cat,
      id: cat._id,
      productCount: countMap.get(String(cat._id)) ?? 0,
    }));
  }
}

export const categoryRepository = new CategoryRepository();