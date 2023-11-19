module.exports = app => {
  const auth = require("../controllers/auth.controller.js");
  var router = require("express").Router();

  // Verify user
  router.post('/', auth.verify)
  // Signup a new user
  router.post("/signup", auth.signup);
  // Login user
  router.post('/login', auth.login)

  app.use('/api/auth', router);
};