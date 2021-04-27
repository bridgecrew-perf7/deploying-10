const express = require('express');

const prodcutController = require('../controllers/product');

const router = express.Router();

/**
 * path: /product/product
 */
router.post('/product', prodcutController.createProduct);

/**
 * path: /product/products
 */
router.get('/products', prodcutController.readProducts);

/**
 * path: /product/:productId
 */
router.get('/:productId', prodcutController.readProduct);

/**
 * path: /product/:productId
 */
router.patch('/:productId', prodcutController.updateProduct);

/**
 * path: /product/:productId
 */
router.delete('/:productId', prodcutController.deleteProduct);


module.exports = router;