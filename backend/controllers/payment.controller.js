const db = require("../models");
const Payment = db.payments;
const Op = db.Sequelize.Op;

// Create and Save a new Payment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.uuid) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Payment
  const payment = {
    uuid: req.body.uuid,
    status: req.body.status,
    mid: req.body.mid,
  };

  // Save Payment in database
  Payment.create(payment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Payment."
      });
    });
};

// Retrieve all Payment from the database.
exports.findAll = (req, res) => {
  Payment.findAll({
    // order: [
    //   ['createdAt', 'ASC'],
    // ],
  }).then(data => {
      // res.send(data);
    res.status(200).json({
      status:true,
      message:"success",
      data
    })
    })
    .catch(err => {
      // res.send(500).send({
      //   message: err.message || "Some error accurred while retrieving Payment."
      // });
      res.status(500).json({
        status:false, 
        message: err.message || "Some error accurred while retrieving Payment." 
      })
    });
};

// Find a single Payment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Payment.findByPk(id)
    .then(data => {
      // res.send(data);
      res.status(200).json({
        status: true,
        message: "success",
        data
      })
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Payment with id = ${id}`
      });
    });
};

// Update a Payment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  let data

  Payment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Payment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Payment with id=${id}. Maybe Payment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Payment with id=" + id
      });
    });
};

// Delete a Payment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Payment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Payment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Payment with id=${id}. Maybe Payment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Payment with id=" + id
      });
    });
};

// Delete all Payment from the database.
exports.deleteAll = (req, res) => {
  Payment.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Payment were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Payment."
      });
    });
};