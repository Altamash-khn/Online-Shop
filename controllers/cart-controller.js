const Product = require("../models/product-model");

function getCart(req, res, next) {
  res.render("customer/cart/cart");
}

async function addCartItem(req, res, next) {
  let product;

  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart;
  cart.addItem(product);
  req.session.cart = cart;
  
  res
    .status(201)
    .json({ message: "Cart Updated!", newTotalItems: cart.totalQuantity });
}

function updateCartItem(req, res, next) {
  const cart = res.locals.cart;

  const updatedCartData = cart.updateItem(req.body.productId, req.body.newQuantity); 
  req.session.cart = cart;

  res.json({
    message: "Cart Item Updated!",
    updatedCartData
  })
}

module.exports = { addCartItem, getCart, updateCartItem };
