import express from 'express';
import { OrdersRoutes } from '../modules/order/order.routes';
import { ProductsRoutes } from '../modules/products/products.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductsRoutes,
  },
  {
    path: '/Orders',
    route: OrdersRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
