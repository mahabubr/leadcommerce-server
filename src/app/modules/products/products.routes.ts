import express from 'express';
import { ENUM_ROLE } from '../../../enum/role';
import auth from '../../middleware/auth';
import multer from '../../middleware/multer';
import { ProductsController } from './products.controller';

const router = express.Router();

router.get('/store', auth(ENUM_ROLE.STORE), ProductsController.getAllProductsForStore);

router.post(
  '/',
  auth(ENUM_ROLE.STORE),
  multer.single('image'),
  ProductsController.createProduct
);
router.get('/', ProductsController.getAllProducts);
router.get('/my-product', ProductsController.getAllStoreProduct);
router.get('/:id', ProductsController.getSingleProduct);
router.put('/:id', multer.single('image'), ProductsController.updateProduct);
router.delete('/:id', ProductsController.deleteProduct);

export const ProductsRoutes = router;
