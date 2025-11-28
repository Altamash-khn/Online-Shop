const express = require("express");
const cartController = require("../controllers/cart-controller");

const router = express.Router();

// all these routes will be prefixed with /cart
router.get("/", cartController.getCart);
router.post("/items", cartController.addCartItem);
router.patch("/items", cartController.updateCartItem);

module.exports = router;
