import express from 'express';
import { ProductsRoutes } from '../modules/products/products.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductsRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
