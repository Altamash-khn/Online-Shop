const express = require("express");
const cartController = require("../controllers/cart-controller");

const router = express.Router();

// all these routes will be prefixed with /cart
router.post("/items", cartController.addCartItem);

module.exports = router;
