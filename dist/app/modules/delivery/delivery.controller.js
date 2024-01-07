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
exports.DeliveryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = __importDefault(require("../../../config/cloudinary"));
const paginationConstants_1 = require("../../../constants/paginationConstants");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const delivery_interface_1 = require("./delivery.interface");
const delivery_services_1 = require("./delivery.services");
const createDelivery = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const DeliveryData = __rest(req.body, []);
    if (req.file) {
        const uploadedImage = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const avatar = {
            avatar: uploadedImage.secure_url,
            avatar_public_url: uploadedImage.public_id,
        };
        DeliveryData.image = avatar;
    }
    const result = yield delivery_services_1.DeliveryServices.createDelivery(DeliveryData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Delivery created successfully',
        data: result,
    });
}));
const getAllDelivery = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, delivery_interface_1.DeliveryFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationConstants_1.paginationFields);
    const result = yield delivery_services_1.DeliveryServices.getAllDelivery(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Delivery retrieved successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
const getSingleDelivery = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.decode(req.headers.authorization);
    const result = yield delivery_services_1.DeliveryServices.getSingleDelivery(decoded.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Delivery Fetched successfully',
        data: result,
    });
}));
const updateDelivery = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const decoded = jsonwebtoken_1.default.decode(req.headers.authorization);
    const updatedData = __rest(req.body, []);
    if (req.file) {
        const uploadedImage = yield cloudinary_1.default.uploader.upload((_b = req.file) === null || _b === void 0 ? void 0 : _b.path);
        const avatar = {
            avatar: uploadedImage.secure_url,
            avatar_public_url: uploadedImage.public_id,
        };
        updatedData.image = avatar;
    }
    const result = yield delivery_services_1.DeliveryServices.updateDelivery(decoded.id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Delivery updated successfully',
        data: result,
    });
}));
const deleteDelivery = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield delivery_services_1.DeliveryServices.deleteDelivery(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Delivery deleted successfully',
        data: result,
    });
}));
exports.DeliveryController = {
    deleteDelivery,
    createDelivery,
    updateDelivery,
    getAllDelivery,
    getSingleDelivery,
};
