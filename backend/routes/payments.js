module.exports = app => {
const paymentController = require("../controllers/payment.controller.js");

const router = require("express").Router();

// Create a new Payment
router.post("/", paymentController.create);
  
// Retrieve all Payments
router.get("/", paymentController.findAll);


// Retrieve a single Payment with id
router.get("/:id", paymentController.findOne);

// Update a Payment with id
router.post("/:id", paymentController.update);

// Delete a Payment with id
router.post("/:id", paymentController.delete);

// Delete all Payments
router.post("/", paymentController.deleteAll);


app.use("/api/payments", router);

};
