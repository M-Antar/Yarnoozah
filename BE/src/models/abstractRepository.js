
export class AbstractRepository {
  constructor(model) {
    this.model = model;
  }

  async create(item) {
    const doc = new this.model(item);
    return doc.save();
  }

  async getOne(filter, projection, options) {
    return this.model.findOne(filter, projection, options);
  }

  async updateOne(filter, updateQuery, options) {
    return this.model.findOneAndUpdate(filter, updateQuery, options);
  }

  async findOneAndUpdate(filter, updateQuery, options = {}) {
    return this.model.findOneAndUpdate(filter, updateQuery, {
      new: true, // return updated document
      runValidators: true,
      ...options,
    });
  }

  async getAll(filter = {}, projection, options) {
    return this.model.find(filter, projection, options);
  }
}