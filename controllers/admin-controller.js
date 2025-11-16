const Product = require("../models/product-model");
function getProducts(req, res) {
  res.render("admin/products/all-products");
}

function getNewProducts(req, res) {
  res.render("admin/products/new-product");
}

async function createNewProduct(req, res, next) {
  // MY CODE
  // const { title, summary, price, description } = req.body;
  // const { path } = req.file;
  // const product = new Product(title, path, summary, price, description);
  // await product.saveProduct();

  // INSTRUCTORS CODE
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/admin/products");
}

module.exports = { getProducts, getNewProducts, createNewProduct };
