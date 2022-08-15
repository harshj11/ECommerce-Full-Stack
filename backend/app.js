const express = require('express');
const app = express();

const errorMiddleware = require('./middleware/error');

//Parse all the incoming requests.
app.use(express.json());

//Imports for Routes
const product = require('./routes/productRoutes');
const user = require('./routes/userRoutes');

app.use("/api/v1", product);
app.use("/api/v1", user);

//Error Middleware, as suggested in express-docs, error handler middleware should be present at last.
app.use(errorMiddleware);

module.exports = app;