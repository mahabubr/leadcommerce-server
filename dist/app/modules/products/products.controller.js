"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = __importDefault(require("../../../config/cloudinary"));
const paginationConstants_1 = require("../../../constants/paginationConstants");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const products_constant_1 = require("./products.constant");
const products_services_1 = require("./products.services");
// * create product
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const productData = __rest(req.body, []);
    const decoded = jsonwebtoken_1.default.decode(req.headers.authorization);
    if (req.file) {
        const uploadedImage = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const avatar = {
            avatar: uploadedImage.secure_url,
            avatar_public_url: uploadedImage.public_id,
        };
        productData.image = avatar;
    }
    const result = yield products_services_1.ProductsServices.createProduct(productData, decoded.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product created successfully',
        data: result,
    });
}));
// * get all product
const getAllProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const decoded = jwt.decode(req.headers.authorization as string) as JwtPayload;
    const filters = (0, pick_1.default)(req.query, products_constant_1.ProductFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationConstants_1.paginationFields);
    const result = yield products_services_1.ProductsServices.getAllProducts(filters, paginationOptions
    // decoded.id
    );
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Products retrieved successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
// * get single product
const getSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield products_services_1.ProductsServices.getSingleProduct(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product Fetched successfully',
        data: result,
    });
}));
// * get all store product
const getAllStoreProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.decode(req.headers.authorization);
    const result = yield products_services_1.ProductsServices.getAllStoreProduct(decoded.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product Fetched successfully',
        data: result,
    });
}));
// * update product
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    const updatedData = __rest(req.body, []);
    if (req.file) {
        const uploadedImage = yield cloudinary_1.default.uploader.upload((_b = req.file) === null || _b === void 0 ? void 0 : _b.path);
        const avatar = {
            avatar: uploadedImage.secure_url,
            avatar_public_url: uploadedImage.public_id,
        };
        updatedData.image = avatar;
    }
    const result = yield products_services_1.ProductsServices.updateProduct(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product updated successfully',
        data: result,
    });
}));
// * delete single product
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield products_services_1.ProductsServices.deleteProduct(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product deleted successfully',
        data: result,
    });
}));
// * get all product
const getAllProductsForStore = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.decode(req.headers.authorization);
    const filters = (0, pick_1.default)(req.query, products_constant_1.ProductFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationConstants_1.paginationFields);
    const result = yield products_services_1.ProductsServices.getAllProductsForStore(filters, paginationOptions, decoded.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Products retrieved successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
const getSingleStoreProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield products_services_1.ProductsServices.getSingleStoreProducts(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Products retrieved successfully',
        data: result,
    });
}));
exports.ProductsController = {
    createProduct,
    getAllProducts,
    updateProduct,
    getAllStoreProduct,
    deleteProduct,
    getSingleProduct,
    getAllProductsForStore,
    getSingleStoreProducts,
};
