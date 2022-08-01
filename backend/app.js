const express = require('express');
const app = express();

const errorMiddleware = require('./middleware/error');

//Parse all the incoming requests.
app.use(express.json());

//Imports for Routes
const products = require('./routes/productRoutes');

app.use("/api/v1", products);

//Error Middleware, as suggested in express-docs, error handler middleware should be present at last.
app.use(errorMiddleware);

module.exports = app;
