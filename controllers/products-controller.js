const Product = require("../models/product-model");

async function getAllProducts(req, res, next) {
  // Product.findAll()
  //   .then((products) => {
  //     console.log("products", products);
  //     res.render("customer/products/all-products", { products: products });
  //   })
  //   .catch((err) => {
  //     next(err);
  //   });
  const products = await Product.findAll();
  console.log("products", products);
  res.render("customer/products/all-products", { products: products });
}

module.exports = { getAllProducts };
