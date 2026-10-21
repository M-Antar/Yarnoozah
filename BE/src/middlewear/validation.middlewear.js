export const isvalid = (schema) => {
  return (req, res, next) => {
    const toValidate = { ...req.body, ...req.params, ...req.query };
    const { error } = schema.validate(toValidate);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
  };
};