const User = require("../models/user-model");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

function signup(req, res) {
  const { email, password, fullname, street, postal, city } = req.body;
  const confirmEmail = req.body["confirm-email"];
  const user = new User(email, password, fullname, street, postal, city);
  user.signup().then(() => {
    res.redirect("/login");
  });
}

function getLogin(req, res) {
  res.render("customer/auth/login");
}

module.exports = { getSignup, getLogin, signup };
