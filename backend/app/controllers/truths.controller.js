const db = require("../models");
const Truth = db.truths;

// Create and Save a new Truth
exports.create = (req, res) => {
  // Validate request
  if (!req.body.text) {
    res.status(400).send({ message: "Truth text can not be empty!" });
    return;
  }

  if (!req.body.singer) {
    res.status(400).send({ message: "Truth singer can not empty!" });
    return;
  }

  // Create a Truth
  const truth = new Truth({
    text: req.body.text,
    song: req.body.song ? req.body.song : '',
    singer: req.body.singer
  });

  // Save Truth in the database
  truth
    .save(truth)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Truth."
      });
    });
};

// Retrieve all Truths from the database.
exports.findAll = (req, res) => {

  Truth.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Truths."
      });
    });
};

// Find a single Truth with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Truth.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Truth with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Truth with id=" + id });
    });
};

// Update a Truth by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Truth.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Truth with id=${id}. Maybe Truth was not found!`
        });
      } else res.send({ message: "Truth was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Truth with id=" + id
      });
    });
};

// Delete a Truth with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Truth.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Truth with id=${id}. Maybe Truth was not found!`
        });
      } else {
        res.send({
          message: "Truth was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Truth with id=" + id
      });
    });
};

// Delete all Truths from the database.
exports.deleteAll = (req, res) => {
  Truth.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Truths were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Truths."
      });
    });
};


// Find all Truths saind by singer
exports.findAllBySinger = (req, res) => {
  const singer = req.query.singer;
  var condition = singer ? { singer: { $regex: new RegExp(singer), $options: "i" } } : {};

  Truth.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Truths."
      });
    });
};