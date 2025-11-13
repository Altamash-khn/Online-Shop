const User = require("../models/user-model");
const authUtil = require("../utils/authentication");
const validation = require("../utils/validation");
const sessionFlash = require("../utils/session-flash");

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      confirmEmail: "",
      password: "",
      fullname: "",
      street: "",
      postal: "",
      city: "",
    };
  }
  res.render("customer/auth/signup", { inputData: sessionData });
}

async function signup(req, res, next) {
  const { email, password, fullname, street, postal, city } = req.body;
  const confirmEmail = req.body["confirm-email"];

  if (
    !validation.userDetailsAreValid(
      email,
      password,
      fullname,
      street,
      postal,
      city
    ) ||
    !validation.emailIsEqualToConfirmEmail(email, confirmEmail)
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "Invalid user inputs, pls check your inputs",
        email,
        confirmEmail,
        password,
        fullname,
        street,
        postal,
        city,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  const user = new User(email, password, fullname, street, postal, city);

  try {
    const existsAlready = await user.existsAlready();

    if (existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: "User exists already!!!",
          email,
          confirmEmail,
          password,
          fullname,
          street,
          postal,
          city,
        },
        function () {
          res.redirect("/signup");
        }
      );
      return;
    }

    await user.signup();
  } catch (error) {
    return next(error);
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }
  res.render("customer/auth/login", { inputData: sessionData });
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

  const sessionErrorData = {
    errorMessage:
      "Invalid credentials - please double-check your email and password!",
    email,
    password,
  };

  if (!existingUser) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect("/login");
    });
    return;
  }

  const isPasswordCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!isPasswordCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect("/login");
    });
    return;
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
