const User = require("../models/user-model");
const Order = require("../models/order-model");

function getOrders(req, res, next){
    // to be implemented later
    res.render("customer/orders/all-orders");
}

async function addOrder(req, res, next){
    const cart = res.locals.cart;

    let userDocument;
    try {
        userDocument = await User.findById(req.session.uid);
    } catch  (error) {
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

    req.session.cart = null
    res.redirect("/orders");
}

module.exports = {addOrder, getOrders}