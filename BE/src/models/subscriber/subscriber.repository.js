import { AbstractRepository } from "../abstractRepository.js";
import { Subscriber } from "./subscriber.model.js";

class SubscriberRepository extends AbstractRepository {
  constructor() {
    super(Subscriber);
  }

  // POST /api/newsletter/subscribe — ignore duplicates, always report success
  async subscribe(email) {
    try {
      await this.model.create({ email: email.toLowerCase().trim() });
    } catch (err) {
      if (err.code !== 11000) throw err; // 11000 = duplicate key — swallow it
    }
    return { success: true, message: "Subscribed successfully" };
  }
}

export const subscriberRepository = new SubscriberRepository();