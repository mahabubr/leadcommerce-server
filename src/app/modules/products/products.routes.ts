import express from 'express';
import { ProductsController } from './products.controller';

const router = express.Router();

router.post('/', ProductsController.createProduct);
router.get('/', ProductsController.getAllProducts);
router.get('/:id', ProductsController.getSingleProduct);
router.put('/:id', ProductsController.updateProduct);
router.delete('/:id', ProductsController.deleteProduct);

export const ProductsRoutes = router;
