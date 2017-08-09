const mongoose = require('mongoose');

/**
 * Typically when you enter a contact in your contacts or write it down,
 * you only write/ask for their name and number. So only these two properties
 * are required while the rest are optional.
 */
const definition = {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: Object,
    required: true,
  },
  address: Object,
  email: String,
  company: String,
  favorite: Boolean,
  smallImageURL: String,
  largeImageURL: String,
  website: String,
  birthdate: Number,
  deletedAt: Date,
};

const schema = new mongoose.Schema(definition, { timestamps: true });

module.exports = mongoose.model('Contact', schema);
