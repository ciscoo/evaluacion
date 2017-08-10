const mongoose = require('mongoose');
const models = require('../app/models');

process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/solstice';
mongoose.Promise = global.Promise;

/**
 * Ideally we would mock MongoDB and mongoose, but I haven't
 * figured that out yet so we'll use the modules.
 *
 * Connect to MongoDB and drop the database each time
 * before each test suite.
 */
beforeAll(async () => Promise.all([
  mongoose.connect(process.env.MONGO_URI, { useMongoClient: true }),
  ...Object.keys(models).map(key => models[key].remove({})),
]));

afterAll(() => mongoose.disconnect());
