module.exports = app => {
  const truth = require("../controllers/truths.controller.js");

  var router = require("express").Router();

  // Create a new Truth
  router.post("/", truth.create);

  // Retrieve all truths
  router.get("/", truth.findAll);

  // Retrieve all truths said by a singer
  router.get("/bySinger", truth.findAllBySinger);

  // Retrieve a single Truth with id
  router.get("/:id", truth.findOne);

  // Update a Truth with id
  router.put("/:id", truth.update);

  // Delete a Truth with id
  router.delete("/:id", truth.delete);

  // Delete all truths
  router.delete("/", truth.deleteAll);

  app.use('/api/truths', router);
};