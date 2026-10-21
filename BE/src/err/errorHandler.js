export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  if (status === 500) {
    console.error(err); // log full error server-side for unexpected failures
  }

  res.status(status).json({ message });
};