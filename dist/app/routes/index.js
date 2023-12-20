"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const order_routes_1 = require("../modules/order/order.routes");
const products_routes_1 = require("../modules/products/products.routes");
const store_routes_1 = require("../modules/store/store.routes");
const router = express_1.default.Router();
const moduleRoutes = [
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
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
