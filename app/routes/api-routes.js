const express = require('express');
const contactRoutes = require('./contact-routes');

const router = express.Router();

router.use('/contacts', contactRoutes);

module.exports = router;
