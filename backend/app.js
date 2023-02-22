const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const errorMiddleware = require('./middleware/error');

//Parse all the incoming requests.
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Imports for Routes
const product = require('./routes/productRoutes');
const user = require('./routes/userRoutes');
const order = require('./routes/orderRoutes');

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//Error Middleware, as suggested in express-docs, error handler middleware should be present at last.
app.use(errorMiddleware);

module.exports = app;