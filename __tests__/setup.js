const mongoose = require('mongoose');
const models = require('../app/models');

mongoose.Promise = global.Promise;

/**
 * Ideally we would mock MongoDB and mongoose, but I haven't
 * figured that out yet so we'll use the modules.
 *
 * Connect to MongoDB and drop the database each time
 * before each test suite.
 */
beforeAll(async () => Promise.all([
  mongoose.connect('mongodb://localhost/solstice-test', { useMongoClient: true }),
  ...Object.keys(models).map(key => models[key].remove({})),
]));

afterAll(() => mongoose.disconnect());
