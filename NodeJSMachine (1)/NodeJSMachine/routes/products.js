const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAll);
router.get('/create', productController.createForm);
router.post('/', productController.create);
router.get('/:id/edit', productController.editForm);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;
