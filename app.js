require("dotenv").config();
const path = require("path");

const express = require("express");
const csrf = require("@dr.pogodin/csurf");
const expressSession = require("express-session");


const authRoutes = require("./routes/auth-routes");
const productsRoutes = require("./routes/products-routes");
const baseRoutes = require("./routes/base-routes");
const adminRoutes = require("./routes/admin-routes");
const cartRoutes = require("./routes/cart-routes");
const orderRoutes = require("./routes/order-routes");

const { connectToDatabase } = require("./data/database");
const createSessionConfig = require("./config/session");

const errorHandlerMiddleware = require("./middlewares/error-handler");
const addCSRFTokenMiddleware = require("./middlewares/csrf-token");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const protectRoutesMiddleware = require("./middlewares/protect-routes");
const cartMiddleWare = require("./middlewares/cart");
const updateCartPricesMiddleware = require("./middlewares/update-cart-prices");
const notFoundMiddleware = require("./middlewares/not-found");


const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionConfig = createSessionConfig();

// order matters for all these middlewares
app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(cartMiddleWare);
app.use(updateCartPricesMiddleware);

app.use(addCSRFTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use("/cart", cartRoutes);
app.use("/admin", protectRoutesMiddleware, adminRoutes);
app.use("/orders", protectRoutesMiddleware, orderRoutes);

app.use(notFoundMiddleware);

// app.use(errorHandlerMiddleware);

connectToDatabase()
  .then(() => app.listen(3000))
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
