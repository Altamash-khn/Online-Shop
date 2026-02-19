function protectRoutes(req, res, next) {
  console.log("res", res.locals);

  if (!res.locals.isAuth) {
    return res.redirect("/401");
  }
  console.log("rdgnb   eq", req.path.startsWith("/admin"));

  if (!res.locals.isAdmin) {
    return res.redirect("/403");
  }

  next();
}

module.exports = protectRoutes;
