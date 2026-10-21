import { AbstractRepository } from "../abstractRepository.js";
import { Coupon } from "./coupon.model.js";

class CouponRepository extends AbstractRepository {
  constructor() {
    super(Coupon);
  }

  async findByCode(code) {
    return this.model.findOne({ code: code.toUpperCase().trim() });
  }

  async incrementUsage(couponId) {
    return this.model.updateOne({ _id: couponId }, { $inc: { usedCount: 1 } });
  }
}

export const couponRepository = new CouponRepository();