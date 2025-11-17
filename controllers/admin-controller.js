const Product = require("../models/product-model");

async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products: products });
  } catch (error) {
    next(error);
    return;
  }
}

function getNewProducts(req, res) {
  res.render("admin/products/new-product");
}

// async function createNewProduct(req, res, next) {
//   // MY CODE
//   // const { title, summary, price, description } = req.body;
//   // const { path } = req.file;
//   // const product = new Product(title, path, summary, price, description);
//   // await product.saveProduct();

//   // INSTRUCTORS CODE
//   const product = new Product({
//     ...req.body,
//     image: req.file.filename,
//   });

//   try {
//     await product.save();
//   } catch (error) {
//     next(error);
//     return;
//   }
//   res.redirect("/admin/products");
// }

async function createNewProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    imageUrl: req.file.path, // Cloudinary URL
    imagePublicId: req.file.filename, // Cloudinary public ID
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

async function getUpdateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/products/update-product", { product: product });
  } catch (error) {
    next(error);
  }
}

function updateProduct() {}

module.exports = {
  getProducts,
  getNewProducts,
  createNewProduct,
  getUpdateProduct,
  updateProduct,
};
