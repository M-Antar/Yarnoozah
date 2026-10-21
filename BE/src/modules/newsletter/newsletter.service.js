import { subscriberRepository } from "../../models/subscriber/subscriber.repository.js";

export const subscribeToNewsletter = async (req, res, next) => {
  const result = await subscriberRepository.subscribe(req.body.email);
  res.status(200).json(result);
};