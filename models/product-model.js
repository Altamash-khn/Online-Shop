const db = require("../data/database");
class Product {
  // MY CODE
  // constructor(title, imagePath, summary, price, description) {
  //   (this.title = title),
  //     (this.image = imagePath),
  //     (this.summary = summary),
  //     (this.price = price),
  //     (this.description = description);
  // }
  // async saveProduct() { 
  //   await db.getDb().collection("products").insertOne({
  //     title: this.title,
  //     image: this.image,
  //     summary: this.summary,
  //     price: this.price,
  //     description: this.description,
  //   });
  // }

  // INSTRUCTORS CODE
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.imagePath = `product-data/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();
    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  async save() {
    const ProductData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    await db.getDb().collection("products").insertOne(ProductData);
  }
}

module.exports = Product;
