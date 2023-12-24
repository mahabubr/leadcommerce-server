import express from 'express';
import multer from '../../middleware/multer';
import { ProductsController } from './products.controller';

const router = express.Router();

router.post('/', multer.single('image'), ProductsController.createProduct);
router.get('/', ProductsController.getAllProducts);
router.get('/:id', ProductsController.getSingleProduct);
router.get('/:storeId', ProductsController.getAllStoreProduct);
router.put('/:id', ProductsController.updateProduct);
router.delete('/:id', ProductsController.deleteProduct);

export const ProductsRoutes = router;
