"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../../middleware/multer"));
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
router.post('/', multer_1.default.single('image'), products_controller_1.ProductsController.createProduct);
router.get('/', products_controller_1.ProductsController.getAllProducts);
router.get('/my-product', products_controller_1.ProductsController.getAllStoreProduct);
router.get('/:id', products_controller_1.ProductsController.getSingleProduct);
router.put('/:id', multer_1.default.single('image'), products_controller_1.ProductsController.updateProduct);
router.delete('/:id', products_controller_1.ProductsController.deleteProduct);
exports.ProductsRoutes = router;
