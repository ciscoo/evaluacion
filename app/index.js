const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { apiRoutes } = require('./routes');
const { errorHandlers } = require('./middleware');

const app = express();

// Use native Promises since mongoose's are deprecated.
mongoose.Promise = global.Promise;

// Connect to mongo.
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true });

// Fail on connection error since we need the database.
mongoose.connection.on('error', (error) => { throw error; });

// Protect from some well-known web vulnerabilities by
// setting HTTP headers appropriately.
app.use(helmet());

// Allows parsing the body content via `req.body`
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount API routes.
app.use('/api', apiRoutes);

// Handle any errors.
app.use(errorHandlers.invalidRoute);
app.use(errorHandlers.validationErrors);
app.use(errorHandlers.displayErrors);

module.exports = app;
