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
exports.ProductsServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const products_constant_1 = require("./products.constant");
const products_model_1 = require("./products.model");
// * create product
const createProduct = (payload, storeId) => __awaiter(void 0, void 0, void 0, function* () {
    payload.store_id = storeId;
    const result = yield products_model_1.Products.create(payload);
    return result;
});
// * get all products
const getAllProducts = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: products_constant_1.ProductSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : { status: 'active' };
    const result = yield products_model_1.Products.find(whereCondition)
        .populate('store_id')
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield products_model_1.Products.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// * get single product
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.findById(id);
    return result;
});
// * get single product
const getAllStoreProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.find({ store_id: id });
    return result;
});
// * update single product
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield products_model_1.Products.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'product is not exist');
    }
    const result = yield products_model_1.Products.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// * delete single product
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield products_model_1.Products.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'This user is not exist');
    }
    const result = yield products_model_1.Products.findByIdAndDelete(id);
    return result;
});
const getAllProductsForStore = (filters, paginationOptions, store_id) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: products_constant_1.ProductSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (store_id) {
        andCondition.push({
            store_id: {
                $eq: store_id,
            },
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : { status: 'active' };
    const result = yield products_model_1.Products.find(whereCondition)
        .populate('store_id')
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield products_model_1.Products.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleStoreProducts = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield products_model_1.Products.find({
        store_id: id,
    }).limit(3);
});
exports.ProductsServices = {
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    getAllStoreProduct,
    getAllProducts,
    getAllProductsForStore,
    getSingleStoreProducts,
};
