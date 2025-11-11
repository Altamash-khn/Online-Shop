const path = require("path");

const express = require("express");
const csrf = require("@dr.pogodin/csurf");
const expressSession = require("express-session");

const authRoutes = require("./routes/auth-routes");
const { connectToDatabase } = require("./data/database");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const createSessionConfig = require("./config/session");
const addCSRFTokenMiddleware = require("./middlewares/csrf-token");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(addCSRFTokenMiddleware);

app.use(authRoutes);

app.use(errorHandlerMiddleware);

connectToDatabase()
  .then(() => app.listen(3000))
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
