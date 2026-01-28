const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAll);
router.get('/create', categoryController.createForm);
router.post('/', categoryController.create);
router.get('/:id/edit', categoryController.editForm);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

module.exports = router;
