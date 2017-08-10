const { Contact } = require('../models');

exports.index = async (req, res) => {
  const contacts = await Contact.find().exec();
  res.json({
    status: 200,
    data: contacts,
  });
};

exports.store = async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.status(201).json({
    status: 201,
    data: contact,
  });
};

exports.show = async (req, res) => {
  const contact = await Contact.findById(req.params.id).exec();
  if (contact.deletedAt) {
    const error = new Error('Resource does not exist.');
    error.status = 404;
    throw error;
  }
  res.json({
    status: 200,
    data: contact,
  });
};

exports.update = async (req, res) => {
  if (req.body.deletedAt) {
    delete req.body.deletedAt;
  }

  const contact = await Contact
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec();

  res.json({
    status: 200,
    data: contact,
  });
};

exports.destroy = async (req, res) => {
  const contact = await Contact.findById(req.params.id).exec();

  contact.deletedAt = new Date();
  await contact.save();

  res.status(204).json();
};
