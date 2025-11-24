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
  res.render("customer/products/all-products", { products: products });
}

async function getProductDetails(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render("customer/products/product-details", { product: product });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllProducts, getProductDetails };
