const express = require("express");
const path = require("path");
const csrf = require("@dr.pogodin/csurf");
const app = express();
const authRoutes = require("./routes/auth-routes");
const { connectToDatabase } = require("./data/database");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(csrf());

app.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(authRoutes);

connectToDatabase()
  .then(() => app.listen(3000))
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
