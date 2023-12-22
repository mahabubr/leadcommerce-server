import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { OrdersRoutes } from '../modules/order/order.routes';
import { ProductsRoutes } from '../modules/products/products.routes';
import { StoreRoutes } from '../modules/store/store.routes';
import { CategoryRoutes } from '../modules/category/category.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/products',
    route: ProductsRoutes,
  },
  {
    path: '/Orders',
    route: OrdersRoutes,
  },
  {
    path: '/store',
    route: StoreRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
