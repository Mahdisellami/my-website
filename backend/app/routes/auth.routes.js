module.exports = app => {
  const auth = require("../controllers/auth.controller.js");
  var router = require("express").Router();

  // Signup a new user
  router.post("/signup", auth.signup);

  app.use('/api/auth', router);
};