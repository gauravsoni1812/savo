import express from 'express';
import { getProducts, addProduct, deleteProduct } from '../controller/productController.js';

const router = express.Router();

router.get('/', getProducts); // Get products
router.post('/', addProduct); // Add a product
router.delete('/:id', deleteProduct); // Delete a product

export default router;
