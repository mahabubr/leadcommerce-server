import express from 'express';
import { EmployeRoutes } from '../modules/Employees/Employees.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CategoryRoutes } from '../modules/category/category.route';
import { OrdersRoutes } from '../modules/order/order.routes';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { ProductsRoutes } from '../modules/products/products.routes';
import { ShipmentRoutes } from '../modules/shipment/shipment.route';
import { StoreRoutes } from '../modules/store/store.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  {
    path: '/shipment',
    route: ShipmentRoutes,
  },
  {
    path: '/employee',
    route: EmployeRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
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
