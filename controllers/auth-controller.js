const User = require("../models/user-model");
const authUtil = require("../utils/authentication");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function signup(req, res, next) {
  const { email, password, fullname, street, postal, city } = req.body;
  const confirmEmail = req.body["confirm-email"];
  const user = new User(email, password, fullname, street, postal, city);

  try {
    await user.signup();
  } catch (error) {
    return next(error);
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("customer/auth/login");
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const user = new User(email, password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    return next(error);
  }

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

function logout(req, res) {
  authUtil.destroyUserAuthStatus(req);
  res.redirect("/login");
}

module.exports = { getSignup, getLogin, signup, login, logout };
