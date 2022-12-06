var express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require('path');

var indexRouter = require('./routes/index');

var app = express();
app.use(cors())

// set port, listen for requests
const PORT = process.env.PORT || 4242;

// database
const db = require("./models");

// db.sequelize.sync().then(() => {
//     console.log(`Database is running on port ${PORT}...........🥳`);
// });

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// database api routes
require("./routes/payments")(app);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);
// app.use('/payments', paymentsRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

// module.exports = app;
