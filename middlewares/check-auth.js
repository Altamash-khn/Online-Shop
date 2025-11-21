function checkAuthStatus(req, res, next) {
  const uid = req.session.uid;
  console.log("uid", uid);

  if (!uid) {
    return next();
  }

  res.locals.isAdmin = req.session.isAdmin;
  res.locals.uid = uid;
  res.locals.isAuth = true;
  next();
}

module.exports = checkAuthStatus;
