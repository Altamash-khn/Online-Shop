function csrfToken(req, res, next) {
  console.log("req.session", req.session);

  res.locals.csrfToken = req.csrfToken();
  next();
}

module.exports = csrfToken;
