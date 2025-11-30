const cloudinary = require("cloudinary").v2;

const Product = require("../models/product-model");
const Order = require("../models/order-model");

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

async function createNewProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    imageUrl: req.file.path,
    imagePublicId: req.file.filename,
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
    console.log("product", product);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  let existingProduct;

  try {
    existingProduct = await Product.findById(req.params.id);
  } catch (error) {
    next(error);
    return;
  }
  console.log("req.body", req.body);

  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  // TODO: update image if a new one is provided
  if (req.file) {
    if (existingProduct.imagePublicId) {
      await cloudinary.uploader.destroy(existingProduct.imagePublicId);
    }

    product.imageUrl = req.file.path;
    product.imagePublicId = req.file.filename;
  }

  try {
    await product.save();
    res.redirect("/admin/products");
  } catch (error) {
    next(error);
    return;
  }
}

async function deleteProduct(req, res, next) {
  let existingProduct;
  try {
    existingProduct = await Product.findById(req.params.id);
  } catch (error) {
    next(error);
    return;
  }

  if (existingProduct.imagePublicId) {
    await cloudinary.uploader.destroy(existingProduct.imagePublicId);
  }

  try {
    const product = new Product({
      _id: req.params.id,
    });
    await product.remove();
    // res.redirect("/admin/products");
    res.json({ message: "Product deleted!" });
  } catch (error) {
    next(error);
    return;
  }
}

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    res.render("admin/orders/admin-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;

  try {
    const order = await Order.findById(orderId);

    order.status = newStatus;

    await order.save();

    res.json({ message: "Order updated", newStatus: newStatus });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getNewProducts,
  createNewProduct,
  getUpdateProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  updateOrder,
};
