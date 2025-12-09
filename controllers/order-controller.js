const stripe = require("stripe")(process.env.STRIPE_SECRET);

const User = require("../models/user-model");
const Order = require("../models/order-model");

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;

  let userDocument;
  try {
    userDocument = await User.findById(req.session.uid);
  } catch (error) {
    next(error);
    return;
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  const session = await stripe.checkout.sessions.create({
    line_items: cart.items.map(function (item) {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.title,
          },
          unit_amount: +(+item.product.price.toFixed(2)) * 100,
        },
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    success_url: "https://online-shop-vp83.onrender.com/orders/success",
    cancel_url: "https://online-shop-vp83.onrender.com/orders/failure",
  });

  res.redirect(303, session.url);
}

function getSuccess(req, res) {
  res.render("customer/orders/success");
}

function getFailure(req, res) {
  res.render("customer/orders/failure");
}

module.exports = { addOrder, getOrders, getSuccess, getFailure };
