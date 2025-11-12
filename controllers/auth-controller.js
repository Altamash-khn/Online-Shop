const User = require("../models/user-model");
const authUtil = require("../utils/authentication");

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

async function login(req, res) {
  const { email, password } = req.body;

  const user = new User(email, password);
  const existingUser = await user.getUserWithSameEmail();

  if (!existingUser) {
    return res.redirect("/login");
  }

  const isPasswordCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return res.redirect("/login");
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}
module.exports = { getSignup, getLogin, signup, login };
