const express = require('express');
const { contactController } = require('../controllers');
const { errorHandlers } = require('../middleware');

const router = express.Router();

router.get('/', errorHandlers.catchErrors(contactController.index));
router.post('/', errorHandlers.catchErrors(contactController.store));
router.get('/:id', errorHandlers.catchErrors(contactController.show));
router.patch('/:id', errorHandlers.catchErrors(contactController.update));
router.delete('/:id', errorHandlers.catchErrors(contactController.destroy));

module.exports = router;
