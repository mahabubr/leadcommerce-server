"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_route_1 = require("../modules/admin/admin.route");
const auth_routes_1 = require("../modules/auth/auth.routes");
const category_route_1 = require("../modules/category/category.route");
const dashboard_routes_1 = require("../modules/dashboard/dashboard.routes");
const delivery_routes_1 = require("../modules/delivery/delivery.routes");
const event_routes_1 = require("../modules/events/event.routes");
const faq_route_1 = require("../modules/faq/faq.route");
const order_routes_1 = require("../modules/order/order.routes");
const payment_route_1 = require("../modules/payment/payment.route");
const products_routes_1 = require("../modules/products/products.routes");
const shipment_route_1 = require("../modules/shipment/shipment.route");
const store_routes_1 = require("../modules/store/store.routes");
const employe_routes_1 = require("../modules/employe/employe.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/payment',
        route: payment_route_1.PaymentRoutes,
    },
    {
        path: '/shipment',
        route: shipment_route_1.ShipmentRoutes,
    },
    {
        path: '/employee',
        route: employe_routes_1.EmployeRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/category',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/products',
        route: products_routes_1.ProductsRoutes,
    },
    {
        path: '/Orders',
        route: order_routes_1.OrdersRoutes,
    },
    {
        path: '/store',
        route: store_routes_1.StoreRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/dashboard',
        route: dashboard_routes_1.DashboardRoutes,
    },
    {
        path: '/event',
        route: event_routes_1.EventRoutes,
    },
    {
        path: '/delivery',
        route: delivery_routes_1.DeliveryRoutes,
    },
    {
        path: '/faq',
        route: faq_route_1.FaqRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
