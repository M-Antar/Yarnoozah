import { AbstractRepository } from "../abstractRepository.js";
import { Order } from "./order.model.js";

class OrderRepository extends AbstractRepository {
  constructor() {
    super(Order);
  }

  // GET /api/orders/:id — by ObjectId or orderNumber
  async findByIdOrOrderNumber(idOrNumber) {
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrNumber);
    return this.getOne(isObjectId ? { _id: idOrNumber } : { orderNumber: idOrNumber });
  }
}

export const orderRepository = new OrderRepository();