const express = require('express');
const { contactController } = require('../controllers');

const router = express.Router();

router.get('/', contactController.index);
router.post('/', contactController.store);
router.get('/:id', contactController.show);
router.patch('/:id', contactController.update);
router.delete('/:id', contactController.destroy);

module.exports = router;
