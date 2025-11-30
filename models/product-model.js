const mongodb = require("mongodb");
const db = require("../data/database");
class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.imageUrl = productData.imageUrl;
    this.imagePublicId = productData.imagePublicId;

    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();
    return products.map((product) => new Product(product));
  }

  static async findById(productId) {
    let prodId;

    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw new Error("invialid id");
    }

    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error("Could not find product with the given id");
      error.code = 404;
      throw error;
    }

    return product;
  }

  static async findMultiple(ids) {
    const productIds = ids.map(function (id) {
      return new mongodb.ObjectId(id);
    });

    const products = await db
      .getDb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      // imageUrl: this.imageUrl,
      // imagePublicId: this.imagePublicId,
    };

    if (this.imageUrl) {
      productData.imageUrl = this.imageUrl;
    }

    if (this.imagePublicId) {
      productData.imagePublicId = this.imagePublicId;
    }

    if (this.id) {
      const prodId = new mongodb.ObjectId(this.id);
      await db
        .getDb()
        .collection("products")
        .updateOne({ _id: prodId }, { $set: productData });
    } else {
      await db.getDb().collection("products").insertOne(productData);
    }
  }

  remove() {
    const prodId = new mongodb.ObjectId(this.id);
    return db.getDb().collection("products").deleteOne({ _id: prodId });
  }
}

module.exports = Product;
