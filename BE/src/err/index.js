export const asyncErrorHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export { AppError } from "./AppError.js";
export { errorHandler } from "./errorHandler.js";
export { notFoundHandler } from "./notFoundHandler.js"